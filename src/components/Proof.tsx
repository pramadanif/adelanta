'use client';

import React, { useState } from 'react';
import { CheckCircle, Play, Star, User } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import { TimelineItem, Testimonial } from '@/types';
import { useLocale } from '@/components/LocaleProvider';

// DATA
const timelineData: TimelineItem[] = [
  { quarter: 'Q1 2025', title: 'Smart Contracts', description: 'Desarrollo de Soroban Contracts & Integración de Anchors' },
  { quarter: 'Q2 2025', title: 'Beta Launch', description: 'Lanzamiento con primeras 100 SMEs en México' },
  { quarter: 'Q3 2025', title: 'Expansión', description: 'Apertura de operaciones en Colombia y Brasil' },
  { quarter: 'Q4 2025', title: 'Institucional', description: 'Partnerships con Lenders Institucionales y DeFi Protocols' },
];

// SUB-COMPONENTS
const Timeline: React.FC = () => (
  <section className="py-20 bg-white overflow-hidden">
    <div className="container mx-auto px-4">
      <TimelineTitle />
      <div className="relative border-l-4 border-lightblue ml-6 md:ml-auto md:mr-auto md:w-2 bg-lightblue h-full absolute left-1/2"></div>
      <div className="space-y-12 relative">
        {timelineData.map((item, idx) => (
          <Reveal key={idx} width="100%">
            <div className={`flex flex-col md:flex-row items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              <div className="w-full md:w-1/2 p-4">
                <div className={`bg-neutral p-6 rounded-xl shadow-md border-t-4 border-accent ${idx % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                  <span className="text-accent font-bold text-sm tracking-widest uppercase">{item.quarter}</span>
                  <h3 className="text-xl font-bold text-navy mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </div>
              <div className="w-8 h-8 bg-primary rounded-full border-4 border-white shadow absolute left-4 md:left-1/2 transform md:-translate-x-1/2 mt-4 md:mt-0 z-10"></div>
              <div className="w-full md:w-1/2"></div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const TimelineTitle: React.FC = () => {
  const { t } = useLocale();
  return (
    <h2 className="text-3xl font-heading font-bold text-navy text-center mb-16">{t('proof.roadmap')}</h2>
  );
};

const Comparison: React.FC = () => (
  <section className="py-20 bg-neutral">
    <div className="container mx-auto px-4 md:px-8">
      <Reveal>
        <ComparisonTitle />
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-lg rounded-xl overflow-hidden min-w-[600px]">
            <thead className="bg-navy text-white">
              <tr>
                <ComparisonHeader />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { feat: "Velocidad de Pago", trad: "30-90 días", adelanta: "< 24 Horas" },
                { feat: "Costo de Proceso", trad: "Alto (Admin + Bank fees)", adelanta: "Bajo (Gas fees < $0.01)" },
                { feat: "Papeleo", trad: "Físico y complejo", adelanta: "0% - 100% Digital" },
                { feat: "Confianza", trad: "Basada en reputación offline", adelanta: "Enforced by Code" },
              ].map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="py-4 px-6 font-medium text-navy">{row.feat}</td>
                  <td className="py-4 px-6 text-center text-gray-500">{row.trad}</td>
                  <td className="py-4 px-6 text-center font-bold text-primary bg-blue-50/30 flex justify-center items-center gap-2">
                    <CheckCircle size={16} className="text-accent" /> {row.adelanta}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </div>
  </section>
);

const ComparisonTitle: React.FC = () => {
  const { t } = useLocale();
  return (
    <h2 className="text-3xl font-heading font-bold text-navy text-center mb-12">{t('proof.compareTitle')}</h2>
  );
};

const ComparisonHeader: React.FC = () => {
  const { t } = useLocale();
  return (
    <>
      <th className="py-4 px-6 text-left">{t('proof.table.feature')}</th>
      <th className="py-4 px-6 text-center text-gray-300 font-normal">{t('proof.table.traditional')}</th>
      <th className="py-4 px-6 text-center bg-primary font-bold text-accent text-lg w-1/3">{t('proof.table.adelanta')}</th>
    </>
  );
};

const Demo: React.FC = () => (
  <section id="demo" className="py-20 bg-navy text-white text-center">
    <div className="container mx-auto px-4">
      <Reveal>
        <DemoTitle />
        <div className="max-w-4xl mx-auto aspect-video bg-gray-900 rounded-2xl shadow-2xl flex items-center justify-center border border-white/10 group cursor-pointer relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20"></div>
           {/* Placeholder for Video/Gif */}
           <div className="text-center z-10 group-hover:scale-110 transition-transform duration-300">
             <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 pl-1 shadow-lg shadow-accent/50">
               <Play size={40} fill="white" />
             </div>
             <DemoCta />
           </div>
        </div>
      </Reveal>
    </div>
  </section>
);

const DemoTitle: React.FC = () => {
  const { t } = useLocale();
  return <h2 className="text-3xl font-heading font-bold mb-8">{t('proof.demoTitle')}</h2>;
};

const DemoCta: React.FC = () => {
  const { t } = useLocale();
  return <p className="font-semibold text-lg">{t('proof.demoCta')}</p>;
};

const Testimonials: React.FC = () => {
  const { t } = useLocale();
  return (
  <section className="py-20 bg-white">
     <div className="container mx-auto px-4 text-center">
  <TestimonialsTitle />
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
           <Reveal delay={0}>
              <div className="bg-neutral p-8 rounded-xl relative">
                 <div className="text-accent mb-4"><Star fill="#E38E49" size={24} /></div>
                 <p className="text-lg italic text-gray-700 mb-6">"{t('proof.mariaTesto')}"</p>
                 <div className="flex items-center justify-center gap-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-500"><User size={20} /></div>
                    <div className="text-left">
                       <div className="font-bold text-navy text-sm">{t('proof.mariaAuthor')}</div>
                       <div className="text-xs text-gray-500">{t('proof.mariaRole')}</div>
                    </div>
                 </div>
              </div>
           </Reveal>
           <Reveal delay={100}>
              <div className="bg-neutral p-8 rounded-xl relative">
                 <div className="text-accent mb-4"><Star fill="#E38E49" size={24} /></div>
                 <p className="text-lg italic text-gray-700 mb-6">"{t('proof.carlosTesto')}"</p>
                 <div className="flex items-center justify-center gap-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-500"><User size={20} /></div>
                    <div className="text-left">
                       <div className="font-bold text-navy text-sm">{t('proof.carlosAuthor')}</div>
                       <div className="text-xs text-gray-500">{t('proof.carlosRole')}</div>
                    </div>
                 </div>
              </div>
           </Reveal>
        </div>
     </div>
  </section>
  );
};

const TestimonialsTitle: React.FC = () => {
  const { t } = useLocale();
  return <h2 className="text-3xl font-heading font-bold text-navy mb-12">{t('proof.testimonials')}</h2>;
};

const EarlyTraction: React.FC = () => {
  const { t } = useLocale();
  return (
    <section className="py-16 bg-gradient-to-r from-accent/5 to-primary/5 border-y border-gray-200">
      <div className="container mx-auto px-4">
        <Reveal>
          <div className="text-center">
            <p className="text-sm uppercase tracking-widest font-bold text-primary mb-2">Early Traction</p>
            <p className="text-lg md:text-xl font-semibold text-navy">{t('proof.earlyTracking')}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export const Proof: React.FC = () => (
  <>
    <Demo />
    <Comparison />
    <EarlyTraction />
    <Timeline />
    <Testimonials />
  </>
);
