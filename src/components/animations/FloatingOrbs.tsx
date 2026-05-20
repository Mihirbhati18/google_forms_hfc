'use client';

import { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import { orgTheme } from '@/config/theme';

/** Seeded-ish deterministic pseudo-random for SSR consistency */
function stableRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

interface OrbConfig {
  id: number;
  src: string;
  size: number;
  top: string;
  left: string;
  duration: number;
  delay: number;
  driftX: number;
  driftY: number;
  rotate: number;
}

const ORB_COUNT = 8;

function generateOrbs(): OrbConfig[] {
  const images = orgTheme.floatingImages;
  return Array.from({ length: ORB_COUNT }, (_, i) => {
    const r = (s: number) => stableRandom(i * 7 + s);
    const size = Math.round(60 + r(1) * 60); // 60–120px
    return {
      id: i,
      src: images[i % images.length],
      size,
      top: `${Math.round(r(2) * 90)}%`,
      left: `${Math.round(r(3) * 90)}%`,
      duration: 15 + r(4) * 10, // 15–25s
      delay: r(5) * -20,        // negative delay so animations start mid-cycle
      driftX: 30 + r(6) * 50,   // 30–80px drift
      driftY: 20 + r(7) * 40,   // 20–60px drift
      rotate: 10 + r(8) * 20,   // 10–30deg rotation
    };
  });
}

/**
 * Inject the @keyframes once — each orb customises via CSS custom properties
 * set as inline styles so every orb drifts along a unique path.
 */
const KEYFRAMES_CSS = `
@keyframes orbFloat {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(var(--orb-dx), calc(var(--orb-dy) * -1)) rotate(calc(var(--orb-rot) * 0.5));
  }
  50% {
    transform: translate(calc(var(--orb-dx) * -0.6), var(--orb-dy)) rotate(var(--orb-rot));
  }
  75% {
    transform: translate(calc(var(--orb-dx) * 0.8), calc(var(--orb-dy) * -0.4)) rotate(calc(var(--orb-rot) * -0.5));
  }
}
`;

export default function FloatingOrbs() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const orbs = useMemo(generateOrbs, []);

  return (
    <>
      {/* Inject keyframes stylesheet */}
      {!prefersReducedMotion && <style dangerouslySetInnerHTML={{ __html: KEYFRAMES_CSS }} />}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ zIndex: 0 }}
      >
        {orbs.map((orb) => (
          <div
            key={orb.id}
            className="absolute overflow-hidden rounded-full"
            style={{
              width: orb.size,
              height: orb.size,
              top: orb.top,
              left: orb.left,
              opacity: 0.15,
              /* CSS custom properties consumed by the keyframes */
              '--orb-dx': `${orb.driftX}px`,
              '--orb-dy': `${orb.driftY}px`,
              '--orb-rot': `${orb.rotate}deg`,
              animation: prefersReducedMotion
                ? 'none'
                : `orbFloat ${orb.duration}s ease-in-out ${orb.delay}s infinite`,
            } as React.CSSProperties}
          >
            <Image
              src={orb.src}
              alt=""
              fill
              className="object-cover"
              sizes={`${orb.size}px`}
            />
          </div>
        ))}
      </div>
    </>
  );
}
