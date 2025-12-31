'use client';

import React, { useState } from 'react';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import { FAQItem, PricingTier } from '@/types';

// DATA
const faqData: FAQItem[] = [
  { question: "¿Qué es Stellar Soroban?", answer: "Stellar es una blockchain optimizada para pagos. Soroban es su plataforma de contratos inteligentes que permite programar lógica financiera (como el factoring) de forma segura y rápida." },
  { question: "¿Necesito cripto para usar Adelanta?", answer: "No. Puedes operar con stablecoins (USDC) que se canjean 1:1 por dólares, o usar nuestros partners (Anchors) para recibir moneda local en tu banco." },
  { question: "¿Cuánto tarda el financiamiento?", answer: "Una vez verificada la factura (usualmente automatizado), la liquidez es enviada en minutos a tu wallet o cuenta." },
  { question: "¿Qué pasa si el cliente no paga?", answer: "Adelanta utiliza un sistema de reputación on-chain. Si bien el riesgo existe, los contratos incentivan el pago y penalizan el score del deudor." }
];

const pricingData: PricingTier[] = [
  { name: "SME Standard", fee: "1-5%", features: ["Plataforma Gratuita", "Liquidez en 24h", "Soporte Básico"], cta: "Empezar" },
  { name: "SME Premium", fee: "0.5-3%", features: ["Liquidez Instantánea", "Analytics Dashboard", "Soporte Prioritario", "Fees reducidos"], recommended: true, cta: "Mejorar" },
  { name: "Institutional", fee: "Custom", features: ["API Access", "Custom Risk Parameters", "White Glove Onboarding"], cta: "Contactar" }
];

// SUB-COMPONENTS
const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-neutral">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl font-heading font-bold text-navy text-center mb-12">Preguntas Frecuentes</h2>
        <div className="space-y-4">
          {faqData.map((item, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button 
                className="w-full flex justify-between items-center p-5 text-left font-bold text-navy hover:bg-gray-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                {item.question}
                {openIndex === idx ? <ChevronUp size={20} className="text-accent" /> : <ChevronDown size={20} className="text-gray-400" />}
              </button>
              <div className={`px-5 text-gray-600 overflow-hidden transition-all duration-300 ${openIndex === idx ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
                {item.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Pricing: React.FC = () => (
  <section className="py-20 bg-white">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-heading font-bold text-navy text-center mb-4">Precios Transparentes</h2>
      <p className="text-center text-gray-500 mb-12">Sin costos ocultos. Solo pagas cuando recibes liquidez.</p>
      
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {pricingData.map((tier, idx) => (
          <Reveal key={idx} delay={idx * 100}>
            <div className={`relative p-8 rounded-2xl border ${tier.recommended ? 'border-accent shadow-2xl bg-white scale-105 z-10' : 'border-gray-200 bg-neutral shadow-sm'} flex flex-col h-full`}>
              {tier.recommended && <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-accent text-white px-4 py-1 rounded-full text-xs font-bold tracking-wide">RECOMENDADO</div>}
              <h3 className="text-xl font-bold text-navy mb-2">{tier.name}</h3>
              <div className="text-3xl font-extrabold text-primary mb-6">{tier.fee} <span className="text-sm font-normal text-gray-500">/ invoice</span></div>
              <ul className="space-y-3 mb-8 flex-grow">
                {tier.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <Check size={16} className="text-green-500" /> {f}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-xl font-bold transition-all ${tier.recommended ? 'bg-accent text-white hover:bg-orange-600' : 'bg-white border-2 border-primary text-primary hover:bg-blue-50'}`}>
                {tier.cta}
              </button>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const CTA: React.FC = () => (
  <section id="cta" className="py-24 bg-gradient-to-r from-navy to-primary text-center text-white">
    <div className="container mx-auto px-4">
      <Reveal>
        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">¿Siap Unlock Liquidity Instant?</h2>
        <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
          Bergabunglah dengan ribuan SMEs di LATAM yang sudah menggunakan Adelanta para crecer sin límites.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="bg-accent hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 text-lg w-full sm:w-auto">
            Mulai Sekarang - Daftar SME
          </button>
          <button className="bg-transparent border-2 border-white hover:bg-white/10 text-white font-bold py-4 px-10 rounded-full transition-all text-lg w-full sm:w-auto">
            Jadi Liquidity Provider
          </button>
        </div>
      </Reveal>
    </div>
  </section>
);

export const Conversion: React.FC = () => (
  <>
    <Pricing />
    <FAQ />
    <CTA />
  </>
);
