"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLocale } from "@/components/LocaleProvider";
import { getMarketplace, getStats, type Invoice, type MarketStats } from "@/lib/api";

const DEMO_LENDER_ID = "lender-carlos";

export default function InvestorDashboardPage() {
  const { t } = useLocale();
  const [opportunities, setOpportunities] = useState<Invoice[]>([]);
  const [stats, setStats] = useState<MarketStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      setError(null);
      const [marketData, statsData] = await Promise.all([
        getMarketplace(),
        getStats()
      ]);
      setOpportunities(marketData);
      setStats(statsData);
    } catch (err) {
      console.error('Failed to load marketplace:', err);
      setError('Failed to load marketplace. Is the backend running on port 3001?');
    } finally {
      setLoading(false);
    }
  }

  function getRiskBadge(risk: string) {
    switch (risk.toLowerCase()) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
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
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-navy">{t("investor.title")}</h1>
              <p className="text-primary mt-2">{t("investor.subtitle")}</p>
            </div>

            <Link href="/sme" className="text-primary font-medium">
              {t("investor.backSme")}
            </Link>
          </div>

          {/* Stats Cards */}
          {stats && (
            <div className="grid md:grid-cols-4 gap-6 mt-8">
              <div className="bg-white rounded-2xl p-6 shadow-md border-l-4 border-primary">
                <p className="text-sm text-slate-600">Total Funded</p>
                <p className="text-2xl font-heading font-bold text-navy mt-2">
                  ${stats.totalFunded.toLocaleString()}
                </p>
                <p className="text-sm text-green-600">USDC</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md border-l-4 border-accent">
                <p className="text-sm text-slate-600">Active Invoices</p>
                <p className="text-2xl font-heading font-bold text-navy mt-2">
                  {stats.activeInvoices}
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md border-l-4 border-green-500">
                <p className="text-sm text-slate-600">Avg APY</p>
                <p className="text-2xl font-heading font-bold text-green-600 mt-2">
                  {stats.averageAPY}%
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md border-l-4 border-blue-500">
                <p className="text-sm text-slate-600">Registered SMEs</p>
                <p className="text-2xl font-heading font-bold text-navy mt-2">
                  {stats.totalSMEs}
                </p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600">{error}</p>
              <p className="text-sm text-red-500 mt-2">
                Run <code className="bg-red-100 px-2 py-1 rounded">cd backend && npm run dev</code> to start the backend.
              </p>
            </div>
          )}

          {/* Marketplace */}
          <div className="mt-10 bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h2 className="text-xl font-heading font-bold text-navy">
                {t("investor.marketplace")}
              </h2>
              <p className="text-slate-600 mt-2">
                {t("investor.marketplaceDesc")}
              </p>
            </div>

            <div className="p-6">
              {loading ? (
                <div className="animate-pulse space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-24 bg-gray-100 rounded-xl"></div>
                  ))}
                </div>
              ) : opportunities.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  No invoices available for funding. Create one from the SME dashboard!
                </div>
              ) : (
                <div className="grid gap-4">
                  {opportunities.map((inv) => (
                    <div
                      key={inv.id}
                      className="border border-slate-100 rounded-xl p-4 flex items-start justify-between gap-4 flex-col md:flex-row hover:border-primary transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-lg font-heading font-bold text-navy">
                            Invoice #{inv.id}
                          </p>
                          <span className={`text-xs px-2 py-1 rounded-full ${getRiskBadge(inv.riskLevel || 'Medium')}`}>
                            {inv.riskLevel || 'Medium'} Risk
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 mt-1">
                          {inv.country} · {inv.industry} · {inv.payerName}
                        </p>
                        <div className="flex gap-4 mt-2">
                          <div>
                            <p className="text-xs text-slate-500">Invoice Amount</p>
                            <p className="font-bold text-navy">${inv.amount.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500">Advance (90%)</p>
                            <p className="font-bold text-green-600">${inv.advanceAmount.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500">Your Fee (10%)</p>
                            <p className="font-bold text-accent">${(inv.amount - inv.advanceAmount).toLocaleString()}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Link
                          href={`/investor/invoices/${inv.id}`}
                          className="bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-navy transition-colors"
                        >
                          {t("common.view")}
                        </Link>
                        <Link
                          href={`/investor/invoices/${inv.id}`}
                          className="bg-accent text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors"
                        >
                          {t("investor.fund")} →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* How It Works */}
          <div className="mt-8 bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-heading font-bold text-navy mb-4">How Funding Works</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center p-4">
                <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center mx-auto font-bold">1</div>
                <p className="mt-2 text-sm text-slate-600">Browse verified invoices from LATAM SMEs</p>
              </div>
              <div className="text-center p-4">
                <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center mx-auto font-bold">2</div>
                <p className="mt-2 text-sm text-slate-600">Fund with USDC - 90% goes to SME as advance</p>
              </div>
              <div className="text-center p-4">
                <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center mx-auto font-bold">3</div>
                <p className="mt-2 text-sm text-slate-600">Corporate client pays via Anchor (fiat→USDC)</p>
              </div>
              <div className="text-center p-4">
                <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center mx-auto font-bold">4</div>
                <p className="mt-2 text-sm text-slate-600">Smart contract auto-distributes: you get principal + 10% fee</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
