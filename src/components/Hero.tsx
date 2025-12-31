'use client';

import React from 'react';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import { useLocale } from '@/components/LocaleProvider';

export const Hero: React.FC = () => {
  const { t } = useLocale();
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-gradient-to-br from-lightblue via-lightblue to-primary overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/4"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-navy/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/4"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <Reveal>
              <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-primary text-xs font-bold tracking-wider uppercase mb-6 border border-blue-200">
                {t('hero.badge')}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-navy leading-tight mb-6">
                {t('hero.title1')} <span className="text-accent">{t('hero.titleAccent')}</span> {t('hero.title2')}
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {t('hero.subtitle')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="#demo" className="flex items-center justify-center gap-2 bg-accent hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-orange-500/30 text-lg">
                  {t('hero.demo')} <PlayCircle size={20} />
                </a>
                <a href="#solucion" className="flex items-center justify-center gap-2 bg-transparent hover:bg-white/50 text-navy border-2 border-navy font-bold py-3 px-8 rounded-full transition-all text-lg">
                  {t('hero.more')} <ArrowRight size={20} />
                </a>
              </div>
            </Reveal>
          </div>

          {/* Image/Visual */}
          <div className="lg:w-1/2 w-full">
            <Reveal delay={200}>
              <div className="relative bg-white/40 backdrop-blur-sm p-4 rounded-3xl border border-white/50 shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
                <div className="bg-white rounded-2xl overflow-hidden shadow-inner aspect-[4/3] flex items-center justify-center relative">
                  {/* Abstract UI representation */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50"></div>
                  <div className="relative z-10 w-3/4 p-6 bg-white rounded-xl shadow-lg border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                      <div className="h-4 w-24 bg-gray-200 rounded"></div>
                      <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">✓</div>
                    </div>
                    <div className="space-y-4">
                      <div className="h-12 bg-lightblue/30 rounded-lg flex items-center px-4 border border-lightblue">
                         <div className="w-full flex justify-between">
                           <span className="text-navy font-bold text-sm">{t('hero.ui.invoice')}</span>
                            <span className="text-accent font-bold text-sm">$5,000 USDC</span>
                         </div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>{t('hero.ui.status')}</span>
                        <span>{t('hero.ui.funded')}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2 mt-2">
                        <div className="bg-green-500 h-2 rounded-full w-full"></div>
                      </div>
                    </div>
                    <div className="mt-6 flex justify-between items-center">
                        <div className="text-xs text-gray-400">{t('hero.ui.powered')}</div>
                        <button className="bg-navy text-white text-xs px-3 py-1.5 rounded">{t('hero.ui.withdraw')}</button>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
