'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'Problema', href: '#problema' },
  { label: 'Solución', href: '#solucion' },
  { label: 'Para Quién', href: '#target' },
  { label: 'Impacto', href: '#impacto' },
  { label: 'Demo', href: '#demo' },
  { label: 'Contacto', href: '#contacto' },
];

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-accent rounded-br-xl rounded-tl-xl flex items-center justify-center text-white font-bold text-xl group-hover:scale-105 transition-transform">
            A
          </div>
          <span className="text-white font-heading font-bold text-2xl tracking-tight">Adelanta</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <a 
              key={link.label} 
              href={link.href} 
              className="text-white/90 hover:text-accent font-medium text-sm transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a href="#cta" className="bg-accent hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
            Comienza Ahora
          </a>
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
              key={link.label} 
              href={link.href} 
              className="text-white hover:text-accent font-medium block p-2"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a 
            href="#cta" 
            className="bg-accent text-white font-bold py-3 px-6 rounded-lg text-center shadow-md block"
            onClick={() => setIsOpen(false)}
          >
            Comienza Ahora
          </a>
        </div>
      </div>
    </header>
  );
};
