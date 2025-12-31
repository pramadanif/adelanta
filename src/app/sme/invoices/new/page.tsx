"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLocale } from "@/components/LocaleProvider";
import { createInvoice } from "@/lib/api";

const DEMO_SME_ID = "sme-maria";

export default function NewInvoicePage() {
  const router = useRouter();
  const { t } = useLocale();
  const [amount, setAmount] = useState("10000");
  const [payer, setPayer] = useState("Cliente Corporativo");
  const [country, setCountry] = useState("CO");
  const [industry, setIndustry] = useState("DESIGN");
  const [dueDate, setDueDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 60); // 60 days from now
    return date.toISOString().split('T')[0];
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cashAvailable = useMemo(() => {
    const parsed = Number(amount);
    if (!Number.isFinite(parsed)) return 0;
    return Math.floor(parsed * 0.9);
  }, [amount]);

  async function handleSubmit() {
    try {
      setLoading(true);
      setError(null);
      
      const invoice = await createInvoice({
        smeId: DEMO_SME_ID,
        payerName: payer,
        amount: Number(amount),
        dueDate: dueDate,
        country: country,
        industry: industry,
        feeBps: 200 // 2% fee
      });
      
      // Redirect to the created invoice
      router.push(`/sme/invoices/${invoice.id}`);
    } catch (err) {
      console.error('Failed to create invoice:', err);
      setError((err as Error).message || 'Failed to create invoice. Is the backend running?');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen font-sans bg-lightblue">
      <Header />

      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-navy">{t("invoiceNew.title")}</h1>
          <p className="text-primary mt-2">{t("invoiceNew.subtitle")}</p>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <div className="mt-8 bg-white rounded-2xl shadow-md p-6">
            <label className="block text-sm font-medium text-navy">{t("invoiceNew.pdf")}</label>
            <input
              type="file"
              accept="application/pdf"
              className="mt-2 w-full text-sm"
            />

            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div>
                <label className="block text-sm font-medium text-navy">{t("invoiceNew.amount")}</label>
                <input
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  inputMode="decimal"
                  className="mt-2 w-full border border-slate-200 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy">{t("invoiceNew.country")}</label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="mt-2 w-full border border-slate-200 rounded-lg px-3 py-2"
                >
                  <option value="CO">Colombia (COP)</option>
                  <option value="MX">México (MXN)</option>
                  <option value="BR">Brasil (BRL)</option>
                  <option value="AR">Argentina (ARS)</option>
                  <option value="PE">Perú (PEN)</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-navy">{t("invoiceNew.payer")}</label>
                <input
                  value={payer}
                  onChange={(e) => setPayer(e.target.value)}
                  className="mt-2 w-full border border-slate-200 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy">Due Date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="mt-2 w-full border border-slate-200 rounded-lg px-3 py-2"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-navy">Industry</label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="mt-2 w-full border border-slate-200 rounded-lg px-3 py-2"
              >
                <option value="DESIGN">Design / Creative</option>
                <option value="TECH">Technology / Software</option>
                <option value="MANUFACTURING">Manufacturing</option>
                <option value="RETAIL">Retail / Commerce</option>
                <option value="SERVICES">Professional Services</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-lightblue">
              <p className="text-sm text-slate-700">
                {t("invoiceNew.cashInstant")}{" "}
                <span className="font-bold text-navy">{cashAvailable.toLocaleString()} USDC</span>
              </p>
              <p className="text-xs text-slate-600 mt-1">
                {t("invoiceNew.cashNote")}
              </p>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading || !amount || !payer}
              className="mt-6 bg-accent text-white font-bold py-3 px-6 rounded-full shadow-md hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '⏳ Creating...' : t("invoiceNew.create")}
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
