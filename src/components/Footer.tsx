'use client';

import React from 'react';
import { Twitter, Linkedin, Github, Mail } from 'lucide-react';
import { useLocale } from '@/components/LocaleProvider';

export const Footer: React.FC = () => {
  const { t } = useLocale();
  const taglineLines = t('footer.tagline').split('\n');

  return (
    <footer className="bg-navy text-white pt-16 pb-8 border-t border-white/10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-accent rounded-br-lg rounded-tl-lg flex items-center justify-center font-bold">A</div>
              <span className="font-heading font-bold text-xl">Adelanta</span>
            </div>
            <p className="text-blue-200 text-sm mb-6 leading-relaxed">
              {taglineLines[0]}
              {taglineLines[1] ? <br /> : null}
              {taglineLines[1] ?? null}
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-blue-200 hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors"><Github size={20} /></a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-bold mb-4 text-accent">{t('footer.product')}</h4>
            <ul className="space-y-2 text-sm text-blue-100">
              <li><a href="#solucion" className="hover:text-white hover:underline">Solución</a></li>
              <li><a href="#" className="hover:text-white hover:underline">Protocol Docs</a></li>
              <li><a href="#" className="hover:text-white hover:underline">Stellar Integration</a></li>
              <li><a href="#" className="hover:text-white hover:underline">Roadmap</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold mb-4 text-accent">{t('footer.company')}</h4>
            <ul className="space-y-2 text-sm text-blue-100">
              <li><a href="#" className="hover:text-white hover:underline">About Us</a></li>
              <li><a href="#" className="hover:text-white hover:underline">Blog</a></li>
              <li><a href="#" className="hover:text-white hover:underline">Careers</a></li>
              <li><a href="#contacto" className="hover:text-white hover:underline">Contact</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold mb-4 text-accent">{t('footer.stay')}</h4>
            <p className="text-xs text-blue-200 mb-4">{t('footer.newsletterDesc')}</p>
            <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder={t('footer.email')} 
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-sm text-white placeholder-blue-300 focus:outline-none focus:border-accent"
              />
              <button type="submit" className="bg-accent hover:bg-orange-600 text-white text-sm font-bold py-2 rounded-lg transition-colors">
                {t('footer.subscribe')}
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-blue-300">
          <p>&copy; {new Date().getFullYear()} Adelanta Protocol. {t('footer.rights')}</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">{t('footer.privacy')}</a>
            <a href="#" className="hover:text-white">{t('footer.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
