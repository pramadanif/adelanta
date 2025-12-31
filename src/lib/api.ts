// Adelanta Frontend - API Service
// Connects to backend for invoice operations

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Types matching backend
export type InvoiceStatus = 'created' | 'funded' | 'settled' | 'cancelled';

export interface Invoice {
  id: string;
  smeId: string;
  smeName: string;
  smeWallet: string;
  payerId: string;
  payerName: string;
  amount: number;
  advanceAmount: number;
  feeBps: number;
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
  bankAccount?: string;
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
  balance: number;
  type: 'sme' | 'lender' | 'admin' | 'treasury';
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface SettlementPreview {
  invoiceId: string;
  invoiceAmount: number;
  advanceAmount: number;
  distribution: {
    lender: { principal: number; fee: number; total: number };
    sme: { remainder: number; totalReceived: number };
    protocol: { fee: number };
  };
}

export interface ProtocolStats {
  totalInvoices: number;
  totalVolumeFunded: number;
  totalVolumeSettled: number;
  activeInvoices: number;
  pendingInvoices: number;
}

export interface MarketStats {
  totalFunded: number;
  activeInvoices: number;
  averageAPY: number;
  totalSMEs: number;
}

// =============================================================================
// API FUNCTIONS
// =============================================================================

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  const data: ApiResponse<T> = await response.json();

  if (!data.success) {
    throw new Error(data.error || 'API request failed');
  }

  return data.data as T;
}

// -----------------------------------------------------------------------------
// INVOICES
// -----------------------------------------------------------------------------

export async function getInvoices(filters?: { status?: InvoiceStatus; smeId?: string }): Promise<Invoice[]> {
  const params = new URLSearchParams();
  if (filters?.status) params.append('status', filters.status);
  if (filters?.smeId) params.append('smeId', filters.smeId);
  
  const query = params.toString() ? `?${params.toString()}` : '';
  return fetchApi<Invoice[]>(`/invoices${query}`);
}

export async function getInvoice(id: string): Promise<Invoice> {
  return fetchApi<Invoice>(`/invoices/${id}`);
}

export async function createInvoice(data: {
  smeId: string;
  payerName: string;
  amount: number;
  dueDate: string;
  country?: string;
  industry?: string;
  feeBps?: number;
}): Promise<Invoice> {
  return fetchApi<Invoice>('/invoices', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function fundInvoice(invoiceId: string, lenderId: string): Promise<Invoice> {
  return fetchApi<Invoice>(`/invoices/${invoiceId}/fund`, {
    method: 'POST',
    body: JSON.stringify({ lenderId }),
  });
}

export async function settleInvoice(invoiceId: string, amountReceived?: number): Promise<Invoice> {
  return fetchApi<Invoice>(`/invoices/${invoiceId}/settle`, {
    method: 'POST',
    body: JSON.stringify({ amountReceived }),
  });
}

export async function previewSettlement(invoiceId: string): Promise<SettlementPreview> {
  return fetchApi<SettlementPreview>(`/invoices/${invoiceId}/preview-settlement`);
}

// -----------------------------------------------------------------------------
// MARKETPLACE
// -----------------------------------------------------------------------------

export async function getMarketplace(): Promise<Invoice[]> {
  return fetchApi<Invoice[]>('/marketplace');
}

// -----------------------------------------------------------------------------
// REPUTATION
// -----------------------------------------------------------------------------

export async function getSmeReputation(smeId: string): Promise<SmeReputation> {
  return fetchApi<SmeReputation>(`/reputation/${smeId}`);
}

// -----------------------------------------------------------------------------
// WALLETS
// -----------------------------------------------------------------------------

export async function getWallet(id: string): Promise<Wallet> {
  return fetchApi<Wallet>(`/wallets/${id}`);
}

// -----------------------------------------------------------------------------
// STATS
// -----------------------------------------------------------------------------

export async function getStats(): Promise<MarketStats> {
  return fetchApi<MarketStats>('/stats');
}

// -----------------------------------------------------------------------------
// HEALTH
// -----------------------------------------------------------------------------

export async function checkHealth(): Promise<{ status: string; timestamp: string }> {
  return fetchApi<{ status: string; timestamp: string }>('/health');
}
