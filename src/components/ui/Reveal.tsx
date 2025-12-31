'use client';

import React, { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  width?: 'fit-content' | '100%';
  delay?: number;
}

export const Reveal: React.FC<RevealProps> = ({ children, width = '100%', delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ width, transitionDelay: `${delay}ms` }} className={`transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
      {children}
    </div>
  );
};
