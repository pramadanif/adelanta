'use client';

import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ProblemSolution } from '@/components/ProblemSolution';
import { Features } from '@/components/Features';
import { Proof } from '@/components/Proof';
import { Conversion } from '@/components/Conversion';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen font-sans">
      <Header />
      <main>
        <Hero />
        <ProblemSolution />
        <Features />
        <Proof />
        <Conversion />
      </main>
      <Footer />
    </div>
  );
}
