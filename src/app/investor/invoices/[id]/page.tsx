"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLocale } from "@/components/LocaleProvider";

type Stage = "created" | "funded" | "settled";

function normalizeStage(value: string | null): Stage {
  if (value === "funded" || value === "settled" || value === "created") return value;
  return "created";
}

export default function InvestorInvoiceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const { t } = useLocale();

  const stage = normalizeStage(searchParams.get("stage"));
  const payer = searchParams.get("payer") ?? "Cliente Corporativo";
  const country = searchParams.get("country") ?? "CO";
  const amount = Number(searchParams.get("amount") ?? "10000");

  const advance = Math.floor(amount * 0.9);

  const nextForFunding = `/investor/invoices/${id}?stage=funded&payer=${encodeURIComponent(payer)}&country=${encodeURIComponent(country)}&amount=${encodeURIComponent(String(amount))}`;
  const linkToSmeView = `/sme/invoices/${id}?stage=${encodeURIComponent(stage)}&payer=${encodeURIComponent(payer)}&country=${encodeURIComponent(country)}&amount=${encodeURIComponent(String(amount))}`;

  return (
    <div className="min-h-screen font-sans bg-lightblue">
      <Header />

      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="flex items-start justify-between gap-6 flex-col md:flex-row">
            <div>
              <p className="text-sm text-slate-600">{t("investor.opportunity")}</p>
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-navy">
                {t("label.invoice")} #{id}
              </h1>
              <p className="text-primary mt-2">
                {country} · {amount.toLocaleString()} USDC · {t("investor.advance")}: {advance.toLocaleString()} USDC
              </p>
            </div>

            <Link href="/investor" className="text-primary font-medium">
              {t("investorInvoice.back")}
            </Link>
          </div>

          <div className="mt-10 bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-heading font-bold text-navy">
              {t("investorInvoice.fundTitle")}
            </h2>
            <p className="text-slate-600 mt-2">
              {t("investorInvoice.fundDesc")}
            </p>

            <div className="mt-6 flex items-center gap-3 flex-wrap">
              {stage !== "funded" ? (
                <Link
                  href={nextForFunding}
                  className="bg-accent text-white font-bold py-2 px-4 rounded-lg"
                >
                  {t("investorInvoice.fundWith")}
                </Link>
              ) : (
                <span className="text-sm font-medium text-primary bg-lightblue px-3 py-1 rounded-full">
                  {t("investorInvoice.funded")}
                </span>
              )}

              <Link href={linkToSmeView} className="text-primary font-medium">
                {t("investorInvoice.viewSme")}
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
