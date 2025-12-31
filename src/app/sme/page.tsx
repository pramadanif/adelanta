"use client";

import Link from "next/link";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLocale } from "@/components/LocaleProvider";

const demoInvoices = [
  {
    id: "101",
    payer: "Cliente Corporativo",
    country: "CO",
    amount: 10000,
    currency: "USDC",
    status: "Created",
    cashAvailable: 9000,
  },
  {
    id: "102",
    payer: "Retail Chain",
    country: "MX",
    amount: 2500,
    currency: "USDC",
    status: "Funded",
    cashAvailable: 0,
  },
];

export default function SmeDashboardPage() {
  const { t } = useLocale();

  return (
    <div className="min-h-screen font-sans bg-lightblue">
      <Header />

      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-start justify-between gap-6 flex-col md:flex-row">
            <div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-navy">{t("sme.title")}</h1>
              <p className="text-primary mt-2">{t("sme.subtitle")}</p>
            </div>

            <Link
              href="/sme/invoices/new"
              className="bg-accent text-white font-bold py-3 px-6 rounded-full shadow-md"
            >
              {t("sme.upload")}
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <div className="bg-white rounded-2xl p-6 shadow-md border-l-4 border-accent">
              <p className="text-sm text-primary font-medium">{t("sme.cashAvailable")}</p>
              <p className="text-3xl font-heading font-bold text-navy mt-2">
                9,000 USDC
              </p>
              <p className="text-sm text-slate-600 mt-2">
                {t("sme.card.cashNote")}
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md border-l-4 border-accent">
              <p className="text-sm text-primary font-medium">{t("sme.activeInvoices")}</p>
              <p className="text-3xl font-heading font-bold text-navy mt-2">2</p>
              <p className="text-sm text-slate-600 mt-2">{t("sme.card.activeNote")}</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md border-l-4 border-accent">
              <p className="text-sm text-primary font-medium">{t("sme.reputation")}</p>
              <p className="text-3xl font-heading font-bold text-navy mt-2">A</p>
              <p className="text-sm text-slate-600 mt-2">
                {t("sme.card.reputationNote")}
              </p>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-xl font-heading font-bold text-navy">
                {t("sme.yourInvoices")}
              </h2>
              <Link href="/investor" className="text-primary font-medium">
                {t("sme.goInvestor")}
              </Link>
            </div>

            <div className="p-6">
              <div className="grid gap-4">
                {demoInvoices.map((inv) => (
                  <div
                    key={inv.id}
                    className="border border-slate-100 rounded-xl p-4 flex items-start justify-between gap-4 flex-col md:flex-row"
                  >
                    <div>
                      <p className="text-sm text-slate-600">{t("label.invoice")}</p>
                      <p className="text-lg font-heading font-bold text-navy">
                        #{inv.id} · {inv.payer}
                      </p>
                      <p className="text-sm text-slate-600 mt-1">
                        {inv.country} · {inv.amount.toLocaleString()} {inv.currency}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-primary bg-lightblue px-3 py-1 rounded-full">
                        {inv.status}
                      </span>
                      <Link
                        href={`/sme/invoices/${inv.id}?stage=created`}
                        className="bg-primary text-white font-bold py-2 px-4 rounded-lg"
                      >
                        {t("common.view")}
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
