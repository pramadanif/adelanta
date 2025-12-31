// Adelanta Backend - In-Memory Database (for Hackathon Demo)
// In production, replace with PostgreSQL or MongoDB

import { Invoice, SmeReputation, Wallet } from './types';
import { v4 as uuidv4 } from 'uuid';

// =============================================================================
// IN-MEMORY STORAGE
// =============================================================================

const invoices: Map<string, Invoice> = new Map();
const smeReputations: Map<string, SmeReputation> = new Map();
const wallets: Map<string, Wallet> = new Map();

// =============================================================================
// SEED DATA (Demo Accounts)
// =============================================================================

export function seedDemoData() {
  // Create demo SME wallet
  const smeWallet: Wallet = {
    publicKey: 'GDEMO_SME_WALLET_PUBLIC_KEY_1234567890',
    balance: 0,
    type: 'sme'
  };
  wallets.set('sme-maria', smeWallet);

  // Create demo SME reputation
  const smeRep: SmeReputation = {
    smeId: 'sme-maria',
    totalInvoices: 3,
    settledInvoices: 2,
    totalVolume: 15000,
    avgSettlementDays: 45,
    onTimeRateBps: 10000, // 100%
    riskScore: 350
  };
  smeReputations.set('sme-maria', smeRep);

  // Create demo Lender wallet
  const lenderWallet: Wallet = {
    publicKey: 'GDEMO_LENDER_WALLET_PUBLIC_KEY_9876543210',
    balance: 100000, // 100k USDC
    type: 'lender'
  };
  wallets.set('lender-carlos', lenderWallet);

  // Create demo invoice (already funded)
  const demoInvoice: Invoice = {
    id: 'INV-001',
    smeId: 'sme-maria',
    smeName: 'María García - Design Agency',
    smeWallet: smeWallet.publicKey,
    payerId: 'corp-001',
    payerName: 'TechCorp México S.A.',
    amount: 5000,
    advanceAmount: 4500, // 90%
    feeBps: 200, // 2%
    status: 'funded',
    country: 'MX',
    industry: 'DESIGN',
    riskLevel: 'Low',
    dueDate: '2025-02-15',
    createdAt: '2024-12-20T10:00:00Z',
    fundedAt: '2024-12-20T10:30:00Z',
    lenderId: 'lender-carlos',
    lenderWallet: lenderWallet.publicKey,
    bankAccount: 'CLABE: 012180001234567890'
  };
  invoices.set(demoInvoice.id, demoInvoice);

  console.log('✅ Demo data seeded');
}

// =============================================================================
// INVOICE OPERATIONS
// =============================================================================

export function createInvoice(data: Omit<Invoice, 'id' | 'createdAt' | 'status' | 'advanceAmount' | 'bankAccount' | 'riskLevel'>): Invoice {
  const id = `INV-${String(invoices.size + 1).padStart(3, '0')}`;
  const advanceAmount = Math.floor(data.amount * 0.9); // 90% advance
  
  // Generate "invisible" bank account (simulated CLABE/CBU)
  const bankAccount = generateBankAccount(data.country);
  
  // Calculate risk level based on amount and SME reputation
  const riskLevel = calculateRiskLevel(data.smeId, data.amount);

  const invoice: Invoice = {
    ...data,
    id,
    advanceAmount,
    riskLevel,
    status: 'created',
    createdAt: new Date().toISOString(),
    bankAccount
  };

  invoices.set(id, invoice);
  
  // Update SME reputation
  updateSmeReputationOnCreate(data.smeId);
  
  return invoice;
}

export function getInvoice(id: string): Invoice | undefined {
  return invoices.get(id);
}

export function getInvoicesByStatus(status: Invoice['status']): Invoice[] {
  return Array.from(invoices.values()).filter(inv => inv.status === status);
}

export function getInvoicesBySme(smeId: string): Invoice[] {
  return Array.from(invoices.values()).filter(inv => inv.smeId === smeId);
}

export function getInvoicesByLender(lenderId: string): Invoice[] {
  return Array.from(invoices.values()).filter(inv => inv.lenderId === lenderId);
}

export function getAllInvoices(): Invoice[] {
  return Array.from(invoices.values());
}

export function fundInvoice(invoiceId: string, lenderId: string, lenderWallet: string): Invoice {
  const invoice = invoices.get(invoiceId);
  if (!invoice) throw new Error('Invoice not found');
  if (invoice.status !== 'created') throw new Error('Invoice already funded or settled');

  // Update invoice
  invoice.status = 'funded';
  invoice.fundedAt = new Date().toISOString();
  invoice.lenderId = lenderId;
  invoice.lenderWallet = lenderWallet;
  
  // Update SME wallet balance (simulated)
  const smeWallet = wallets.get(invoice.smeId);
  if (smeWallet) {
    smeWallet.balance += invoice.advanceAmount;
  }
  
  // Update lender wallet balance
  const lenderWalletObj = wallets.get(lenderId);
  if (lenderWalletObj) {
    lenderWalletObj.balance -= invoice.advanceAmount;
  }

  invoices.set(invoiceId, invoice);
  return invoice;
}

export function settleInvoice(invoiceId: string, amountReceived: number): Invoice {
  const invoice = invoices.get(invoiceId);
  if (!invoice) throw new Error('Invoice not found');
  if (invoice.status !== 'funded') throw new Error('Invoice must be funded to settle');
  if (amountReceived < invoice.amount) throw new Error('Insufficient settlement amount');

  // Calculate distribution (matching Soroban contract logic)
  const lenderFee = Math.floor(invoice.advanceAmount * invoice.feeBps / 10000);
  const lenderAmount = invoice.advanceAmount + lenderFee;
  const protocolFee = Math.floor(invoice.amount * 50 / 10000); // 0.5% protocol fee
  const smeAmount = amountReceived - lenderAmount - protocolFee;

  // Update invoice
  invoice.status = 'settled';
  invoice.settledAt = new Date().toISOString();
  invoice.settlementResult = {
    invoiceId,
    lenderAmount,
    smeAmount,
    protocolFee,
    totalReceived: amountReceived,
    timestamp: new Date().toISOString()
  };

  // Update wallet balances (simulated)
  const smeWallet = wallets.get(invoice.smeId);
  if (smeWallet) {
    smeWallet.balance += smeAmount;
  }

  const lenderWalletObj = wallets.get(invoice.lenderId!);
  if (lenderWalletObj) {
    lenderWalletObj.balance += lenderAmount;
  }

  invoices.set(invoiceId, invoice);
  
  // Update SME reputation
  updateSmeReputationOnSettle(invoice.smeId, invoice.amount);

  return invoice;
}

// =============================================================================
// SME REPUTATION
// =============================================================================

export function getSmeReputation(smeId: string): SmeReputation | undefined {
  return smeReputations.get(smeId);
}

function updateSmeReputationOnCreate(smeId: string) {
  let rep = smeReputations.get(smeId);
  if (!rep) {
    rep = {
      smeId,
      totalInvoices: 0,
      settledInvoices: 0,
      totalVolume: 0,
      avgSettlementDays: 0,
      onTimeRateBps: 10000,
      riskScore: 500
    };
  }
  rep.totalInvoices += 1;
  smeReputations.set(smeId, rep);
}

function updateSmeReputationOnSettle(smeId: string, amount: number) {
  const rep = smeReputations.get(smeId);
  if (rep) {
    rep.settledInvoices += 1;
    rep.totalVolume += amount;
    
    // Improve risk score based on successful settlements
    const settlementRate = rep.settledInvoices / rep.totalInvoices;
    rep.riskScore = Math.max(100, Math.floor(500 - (settlementRate * 300) - (rep.totalVolume / 10000)));
    
    smeReputations.set(smeId, rep);
  }
}

// =============================================================================
// WALLET OPERATIONS
// =============================================================================

export function getWallet(id: string): Wallet | undefined {
  return wallets.get(id);
}

export function createWallet(id: string, type: Wallet['type']): Wallet {
  const wallet: Wallet = {
    publicKey: `GDEMO_${type.toUpperCase()}_${id}_${Date.now()}`,
    balance: type === 'lender' ? 50000 : 0, // Lenders start with 50k USDC
    type
  };
  wallets.set(id, wallet);
  return wallet;
}

// =============================================================================
// STATS
// =============================================================================

export function getStats() {
  const allInvoices = Array.from(invoices.values());
  const uniqueSMEs = new Set(allInvoices.map(i => i.smeId));
  
  return {
    totalInvoices: allInvoices.length,
    totalVolumeFunded: allInvoices.filter(i => i.status !== 'created').reduce((sum, i) => sum + i.advanceAmount, 0),
    totalVolumeSettled: allInvoices.filter(i => i.status === 'settled').reduce((sum, i) => sum + i.amount, 0),
    activeInvoices: allInvoices.filter(i => i.status === 'funded').length,
    pendingInvoices: allInvoices.filter(i => i.status === 'created').length,
    // MarketStats format for frontend
    totalFunded: allInvoices.filter(i => i.status !== 'created').reduce((sum, i) => sum + i.advanceAmount, 0),
    averageAPY: 10, // 10% average APY
    totalSMEs: uniqueSMEs.size
  };
}

// =============================================================================
// RISK CALCULATION
// =============================================================================

function calculateRiskLevel(smeId: string, amount: number): string {
  const rep = smeReputations.get(smeId);
  
  if (!rep) {
    // New SME - Medium risk by default
    return amount > 10000 ? 'High' : 'Medium';
  }
  
  // Calculate based on reputation
  if (rep.riskScore < 300 && rep.settledInvoices >= 3) {
    return 'Low';
  } else if (rep.riskScore < 500 || rep.settledInvoices >= 1) {
    return 'Medium';
  }
  return 'High';
}

// =============================================================================
// HELPERS
// =============================================================================

function generateBankAccount(country: string): string {
  const random = Math.floor(Math.random() * 1000000000000000000).toString().padStart(18, '0');
  switch (country) {
    case 'CL':
      return `CuentaRUT: ${random.substring(0, 12)}-${random.substring(12, 13)}`;
    case 'MX':
      return `CLABE: ${random}`;
    case 'AR':
      return `CBU: ${random.substring(0, 22)}`;
    case 'BR':
      return `PIX: ${uuidv4()}`;
    case 'CO':
      return `NIT: ${random.substring(0, 10)}`;
    case 'PE':
      return `CCI: ${random.substring(0, 20)}`;
    default:
      return `ACCOUNT: ${random}`;
  }
}
