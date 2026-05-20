'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { orgTheme } from '@/config/theme';

export default function RollingCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const [rotation, setRotation] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const images = orgTheme.heroImages;
  const faceCount = images.length;
  // Angle between each face on the cylinder
  const angleStep = 360 / faceCount;
  // Radius so faces don't overlap — derived from face height
  const faceHeight = 220;
  const radius = Math.round(faceHeight / (2 * Math.tan(Math.PI / faceCount)));

  /* ── Reduced-motion check ────────────────────────────── */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  /* ── Scroll-linked rotation ──────────────────────────── */
  const onScroll = useCallback(() => {
    if (prefersReducedMotion) return;
    const scrollY = window.scrollY;
    // Map scroll to rotation — full revolution every ~1200px of scroll
    const newRotation = (scrollY / 1200) * 360;
    setRotation(newRotation);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const tick = () => {
      onScroll();
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafRef.current);
  }, [onScroll, prefersReducedMotion]);

  /* ── Reduced-motion fallback: simple horizontal scroll ── */
  if (prefersReducedMotion) {
    return (
      <section className="w-full overflow-x-auto py-8">
        <div className="flex gap-4 px-4">
          {images.map((img, i) => (
            <div
              key={i}
              className="relative h-52 w-72 flex-shrink-0 overflow-hidden rounded-2xl shadow-md"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="288px"
              />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="relative mx-auto flex w-full max-w-3xl items-center justify-center overflow-hidden"
      style={{ height: 300, perspective: '1000px' }}
      aria-label="Image carousel"
    >
      <div
        className="relative"
        style={{
          width: '100%',
          height: faceHeight,
          transformStyle: 'preserve-3d',
          transform: `rotateX(${-rotation}deg)`,
          transition: 'transform 0.05s linear',
        }}
      >
        {images.map((img, i) => {
          const faceRotation = angleStep * i;
          return (
            <div
              key={i}
              className="absolute inset-x-0 mx-auto flex items-center justify-center"
              style={{
                width: '80%',
                maxWidth: 480,
                height: faceHeight,
                backfaceVisibility: 'hidden',
                transform: `rotateX(${faceRotation}deg) translateZ(${radius}px)`,
              }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 90vw, 480px"
                />
                {/* Subtle gradient overlay for depth */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl"
                  style={{
                    background:
                      'linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.25) 100%)',
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
