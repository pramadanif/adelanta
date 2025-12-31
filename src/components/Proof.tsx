'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle, Play, Star, User, ArrowRight, Briefcase, TrendingUp, ExternalLink, Code } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import { useLocale } from '@/components/LocaleProvider';
import { CONTRACT_ID, getContractExplorerUrl } from '@/lib/stellar';

// DATA - Uses translation keys for i18n support
const getRoadmapData = (t: (key: string) => string) => [
  { 
    phase: t('roadmap.phase1'),
    quarter: 'Q4 2025', 
    title: t('roadmap.phase1Title'), 
    status: 'complete' as const,
    items: [
      t('roadmap.phase1Item1'),
      t('roadmap.phase1Item2'),
      t('roadmap.phase1Item3'),
      t('roadmap.phase1Item4'),
      t('roadmap.phase1Item5'),
      t('roadmap.phase1Item6'),
    ]
  },
  { 
    phase: t('roadmap.phase2'),
    quarter: 'Q1 2026', 
    title: t('roadmap.phase2Title'), 
    status: 'upcoming' as const,
    items: [
      t('roadmap.phase2Item1'),
      t('roadmap.phase2Item2'),
      t('roadmap.phase2Item3'),
      t('roadmap.phase2Item4'),
    ]
  },
  { 
    phase: t('roadmap.phase3'),
    quarter: 'Q2 2026', 
    title: t('roadmap.phase3Title'), 
    status: 'upcoming' as const,
    items: [
      t('roadmap.phase3Item1'),
      t('roadmap.phase3Item2'),
      t('roadmap.phase3Item3'),
      t('roadmap.phase3Item4'),
    ]
  },
  { 
    phase: t('roadmap.phase4'),
    quarter: 'Q3-Q4 2026', 
    title: t('roadmap.phase4Title'), 
    status: 'upcoming' as const,
    items: [
      t('roadmap.phase4Item1'),
      t('roadmap.phase4Item2'),
      t('roadmap.phase4Item3'),
      t('roadmap.phase4Item4'),
    ]
  },
];

// Demo Links Section
const DemoLinks: React.FC = () => {
  const { t } = useLocale();
  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4 md:px-8">
        <Reveal>
          <div className="text-center mb-12">
            <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-green-700 text-xs font-bold tracking-wider uppercase mb-4">
              🚀 Live Demo
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-4">
              {t('demo.title')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('demo.subtitle')}
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* SME Dashboard */}
          <Reveal delay={0}>
            <Link href="/sme" className="block h-full">
              <div className="bg-white p-6 rounded-2xl border-2 border-transparent hover:border-primary shadow-lg hover:shadow-xl transition-all h-full flex flex-col">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <Briefcase className="text-primary" size={28} />
                </div>
                <h3 className="text-xl font-bold text-navy mb-2">{t('demo.smeTitle')}</h3>
                <p className="text-gray-500 text-sm mb-4 flex-grow">{t('demo.smeDesc')}</p>
                <div className="flex items-center text-primary font-semibold text-sm">
                  {t('demo.tryIt')} <ArrowRight size={16} className="ml-1" />
                </div>
              </div>
            </Link>
          </Reveal>

          {/* Investor Dashboard */}
          <Reveal delay={100}>
            <Link href="/investor" className="block h-full">
              <div className="bg-white p-6 rounded-2xl border-2 border-transparent hover:border-accent shadow-lg hover:shadow-xl transition-all h-full flex flex-col">
                <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                  <TrendingUp className="text-accent" size={28} />
                </div>
                <h3 className="text-xl font-bold text-navy mb-2">{t('demo.investorTitle')}</h3>
                <p className="text-gray-500 text-sm mb-4 flex-grow">{t('demo.investorDesc')}</p>
                <div className="flex items-center text-accent font-semibold text-sm">
                  {t('demo.tryIt')} <ArrowRight size={16} className="ml-1" />
                </div>
              </div>
            </Link>
          </Reveal>

          {/* Smart Contract */}
          <Reveal delay={200}>
            <a 
              href={getContractExplorerUrl()} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block h-full"
            >
              <div className="bg-gradient-to-br from-navy to-primary p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all text-white h-full flex flex-col">
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                  <Code className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-bold mb-2">{t('demo.contractTitle')}</h3>
                <p className="text-blue-100 text-sm mb-3 flex-grow">{t('demo.contractDesc')}</p>
                <div className="bg-white/10 p-3 rounded-lg mb-4">
                  <p className="text-xs text-blue-200 mb-1">Contract ID:</p>
                  <p className="font-mono text-xs truncate">{CONTRACT_ID}</p>
                </div>
                <div className="flex items-center text-accent font-semibold text-sm">
                  {t('demo.viewExplorer')} <ExternalLink size={14} className="ml-1" />
                </div>
              </div>
            </a>
          </Reveal>
        </div>

        {/* Quick Actions */}
        <Reveal delay={300}>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link 
              href="/sme/invoices/new"
              className="inline-flex items-center gap-2 bg-primary hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-all shadow-lg"
            >
              {t('demo.createInvoice')} <ArrowRight size={18} />
            </Link>
            <a 
              href="https://stellar.expert/explorer/testnet/contract/CATMUHWQCGIWXC7A4TMQTYFY3V7HSS44TEMNLYHMDBMQ3V3SFXYFI4L5"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white border-2 border-navy text-navy hover:bg-navy hover:text-white font-bold py-3 px-6 rounded-full transition-all"
            >
              {t('demo.viewContract')} <ExternalLink size={18} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

// SUB-COMPONENTS
const Timeline: React.FC = () => {
  const { t } = useLocale();
  const roadmapData = getRoadmapData(t);
  
  return (
    <section className="py-20 bg-gradient-to-b from-white to-neutral overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <Reveal>
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase mb-4">
              {t('roadmap.badge')}
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-4">{t('proof.roadmap')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{t('roadmap.subtitle')}</p>
          </div>
        </Reveal>

        {/* Timeline Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roadmapData.map((phase, idx) => (
            <Reveal key={idx} delay={idx * 100}>
              <div className={`relative p-6 rounded-2xl border-2 h-full flex flex-col ${
                phase.status === 'complete' 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-white border-gray-200 hover:border-primary'
              } transition-all duration-300 hover:shadow-xl`}>
                {/* Status Badge */}
                <div className={`absolute -top-3 left-4 px-3 py-1 rounded-full text-xs font-bold ${
                  phase.status === 'complete'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {phase.status === 'complete' ? t('roadmap.complete') : t('roadmap.upcoming')}
                </div>

                {/* Phase Header */}
                <div className="mt-2 mb-4">
                  <span className="text-accent font-bold text-xs tracking-widest uppercase">{phase.phase}</span>
                  <h3 className="text-xl font-bold text-navy">{phase.title}</h3>
                  <span className="text-sm text-gray-500">{phase.quarter}</span>
                </div>

                {/* Items List */}
                <ul className="space-y-2 flex-grow">
                  {phase.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle 
                        size={16} 
                        className={`flex-shrink-0 mt-0.5 ${
                          phase.status === 'complete' ? 'text-green-500' : 'text-gray-300'
                        }`} 
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Phase Number */}
                <div className="absolute -bottom-3 right-4 w-8 h-8 bg-navy text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {idx + 1}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Progress Bar */}
        <Reveal delay={500}>
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
              <span>Phase 1 - MVP</span>
              <span>Phase 4 - Scale</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-500 to-primary rounded-full w-1/4 relative">
                <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-accent rounded-full border-2 border-white shadow-md"></div>
              </div>
            </div>
            <p className="text-center text-sm text-gray-500 mt-4">
              🎉 {t('roadmap.currentProgress')}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

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
              <div className="bg-neutral p-8 rounded-xl relative h-full flex flex-col">
                 <div className="text-accent mb-4"><Star fill="#E38E49" size={24} /></div>
                 <p className="text-lg italic text-gray-700 mb-6 flex-grow">"{t('proof.mariaTesto')}"</p>
                 <div className="flex items-center justify-center gap-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 flex-shrink-0"><User size={20} /></div>
                    <div className="text-left">
                       <div className="font-bold text-navy text-sm">{t('proof.mariaAuthor')}</div>
                       <div className="text-xs text-gray-500">{t('proof.mariaRole')}</div>
                    </div>
                 </div>
              </div>
           </Reveal>
           <Reveal delay={100}>
              <div className="bg-neutral p-8 rounded-xl relative h-full flex flex-col">
                 <div className="text-accent mb-4"><Star fill="#E38E49" size={24} /></div>
                 <p className="text-lg italic text-gray-700 mb-6 flex-grow">"{t('proof.carlosTesto')}"</p>
                 <div className="flex items-center justify-center gap-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 flex-shrink-0"><User size={20} /></div>
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
    <DemoLinks />
    <Demo />
    <Comparison />
    <EarlyTraction />
    <Timeline />
    <Testimonials />
  </>
);
