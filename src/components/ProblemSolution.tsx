'use client';

import React from 'react';
import { Clock, FileX, Lock, Zap, Code, Globe, ArrowRight } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import { useLocale } from '@/components/LocaleProvider';

const PainCard: React.FC<{ icon: React.ReactNode; title: string; desc: string }> = ({ icon, title, desc }) => (
  <div className="bg-white p-8 rounded-2xl shadow-lg border-b-4 border-red-400 hover:shadow-xl transition-shadow h-full flex flex-col">
    <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center text-red-500 mb-6 flex-shrink-0">
      {icon}
    </div>
    <h3 className="text-xl font-heading font-bold text-navy mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed flex-grow">{desc}</p>
  </div>
);

const WhyStellarCard: React.FC<{ icon: React.ReactNode; title: string; desc: string }> = ({ icon, title, desc }) => (
  <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-accent hover:translate-x-2 transition-transform h-full flex flex-col">
    <div className="text-primary mb-4 flex-shrink-0">
      {icon}
    </div>
    <h3 className="text-xl font-heading font-bold text-navy mb-3">{title}</h3>
    <p className="text-gray-800 text-sm leading-relaxed flex-grow">{desc}</p>
  </div>
);

export const ProblemSolution: React.FC = () => {
  const { t } = useLocale();
  return (
    <>
      {/* MARIA STORY INTRO */}
      <section className="py-20 bg-gradient-to-r from-accent/10 via-primary/10 to-navy/10">
        <div className="container mx-auto px-4 md:px-8">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-6">
                {t('story.title')}
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                {t('story.subtitle')}
              </p>
              <div className="h-1 w-20 bg-gradient-to-r from-accent to-primary mx-auto mb-6"></div>
              <p className="text-base md:text-lg font-semibold text-navy">
                {t('story.problemHook')}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PAIN SECTION */}
      <section id="problema" className="py-20 bg-neutral">
        <div className="container mx-auto px-4 md:px-8">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-4">
                {t('problem.title')}
              </h2>
              <p className="text-lg text-gray-600">
                {t('problem.subtitle')}
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            <Reveal delay={100}>
              <PainCard 
                icon={<Clock size={32} />}
                title={t('problem.wait')}
                desc={t('problem.waitDesc')}
              />
            </Reveal>
            <Reveal delay={200}>
              <PainCard 
                icon={<FileX size={32} />}
                title={t('problem.factoring')}
                desc={t('problem.factoringDesc')}
              />
            </Reveal>
            <Reveal delay={300}>
              <PainCard 
                icon={<Lock size={32} />}
                title={t('problem.trust')}
                desc={t('problem.trustDesc')}
              />
            </Reveal>
          </div>
          
          <div className="mt-12 text-center">
             <span className="inline-block bg-navy text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg">
                {t('problem.badge')}
             </span>
          </div>
        </div>
      </section>

      {/* SOLUTION SECTION */}
      <section id="solucion" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
            <Reveal>
              <div className="text-center mb-16">
                <span className="text-accent font-bold tracking-widest uppercase text-sm">{t('solution.badge')}</span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mt-2 mb-4">
                  {t('solution.title')}
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  {t('solution.desc1')}
                  <br/><span className="font-bold text-primary">{t('solution.desc2')}</span>
                </p>
              </div>
            </Reveal>

            <div className="relative">
                {/* Connecting Line for Desktop */}
                <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-lightblue via-primary to-accent transform -translate-y-1/2 z-0"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                    {[
                      { title: t('steps.tokenize'), desc: t('steps.tokenizeDesc'), step: "1" },
                      { title: t('steps.liquidity'), desc: t('steps.liquidityDesc'), step: "2" },
                      { title: t('steps.settlement'), desc: t('steps.settlementDesc'), step: "3" },
                      { title: t('steps.autosplit'), desc: t('steps.autosplitDesc'), step: "4" }
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
              {t('stellar.title')}
              <span className="block text-xl md:text-2xl font-normal text-primary mt-2">{t('stellar.subtitle')}</span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            <Reveal delay={0}>
              <WhyStellarCard 
                icon={<Globe size={40} />}
                title={t('stellar.anchorTitle')}
                desc={t('stellar.anchorDesc')}
              />
            </Reveal>
            <Reveal delay={150}>
              <WhyStellarCard 
                icon={<Code size={40} />}
                title={t('stellar.sorobanTitle')}
                desc={t('stellar.sorobanDesc')}
              />
            </Reveal>
            <Reveal delay={300}>
              <WhyStellarCard 
                icon={<Zap size={40} />}
                title={t('stellar.fastTitle')}
                desc={t('stellar.fastDesc')}
              />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
};
