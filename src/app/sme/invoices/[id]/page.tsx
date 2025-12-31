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

export default function SmeInvoiceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const { t } = useLocale();

  const stage = normalizeStage(searchParams.get("stage"));
  const payer = searchParams.get("payer") ?? "Cliente Corporativo";
  const country = searchParams.get("country") ?? "CO";
  const amount = Number(searchParams.get("amount") ?? "10000");

  const lenderShare = Math.floor(amount * 0.9);
  const smeShare = amount - lenderShare;

  const nextForFunding = `/sme/invoices/${id}?stage=funded&payer=${encodeURIComponent(payer)}&country=${encodeURIComponent(country)}&amount=${encodeURIComponent(String(amount))}`;
  const nextForSettlement = `/sme/invoices/${id}?stage=settled&payer=${encodeURIComponent(payer)}&country=${encodeURIComponent(country)}&amount=${encodeURIComponent(String(amount))}`;

  const stageLabel =
    stage === "created" ? t("stage.created") : stage === "funded" ? t("stage.funded") : t("stage.settled");

  return (
    <div className="min-h-screen font-sans bg-lightblue">
      <Header />

      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="flex items-start justify-between gap-6 flex-col md:flex-row">
            <div>
              <p className="text-sm text-slate-600">{t("label.invoice")}</p>
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-navy">
                #{id}
              </h1>
              <p className="text-primary mt-2">
                Payer: <span className="font-medium text-navy">{payer}</span> · {country} · {amount.toLocaleString()} USDC
              </p>
            </div>

            <Link href="/sme" className="text-primary font-medium">
              {t("invoiceDetail.backSme")}
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <div className="bg-white rounded-2xl p-6 shadow-md border-l-4 border-accent">
              <p className="text-sm text-slate-600">{t("invoiceDetail.stage")}</p>
              <p className="text-2xl font-heading font-bold text-navy mt-2">
                {stageLabel}
              </p>
              <p className="text-sm text-slate-600 mt-2">
                Demo uses URL state: <span className="font-mono">stage={stage}</span>
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md border-l-4 border-accent">
              <p className="text-sm text-slate-600">{t("invoiceDetail.bankAccount")}</p>
              <p className="text-2xl font-heading font-bold text-navy mt-2">CLABE/CBU</p>
              <p className="text-sm text-slate-600 mt-2">
                {t("invoiceDetail.anchorNote")}
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md border-l-4 border-accent">
              <p className="text-sm text-slate-600">{t("invoiceDetail.advance")}</p>
              <p className="text-2xl font-heading font-bold text-navy mt-2">
                {lenderShare.toLocaleString()} USDC
              </p>
              <p className="text-sm text-slate-600 mt-2">
                {t("invoiceDetail.fromLiquidity")}
              </p>
            </div>
          </div>

          <div className="mt-10 bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-heading font-bold text-navy">{t("invoiceDetail.demoFlow")}</h2>
            <p className="text-slate-600 mt-2">{t("invoiceDetail.demoFlowDesc")}</p>

            <div className="mt-6 flex gap-3 flex-wrap">
              {stage === "created" ? (
                <Link
                  href={nextForFunding}
                  className="bg-primary text-white font-bold py-2 px-4 rounded-lg"
                >
                  {t("invoiceDetail.simFunding")}
                </Link>
              ) : null}

              {stage === "funded" ? (
                <Link
                  href={nextForSettlement}
                  className="bg-accent text-white font-bold py-2 px-4 rounded-lg"
                >
                  {t("invoiceDetail.simSettle")}
                </Link>
              ) : null}

              <Link
                href={`/investor/invoices/${id}?stage=${encodeURIComponent(stage)}&payer=${encodeURIComponent(payer)}&country=${encodeURIComponent(country)}&amount=${encodeURIComponent(String(amount))}`}
                className="text-primary font-medium"
              >
                {t("invoiceDetail.viewInvestor")}
              </Link>
            </div>

            {stage === "settled" ? (
              <div className="mt-8 p-5 rounded-xl bg-lightblue">
                <p className="text-sm text-slate-700">
                  {t("invoiceDetail.settlementTitle")}
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-white rounded-xl p-4 border border-slate-100">
                    <p className="text-sm text-slate-600">{t("invoiceDetail.lender")}</p>
                    <p className="text-2xl font-heading font-bold text-navy mt-1">
                      {lenderShare.toLocaleString()} USDC
                    </p>
                    <p className="text-xs text-slate-600 mt-1">{t("invoiceDetail.lenderNote")}</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-slate-100">
                    <p className="text-sm text-slate-600">{t("invoiceDetail.sme")}</p>
                    <p className="text-2xl font-heading font-bold text-navy mt-1">
                      {smeShare.toLocaleString()} USDC
                    </p>
                    <p className="text-xs text-slate-600 mt-1">{t("invoiceDetail.smeNote")}</p>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
