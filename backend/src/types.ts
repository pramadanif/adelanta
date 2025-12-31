// Adelanta Backend - Type Definitions

export type InvoiceStatus = 'created' | 'funded' | 'settled' | 'cancelled';

export interface Invoice {
  id: string;
  smeId: string;
  smeName: string;
  smeWallet: string;
  payerId: string;
  payerName: string;
  amount: number; // USD
  advanceAmount: number; // 90% typically
  feeBps: number; // basis points (200 = 2%)
  status: InvoiceStatus;
  country: string;
  industry: string;
  riskLevel: string; // Low, Medium, High
  dueDate: string;
  createdAt: string;
  fundedAt?: string;
  settledAt?: string;
  lenderId?: string;
  lenderWallet?: string;
  bankAccount?: string; // CLABE/CBU for "invisible" payment
  txHash?: string;
  settlementResult?: SettlementResult;
}

export interface SettlementResult {
  invoiceId: string;
  lenderAmount: number;
  smeAmount: number;
  protocolFee: number;
  totalReceived: number;
  timestamp: string;
  txHash?: string;
}

export interface SmeReputation {
  smeId: string;
  totalInvoices: number;
  settledInvoices: number;
  totalVolume: number;
  avgSettlementDays: number;
  onTimeRateBps: number;
  riskScore: number;
}

export interface Wallet {
  publicKey: string;
  secretKey?: string; // Only for demo/testing
  balance: number;
  type: 'sme' | 'lender' | 'admin' | 'treasury';
}

export interface FundingRequest {
  invoiceId: string;
  lenderId: string;
}

export interface SettlementRequest {
  invoiceId: string;
  amountReceived: number; // Simulating anchor payment
}

export interface CreateInvoiceRequest {
  smeId: string;
  payerName: string;
  amount: number;
  dueDate: string;
  country: string;
  industry: string;
  feeBps?: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
