//! Data types for the Adelanta Invoice Contract

use soroban_sdk::{contracttype, Address, String};

/// Status of an invoice in its lifecycle
#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum InvoiceStatus {
    /// Invoice created, waiting for funding
    Created,
    /// Invoice funded by liquidity provider
    Funded,
    /// Invoice fully settled, payment distributed
    Settled,
    /// Invoice cancelled/expired
    Cancelled,
}

/// Core invoice data structure
#[contracttype]
#[derive(Clone, Debug)]
pub struct Invoice {
    /// Unique invoice identifier
    pub id: u64,
    /// SME (invoice owner) address
    pub sme: Address,
    /// Corporate payer identifier (hashed reference)
    pub payer_id: String,
    /// Total invoice amount in USDC (7 decimals)
    pub amount: i128,
    /// Amount advanced to SME (typically 90%)
    pub advance_amount: i128,
    /// Fee percentage charged (basis points, e.g., 200 = 2%)
    pub fee_bps: u32,
    /// Liquidity provider who funded this invoice
    pub lender: Option<Address>,
    /// Current status
    pub status: InvoiceStatus,
    /// Creation timestamp
    pub created_at: u64,
    /// Funding timestamp
    pub funded_at: Option<u64>,
    /// Settlement timestamp
    pub settled_at: Option<u64>,
    /// Due date timestamp
    pub due_date: u64,
    /// Country code (e.g., "MX", "CO", "BR")
    pub country: String,
    /// Industry/sector code
    pub industry: String,
}

/// SME reputation data
#[contracttype]
#[derive(Clone, Debug)]
pub struct SmeReputation {
    /// SME address
    pub sme: Address,
    /// Total invoices created
    pub total_invoices: u32,
    /// Successfully settled invoices
    pub settled_invoices: u32,
    /// Total volume processed (USDC)
    pub total_volume: i128,
    /// Average days to settlement
    pub avg_settlement_days: u32,
    /// On-time payment rate (basis points, 10000 = 100%)
    pub on_time_rate_bps: u32,
    /// Current risk score (0-1000, lower is better)
    pub risk_score: u32,
}

/// Contract configuration
#[contracttype]
#[derive(Clone, Debug)]
pub struct ContractConfig {
    /// Admin address
    pub admin: Address,
    /// USDC token contract address
    pub usdc_token: Address,
    /// Treasury address for protocol fees
    pub treasury: Address,
    /// Default advance percentage (basis points, 9000 = 90%)
    pub default_advance_bps: u32,
    /// Protocol fee (basis points, 50 = 0.5%)
    pub protocol_fee_bps: u32,
    /// Minimum invoice amount
    pub min_invoice_amount: i128,
    /// Maximum invoice amount
    pub max_invoice_amount: i128,
}

/// Settlement result data
#[contracttype]
#[derive(Clone, Debug)]
pub struct SettlementResult {
    /// Invoice ID
    pub invoice_id: u64,
    /// Amount paid to lender (principal + fee)
    pub lender_amount: i128,
    /// Amount paid to SME (remainder)
    pub sme_amount: i128,
    /// Protocol fee collected
    pub protocol_fee: i128,
    /// Settlement timestamp
    pub timestamp: u64,
}

/// Funding event data
#[contracttype]
#[derive(Clone, Debug)]
pub struct FundingEvent {
    /// Invoice ID
    pub invoice_id: u64,
    /// Lender address
    pub lender: Address,
    /// Amount funded
    pub amount: i128,
    /// Timestamp
    pub timestamp: u64,
}
