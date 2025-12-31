//! # Adelanta Invoice Contract
//! 
//! A Soroban smart contract for programmable factoring on Stellar.
//! 
//! ## Overview
//! This contract enables SMEs to tokenize invoices and receive instant liquidity
//! from liquidity providers. When the corporate client pays, the contract
//! automatically splits the payment between the lender and the SME.
//! 
//! ## Key Features
//! - Invoice tokenization as Stellar assets
//! - Instant liquidity funding (90% advance)
//! - Programmable settlement with auto-split
//! - Reputation tracking for SMEs
//! 
//! ## Flow
//! 1. SME creates an invoice → minted as unique asset
//! 2. Liquidity provider funds 90% in USDC
//! 3. Corporate client pays via Anchor (fiat → USDC)
//! 4. Contract auto-splits: Lender gets principal + fee, SME gets remainder

#![no_std]

mod contract;
mod storage;
mod types;
mod errors;

pub use contract::AdelantaInvoiceContract;
