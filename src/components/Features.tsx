'use client';

import React from 'react';
import { Upload, CreditCard, Users, Shield, Briefcase, TrendingUp } from 'lucide-react';
import { Reveal } from './ui/Reveal';

const features = [
  {
    icon: <Upload className="text-white" size={24} />,
    title: "Smart Invoice Minter",
    desc: "Drag-and-drop PDF invoice → auto-generate Stellar Asset + Soroban Escrow en segundos.",
    bg: "bg-primary"
  },
  {
    icon: <CreditCard className="text-white" size={24} />,
    title: "\"Invisible\" Repayment",
    desc: "Cuenta bancaria única CLABE/CBU para el cliente corporativo. Ellos creen que pagan al banco, nosotros procesamos en Stellar.",
    bg: "bg-accent"
  },
  {
    icon: <Users className="text-white" size={24} />,
    title: "Liquidity Marketplace",
    desc: "Inversores navegan facturas verificadas y financian con 1 click usando USDC.",
    bg: "bg-navy"
  },
  {
    icon: <Shield className="text-white" size={24} />,
    title: "Reputation Passport",
    desc: "Historial on-chain construye tu score crediticio. Mejores tasas para el futuro basadas en datos reales.",
    bg: "bg-green-600"
  }
];

export const Features: React.FC = () => {
  return (
    <>
      {/* FEATURES */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <Reveal>
            <h2 className="text-3xl font-heading font-bold text-navy mb-12 text-center">Fitur Adelanta</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="group p-6 rounded-2xl bg-neutral hover:bg-white border border-transparent hover:border-gray-200 hover:shadow-xl transition-all duration-300">
                  <div className={`w-12 h-12 rounded-xl ${f.bg} flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                    {f.icon}
                  </div>
                  <h3 className="font-bold text-lg text-gray-800 mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TARGET USERS */}
      <section id="target" className="py-20 bg-gradient-to-br from-navy to-primary text-white">
        <div className="container mx-auto px-4 md:px-8">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-16">¿Para quién es Adelanta?</h2>
          </Reveal>
          
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
             {/* Primary User */}
             <Reveal delay={100}>
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 hover:bg-white/15 transition-colors">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-accent rounded-full">
                    <Briefcase size={32} />
                  </div>
                  <h3 className="text-2xl font-bold">PYMEs & Freelancers</h3>
                </div>
                <p className="text-blue-100 mb-8 text-lg">
                  Agencias de diseño, desarrolladores, proveedores B2B que trabajan con corporativos grandes pero no pueden esperar 60 días para cobrar.
                </p>
                <button className="w-full bg-white text-primary font-bold py-3 rounded-xl hover:bg-blue-50 transition-colors">
                  Daftar Como SME
                </button>
              </div>
             </Reveal>

             {/* Secondary User */}
             <Reveal delay={200}>
              <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-green-500 rounded-full">
                    <TrendingUp size={32} />
                  </div>
                  <h3 className="text-2xl font-bold">Liquidity Providers</h3>
                </div>
                <p className="text-gray-300 mb-8 text-lg">
                  Instituciones y buscadores de DeFi Yield buscando RWA (Real World Assets) respaldados por deuda corporativa real.
                </p>
                <button className="w-full border-2 border-white/30 text-white font-bold py-3 rounded-xl hover:bg-white/10 transition-colors">
                  Convertirse en LP
                </button>
              </div>
             </Reveal>
          </div>
        </div>
      </section>

      {/* SCALABILITY & IMPACT */}
      <section id="impacto" className="py-20 bg-lightblue">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
             <Reveal>
                <div>
                   <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-6">
                      Scalability & Impact: <br/><span className="text-accent">Unlock $900B Economy</span>
                   </h2>
                   <div className="space-y-6">
                      <div className="flex gap-4">
                         <div className="flex-shrink-0 mt-1">
                            <div className="w-2 h-2 rounded-full bg-navy mt-2"></div>
                         </div>
                         <p className="text-gray-700">
                            <strong className="block text-navy text-lg mb-1">Modelo Agnóstico</strong>
                            Escalable a cualquier país con un Stellar Anchor: México, Brasil, Argentina, Colombia, Perú.
                         </p>
                      </div>
                      <div className="flex gap-4">
                         <div className="flex-shrink-0 mt-1">
                            <div className="w-2 h-2 rounded-full bg-navy mt-2"></div>
                         </div>
                         <p className="text-gray-700">
                            <strong className="block text-navy text-lg mb-1">Impacto Real</strong>
                            Resuelve la causa #1 de quiebra de PYMEs. Inyecta millones de regreso a la economía real, creando empleos y estabilidad.
                         </p>
                      </div>
                   </div>
                </div>
             </Reveal>
             
             <Reveal delay={200}>
                <div className="bg-white p-8 rounded-2xl shadow-xl">
                   <div className="text-center border-b border-gray-100 pb-6 mb-6">
                      <div className="text-5xl font-extrabold text-navy mb-2">$900B</div>
                      <div className="text-gray-500 uppercase tracking-wide text-sm font-semibold">Financing Gap en LATAM</div>
                   </div>
                   <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                         <div className="text-3xl font-bold text-accent">5 Países</div>
                         <div className="text-xs text-gray-400">Objetivo Inicial</div>
                      </div>
                      <div>
                         <div className="text-3xl font-bold text-accent">1M+</div>
                         <div className="text-xs text-gray-400">SMEs Potenciales</div>
                      </div>
                   </div>
                </div>
             </Reveal>
          </div>
        </div>
      </section>
    </>
  );
};
