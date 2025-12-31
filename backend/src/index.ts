// Adelanta Backend - Express Server

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {
  seedDemoData,
  createInvoice,
  getInvoice,
  getAllInvoices,
  getInvoicesByStatus,
  getInvoicesBySme,
  fundInvoice,
  settleInvoice,
  getSmeReputation,
  getWallet,
  createWallet,
  getStats
} from './db';
import { ApiResponse, CreateInvoiceRequest, FundingRequest, SettlementRequest } from './types';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`${new Date().toISOString()} | ${req.method} ${req.path}`);
  next();
});

// =============================================================================
// ROUTES
// =============================================================================

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// -----------------------------------------------------------------------------
// INVOICES
// -----------------------------------------------------------------------------

// Get all invoices
app.get('/api/invoices', (req: Request, res: Response) => {
  try {
    const { status, smeId } = req.query;
    
    let invoices;
    if (status) {
      invoices = getInvoicesByStatus(status as 'created' | 'funded' | 'settled' | 'cancelled');
    } else if (smeId) {
      invoices = getInvoicesBySme(smeId as string);
    } else {
      invoices = getAllInvoices();
    }
    
    const response: ApiResponse = { success: true, data: invoices };
    res.json(response);
  } catch (error) {
    const response: ApiResponse = { success: false, error: (error as Error).message };
    res.status(500).json(response);
  }
});

// Get single invoice
app.get('/api/invoices/:id', (req: Request, res: Response) => {
  try {
    const invoice = getInvoice(req.params.id);
    if (!invoice) {
      const response: ApiResponse = { success: false, error: 'Invoice not found' };
      return res.status(404).json(response);
    }
    const response: ApiResponse = { success: true, data: invoice };
    res.json(response);
  } catch (error) {
    const response: ApiResponse = { success: false, error: (error as Error).message };
    res.status(500).json(response);
  }
});

// Create invoice (SME action)
app.post('/api/invoices', (req: Request, res: Response) => {
  try {
    const body: CreateInvoiceRequest = req.body;
    
    // Validation
    if (!body.smeId || !body.payerName || !body.amount || !body.dueDate) {
      const response: ApiResponse = { success: false, error: 'Missing required fields' };
      return res.status(400).json(response);
    }

    // Get or create SME wallet
    let wallet = getWallet(body.smeId);
    if (!wallet) {
      wallet = createWallet(body.smeId, 'sme');
    }

    const invoice = createInvoice({
      smeId: body.smeId,
      smeName: body.smeId, // In production, fetch from user profile
      smeWallet: wallet.publicKey,
      payerId: `corp-${Date.now()}`,
      payerName: body.payerName,
      amount: body.amount,
      feeBps: body.feeBps || 200, // Default 2%
      country: body.country || 'MX',
      industry: body.industry || 'GENERAL',
      dueDate: body.dueDate
    });

    console.log(`✅ Invoice created: ${invoice.id} for ${invoice.amount} USD`);
    
    const response: ApiResponse = { success: true, data: invoice };
    res.status(201).json(response);
  } catch (error) {
    const response: ApiResponse = { success: false, error: (error as Error).message };
    res.status(500).json(response);
  }
});

// Fund invoice (Lender action)
app.post('/api/invoices/:id/fund', (req: Request, res: Response) => {
  try {
    const { lenderId }: FundingRequest = req.body;
    
    if (!lenderId) {
      const response: ApiResponse = { success: false, error: 'Lender ID required' };
      return res.status(400).json(response);
    }

    // Get or create lender wallet
    let wallet = getWallet(lenderId);
    if (!wallet) {
      wallet = createWallet(lenderId, 'lender');
    }

    const invoice = fundInvoice(req.params.id, lenderId, wallet.publicKey);
    
    console.log(`✅ Invoice ${invoice.id} funded by ${lenderId} - ${invoice.advanceAmount} USDC`);
    
    const response: ApiResponse = { success: true, data: invoice };
    res.json(response);
  } catch (error) {
    const response: ApiResponse = { success: false, error: (error as Error).message };
    res.status(500).json(response);
  }
});

// Settle invoice (Anchor/Admin action - simulates fiat payment)
app.post('/api/invoices/:id/settle', (req: Request, res: Response) => {
  try {
    const { amountReceived }: SettlementRequest = req.body;
    
    const invoiceCheck = getInvoice(req.params.id);
    if (!invoiceCheck) {
      const response: ApiResponse = { success: false, error: 'Invoice not found' };
      return res.status(404).json(response);
    }

    // Default to invoice amount if not specified
    const amount = amountReceived || invoiceCheck.amount;
    
    const invoice = settleInvoice(req.params.id, amount);
    
    console.log(`✅ Invoice ${invoice.id} settled - Distribution:`);
    console.log(`   Lender: ${invoice.settlementResult?.lenderAmount} USDC`);
    console.log(`   SME: ${invoice.settlementResult?.smeAmount} USDC`);
    console.log(`   Protocol: ${invoice.settlementResult?.protocolFee} USDC`);
    
    const response: ApiResponse = { success: true, data: invoice };
    res.json(response);
  } catch (error) {
    const response: ApiResponse = { success: false, error: (error as Error).message };
    res.status(500).json(response);
  }
});

// -----------------------------------------------------------------------------
// MARKETPLACE (for Investors)
// -----------------------------------------------------------------------------

// Get available invoices for funding
app.get('/api/marketplace', (_req: Request, res: Response) => {
  try {
    const available = getInvoicesByStatus('created');
    const response: ApiResponse = { success: true, data: available };
    res.json(response);
  } catch (error) {
    const response: ApiResponse = { success: false, error: (error as Error).message };
    res.status(500).json(response);
  }
});

// -----------------------------------------------------------------------------
// SME REPUTATION
// -----------------------------------------------------------------------------

app.get('/api/reputation/:smeId', (req: Request, res: Response) => {
  try {
    const reputation = getSmeReputation(req.params.smeId);
    if (!reputation) {
      const response: ApiResponse = { success: false, error: 'SME not found' };
      return res.status(404).json(response);
    }
    const response: ApiResponse = { success: true, data: reputation };
    res.json(response);
  } catch (error) {
    const response: ApiResponse = { success: false, error: (error as Error).message };
    res.status(500).json(response);
  }
});

// -----------------------------------------------------------------------------
// WALLETS
// -----------------------------------------------------------------------------

app.get('/api/wallets/:id', (req: Request, res: Response) => {
  try {
    const wallet = getWallet(req.params.id);
    if (!wallet) {
      const response: ApiResponse = { success: false, error: 'Wallet not found' };
      return res.status(404).json(response);
    }
    const response: ApiResponse = { success: true, data: wallet };
    res.json(response);
  } catch (error) {
    const response: ApiResponse = { success: false, error: (error as Error).message };
    res.status(500).json(response);
  }
});

// -----------------------------------------------------------------------------
// STATS
// -----------------------------------------------------------------------------

app.get('/api/stats', (_req: Request, res: Response) => {
  try {
    const stats = getStats();
    const response: ApiResponse = { success: true, data: stats };
    res.json(response);
  } catch (error) {
    const response: ApiResponse = { success: false, error: (error as Error).message };
    res.status(500).json(response);
  }
});

// -----------------------------------------------------------------------------
// PREVIEW SETTLEMENT (Calculate distribution before settling)
// -----------------------------------------------------------------------------

app.get('/api/invoices/:id/preview-settlement', (req: Request, res: Response) => {
  try {
    const invoice = getInvoice(req.params.id);
    if (!invoice) {
      const response: ApiResponse = { success: false, error: 'Invoice not found' };
      return res.status(404).json(response);
    }

    const amountReceived = invoice.amount;
    const lenderFee = Math.floor(invoice.advanceAmount * invoice.feeBps / 10000);
    const lenderAmount = invoice.advanceAmount + lenderFee;
    const protocolFee = Math.floor(invoice.amount * 50 / 10000);
    const smeAmount = amountReceived - lenderAmount - protocolFee;

    const preview = {
      invoiceId: invoice.id,
      invoiceAmount: invoice.amount,
      advanceAmount: invoice.advanceAmount,
      distribution: {
        lender: {
          principal: invoice.advanceAmount,
          fee: lenderFee,
          total: lenderAmount
        },
        sme: {
          remainder: smeAmount,
          totalReceived: invoice.advanceAmount + smeAmount // advance + remainder
        },
        protocol: {
          fee: protocolFee
        }
      }
    };

    const response: ApiResponse = { success: true, data: preview };
    res.json(response);
  } catch (error) {
    const response: ApiResponse = { success: false, error: (error as Error).message };
    res.status(500).json(response);
  }
});

// =============================================================================
// ERROR HANDLING
// =============================================================================

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Error:', err);
  const response: ApiResponse = { success: false, error: err.message };
  res.status(500).json(response);
});

// 404 handler
app.use((_req: Request, res: Response) => {
  const response: ApiResponse = { success: false, error: 'Not found' };
  res.status(404).json(response);
});

// =============================================================================
// START SERVER
// =============================================================================

seedDemoData();

app.listen(PORT, () => {
  console.log('');
  console.log('🚀 ═══════════════════════════════════════════════════════════');
  console.log('   ADELANTA BACKEND API');
  console.log('   Programmable Factoring Protocol for LATAM');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log(`   Server running on http://localhost:${PORT}`);
  console.log('');
  console.log('   Endpoints:');
  console.log('   - GET  /api/health              Health check');
  console.log('   - GET  /api/invoices            List all invoices');
  console.log('   - POST /api/invoices            Create invoice');
  console.log('   - POST /api/invoices/:id/fund   Fund invoice');
  console.log('   - POST /api/invoices/:id/settle Settle invoice');
  console.log('   - GET  /api/marketplace         Available invoices');
  console.log('   - GET  /api/reputation/:smeId   SME reputation');
  console.log('   - GET  /api/stats               Protocol stats');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('');
});

export default app;
