"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLocale } from "@/components/LocaleProvider";
import { getInvoice, settleInvoice, previewSettlement, type Invoice, type SettlementPreview } from "@/lib/api";

export default function SmeInvoiceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useLocale();
  
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [preview, setPreview] = useState<SettlementPreview | null>(null);
  const [loading, setLoading] = useState(true);
  const [settling, setSettling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadInvoice();
  }, [id]);

  async function loadInvoice() {
    try {
      setLoading(true);
      setError(null);
      const data = await getInvoice(id);
      setInvoice(data);
      
      // Load settlement preview if funded
      if (data.status === 'funded') {
        const previewData = await previewSettlement(id);
        setPreview(previewData);
      }
    } catch (err) {
      console.error('Failed to load invoice:', err);
      setError('Failed to load invoice. Is the backend running?');
    } finally {
      setLoading(false);
    }
  }

  async function handleSettle() {
    if (!invoice) return;
    
    try {
      setSettling(true);
      const result = await settleInvoice(invoice.id, invoice.amount);
      setInvoice(result);
    } catch (err) {
      console.error('Failed to settle:', err);
      setError((err as Error).message);
    } finally {
      setSettling(false);
    }
  }

  function getStatusBadge(status: string) {
    switch (status) {
      case 'created': return 'bg-yellow-100 text-yellow-800';
      case 'funded': return 'bg-green-100 text-green-800';
      case 'settled': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen font-sans bg-lightblue">
        <Header />
        <main className="pt-28 pb-20">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <div className="animate-pulse space-y-6">
              <div className="h-12 bg-white rounded-xl w-1/3"></div>
              <div className="grid md:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-32 bg-white rounded-2xl"></div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !invoice) {
    return (
      <div className="min-h-screen font-sans bg-lightblue">
        <Header />
        <main className="pt-28 pb-20">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
            <p className="text-red-500 mb-4">{error || 'Invoice not found'}</p>
            <Link href="/sme" className="text-primary font-medium">
              ← Back to Dashboard
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans bg-lightblue">
      <Header />

      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          {/* Header */}
          <div className="flex items-start justify-between gap-6 flex-col md:flex-row">
            <div>
              <p className="text-sm text-slate-600">{t("label.invoice")}</p>
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-navy">
                #{invoice.id}
              </h1>
              <p className="text-primary mt-2">
                Payer: <span className="font-medium text-navy">{invoice.payerName}</span> · {invoice.country} · ${invoice.amount.toLocaleString()} USDC
              </p>
            </div>

            <Link href="/sme" className="text-primary font-medium">
              {t("invoiceDetail.backSme")}
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <div className="bg-white rounded-2xl p-6 shadow-md border-l-4 border-accent">
              <p className="text-sm text-slate-600">{t("invoiceDetail.stage")}</p>
              <p className={`text-xl font-heading font-bold mt-2 px-3 py-1 rounded-full inline-block capitalize ${getStatusBadge(invoice.status)}`}>
                {invoice.status}
              </p>
              <p className="text-sm text-slate-600 mt-2">
                Created: {new Date(invoice.createdAt).toLocaleDateString()}
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-md border-l-4 border-primary">
              <p className="text-sm text-slate-600">{t("invoiceDetail.bankAccount")}</p>
              <p className="text-lg font-heading font-bold text-navy mt-2 break-all">
                {invoice.bankAccount || 'Pending...'}
              </p>
              <p className="text-sm text-slate-600 mt-2">
                {t("invoiceDetail.anchorNote")}
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-md border-l-4 border-green-500">
              <p className="text-sm text-slate-600">{t("invoiceDetail.advance")}</p>
              <p className="text-2xl font-heading font-bold text-navy mt-2">
                ${invoice.advanceAmount.toLocaleString()} USDC
              </p>
              <p className="text-sm text-slate-600 mt-2">
                {invoice.status === 'funded' || invoice.status === 'settled' 
                  ? '✅ Received!' 
                  : t("invoiceDetail.fromLiquidity")}
              </p>
            </div>
          </div>

          {/* Settlement Preview (when funded) */}
          {invoice.status === 'funded' && preview && (
            <div className="mt-8 bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-heading font-bold text-navy mb-4">Settlement Preview</h2>
              <p className="text-sm text-gray-600 mb-4">
                When the corporate client pays ${invoice.amount.toLocaleString()} to the Anchor, the smart contract will automatically distribute:
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-xl p-4">
                  <p className="text-sm text-gray-600">Lender Receives</p>
                  <p className="text-2xl font-bold text-navy">${preview.distribution.lender.total.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">
                    ${preview.distribution.lender.principal.toLocaleString()} principal + ${preview.distribution.lender.fee.toLocaleString()} fee
                  </p>
                </div>
                <div className="bg-green-50 rounded-xl p-4">
                  <p className="text-sm text-gray-600">You Receive (Extra)</p>
                  <p className="text-2xl font-bold text-green-600">${preview.distribution.sme.remainder.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">
                    Total: ${preview.distribution.sme.totalReceived.toLocaleString()} (advance + remainder)
                  </p>
                </div>
                <div className="bg-orange-50 rounded-xl p-4">
                  <p className="text-sm text-gray-600">Protocol Fee</p>
                  <p className="text-2xl font-bold text-orange-600">${preview.distribution.protocol.fee.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">0.5% of invoice</p>
                </div>
              </div>
            </div>
          )}

          {/* Demo Actions */}
          <div className="mt-8 bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-heading font-bold text-navy">{t("invoiceDetail.demoFlow")}</h2>
            <p className="text-slate-600 mt-2">{t("invoiceDetail.demoFlowDesc")}</p>

            <div className="mt-6 flex gap-3 flex-wrap">
              {invoice.status === 'created' && (
                <Link
                  href={`/investor/invoices/${invoice.id}`}
                  className="bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-navy transition-colors"
                >
                  Go to Investor Dashboard to Fund →
                </Link>
              )}

              {invoice.status === 'funded' && (
                <button
                  onClick={handleSettle}
                  disabled={settling}
                  className="bg-accent text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
                >
                  {settling ? '⏳ Processing...' : t("invoiceDetail.simSettle")}
                </button>
              )}

              <Link
                href={`/investor/invoices/${invoice.id}`}
                className="text-primary font-medium py-2 px-4"
              >
                {t("invoiceDetail.viewInvestor")}
              </Link>
            </div>
          </div>

          {/* Settlement Result */}
          {invoice.status === 'settled' && invoice.settlementResult && (
            <div className="mt-8 p-6 rounded-2xl bg-green-50 border border-green-200">
              <h2 className="text-xl font-heading font-bold text-green-800 mb-4">
                ✅ Settlement Complete!
              </h2>
              <p className="text-sm text-green-700 mb-4">
                {t("invoiceDetail.settlementTitle")}
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-4 border border-green-100">
                  <p className="text-sm text-slate-600">{t("invoiceDetail.lender")}</p>
                  <p className="text-2xl font-heading font-bold text-navy mt-1">
                    ${invoice.settlementResult.lenderAmount.toLocaleString()} USDC
                  </p>
                  <p className="text-xs text-slate-600 mt-1">{t("invoiceDetail.lenderNote")}</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-green-100">
                  <p className="text-sm text-slate-600">{t("invoiceDetail.sme")} (Remainder)</p>
                  <p className="text-2xl font-heading font-bold text-green-600 mt-1">
                    ${invoice.settlementResult.smeAmount.toLocaleString()} USDC
                  </p>
                  <p className="text-xs text-slate-600 mt-1">{t("invoiceDetail.smeNote")}</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-green-100">
                  <p className="text-sm text-slate-600">Protocol Fee</p>
                  <p className="text-2xl font-heading font-bold text-orange-600 mt-1">
                    ${invoice.settlementResult.protocolFee.toLocaleString()} USDC
                  </p>
                  <p className="text-xs text-slate-600 mt-1">Treasury</p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-white rounded-xl">
                <p className="text-sm font-medium text-navy">
                  Total You Received: 
                  <span className="text-2xl font-bold text-green-600 ml-2">
                    ${(invoice.advanceAmount + invoice.settlementResult.smeAmount).toLocaleString()} USDC
                  </span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  ${invoice.advanceAmount.toLocaleString()} (advance) + ${invoice.settlementResult.smeAmount.toLocaleString()} (remainder)
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
