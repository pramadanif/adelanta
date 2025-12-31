//! Main contract implementation for Adelanta Invoice
//! 
//! This contract handles the complete invoice lifecycle:
//! 1. Initialization with USDC token and config
//! 2. Invoice creation by SMEs
//! 3. Funding by liquidity providers
//! 4. Settlement triggered by Anchor payment
//! 5. Reputation tracking

use soroban_sdk::{contract, contractimpl, token, Address, Env, String};

use crate::errors::AdelantaError;
use crate::storage::Storage;
use crate::types::{
    ContractConfig, FundingEvent, Invoice, InvoiceStatus, SettlementResult, SmeReputation,
};

#[contract]
pub struct AdelantaInvoiceContract;

#[contractimpl]
impl AdelantaInvoiceContract {
    // ============================================================
    // INITIALIZATION
    // ============================================================

    /// Initialize the contract with configuration
    /// 
    /// # Arguments
    /// * `admin` - Admin address with special privileges
    /// * `usdc_token` - USDC token contract address
    /// * `treasury` - Treasury address for protocol fees
    /// * `default_advance_bps` - Default advance percentage (basis points, e.g., 9000 = 90%)
    /// * `protocol_fee_bps` - Protocol fee (basis points, e.g., 50 = 0.5%)
    pub fn initialize(
        env: Env,
        admin: Address,
        usdc_token: Address,
        treasury: Address,
        default_advance_bps: u32,
        protocol_fee_bps: u32,
    ) -> Result<(), AdelantaError> {
        // Check not already initialized
        if Storage::has_config(&env) {
            return Err(AdelantaError::AlreadyInitialized);
        }

        // Validate advance percentage (0-100%)
        if default_advance_bps > 10000 {
            return Err(AdelantaError::InvalidAdvancePercentage);
        }

        // Validate fee percentage
        if protocol_fee_bps > 1000 {
            // Max 10%
            return Err(AdelantaError::InvalidFeePercentage);
        }

        let config = ContractConfig {
            admin,
            usdc_token,
            treasury,
            default_advance_bps,
            protocol_fee_bps,
            min_invoice_amount: 50_0000000, // 50 USDC (7 decimals)
            max_invoice_amount: 100000_0000000, // 100,000 USDC
        };

        Storage::set_config(&env, &config);
        Storage::set_next_invoice_id(&env, 1);
        Storage::extend_instance_ttl(&env);

        Ok(())
    }

    // ============================================================
    // INVOICE MANAGEMENT
    // ============================================================

    /// Create a new invoice (called by SME)
    /// 
    /// # Arguments
    /// * `sme` - SME address (must be the caller)
    /// * `payer_id` - Corporate payer identifier
    /// * `amount` - Invoice amount in USDC
    /// * `due_date` - Payment due date timestamp
    /// * `country` - Country code (MX, CO, BR, etc.)
    /// * `industry` - Industry/sector code
    /// * `fee_bps` - Fee percentage in basis points
    /// 
    /// # Returns
    /// * Invoice ID
    pub fn create_invoice(
        env: Env,
        sme: Address,
        payer_id: String,
        amount: i128,
        due_date: u64,
        country: String,
        industry: String,
        fee_bps: u32,
    ) -> Result<u64, AdelantaError> {
        // Require SME authorization
        sme.require_auth();

        // Get config
        let config = Storage::get_config(&env).ok_or(AdelantaError::NotInitialized)?;

        // Validate amount
        if amount <= 0 {
            return Err(AdelantaError::InvalidAmount);
        }
        if amount < config.min_invoice_amount || amount > config.max_invoice_amount {
            return Err(AdelantaError::InvalidAmount);
        }

        // Validate fee
        if fee_bps > 1000 {
            // Max 10%
            return Err(AdelantaError::InvalidFeePercentage);
        }

        // Calculate advance amount (default 90%)
        let advance_amount = (amount * config.default_advance_bps as i128) / 10000;

        // Get next invoice ID
        let invoice_id = Storage::get_next_invoice_id(&env);
        Storage::set_next_invoice_id(&env, invoice_id + 1);

        // Create invoice
        let invoice = Invoice {
            id: invoice_id,
            sme: sme.clone(),
            payer_id,
            amount,
            advance_amount,
            fee_bps,
            lender: None,
            status: InvoiceStatus::Created,
            created_at: env.ledger().timestamp(),
            funded_at: None,
            settled_at: None,
            due_date,
            country,
            industry,
        };

        // Store invoice
        Storage::set_invoice(&env, &invoice);
        Storage::increment_total_invoices(&env);
        Storage::extend_invoice_ttl(&env, invoice_id);

        // Update SME reputation (create if not exists)
        Self::update_sme_reputation_on_create(&env, &sme);

        Ok(invoice_id)
    }

    /// Fund an invoice (called by Liquidity Provider)
    /// 
    /// Transfers USDC from lender to SME and locks the invoice.
    /// 
    /// # Arguments
    /// * `lender` - Lender address (must be the caller)
    /// * `invoice_id` - Invoice to fund
    pub fn fund_invoice(env: Env, lender: Address, invoice_id: u64) -> Result<FundingEvent, AdelantaError> {
        // Require lender authorization
        lender.require_auth();

        // Get config and invoice
        let config = Storage::get_config(&env).ok_or(AdelantaError::NotInitialized)?;
        let mut invoice = Storage::get_invoice(&env, invoice_id).ok_or(AdelantaError::InvoiceNotFound)?;

        // Check invoice status
        if invoice.status != InvoiceStatus::Created {
            return Err(AdelantaError::InvoiceAlreadyFunded);
        }

        // Check not expired
        if env.ledger().timestamp() > invoice.due_date {
            return Err(AdelantaError::InvoiceExpired);
        }

        // Transfer USDC from lender to SME (advance amount)
        let usdc_client = token::Client::new(&env, &config.usdc_token);
        usdc_client.transfer(&lender, &invoice.sme, &invoice.advance_amount);

        // Update invoice
        invoice.status = InvoiceStatus::Funded;
        invoice.lender = Some(lender.clone());
        invoice.funded_at = Some(env.ledger().timestamp());

        Storage::set_invoice(&env, &invoice);
        Storage::add_volume_funded(&env, invoice.advance_amount);
        Storage::extend_instance_ttl(&env);

        Ok(FundingEvent {
            invoice_id,
            lender,
            amount: invoice.advance_amount,
            timestamp: env.ledger().timestamp(),
        })
    }

    /// Settle an invoice (called by Anchor or Admin after fiat payment received)
    /// 
    /// This is the core "auto-split" function:
    /// - Receives the full invoice amount
    /// - Pays lender: principal + fee
    /// - Pays SME: remainder
    /// - Pays treasury: protocol fee
    /// 
    /// # Arguments
    /// * `caller` - Must be admin (simulating Anchor callback)
    /// * `invoice_id` - Invoice to settle
    /// * `settlement_amount` - Amount received from corporate payer (in USDC)
    pub fn settle_invoice(
        env: Env,
        caller: Address,
        invoice_id: u64,
        settlement_amount: i128,
    ) -> Result<SettlementResult, AdelantaError> {
        // Only admin can settle (in production, this would be Anchor callback)
        caller.require_auth();
        
        let config = Storage::get_config(&env).ok_or(AdelantaError::NotInitialized)?;
        
        // Verify caller is admin
        if caller != config.admin {
            return Err(AdelantaError::Unauthorized);
        }

        let mut invoice = Storage::get_invoice(&env, invoice_id).ok_or(AdelantaError::InvoiceNotFound)?;

        // Check invoice is funded
        if invoice.status != InvoiceStatus::Funded {
            if invoice.status == InvoiceStatus::Settled {
                return Err(AdelantaError::InvoiceAlreadySettled);
            }
            return Err(AdelantaError::InvoiceNotFunded);
        }

        // Validate settlement amount
        if settlement_amount < invoice.amount {
            return Err(AdelantaError::InsufficientSettlement);
        }

        let lender = invoice.lender.clone().ok_or(AdelantaError::InvoiceNotFunded)?;

        // Calculate distributions
        // Lender gets: advance_amount + fee
        let lender_fee = (invoice.advance_amount * invoice.fee_bps as i128) / 10000;
        let lender_amount = invoice.advance_amount + lender_fee;

        // Protocol fee on the total amount
        let protocol_fee = (invoice.amount * config.protocol_fee_bps as i128) / 10000;

        // SME gets: settlement_amount - lender_amount - protocol_fee
        let sme_amount = settlement_amount - lender_amount - protocol_fee;

        // Transfer from caller (who has received USDC from Anchor)
        let usdc_client = token::Client::new(&env, &config.usdc_token);

        // Pay lender
        usdc_client.transfer(&caller, &lender, &lender_amount);

        // Pay SME remainder
        if sme_amount > 0 {
            usdc_client.transfer(&caller, &invoice.sme, &sme_amount);
        }

        // Pay protocol fee to treasury
        if protocol_fee > 0 {
            usdc_client.transfer(&caller, &config.treasury, &protocol_fee);
        }

        // Update invoice status
        invoice.status = InvoiceStatus::Settled;
        invoice.settled_at = Some(env.ledger().timestamp());
        
        Storage::set_invoice(&env, &invoice);
        Storage::add_volume_settled(&env, settlement_amount);

        // Update SME reputation
        Self::update_sme_reputation_on_settle(&env, &invoice);

        Storage::extend_instance_ttl(&env);

        Ok(SettlementResult {
            invoice_id,
            lender_amount,
            sme_amount,
            protocol_fee,
            timestamp: env.ledger().timestamp(),
        })
    }

    /// Cancel an invoice (only if not funded yet)
    pub fn cancel_invoice(env: Env, caller: Address, invoice_id: u64) -> Result<(), AdelantaError> {
        caller.require_auth();

        let mut invoice = Storage::get_invoice(&env, invoice_id).ok_or(AdelantaError::InvoiceNotFound)?;

        // Only SME or admin can cancel
        let config = Storage::get_config(&env).ok_or(AdelantaError::NotInitialized)?;
        if caller != invoice.sme && caller != config.admin {
            return Err(AdelantaError::Unauthorized);
        }

        // Can only cancel if not funded
        if invoice.status != InvoiceStatus::Created {
            return Err(AdelantaError::InvoiceAlreadyFunded);
        }

        invoice.status = InvoiceStatus::Cancelled;
        Storage::set_invoice(&env, &invoice);

        Ok(())
    }

    // ============================================================
    // VIEW FUNCTIONS
    // ============================================================

    /// Get invoice details
    pub fn get_invoice(env: Env, invoice_id: u64) -> Result<Invoice, AdelantaError> {
        Storage::get_invoice(&env, invoice_id).ok_or(AdelantaError::InvoiceNotFound)
    }

    /// Get SME reputation
    pub fn get_sme_reputation(env: Env, sme: Address) -> Option<SmeReputation> {
        Storage::get_sme_reputation(&env, &sme)
    }

    /// Get contract configuration
    pub fn get_config(env: Env) -> Result<ContractConfig, AdelantaError> {
        Storage::get_config(&env).ok_or(AdelantaError::NotInitialized)
    }

    /// Get contract stats
    pub fn get_stats(env: Env) -> (u32, i128, i128) {
        (
            Storage::get_total_invoices(&env),
            Storage::get_total_volume_funded(&env),
            Storage::get_total_volume_settled(&env),
        )
    }

    /// Calculate expected settlement distribution
    pub fn preview_settlement(
        env: Env,
        invoice_id: u64,
        settlement_amount: i128,
    ) -> Result<(i128, i128, i128), AdelantaError> {
        let config = Storage::get_config(&env).ok_or(AdelantaError::NotInitialized)?;
        let invoice = Storage::get_invoice(&env, invoice_id).ok_or(AdelantaError::InvoiceNotFound)?;

        let lender_fee = (invoice.advance_amount * invoice.fee_bps as i128) / 10000;
        let lender_amount = invoice.advance_amount + lender_fee;
        let protocol_fee = (invoice.amount * config.protocol_fee_bps as i128) / 10000;
        let sme_amount = settlement_amount - lender_amount - protocol_fee;

        Ok((lender_amount, sme_amount, protocol_fee))
    }

    // ============================================================
    // ADMIN FUNCTIONS
    // ============================================================

    /// Update contract configuration (admin only)
    pub fn update_config(
        env: Env,
        admin: Address,
        new_treasury: Option<Address>,
        new_advance_bps: Option<u32>,
        new_protocol_fee_bps: Option<u32>,
    ) -> Result<(), AdelantaError> {
        admin.require_auth();

        let mut config = Storage::get_config(&env).ok_or(AdelantaError::NotInitialized)?;

        if admin != config.admin {
            return Err(AdelantaError::Unauthorized);
        }

        if let Some(treasury) = new_treasury {
            config.treasury = treasury;
        }

        if let Some(advance_bps) = new_advance_bps {
            if advance_bps > 10000 {
                return Err(AdelantaError::InvalidAdvancePercentage);
            }
            config.default_advance_bps = advance_bps;
        }

        if let Some(fee_bps) = new_protocol_fee_bps {
            if fee_bps > 1000 {
                return Err(AdelantaError::InvalidFeePercentage);
            }
            config.protocol_fee_bps = fee_bps;
        }

        Storage::set_config(&env, &config);
        Storage::extend_instance_ttl(&env);

        Ok(())
    }

    // ============================================================
    // INTERNAL HELPERS
    // ============================================================

    fn update_sme_reputation_on_create(env: &Env, sme: &Address) {
        let mut reputation = Storage::get_sme_reputation(env, sme).unwrap_or(SmeReputation {
            sme: sme.clone(),
            total_invoices: 0,
            settled_invoices: 0,
            total_volume: 0,
            avg_settlement_days: 0,
            on_time_rate_bps: 10000, // Start at 100%
            risk_score: 500,         // Medium risk initially
        });

        reputation.total_invoices += 1;
        Storage::set_sme_reputation(env, &reputation);
    }

    fn update_sme_reputation_on_settle(env: &Env, invoice: &Invoice) {
        if let Some(mut reputation) = Storage::get_sme_reputation(env, &invoice.sme) {
            reputation.settled_invoices += 1;
            reputation.total_volume += invoice.amount;

            // Calculate on-time rate
            let is_on_time = invoice.settled_at.unwrap_or(0) <= invoice.due_date;
            if reputation.settled_invoices > 1 {
                let prev_on_time_count = (reputation.on_time_rate_bps as u64
                    * (reputation.settled_invoices - 1) as u64)
                    / 10000;
                let new_on_time_count = if is_on_time {
                    prev_on_time_count + 1
                } else {
                    prev_on_time_count
                };
                reputation.on_time_rate_bps =
                    ((new_on_time_count * 10000) / reputation.settled_invoices as u64) as u32;
            }

            // Update risk score (lower is better)
            // Based on: on-time rate, volume, number of settled invoices
            let base_score = 1000 - (reputation.on_time_rate_bps / 10);
            let volume_bonus = if reputation.total_volume > 100000_0000000 {
                100
            } else {
                0
            };
            let history_bonus = if reputation.settled_invoices > 10 { 100 } else { 0 };
            reputation.risk_score = base_score.saturating_sub(volume_bonus + history_bonus);

            Storage::set_sme_reputation(env, &reputation);
        }
    }
}

// ============================================================
// TESTS
// ============================================================

#[cfg(test)]
mod test {
    use super::*;
    use soroban_sdk::{
        testutils::{Address as _, Ledger},
        token::{StellarAssetClient, Client as TokenClient},
        Env,
    };

    fn create_usdc_token<'a>(env: &Env, admin: &Address) -> (Address, TokenClient<'a>, StellarAssetClient<'a>) {
        let contract_address = env.register_stellar_asset_contract_v2(admin.clone());
        (
            contract_address.address(),
            TokenClient::new(env, &contract_address.address()),
            StellarAssetClient::new(env, &contract_address.address()),
        )
    }

    #[test]
    fn test_full_invoice_lifecycle() {
        let env = Env::default();
        env.mock_all_auths();

        // Setup accounts
        let admin = Address::generate(&env);
        let treasury = Address::generate(&env);
        let sme = Address::generate(&env);
        let lender = Address::generate(&env);

        // Setup USDC token
        let (usdc_address, usdc_client, usdc_admin) = create_usdc_token(&env, &admin);

        // Mint USDC to lender and admin (for settlement)
        usdc_admin.mint(&lender, &10000_0000000); // 10,000 USDC
        usdc_admin.mint(&admin, &10000_0000000);  // For settlement

        // Deploy and initialize contract
        let contract_id = env.register_contract(None, AdelantaInvoiceContract);
        let client = AdelantaInvoiceContractClient::new(&env, &contract_id);

        client.initialize(
            &admin,
            &usdc_address,
            &treasury,
            &9000, // 90% advance
            &50,   // 0.5% protocol fee
        );

        // Set timestamp
        env.ledger().with_mut(|li| {
            li.timestamp = 1000;
        });

        // 1. SME creates invoice
        let invoice_id = client.create_invoice(
            &sme,
            &String::from_str(&env, "CORP-001"),
            &1000_0000000, // 1000 USDC
            &2000,         // Due date
            &String::from_str(&env, "MX"),
            &String::from_str(&env, "DESIGN"),
            &200, // 2% fee
        );

        assert_eq!(invoice_id, 1);

        // Check invoice created
        let invoice = client.get_invoice(&invoice_id);
        assert_eq!(invoice.status, InvoiceStatus::Created);
        assert_eq!(invoice.amount, 1000_0000000);
        assert_eq!(invoice.advance_amount, 900_0000000); // 90%

        // 2. Lender funds invoice
        let funding_event = client.fund_invoice(&lender, &invoice_id);
        assert_eq!(funding_event.amount, 900_0000000);

        // Check SME received advance
        assert_eq!(usdc_client.balance(&sme), 900_0000000);

        // Check invoice is funded
        let invoice = client.get_invoice(&invoice_id);
        assert_eq!(invoice.status, InvoiceStatus::Funded);

        // 3. Settle invoice (simulating Anchor payment)
        let result = client.settle_invoice(
            &admin,
            &invoice_id,
            &1000_0000000, // Full invoice amount received
        );

        // Verify distribution
        // Lender: 900 (principal) + 18 (2% fee) = 918 USDC
        assert_eq!(result.lender_amount, 918_0000000);
        // Protocol fee: 1000 * 0.5% = 5 USDC
        assert_eq!(result.protocol_fee, 5_0000000);
        // SME: 1000 - 918 - 5 = 77 USDC (remainder)
        assert_eq!(result.sme_amount, 77_0000000);

        // Check final balances
        // SME: 900 (advance) + 77 (remainder) = 977 USDC
        assert_eq!(usdc_client.balance(&sme), 977_0000000);
        // Lender: 10000 - 900 (funded) + 918 (received) = 10018 USDC
        assert_eq!(usdc_client.balance(&lender), 10018_0000000);
        // Treasury: 5 USDC
        assert_eq!(usdc_client.balance(&treasury), 5_0000000);

        // Check invoice is settled
        let invoice = client.get_invoice(&invoice_id);
        assert_eq!(invoice.status, InvoiceStatus::Settled);

        // Check SME reputation updated
        let reputation = client.get_sme_reputation(&sme).unwrap();
        assert_eq!(reputation.total_invoices, 1);
        assert_eq!(reputation.settled_invoices, 1);
        assert_eq!(reputation.total_volume, 1000_0000000);
    }

    #[test]
    fn test_preview_settlement() {
        let env = Env::default();
        env.mock_all_auths();

        let admin = Address::generate(&env);
        let treasury = Address::generate(&env);
        let sme = Address::generate(&env);

        let (usdc_address, _, _) = create_usdc_token(&env, &admin);

        let contract_id = env.register_contract(None, AdelantaInvoiceContract);
        let client = AdelantaInvoiceContractClient::new(&env, &contract_id);

        client.initialize(&admin, &usdc_address, &treasury, &9000, &50);

        env.ledger().with_mut(|li| {
            li.timestamp = 1000;
        });

        let invoice_id = client.create_invoice(
            &sme,
            &String::from_str(&env, "CORP-001"),
            &1000_0000000,
            &2000,
            &String::from_str(&env, "MX"),
            &String::from_str(&env, "DESIGN"),
            &200,
        );

        let (lender_amount, sme_amount, protocol_fee) =
            client.preview_settlement(&invoice_id, &1000_0000000);

        assert_eq!(lender_amount, 918_0000000);
        assert_eq!(protocol_fee, 5_0000000);
        assert_eq!(sme_amount, 77_0000000);
    }
}
