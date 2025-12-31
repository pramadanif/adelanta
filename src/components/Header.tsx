'use client';

import React, { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { LanguageSelect } from '@/components/LanguageSelect';
import { useLocale } from '@/components/LocaleProvider';
import { WalletButton, NetworkBadge } from '@/components/WalletButton';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { t } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === '/';

  const links = useMemo(() => {
    if (isHome) {
      return [
        { key: 'nav.problem', href: '#problema' },
        { key: 'nav.solution', href: '#solucion' },
        { key: 'nav.forWho', href: '#target' },
        { key: 'nav.impact', href: '#impacto' },
        { key: 'nav.demo', href: '#demo' },
        { key: 'nav.contact', href: '#contacto' },
      ];
    }

    return [
      { key: 'nav.home', href: '/' },
      { key: 'nav.sme', href: '/sme' },
      { key: 'nav.investor', href: '/investor' },
    ];
  }, [isHome]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-primary shadow-lg py-2' : 'bg-primary py-4'}`}>
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link href={isHome ? '#' : '/'} className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-lg overflow-hidden bg-white/10 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Image
              src="/logo.png"
              alt="Adelanta Logo"
              width={40}
              height={40}
              className="object-contain"
              priority
            />
          </div>
          <span className="text-white font-heading font-bold text-2xl tracking-tight">Adelanta</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {links.map((link) => (
            <a 
              key={link.key} 
              href={link.href} 
              className="text-white/90 hover:text-accent font-medium text-sm transition-colors"
            >
              {t(link.key)}
            </a>
          ))}
          <LanguageSelect />
          <NetworkBadge className="hidden xl:flex" />
          <WalletButton variant="compact" />
          {isHome ? (
            <a href="#cta" className="bg-accent hover:bg-orange-600 text-white font-bold py-2 px-5 rounded-full transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-sm">
              {t('cta.start')}
            </a>
          ) : null}
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden absolute top-full left-0 w-full bg-navy shadow-xl transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96 border-t border-white/10' : 'max-h-0'}`}>
        <div className="flex flex-col p-4 space-y-4">
          {links.map((link) => (
            <a 
              key={link.key} 
              href={link.href} 
              className="text-white hover:text-accent font-medium block p-2"
              onClick={() => setIsOpen(false)}
            >
              {t(link.key)}
            </a>
          ))}

          <div className="px-2">
            <LanguageSelect compact />
          </div>

          <div className="px-2">
            <WalletButton />
          </div>

          {isHome ? (
            <a 
              href="#cta" 
              className="bg-accent text-white font-bold py-3 px-6 rounded-lg text-center shadow-md block"
              onClick={() => setIsOpen(false)}
            >
              {t('cta.start')}
            </a>
          ) : null}
        </div>
      </div>
    </header>
  );
};
