//! Custom error types for the Adelanta Invoice Contract

use soroban_sdk::contracterror;

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum AdelantaError {
    /// Contract has not been initialized
    NotInitialized = 1,
    /// Contract is already initialized
    AlreadyInitialized = 2,
    /// Invoice not found
    InvoiceNotFound = 3,
    /// Invoice already exists
    InvoiceAlreadyExists = 4,
    /// Invoice already funded
    InvoiceAlreadyFunded = 5,
    /// Invoice already settled
    InvoiceAlreadySettled = 6,
    /// Invoice not funded yet
    InvoiceNotFunded = 7,
    /// Unauthorized caller
    Unauthorized = 8,
    /// Invalid amount (zero or negative)
    InvalidAmount = 9,
    /// Invalid fee percentage (must be 0-100)
    InvalidFeePercentage = 10,
    /// Invalid advance percentage (must be 0-100)
    InvalidAdvancePercentage = 11,
    /// Insufficient settlement amount
    InsufficientSettlement = 12,
    /// Transfer failed
    TransferFailed = 13,
    /// Invoice is expired
    InvoiceExpired = 14,
    /// Invalid corporate payer
    InvalidPayer = 15,
}
