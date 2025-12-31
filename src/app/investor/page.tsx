"use client";

import Link from "next/link";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLocale } from "@/components/LocaleProvider";

const opportunities = [
  {
    id: "101",
    industry: "Services",
    risk: "Low",
    country: "CO",
    amount: 10000,
    advance: 9000,
  },
  {
    id: "102",
    industry: "Retail",
    risk: "Medium",
    country: "MX",
    amount: 2500,
    advance: 2250,
  },
];

export default function InvestorDashboardPage() {
  const { t } = useLocale();

  return (
    <div className="min-h-screen font-sans bg-lightblue">
      <Header />

      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-start justify-between gap-6 flex-col md:flex-row">
            <div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-navy">{t("investor.title")}</h1>
              <p className="text-primary mt-2">{t("investor.subtitle")}</p>
            </div>

            <Link href="/sme" className="text-primary font-medium">
              {t("investor.backSme")}
            </Link>
          </div>

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
              <div className="grid gap-4">
                {opportunities.map((inv) => (
                  <div
                    key={inv.id}
                    className="border border-slate-100 rounded-xl p-4 flex items-start justify-between gap-4 flex-col md:flex-row"
                  >
                    <div>
                      <p className="text-sm text-slate-600">{t("investor.opportunity")}</p>
                      <p className="text-lg font-heading font-bold text-navy">
                        Invoice #{inv.id}
                      </p>
                      <p className="text-sm text-slate-600 mt-1">
                        {inv.country} · {inv.industry} · Risk: {inv.risk}
                      </p>
                      <p className="text-sm text-slate-600 mt-1">
                        {t("investor.amount")}: {inv.amount.toLocaleString()} USDC · {t("investor.advance")}: {inv.advance.toLocaleString()} USDC
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <Link
                        href={`/investor/invoices/${inv.id}?stage=created&amount=${encodeURIComponent(String(inv.amount))}&country=${encodeURIComponent(inv.country)}`}
                        className="bg-primary text-white font-bold py-2 px-4 rounded-lg"
                      >
                        {t("common.view")}
                      </Link>
                      <Link
                        href={`/investor/invoices/${inv.id}?stage=funded&amount=${encodeURIComponent(String(inv.amount))}&country=${encodeURIComponent(inv.country)}`}
                        className="bg-accent text-white font-bold py-2 px-4 rounded-lg"
                      >
                        {t("investor.fund")}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
