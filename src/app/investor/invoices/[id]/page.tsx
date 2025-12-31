"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLocale } from "@/components/LocaleProvider";
import { getInvoice, fundInvoice, type Invoice } from "@/lib/api";

const DEMO_LENDER_ID = "lender-carlos";

export default function InvestorInvoiceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useLocale();
  
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [funding, setFunding] = useState(false);
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
    } catch (err) {
      console.error('Failed to load invoice:', err);
      setError('Failed to load invoice. Is the backend running?');
    } finally {
      setLoading(false);
    }
  }

  async function handleFund() {
    if (!invoice) return;
    
    try {
      setFunding(true);
      const result = await fundInvoice(invoice.id, DEMO_LENDER_ID);
      setInvoice(result);
    } catch (err) {
      console.error('Failed to fund:', err);
      setError((err as Error).message);
    } finally {
      setFunding(false);
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
            <Link href="/investor" className="text-primary font-medium">
              ← Back to Marketplace
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const potentialProfit = invoice.amount - invoice.advanceAmount;
  const protocolFee = invoice.amount * 0.005;
  const netProfit = potentialProfit - protocolFee;

  return (
    <div className="min-h-screen font-sans bg-lightblue">
      <Header />

      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          {/* Header */}
          <div className="flex items-start justify-between gap-6 flex-col md:flex-row">
            <div>
              <div className="flex items-center gap-3">
                <p className="text-sm text-slate-600">{t("investor.opportunity")}</p>
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadge(invoice.status)}`}>
                  {invoice.status.toUpperCase()}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-navy">
                {t("label.invoice")} #{invoice.id}
              </h1>
              <p className="text-primary mt-2">
                {invoice.country} · {invoice.industry} · {invoice.payerName}
              </p>
            </div>

            <Link href="/investor" className="text-primary font-medium">
              {t("investorInvoice.back")}
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <div className="bg-white rounded-2xl p-6 shadow-md border-l-4 border-primary">
              <p className="text-sm text-slate-600">Invoice Amount</p>
              <p className="text-2xl font-heading font-bold text-navy mt-2">
                ${invoice.amount.toLocaleString()} USDC
              </p>
              <p className="text-sm text-slate-600 mt-2">Total to be collected</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md border-l-4 border-accent">
              <p className="text-sm text-slate-600">Your Investment</p>
              <p className="text-2xl font-heading font-bold text-accent mt-2">
                ${invoice.advanceAmount.toLocaleString()} USDC
              </p>
              <p className="text-sm text-slate-600 mt-2">90% advance to SME</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md border-l-4 border-green-500">
              <p className="text-sm text-slate-600">Your Profit</p>
              <p className="text-2xl font-heading font-bold text-green-600 mt-2">
                ${netProfit.toLocaleString()} USDC
              </p>
              <p className="text-sm text-slate-600 mt-2">
                ~{((netProfit / invoice.advanceAmount) * 100).toFixed(1)}% return
              </p>
            </div>
          </div>

          {/* Investment Details */}
          <div className="mt-8 bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-heading font-bold text-navy">
              Investment Breakdown
            </h2>
            <div className="mt-4 space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-600">Payer (Corporate Client)</span>
                <span className="font-medium text-navy">{invoice.payerName}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-600">Country</span>
                <span className="font-medium text-navy">{invoice.country}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-600">Industry</span>
                <span className="font-medium text-navy">{invoice.industry}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-600">Risk Level</span>
                <span className={`font-medium px-2 py-1 rounded-full text-xs ${
                  (invoice.riskLevel || 'Medium') === 'Low' ? 'bg-green-100 text-green-800' :
                  (invoice.riskLevel || 'Medium') === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>{invoice.riskLevel || 'Medium'}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-600">Created</span>
                <span className="font-medium text-navy">{new Date(invoice.createdAt).toLocaleDateString()}</span>
              </div>
              {invoice.fundedAt && (
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-slate-600">Funded At</span>
                  <span className="font-medium text-green-600">{new Date(invoice.fundedAt).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>

          {/* Action Card */}
          <div className="mt-8 bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-heading font-bold text-navy">
              {t("investorInvoice.fundTitle")}
            </h2>
            <p className="text-slate-600 mt-2">
              {t("investorInvoice.fundDesc")}
            </p>

            {invoice.status === 'created' && (
              <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                <h3 className="font-bold text-navy mb-2">What happens when you fund:</h3>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>✅ ${invoice.advanceAmount.toLocaleString()} USDC sent to SME immediately</li>
                  <li>✅ Smart contract locks your investment</li>
                  <li>✅ When corporate pays (fiat → Anchor → USDC), you receive:</li>
                  <li className="ml-4">• ${invoice.advanceAmount.toLocaleString()} principal back</li>
                  <li className="ml-4">• ${potentialProfit.toLocaleString()} fee (10% of invoice)</li>
                  <li className="ml-4">• Minus ${protocolFee.toLocaleString()} protocol fee (0.5%)</li>
                  <li className="font-bold text-green-600 ml-4">= ${(invoice.advanceAmount + netProfit).toLocaleString()} total</li>
                </ul>
              </div>
            )}

            <div className="mt-6 flex items-center gap-3 flex-wrap">
              {invoice.status === 'created' && (
                <button
                  onClick={handleFund}
                  disabled={funding}
                  className="bg-accent text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 text-lg"
                >
                  {funding ? '⏳ Processing...' : `Fund ${invoice.advanceAmount.toLocaleString()} USDC →`}
                </button>
              )}

              {invoice.status === 'funded' && (
                <div className="flex items-center gap-3">
                  <span className="text-lg font-medium text-green-600 bg-green-50 px-4 py-2 rounded-full">
                    ✅ {t("investorInvoice.funded")}
                  </span>
                  <span className="text-sm text-slate-600">
                    Waiting for corporate payment...
                  </span>
                </div>
              )}

              {invoice.status === 'settled' && (
                <div className="flex items-center gap-3">
                  <span className="text-lg font-medium text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
                    💰 Settled - You received ${((invoice.settlementResult?.lenderAmount) ?? 0).toLocaleString()} USDC
                  </span>
                </div>
              )}

              <Link href={`/sme/invoices/${invoice.id}`} className="text-primary font-medium">
                {t("investorInvoice.viewSme")}
              </Link>
            </div>
          </div>

          {/* Settlement Result */}
          {invoice.status === 'settled' && invoice.settlementResult && (
            <div className="mt-8 p-6 rounded-2xl bg-green-50 border border-green-200">
              <h2 className="text-xl font-heading font-bold text-green-800 mb-4">
                ✅ Investment Settled!
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 border border-green-100">
                  <p className="text-sm text-slate-600">Your Return</p>
                  <p className="text-2xl font-heading font-bold text-green-600 mt-1">
                    ${invoice.settlementResult.lenderAmount.toLocaleString()} USDC
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    Principal + fee - protocol fee
                  </p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-green-100">
                  <p className="text-sm text-slate-600">Net Profit</p>
                  <p className="text-2xl font-heading font-bold text-green-600 mt-1">
                    ${(invoice.settlementResult.lenderAmount - invoice.advanceAmount).toLocaleString()} USDC
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    {(((invoice.settlementResult.lenderAmount - invoice.advanceAmount) / invoice.advanceAmount) * 100).toFixed(1)}% return on investment
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
