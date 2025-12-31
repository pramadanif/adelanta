'use client';

import React from 'react';
import { Clock, FileX, Lock, Zap, Code, Globe, ArrowRight } from 'lucide-react';
import { Reveal } from './ui/Reveal';

const PainCard: React.FC<{ icon: React.ReactNode; title: string; desc: string }> = ({ icon, title, desc }) => (
  <div className="bg-white p-8 rounded-2xl shadow-lg border-b-4 border-red-400 hover:shadow-xl transition-shadow">
    <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center text-red-500 mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-heading font-bold text-navy mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{desc}</p>
  </div>
);

const WhyStellarCard: React.FC<{ icon: React.ReactNode; title: string; desc: string }> = ({ icon, title, desc }) => (
  <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-accent hover:translate-x-2 transition-transform">
    <div className="text-primary mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-heading font-bold text-navy mb-3">{title}</h3>
    <p className="text-gray-800 text-sm leading-relaxed">{desc}</p>
  </div>
);

export const ProblemSolution: React.FC = () => {
  return (
    <>
      {/* PAIN SECTION */}
      <section id="problema" className="py-20 bg-neutral">
        <div className="container mx-auto px-4 md:px-8">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-4">
                El Problema: $900B en Capital Atrapado
              </h2>
              <p className="text-lg text-gray-600">
                SMEs de LATAM esperan <span className="font-bold text-red-500">60-90 días</span> por pagos... y eso mata sus negocios.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            <Reveal delay={100}>
              <PainCard 
                icon={<Clock size={32} />}
                title="Espera Prolongada"
                desc="Esperar 60-90 días para cobrar es normal en la industria, pero inaceptable para tu flujo de caja diario."
              />
            </Reveal>
            <Reveal delay={200}>
              <PainCard 
                icon={<FileX size={32} />}
                title="Factoring Antiguo"
                desc="El factoring tradicional requiere papeleo físico complejo que tus clientes corporativos simplemente rechazan."
              />
            </Reveal>
            <Reveal delay={300}>
              <PainCard 
                icon={<Lock size={32} />}
                title="Brecha de Confianza"
                desc="Los prestamistas no confían en si la PYME pagará cuando finalmente reciba el dinero. El riesgo es alto."
              />
            </Reveal>
          </div>
          
          <div className="mt-12 text-center">
             <span className="inline-block bg-navy text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg">
                Déficit de financiamiento en LATAM: $900 Billones
             </span>
          </div>
        </div>
      </section>

      {/* SOLUTION SECTION */}
      <section id="solucion" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
            <Reveal>
              <div className="text-center mb-16">
                <span className="text-accent font-bold tracking-widest uppercase text-sm">Innovación</span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mt-2 mb-4">
                  La Solución: Factoring Programable
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Adelanta usa Smart Contracts en Stellar Soroban para crear "Self-Settling Invoices".
                  <br/><span className="font-bold text-primary">Trust is Code. No paperwork. No middle man.</span>
                </p>
              </div>
            </Reveal>

            <div className="relative">
                {/* Connecting Line for Desktop */}
                <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-lightblue via-primary to-accent transform -translate-y-1/2 z-0"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                    {[
                        { title: "Tokenize", desc: "Sube tu invoice. Adelanta lo mintea como asset digital.", step: "1" },
                        { title: "Instant Liquidity", desc: "Provider financia 90% en USDC al instante.", step: "2" },
                        { title: "Smart Settlement", desc: "Cliente paga, Anchor convierte a USDC y activa contrato.", step: "3" },
                        { title: "Auto-Split", desc: "Contract repaga al lender + fee. Tú recibes el resto.", step: "4" }
                    ].map((item, idx) => (
                        <Reveal delay={idx * 150} key={idx}>
                            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-xl text-center h-full flex flex-col items-center">
                                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl mb-4 border-4 border-white shadow-sm">
                                    {item.step}
                                </div>
                                <h3 className="text-lg font-bold text-navy mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-500">{item.desc}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* WHY STELLAR SECTION */}
      <section className="py-20 bg-lightblue">
        <div className="container mx-auto px-4 md:px-8">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy text-center mb-12">
              ¿Por qué Stellar?
              <span className="block text-xl md:text-2xl font-normal text-primary mt-2">La única blockchain lista para el mundo real en LATAM</span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            <Reveal delay={0}>
              <WhyStellarCard 
                icon={<Globe size={40} />}
                title="Anchor Interoperability"
                desc="Red de Anchors regulados (MoneyGram, Bitso, Anclap) que aceptan fiat local (MXN, COP, BRL). Clientes pagan vía banco, settlement on-chain."
              />
            </Reveal>
            <Reveal delay={150}>
              <WhyStellarCard 
                icon={<Code size={40} />}
                title="Soroban Smart Contracts"
                desc="Lógica de revenue split forzada por código. El dinero nunca toca tu wallet primero; el código asegura el repago. Confianza absoluta."
              />
            </Reveal>
            <Reveal delay={300}>
              <WhyStellarCard 
                icon={<Zap size={40} />}
                title="Low-Cost & Fast"
                desc="Minting de tokens cuesta fracciones de centavo. Finalidad en 5 segundos vs horas en otras cadenas. Ideal para facturas pequeñas."
              />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
};
