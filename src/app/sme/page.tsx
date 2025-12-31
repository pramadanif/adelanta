"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLocale } from "@/components/LocaleProvider";
import { 
  getInvoices, 
  getSmeReputation, 
  getWallet,
  type Invoice, 
  type SmeReputation,
  type Wallet 
} from "@/lib/api";

// Demo SME ID (in production, this would come from authentication)
const DEMO_SME_ID = "sme-maria";

export default function SmeDashboardPage() {
  const { t } = useLocale();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [reputation, setReputation] = useState<SmeReputation | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      setError(null);
      
      const [invoicesData, repData, walletData] = await Promise.all([
        getInvoices({ smeId: DEMO_SME_ID }).catch(() => []),
        getSmeReputation(DEMO_SME_ID).catch(() => null),
        getWallet(DEMO_SME_ID).catch(() => null)
      ]);
      
      setInvoices(invoicesData);
      setReputation(repData);
      setWallet(walletData);
    } catch (err) {
      console.error('Failed to load data:', err);
      setError('Failed to connect to backend. Make sure the server is running.');
    } finally {
      setLoading(false);
    }
  }

  // Calculate cash available from funded invoices
  const cashAvailable = invoices
    .filter(inv => inv.status === 'funded')
    .reduce((sum, inv) => sum + inv.advanceAmount, 0);

  // Get reputation grade
  function getReputationGrade(score: number): string {
    if (score < 200) return 'A+';
    if (score < 350) return 'A';
    if (score < 500) return 'B';
    if (score < 700) return 'C';
    return 'D';
  }

  function getStatusColor(status: string): string {
    switch (status) {
      case 'created': return 'bg-yellow-100 text-yellow-800';
      case 'funded': return 'bg-green-100 text-green-800';
      case 'settled': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  return (
    <div className="min-h-screen font-sans bg-lightblue">
      <Header />

      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-8">
          {/* Header */}
          <div className="flex items-start justify-between gap-6 flex-col md:flex-row">
            <div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-navy">{t("sme.title")}</h1>
              <p className="text-primary mt-2">{t("sme.subtitle")}</p>
              {error && (
                <p className="text-red-500 mt-2 text-sm">{error}</p>
              )}
            </div>

            <Link
              href="/sme/invoices/new"
              className="bg-accent text-white font-bold py-3 px-6 rounded-full shadow-md hover:bg-orange-600 transition-colors"
            >
              {t("sme.upload")}
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {/* Cash Available */}
            <div className="bg-white rounded-2xl p-6 shadow-md border-l-4 border-accent">
              <p className="text-sm text-primary font-medium">{t("sme.cashAvailable")}</p>
              {loading ? (
                <div className="h-10 bg-gray-200 rounded animate-pulse mt-2"></div>
              ) : (
                <>
                  <p className="text-3xl font-heading font-bold text-navy mt-2">
                    {wallet?.balance?.toLocaleString() || cashAvailable.toLocaleString()} USDC
                  </p>
                  <p className="text-sm text-slate-600 mt-2">
                    {t("sme.card.cashNote")}
                  </p>
                </>
              )}
            </div>

            {/* Active Invoices */}
            <div className="bg-white rounded-2xl p-6 shadow-md border-l-4 border-primary">
              <p className="text-sm text-primary font-medium">{t("sme.activeInvoices")}</p>
              {loading ? (
                <div className="h-10 bg-gray-200 rounded animate-pulse mt-2"></div>
              ) : (
                <>
                  <p className="text-3xl font-heading font-bold text-navy mt-2">
                    {invoices.filter(i => i.status !== 'settled' && i.status !== 'cancelled').length}
                  </p>
                  <p className="text-sm text-slate-600 mt-2">{t("sme.card.activeNote")}</p>
                </>
              )}
            </div>

            {/* Reputation */}
            <div className="bg-white rounded-2xl p-6 shadow-md border-l-4 border-green-500">
              <p className="text-sm text-primary font-medium">{t("sme.reputation")}</p>
              {loading ? (
                <div className="h-10 bg-gray-200 rounded animate-pulse mt-2"></div>
              ) : (
                <>
                  <p className="text-3xl font-heading font-bold text-navy mt-2">
                    {reputation ? getReputationGrade(reputation.riskScore) : 'N/A'}
                  </p>
                  <p className="text-sm text-slate-600 mt-2">
                    {reputation 
                      ? `${reputation.settledInvoices}/${reputation.totalInvoices} settled • $${reputation.totalVolume.toLocaleString()} volume`
                      : t("sme.card.reputationNote")}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Invoices Table */}
          <div className="mt-12 bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-xl font-heading font-bold text-navy">
                {t("sme.yourInvoices")}
              </h2>
              <div className="flex items-center gap-4">
                <button 
                  onClick={loadData}
                  className="text-primary hover:text-navy transition-colors text-sm"
                  disabled={loading}
                >
                  {loading ? '⏳ Loading...' : '🔄 Refresh'}
                </button>
                <Link href="/investor" className="text-primary font-medium">
                  {t("sme.goInvestor")}
                </Link>
              </div>
            </div>

            <div className="p-6">
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-20 bg-gray-100 rounded-xl animate-pulse"></div>
                  ))}
                </div>
              ) : invoices.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">No invoices yet</p>
                  <Link
                    href="/sme/invoices/new"
                    className="bg-primary text-white font-bold py-2 px-6 rounded-lg inline-block"
                  >
                    Create Your First Invoice
                  </Link>
                </div>
              ) : (
                <div className="grid gap-4">
                  {invoices.map((inv) => (
                    <div
                      key={inv.id}
                      className="border border-slate-100 rounded-xl p-4 flex items-start justify-between gap-4 flex-col md:flex-row hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex-1">
                        <p className="text-sm text-slate-600">{t("label.invoice")}</p>
                        <p className="text-lg font-heading font-bold text-navy">
                          #{inv.id} · {inv.payerName}
                        </p>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span className="text-sm text-slate-600">
                            {inv.country} · ${inv.amount.toLocaleString()} USDC
                          </span>
                          {inv.status === 'funded' && (
                            <span className="text-sm text-green-600 font-medium">
                              → Advance: ${inv.advanceAmount.toLocaleString()}
                            </span>
                          )}
                          {inv.settlementResult && (
                            <span className="text-sm text-blue-600 font-medium">
                              → You received: ${(inv.advanceAmount + inv.settlementResult.smeAmount).toLocaleString()}
                            </span>
                          )}
                        </div>
                        {inv.bankAccount && inv.status === 'funded' && (
                          <p className="text-xs text-gray-500 mt-1 font-mono bg-gray-100 px-2 py-1 rounded inline-block">
                            {inv.bankAccount}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={`text-sm font-medium px-3 py-1 rounded-full capitalize ${getStatusColor(inv.status)}`}>
                          {inv.status}
                        </span>
                        <Link
                          href={`/sme/invoices/${inv.id}`}
                          className="bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-navy transition-colors"
                        >
                          {t("common.view")}
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
