// Adelanta - Stellar & Freighter Wallet Integration
// Connects to Soroban smart contract

import { Invoice, SettlementResult } from './api';

// Contract Configuration
export const CONTRACT_ID = process.env.NEXT_PUBLIC_STELLAR_CONTRACT_ID || 
  'CATMUHWQCGIWXC7A4TMQTYFY3V7HSS44TEMNLYHMDBMQ3V3SFXYFI4L5';

export const STELLAR_NETWORK = process.env.NEXT_PUBLIC_STELLAR_NETWORK || 'testnet';

export const STELLAR_RPC_URL = STELLAR_NETWORK === 'mainnet'
  ? 'https://soroban.stellar.org'
  : 'https://soroban-testnet.stellar.org';

export const STELLAR_HORIZON_URL = STELLAR_NETWORK === 'mainnet'
  ? 'https://horizon.stellar.org'
  : 'https://horizon-testnet.stellar.org';

export const STELLAR_NETWORK_PASSPHRASE = STELLAR_NETWORK === 'mainnet'
  ? 'Public Global Stellar Network ; September 2015'
  : 'Test SDF Network ; September 2015';

// Freighter Wallet Types
export interface FreighterWallet {
  publicKey: string;
  isConnected: boolean;
  network: string;
}

export interface WalletState {
  isConnected: boolean;
  publicKey: string | null;
  balance: number;
  isLoading: boolean;
  error: string | null;
}

// Check if Freighter is installed
export function isFreighterInstalled(): boolean {
  if (typeof window === 'undefined') return false;
  // @ts-expect-error - Freighter injects this
  return typeof window.freighterApi !== 'undefined';
}

// Check if Freighter is connected
export async function isFreighterConnected(): Promise<boolean> {
  if (!isFreighterInstalled()) return false;
  try {
    // @ts-expect-error - Freighter API
    const { isConnected } = await window.freighterApi.isConnected();
    return isConnected;
  } catch {
    return false;
  }
}

// Request connection to Freighter
export async function connectFreighter(): Promise<FreighterWallet | null> {
  if (!isFreighterInstalled()) {
    window.open('https://www.freighter.app/', '_blank');
    return null;
  }

  try {
    // @ts-expect-error - Freighter API
    const publicKey = await window.freighterApi.getPublicKey();
    // @ts-expect-error - Freighter API
    const network = await window.freighterApi.getNetwork();
    
    return {
      publicKey,
      isConnected: true,
      network,
    };
  } catch (error) {
    console.error('Failed to connect to Freighter:', error);
    return null;
  }
}

// Get user's public key
export async function getFreighterPublicKey(): Promise<string | null> {
  if (!isFreighterInstalled()) return null;
  
  try {
    // @ts-expect-error - Freighter API
    const publicKey = await window.freighterApi.getPublicKey();
    return publicKey;
  } catch {
    return null;
  }
}

// Sign transaction with Freighter
export async function signTransaction(xdr: string): Promise<string | null> {
  if (!isFreighterInstalled()) return null;
  
  try {
    // @ts-expect-error - Freighter API
    const signedXdr = await window.freighterApi.signTransaction(xdr, {
      networkPassphrase: STELLAR_NETWORK_PASSPHRASE,
    });
    return signedXdr;
  } catch (error) {
    console.error('Failed to sign transaction:', error);
    return null;
  }
}

// Get account balance from Horizon
export async function getAccountBalance(publicKey: string): Promise<number> {
  try {
    const response = await fetch(`${STELLAR_HORIZON_URL}/accounts/${publicKey}`);
    if (!response.ok) return 0;
    
    const data = await response.json();
    const xlmBalance = data.balances?.find((b: { asset_type: string }) => b.asset_type === 'native');
    return xlmBalance ? parseFloat(xlmBalance.balance) : 0;
  } catch {
    return 0;
  }
}

// Get USDC balance
export async function getUSDCBalance(publicKey: string): Promise<number> {
  try {
    const response = await fetch(`${STELLAR_HORIZON_URL}/accounts/${publicKey}`);
    if (!response.ok) return 0;
    
    const data = await response.json();
    const usdcBalance = data.balances?.find(
      (b: { asset_code?: string; asset_issuer?: string }) => 
        b.asset_code === 'USDC'
    );
    return usdcBalance ? parseFloat(usdcBalance.balance) : 0;
  } catch {
    return 0;
  }
}

// Format Stellar address for display
export function formatAddress(address: string): string {
  if (!address || address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

// Contract interaction helpers (these would call the actual Soroban contract)
// For now, they're placeholders that would be implemented with stellar-sdk

export interface ContractInvoice {
  id: number;
  sme: string;
  lender?: string;
  payerId: string;
  amount: bigint;
  advanceAmount: bigint;
  feeBps: number;
  status: 'Created' | 'Funded' | 'Settled' | 'Cancelled' | 'Defaulted';
  createdAt: number;
  fundedAt?: number;
  settledAt?: number;
  dueDate: number;
  country: string;
  industry: string;
}

// Simulated contract calls (in production, these would use @stellar/stellar-sdk)
export async function contractCreateInvoice(
  smePublicKey: string,
  payerId: string,
  amount: number,
  dueDate: Date,
  country: string,
  industry: string,
  feeBps: number = 200
): Promise<{ invoiceId: number; txHash: string } | null> {
  console.log('Creating invoice on Soroban...', {
    smePublicKey,
    payerId,
    amount,
    dueDate,
    country,
    industry,
    feeBps,
  });
  
  // In production, this would:
  // 1. Build the Soroban transaction
  // 2. Sign with Freighter
  // 3. Submit to the network
  // 4. Return the result
  
  // For now, simulate
  return {
    invoiceId: Math.floor(Math.random() * 1000) + 1,
    txHash: `TX${Date.now()}`,
  };
}

export async function contractFundInvoice(
  lenderPublicKey: string,
  invoiceId: number
): Promise<{ success: boolean; txHash: string } | null> {
  console.log('Funding invoice on Soroban...', {
    lenderPublicKey,
    invoiceId,
  });
  
  return {
    success: true,
    txHash: `TX${Date.now()}`,
  };
}

export async function contractSettleInvoice(
  invoiceId: number,
  settlementAmount: number
): Promise<SettlementResult | null> {
  console.log('Settling invoice on Soroban...', {
    invoiceId,
    settlementAmount,
  });
  
  return {
    invoiceId: invoiceId.toString(),
    lenderAmount: settlementAmount * 0.918,
    smeAmount: settlementAmount * 0.077,
    protocolFee: settlementAmount * 0.005,
    totalReceived: settlementAmount,
    timestamp: new Date().toISOString(),
    txHash: `TX${Date.now()}`,
  };
}

export async function contractGetInvoice(invoiceId: number): Promise<ContractInvoice | null> {
  console.log('Getting invoice from Soroban...', invoiceId);
  return null;
}

// Explorer links
export function getContractExplorerUrl(): string {
  return `https://stellar.expert/explorer/${STELLAR_NETWORK}/contract/${CONTRACT_ID}`;
}

export function getTransactionExplorerUrl(txHash: string): string {
  return `https://stellar.expert/explorer/${STELLAR_NETWORK}/tx/${txHash}`;
}

export function getAccountExplorerUrl(publicKey: string): string {
  return `https://stellar.expert/explorer/${STELLAR_NETWORK}/account/${publicKey}`;
}
