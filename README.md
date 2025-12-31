<p align="center">
  <img src="public/logo.png" alt="Adelanta Logo" width="200" height="200" />
</p>

<h1 align="center">🚀 Adelanta</h1>
<h3 align="center">Programmable Factoring Protocol for LATAM</h3>

<p align="center">
  <strong>The first programmable factoring protocol for LATAM that uses Soroban smart contracts to intercept and automatically split invoice payments—giving SMEs instant liquidity without requiring their corporate clients to touch crypto.</strong>
</p>

<p align="center">
  <a href="https://stellar.expert/explorer/testnet/contract/CATMUHWQCGIWXC7A4TMQTYFY3V7HSS44TEMNLYHMDBMQ3V3SFXYFI4L5">
    <img src="https://img.shields.io/badge/Contract-Stellar%20Testnet-blue?style=for-the-badge&logo=stellar" alt="Stellar Testnet" />
  </a>
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
  <img src="https://img.shields.io/badge/Soroban-v21.7.7-purple?style=for-the-badge" alt="Soroban" />
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js" />
</p>

<p align="center">
  <a href="#-live-demo">Live Demo</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-smart-contract">Smart Contract</a> •
  <a href="#-api-docs">API Docs</a> •
  <a href="#-architecture">Architecture</a>
</p>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [The $900B Problem](#-the-900b-problem)
- [Our Solution: Self-Settling Invoices](#-our-solution-self-settling-invoices)
- [Why Stellar?](#-why-stellar)
- [Live Demo](#-live-demo)
- [Quick Start](#-quick-start)
- [Smart Contract](#-smart-contract)
- [API Documentation](#-api-documentation)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Demo Flow](#-demo-flow)
- [Settlement Calculation](#-settlement-calculation)
- [Roadmap](#-roadmap)
- [Impact Metrics](#-impact-metrics)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

<p align="center">
  <img src="public/logo.jpg" alt="Adelanta" width="100" />
</p>

**Adelanta** bridges the trust gap in invoice factoring using Stellar Smart Contracts (Soroban) to create "Self-Settling Invoices." SMEs can tokenize their invoices, receive instant liquidity from liquidity providers, and when the corporate client pays, the smart contract automatically splits the payment—eliminating the need for trust.

### 💡 One-Liner (WOW Line)

> *"Adelanta is the first programmable factoring protocol for LATAM that uses Soroban smart contracts to intercept and automatically split invoice payments—giving SMEs instant liquidity without requiring their corporate clients to touch crypto."*

---

## 😰 The $900B Problem

In Latin America, **small and medium enterprises (SMEs)** face a crushing financing gap of **$900 billion**. The root cause? **Cash flow starvation.**

### Pain Points

| Problem | Impact |
|---------|--------|
| 📅 **60-90 Day Payment Terms** | SMEs wait months to get paid by corporate clients |
| 📝 **Legacy Factoring Fails** | Requires paperwork corporates refuse to sign |
| 🤝 **Trust Gap** | Lenders don't trust SMEs to repay after receiving payment |
| 💸 **High Costs** | Traditional factoring charges 5-15% fees |
| 🏦 **Financial Exclusion** | Banks reject small businesses as "too risky" |

### The Story of María

> *"Meet María. She runs a design agency in Bogotá. She just finished a $10,000 project for a major corporation, but she won't get paid until March—90 days away. She needs to pay her team TODAY. Banks reject her because she's too small. Traditional factoring requires her client to sign complex paperwork—which they refuse to do. María is stuck."*

**This is the #1 problem killing SMEs across LATAM.**

---

## 💡 Our Solution: Self-Settling Invoices

Adelanta creates **"Self-Settling Invoices"** using Stellar Soroban smart contracts. **Trust is replaced by code.**

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         ADELANTA FLOW                                    │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  1️⃣  TOKENIZE                                                            │
│      SME uploads invoice → Adelanta mints it as a Stellar Asset         │
│                                                                          │
│  2️⃣  INSTANT LIQUIDITY                                                   │
│      Liquidity Provider funds 90% in USDC → SME receives instantly      │
│                                                                          │
│  3️⃣  INVISIBLE PAYMENT                                                   │
│      Corporate pays to bank account (CuentaRUT/CLABE/CBU/PIX)           │
│      → Stellar Anchor converts fiat to USDC                             │
│                                                                          │
│  4️⃣  AUTO-SPLIT (The Magic!)                                             │
│      Soroban contract automatically distributes:                         │
│      ├── Lender: Principal + 2% Fee = $7,344                            │
│      ├── SME: Remainder = $616                                          │
│      └── Protocol: 0.5% fee = $40                                       │
│                                                                          │
│  Total SME receives: $7,200 (advance) + $616 = $7,816                   │
│  Effective cost: 2.3% vs 5-15% traditional factoring                    │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### Key Innovation: Zero Trust Required

The lender takes **zero risk on the SME's honesty**—only on the corporate payer's solvency. The smart contract **enforces** repayment automatically. The money never touches the SME's wallet until the split is executed.

---

## ⭐ Why Stellar?

Stellar is **not just compatible** with this idea—it's the **ONLY blockchain** where this can work seamlessly in LATAM today.

| Feature | Why It Matters | Other Chains |
|---------|----------------|--------------|
| 🏦 **Anchor Network** | Live regulated Anchors (MoneyGram, Bitso, Anclap) accept local fiat (MXN, COP, BRL) and issue USDC | ❌ No equivalent |
| 📜 **Soroban Smart Contracts** | Programmable escrow with auto-split logic | ✅ Available but no fiat rails |
| 💰 **Low-Cost Asset Issuance** | Minting invoice tokens costs < $0.01 | ❌ $5-50 per token on ETH |
| ⚡ **5-Second Finality** | Essential for "Instant Cash" UX | ❌ Minutes to hours |
| 💵 **USDC Native Support** | Direct stablecoin integration | ✅ Available |

### The "Invisible Crypto" Advantage

**Corporate clients never touch crypto.** They pay via standard bank transfer (CuentaRUT in Chile, CLABE in Mexico, CBU in Argentina, PIX in Brazil). The Anchor handles fiat→USDC conversion automatically.

---

## 🎬 Live Demo

### Demo URLs (Local Development)

| Dashboard | URL | Description |
|-----------|-----|-------------|
| 🏠 **Landing Page** | http://localhost:3000 | Marketing & features |
| 👩‍💼 **SME Dashboard** | http://localhost:3000/sme | Create & manage invoices |
| 💰 **Investor Dashboard** | http://localhost:3000/investor | Browse & fund invoices |
| 🆕 **Create Invoice** | http://localhost:3000/sme/invoices/new | New invoice form |
| 🔌 **API Health** | http://localhost:3001/api/health | Backend status |

### Blockchain Explorer

| Resource | Link |
|----------|------|
| 📜 **Smart Contract** | [View on Stellar Expert](https://stellar.expert/explorer/testnet/contract/CATMUHWQCGIWXC7A4TMQTYFY3V7HSS44TEMNLYHMDBMQ3V3SFXYFI4L5) |
| 🔬 **Stellar Lab** | [View in Lab](https://lab.stellar.org/r/testnet/contract/CATMUHWQCGIWXC7A4TMQTYFY3V7HSS44TEMNLYHMDBMQ3V3SFXYFI4L5) |

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (recommend 20+)
- Rust 1.74+ with `wasm32-unknown-unknown` target
- Stellar CLI (`stellar-cli` v21+)
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/adelanta.git
cd adelanta

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend && npm install && cd ..

# Install Rust target and build contract
cd contracts
rustup target add wasm32-unknown-unknown
cargo build --target wasm32-unknown-unknown --release
cd ..
```

### Environment Setup

**Frontend** - Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_STELLAR_CONTRACT_ID=CATMUHWQCGIWXC7A4TMQTYFY3V7HSS44TEMNLYHMDBMQ3V3SFXYFI4L5
NEXT_PUBLIC_STELLAR_NETWORK=testnet
NEXT_PUBLIC_STELLAR_EXPLORER=https://stellar.expert/explorer/testnet
```

**Backend** - Create `backend/.env`:
```env
PORT=3001
STELLAR_CONTRACT_ID=CATMUHWQCGIWXC7A4TMQTYFY3V7HSS44TEMNLYHMDBMQ3V3SFXYFI4L5
STELLAR_NETWORK=testnet
STELLAR_RPC_URL=https://soroban-testnet.stellar.org
STELLAR_HORIZON_URL=https://horizon-testnet.stellar.org
DEMO_MODE=true
```

### Running the Application

```bash
# Terminal 1: Start Backend
cd backend && npm run dev
# → http://localhost:3001

# Terminal 2: Start Frontend
npm run dev
# → http://localhost:3000
```

---

## 📜 Smart Contract

### Deployment Details

| Property | Value |
|----------|-------|
| **Contract ID** | `CATMUHWQCGIWXC7A4TMQTYFY3V7HSS44TEMNLYHMDBMQ3V3SFXYFI4L5` |
| **Network** | Stellar Testnet |
| **Language** | Rust + Soroban SDK v21.7.7 |
| **Admin** | `GDBS2DGJJOLBWFAWO6SBEXEHSI63HWMGJS6MNVFEQNMXTYQ4XB4BDOEF` |
| **USDC Token** | `CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC` |
| **Default Advance** | 90% (9000 bps) |
| **Protocol Fee** | 0.5% (50 bps) |
| **Deploy Date** | December 31, 2025 |

### Contract Functions

```rust
// Initialize contract
fn initialize(admin, usdc_token, treasury, default_advance_bps, protocol_fee_bps)

// SME creates invoice
fn create_invoice(sme, payer_id, amount, due_date, country, industry, fee_bps) -> invoice_id

// Lender funds invoice (transfers USDC to SME)
fn fund_invoice(lender, invoice_id) -> FundingEvent

// Auto-split settlement
fn settle_invoice(caller, invoice_id, settlement_amount) -> SettlementResult

// View functions
fn get_invoice(invoice_id) -> Invoice
fn get_sme_reputation(sme) -> SmeReputation
fn preview_settlement(invoice_id, amount) -> (lender_amt, sme_amt, protocol_fee)
```

### Contract Types

```rust
#[contracttype]
pub struct Invoice {
    pub id: u64,
    pub sme: Address,
    pub lender: Option<Address>,
    pub payer_id: String,
    pub amount: i128,
    pub advance_amount: i128,
    pub fee_bps: u32,
    pub status: InvoiceStatus,
    pub created_at: u64,
    pub funded_at: Option<u64>,
    pub settled_at: Option<u64>,
    pub due_date: u64,
    pub country: Symbol,
    pub industry: Symbol,
}

#[contracttype]
pub enum InvoiceStatus {
    Created,
    Funded,
    Settled,
    Cancelled,
    Defaulted,
}

#[contracttype]
pub struct SettlementResult {
    pub invoice_id: u64,
    pub lender_amount: i128,
    pub sme_amount: i128,
    pub protocol_fee: i128,
    pub settlement_timestamp: u64,
}
```

### Deployment Commands

```bash
# 1. Generate and fund account
stellar keys generate adelanta --network testnet
stellar keys fund adelanta

# 2. Build contract
cd contracts
cargo build --target wasm32-unknown-unknown --release

# 3. Deploy to testnet
stellar contract deploy \
  --wasm target/wasm32-unknown-unknown/release/adelanta_invoice.wasm \
  --source adelanta \
  --network testnet

# 4. Initialize contract
stellar contract invoke \
  --id CATMUHWQCGIWXC7A4TMQTYFY3V7HSS44TEMNLYHMDBMQ3V3SFXYFI4L5 \
  --source adelanta \
  --network testnet \
  -- \
  initialize \
  --admin GDBS2DGJJOLBWFAWO6SBEXEHSI63HWMGJS6MNVFEQNMXTYQ4XB4BDOEF \
  --usdc_token CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC \
  --treasury GDBS2DGJJOLBWFAWO6SBEXEHSI63HWMGJS6MNVFEQNMXTYQ4XB4BDOEF \
  --default_advance_bps 9000 \
  --protocol_fee_bps 50
```

### Testing

```bash
cd contracts
cargo test

# Output:
# running 2 tests
# test contract::test::test_preview_settlement ... ok
# test contract::test::test_full_invoice_lifecycle ... ok
# test result: ok. 2 passed; 0 failed
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:3001/api
```

### Endpoints

#### Health Check
```http
GET /api/health

Response 200:
{
  "status": "ok",
  "timestamp": "2025-12-31T13:40:10.951Z"
}
```

#### List Invoices
```http
GET /api/invoices
GET /api/invoices?status=created
GET /api/invoices?status=funded
GET /api/invoices?smeId=sme-maria

Response 200:
{
  "invoices": [...],
  "total": 5
}
```

#### Get Invoice by ID
```http
GET /api/invoices/:id

Response 200:
{
  "id": "INV-001",
  "smeId": "sme-maria",
  "smeName": "María García",
  "smeCompany": "María Design Studio",
  "payerName": "Corporación XYZ",
  "amount": 5000,
  "advanceRate": 0.9,
  "advanceAmount": 4500,
  "status": "funded",
  ...
}
```

#### Create Invoice
```http
POST /api/invoices
Content-Type: application/json

{
  "smeId": "sme-maria",
  "smeName": "María García",
  "smeCompany": "María Design Studio",
  "payerName": "Corporación ABC",
  "amount": 8000,
  "dueDate": "2026-03-31",
  "country": "MX",
  "industry": "DESIGN",
  "feeRate": 0.02,
  "bankAccount": "CLABE: 134603958594056160"
}
```

#### Fund Invoice
```http
POST /api/invoices/:id/fund
Content-Type: application/json

{
  "lenderId": "lender-carlos"
}
```

#### Settle Invoice
```http
POST /api/invoices/:id/settle
Content-Type: application/json

{
  "amountReceived": 8000
}
```

---

## 🏗 Architecture

```
┌──────────────────────────────────────────────────────────────────────────┐
│                              ADELANTA ARCHITECTURE                        │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  ┌─────────────────┐                              ┌───────────────────┐  │
│  │   SME (María)   │                              │  Liquidity Provider│  │
│  │   Dashboard     │                              │   (Investor)       │  │
│  └────────┬────────┘                              └─────────┬─────────┘  │
│           │                                                 │            │
│           │  Upload Invoice                    Browse & Fund │            │
│           ▼                                                 ▼            │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │                        ADELANTA PLATFORM                           │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────┐ │  │
│  │  │   Next.js    │  │   Express    │  │   Soroban Contract       │ │  │
│  │  │   Frontend   │──│   Backend    │──│   (Auto-Split Logic)     │ │  │
│  │  └──────────────┘  └──────────────┘  └──────────────────────────┘ │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                    │                                      │
│                                    │ Settlement                           │
│                                    ▼                                      │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │                        STELLAR NETWORK                             │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────┐ │  │
│  │  │   Testnet    │  │   Soroban    │  │   USDC Token             │ │  │
│  │  │   (→Mainnet) │  │   RPC        │  │   (Circle)               │ │  │
│  │  └──────────────┘  └──────────────┘  └──────────────────────────┘ │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                    │                                      │
│                                    │ Fiat Conversion                      │
│                                    ▼                                      │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │                        STELLAR ANCHORS                             │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────┐ │  │
│  │  │   Bitso      │  │   Anclap     │  │   MoneyGram              │ │  │
│  │  │   (Mexico)   │  │   (Argentina)│  │   (Multi-country)        │ │  │
│  │  └──────────────┘  └──────────────┘  └──────────────────────────┘ │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                                                           │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## 🛠 Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16 | React framework (App Router + Turbopack) |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 4 | Styling |
| Lucide React | Latest | Icons |
| Custom i18n | - | Spanish/English translations |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 20+ | Runtime |
| Express.js | 4 | API framework |
| TypeScript | 5 | Type safety |
| tsx | Latest | TypeScript execution |

### Smart Contract
| Technology | Version | Purpose |
|------------|---------|---------|
| Rust | 1.74+ | Contract language |
| Soroban SDK | 21.7.7 | Stellar smart contracts |
| wasm32 | - | Compilation target |

### Infrastructure
| Service | URL | Purpose |
|---------|-----|---------|
| Soroban RPC | https://soroban-testnet.stellar.org | Contract interaction |
| Horizon | https://horizon-testnet.stellar.org | Blockchain queries |
| Stellar Expert | stellar.expert | Block explorer |

---

## 📁 Project Structure

```
adelanta/
├── 📄 README.md                    # This documentation
├── 📄 package.json                 # Frontend dependencies
├── 📄 next.config.ts               # Next.js config
├── 📄 tailwind.config.ts           # Tailwind config
├── 📄 tsconfig.json                # TypeScript config
│
├── 📁 public/                      # Static assets
│   └── 📷 logo.jpg                 # Adelanta logo
│
├── 📁 src/                         # Frontend source
│   ├── 📄 types.ts                 # Shared types
│   │
│   ├── 📁 app/                     # Next.js App Router
│   │   ├── 📄 page.tsx             # Landing page
│   │   ├── 📄 layout.tsx           # Root layout
│   │   ├── 📄 globals.css          # Global styles
│   │   │
│   │   ├── 📁 sme/                 # SME Dashboard
│   │   │   ├── 📄 page.tsx
│   │   │   └── 📁 invoices/
│   │   │       ├── 📁 new/
│   │   │       └── 📁 [id]/
│   │   │
│   │   └── 📁 investor/            # Investor Dashboard
│   │       ├── 📄 page.tsx
│   │       └── 📁 invoices/[id]/
│   │
│   ├── 📁 components/              # React components
│   │   ├── 📄 Header.tsx
│   │   ├── 📄 Footer.tsx
│   │   ├── 📄 Hero.tsx
│   │   ├── 📄 Features.tsx
│   │   ├── 📄 Proof.tsx
│   │   ├── 📄 WalletButton.tsx
│   │   ├── 📄 WalletProvider.tsx
│   │   └── 📁 ui/
│   │
│   ├── 📁 i18n/                    # Translations
│   │   └── 📄 translations.ts
│   │
│   └── 📁 lib/                     # Utilities
│       ├── 📄 api.ts
│       └── 📄 stellar.ts
│
├── 📁 backend/                     # Backend API
│   ├── 📄 package.json
│   ├── 📄 tsconfig.json
│   └── 📁 src/
│       ├── 📄 index.ts
│       ├── 📄 db.ts
│       └── 📄 types.ts
│
├── 📁 contracts/                   # Soroban contracts
│   ├── 📄 Cargo.toml
│   └── 📁 adelanta_invoice/
│       ├── 📄 Cargo.toml
│       └── 📁 src/
│           ├── 📄 lib.rs
│           ├── 📄 contract.rs
│           ├── 📄 types.rs
│           ├── 📄 storage.rs
│           └── 📄 errors.rs
│
└── 📁 docs/                        # Documentation
    ├── 📄 DORAHACKS_SUBMISSION_EN.md
    ├── 📄 DORAHACKS_SUBMISSION_ES.md
    └── 📄 MERMAID_DIAGRAMS.md
```

---

## 🎯 Demo Flow

### Complete Lifecycle

```bash
# Step 1: Check API health
curl http://localhost:3001/api/health

# Step 2: Create invoice (as SME María)
curl -X POST http://localhost:3001/api/invoices \
  -H "Content-Type: application/json" \
  -d '{
    "smeId": "sme-maria",
    "smeName": "María García",
    "smeCompany": "María Design Studio",
    "payerName": "Corporación XYZ",
    "amount": 8000,
    "dueDate": "2026-03-31",
    "country": "MX",
    "industry": "DESIGN",
    "feeRate": 0.02,
    "bankAccount": "CLABE: 134603958594056160"
  }'

# Step 3: Fund invoice (as Lender)
curl -X POST http://localhost:3001/api/invoices/INV-002/fund \
  -H "Content-Type: application/json" \
  -d '{"lenderId": "lender-carlos"}'

# Step 4: Corporate pays → Auto-split settlement
curl -X POST http://localhost:3001/api/invoices/INV-002/settle \
  -H "Content-Type: application/json" \
  -d '{"amountReceived": 8000}'
```

---

## 💰 Settlement Calculation

For an **$8,000 invoice** with 90% advance and 2% lender fee:

```
┌─────────────────────────────────────────────────────────────────────┐
│                    SETTLEMENT CALCULATION                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Invoice Amount:       $8,000                                       │
│  ├── Advance (90%):    $7,200 → Sent to SME immediately when funded │
│  ├── Lender Fee (2%):  $144   → Lender profit                       │
│  └── Protocol Fee:     $40    → Platform revenue (0.5%)             │
│                                                                      │
│  When Corporate Pays $8,000:                                        │
│  ┌───────────────────────────────────────────────────────────┐      │
│  │ Auto-Split by Smart Contract:                             │      │
│  │ ├── Lender receives:  $7,200 + $144 = $7,344              │      │
│  │ ├── SME receives:     $8,000 - $7,344 - $40 = $616        │      │
│  │ └── Protocol receives: $40                                │      │
│  └───────────────────────────────────────────────────────────┘      │
│                                                                      │
│  Total SME received: $7,200 (advance) + $616 (remainder) = $7,816   │
│  Effective cost to SME: $184 (2.3%)                                 │
│                                                                      │
│  ✅ Much better than traditional factoring (5-15%)!                  │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🗺 Roadmap

### Phase 1: MVP (Q4 2025) ✅ COMPLETE
- [x] Smart contract development in Rust/Soroban
- [x] Contract deployment to Stellar Testnet
- [x] Backend API server with Express
- [x] Frontend dashboard with Next.js
- [x] Complete demo flow (create → fund → settle)
- [x] i18n support (Spanish/English)
- [x] Wallet integration (Freighter)
- [x] Comprehensive documentation

### Phase 2: Beta Launch (Q1 2026)
- [ ] Real Anchor integration (Anclap, Bitso)
- [ ] KYC/KYB integration
- [ ] PostgreSQL database migration
- [ ] First 100 SMEs (Mexico pilot)

### Phase 3: Market Expansion (Q2 2026)
- [ ] Colombia & Brazil markets
- [ ] Institutional LP onboarding
- [ ] AI-powered risk scoring
- [ ] Mobile app (React Native)

### Phase 4: Scale (Q3-Q4 2026)
- [ ] Stellar Mainnet deployment
- [ ] Peru & Chile expansion
- [ ] DeFi integrations
- [ ] Secondary market for invoice tokens

---

## 📊 Impact Metrics

| Metric | Target |
|--------|--------|
| **Financing Gap Addressed** | $900B in LATAM |
| **Countries** | 6 (CL, MX, CO, BR, AR, PE) |
| **Potential SMEs** | 1M+ |
| **Cost Reduction** | 60% vs traditional (2.3% vs 5-15%) |
| **Settlement Time** | < 5 seconds (Soroban finality) |

---

## 🔑 Key Features

### For SMEs (María)
- 📄 **Smart Invoice Minter** - Upload PDF → Stellar Asset in seconds
- 💰 **Instant Liquidity** - Receive 90% in USDC within minutes
- 🏦 **Invisible Repayment** - Corporate pays to normal bank account
- ⭐ **Reputation Passport** - On-chain credit history for better rates

### For Liquidity Providers
- 🛒 **Invoice Marketplace** - Browse verified invoices by risk/industry
- 📊 **Risk Scoring** - AI-powered assessment
- 💵 **One-Click Funding** - Fund with USDC instantly
- 🔒 **Code-Enforced Returns** - Smart contract guarantees repayment

### For Protocol
- 🤖 **Auto-Split Settlement** - Automatic distribution on payment
- 🌍 **Multi-Country Support** - Works with any Stellar Anchor
- 📈 **Real-Time Analytics** - On-chain transparency

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📄 License

MIT License - Built with ❤️ for the LATAM SME community

---

<p align="center">
  <img src="public/logo.jpg" alt="Adelanta" width="80" />
</p>

<h2 align="center">🌟 "Trust is Code. Liquidity is Instant." 🌟</h2>

<p align="center">
  <em>Revolutionizing invoice factoring in LATAM with Stellar Soroban</em>
</p>

<p align="center">
  <strong>Built for Stellar Ideatón 2025</strong>
</p>

<p align="center">
  ⭐ Star this repo if you believe in unlocking the $900B SME financing gap! ⭐
</p>

<p align="center">
  <a href="https://github.com/yourusername/adelanta/issues">Report Bug</a> •
  <a href="https://github.com/yourusername/adelanta/issues">Request Feature</a>
</p>
