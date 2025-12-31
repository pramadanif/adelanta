# Adelanta Invoice Smart Contract

> Programmable Factoring Protocol for LATAM - Built on Stellar Soroban

## Overview

This Soroban smart contract powers the Adelanta protocol, enabling SMEs to tokenize invoices and receive instant liquidity from liquidity providers. The contract automatically splits payments when corporate clients pay, eliminating trust issues in traditional factoring.

## Key Features

### 🏦 Invoice Tokenization
- SMEs create invoices as unique on-chain assets
- Each invoice contains metadata: amount, due date, payer ID, country, industry

### 💰 Instant Liquidity
- Liquidity providers fund invoices with USDC
- Default 90% advance on invoice value
- Instant transfer to SME upon funding

### ⚡ Programmable Settlement (Auto-Split)
- When corporate client pays (via Anchor fiat-to-USDC conversion)
- Contract automatically distributes:
  - **Lender**: Principal + Fee
  - **SME**: Remainder
  - **Treasury**: Protocol fee

### 📊 Reputation System
- On-chain credit history for SMEs
- Tracks: total invoices, settlements, volume, on-time rate
- Risk score calculation for better rates

## Contract Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                         ADELANTA FLOW                                │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  1. CREATE INVOICE                                                   │
│     SME → create_invoice() → Invoice Token minted                   │
│                                                                      │
│  2. FUND INVOICE                                                     │
│     Lender → fund_invoice() → USDC transferred to SME (90%)         │
│                                                                      │
│  3. CORPORATE PAYMENT                                                │
│     Corp Client → Bank Transfer → Anchor → USDC on-chain            │
│                                                                      │
│  4. SETTLEMENT (Auto-Split)                                          │
│     Admin/Anchor → settle_invoice() →                               │
│       ├── Lender: principal + fee (e.g., 918 USDC)                  │
│       ├── SME: remainder (e.g., 77 USDC)                            │
│       └── Treasury: protocol fee (e.g., 5 USDC)                     │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

## Building

### Prerequisites

- Rust 1.74+
- Soroban CLI (`cargo install soroban-cli`)
- Stellar testnet account

### Build

```bash
cd contracts
cargo build --target wasm32-unknown-unknown --release
```

### Optimize WASM

```bash
soroban contract optimize --wasm target/wasm32-unknown-unknown/release/adelanta_invoice.wasm
```

### Run Tests

```bash
cargo test
```

## Deployment

### 1. Deploy to Testnet

```bash
soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/adelanta_invoice.wasm \
  --source <YOUR_SECRET_KEY> \
  --rpc-url https://soroban-testnet.stellar.org \
  --network-passphrase "Test SDF Network ; September 2015"
```

### 2. Initialize Contract

```bash
soroban contract invoke \
  --id <CONTRACT_ID> \
  --source <ADMIN_SECRET> \
  --rpc-url https://soroban-testnet.stellar.org \
  --network-passphrase "Test SDF Network ; September 2015" \
  -- \
  initialize \
  --admin <ADMIN_ADDRESS> \
  --usdc_token <USDC_CONTRACT_ID> \
  --treasury <TREASURY_ADDRESS> \
  --default_advance_bps 9000 \
  --protocol_fee_bps 50
```

## Contract Functions

### Admin Functions

| Function | Description |
|----------|-------------|
| `initialize` | Set up contract with USDC token, treasury, fees |
| `update_config` | Modify treasury, advance %, protocol fee |

### SME Functions

| Function | Description |
|----------|-------------|
| `create_invoice` | Create new invoice for funding |
| `cancel_invoice` | Cancel unfunded invoice |

### Lender Functions

| Function | Description |
|----------|-------------|
| `fund_invoice` | Fund invoice with USDC |

### Settlement Functions

| Function | Description |
|----------|-------------|
| `settle_invoice` | Trigger auto-split after fiat payment |

### View Functions

| Function | Description |
|----------|-------------|
| `get_invoice` | Get invoice details |
| `get_sme_reputation` | Get SME credit score |
| `get_config` | Get contract configuration |
| `get_stats` | Get protocol statistics |
| `preview_settlement` | Calculate expected distribution |

## Example: Settlement Calculation

For a **$1,000 invoice** with:
- 90% advance = $900
- 2% lender fee = $18
- 0.5% protocol fee = $5

**Distribution:**
| Recipient | Amount | Calculation |
|-----------|--------|-------------|
| Lender | $918 | $900 (principal) + $18 (fee) |
| Protocol | $5 | $1000 × 0.5% |
| SME | $77 | $1000 - $918 - $5 |

**Total SME receives:** $900 (advance) + $77 (remainder) = **$977**

## Security Considerations

1. **Authorization**: All functions require proper caller authentication
2. **Status Checks**: Invoices can only be funded once, settled once
3. **Amount Validation**: Min/max invoice limits enforced
4. **Fee Limits**: Maximum fee percentages capped
5. **TTL Management**: Storage TTL extended to prevent data loss

## Integration with Anchors

The contract is designed to work with Stellar Anchors:

1. Corporate client pays to Anchor bank account (CLABE/CBU)
2. Anchor converts fiat to USDC
3. Anchor (or Admin) calls `settle_invoice` with received USDC
4. Contract executes auto-split

## License

MIT License - Built for Stellar Ideatón 2025
