//! Storage keys and helpers for the Adelanta Invoice Contract

use soroban_sdk::{contracttype, Address, Env};

use crate::types::{ContractConfig, Invoice, SmeReputation};

/// Storage key types
#[contracttype]
pub enum DataKey {
    /// Contract configuration
    Config,
    /// Invoice by ID
    Invoice(u64),
    /// Next invoice ID counter
    NextInvoiceId,
    /// SME reputation data
    SmeReputation(Address),
    /// Total invoices count
    TotalInvoices,
    /// Total volume funded
    TotalVolumeFunded,
    /// Total volume settled
    TotalVolumeSettled,
}

/// Storage helper functions
pub struct Storage;

impl Storage {
    // ========== CONFIG ==========
    
    pub fn get_config(env: &Env) -> Option<ContractConfig> {
        env.storage().instance().get(&DataKey::Config)
    }

    pub fn set_config(env: &Env, config: &ContractConfig) {
        env.storage().instance().set(&DataKey::Config, config);
    }

    pub fn has_config(env: &Env) -> bool {
        env.storage().instance().has(&DataKey::Config)
    }

    // ========== INVOICES ==========

    pub fn get_invoice(env: &Env, id: u64) -> Option<Invoice> {
        env.storage().persistent().get(&DataKey::Invoice(id))
    }

    pub fn set_invoice(env: &Env, invoice: &Invoice) {
        env.storage().persistent().set(&DataKey::Invoice(invoice.id), invoice);
    }

    pub fn has_invoice(env: &Env, id: u64) -> bool {
        env.storage().persistent().has(&DataKey::Invoice(id))
    }

    pub fn get_next_invoice_id(env: &Env) -> u64 {
        env.storage()
            .instance()
            .get(&DataKey::NextInvoiceId)
            .unwrap_or(1u64)
    }

    pub fn set_next_invoice_id(env: &Env, id: u64) {
        env.storage().instance().set(&DataKey::NextInvoiceId, &id);
    }

    // ========== SME REPUTATION ==========

    pub fn get_sme_reputation(env: &Env, sme: &Address) -> Option<SmeReputation> {
        env.storage().persistent().get(&DataKey::SmeReputation(sme.clone()))
    }

    pub fn set_sme_reputation(env: &Env, reputation: &SmeReputation) {
        env.storage()
            .persistent()
            .set(&DataKey::SmeReputation(reputation.sme.clone()), reputation);
    }

    // ========== STATS ==========

    pub fn get_total_invoices(env: &Env) -> u32 {
        env.storage()
            .instance()
            .get(&DataKey::TotalInvoices)
            .unwrap_or(0u32)
    }

    pub fn increment_total_invoices(env: &Env) {
        let current = Self::get_total_invoices(env);
        env.storage().instance().set(&DataKey::TotalInvoices, &(current + 1));
    }

    pub fn get_total_volume_funded(env: &Env) -> i128 {
        env.storage()
            .instance()
            .get(&DataKey::TotalVolumeFunded)
            .unwrap_or(0i128)
    }

    pub fn add_volume_funded(env: &Env, amount: i128) {
        let current = Self::get_total_volume_funded(env);
        env.storage().instance().set(&DataKey::TotalVolumeFunded, &(current + amount));
    }

    pub fn get_total_volume_settled(env: &Env) -> i128 {
        env.storage()
            .instance()
            .get(&DataKey::TotalVolumeSettled)
            .unwrap_or(0i128)
    }

    pub fn add_volume_settled(env: &Env, amount: i128) {
        let current = Self::get_total_volume_settled(env);
        env.storage().instance().set(&DataKey::TotalVolumeSettled, &(current + amount));
    }

    // ========== TTL MANAGEMENT ==========

    pub fn extend_instance_ttl(env: &Env) {
        let max_ttl = env.storage().max_ttl();
        env.storage()
            .instance()
            .extend_ttl(max_ttl - 1000, max_ttl);
    }

    pub fn extend_invoice_ttl(env: &Env, id: u64) {
        let max_ttl = env.storage().max_ttl();
        env.storage()
            .persistent()
            .extend_ttl(&DataKey::Invoice(id), max_ttl - 1000, max_ttl);
    }
}
