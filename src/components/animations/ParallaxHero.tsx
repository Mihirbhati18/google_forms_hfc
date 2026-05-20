'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { orgTheme } from '@/config/theme';

export default function ParallaxHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number>(0);
  const [offsetY, setOffsetY] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  /* ── Reduced-motion check ────────────────────────────── */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  /* ── Parallax scroll (0.3× speed) ───────────────────── */
  const updateParallax = useCallback(() => {
    if (prefersReducedMotion || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    // Only compute when section is on-screen
    if (rect.bottom > 0 && rect.top < window.innerHeight) {
      setOffsetY(window.scrollY * 0.3);
    }
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const tick = () => {
      updateParallax();
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafRef.current);
  }, [updateParallax, prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden"
    >
      {/* ── Background image layer ─────────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          transform: prefersReducedMotion ? 'none' : `translateY(${-offsetY}px)`,
          willChange: prefersReducedMotion ? 'auto' : 'transform',
        }}
      >
        <Image
          src={orgTheme.heroBackground}
          alt={`${orgTheme.orgName} hero background`}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* ── Dark gradient overlay ──────────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.6) 100%)',
        }}
      />

      {/* ── Content ────────────────────────────────────── */}
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 py-24 text-center">
        {/* Org name */}
        <h1
          className="text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl"
          style={{
            fontFamily: `var(--font-heading, '${orgTheme.fonts.heading}', sans-serif)`,
            color: 'var(--color-text-inverse)',
            textShadow: '0 2px 16px rgba(0,0,0,0.45)',
          }}
        >
          {orgTheme.orgName}
        </h1>

        {/* Tagline */}
        <p
          className="mt-4 text-xl font-semibold sm:text-2xl lg:text-3xl"
          style={{
            color: 'var(--color-accent)',
            textShadow: '0 1px 8px rgba(0,0,0,0.4)',
          }}
        >
          {orgTheme.orgTagline}
        </p>

        {/* Description */}
        <p
          className="mt-6 max-w-xl text-base leading-relaxed sm:text-lg"
          style={{
            color: 'var(--color-text-inverse)',
            textShadow: '0 1px 6px rgba(0,0,0,0.35)',
            opacity: 0.92,
          }}
        >
          {orgTheme.orgDescription}
        </p>

        {/* CTA */}
        <a
          href="#forms"
          className="mt-10 inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-base font-semibold shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:text-lg"
          style={{
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-text-inverse)',
            boxShadow: '0 4px 20px var(--color-shadow)',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget.style.backgroundColor = 'var(--color-primary-hover)');
          }}
          onMouseLeave={(e) => {
            (e.currentTarget.style.backgroundColor = 'var(--color-primary)');
          }}
        >
          Explore Our Forms
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M7 17l9.2-9.2" />
            <path d="M17 17V7H7" />
          </svg>
        </a>
      </div>
    </section>
  );
}
