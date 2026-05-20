'use client';

import { motion, useInView, type Variants } from 'framer-motion';
import { useRef, useEffect, useState, type ReactNode } from 'react';

interface TornadoEntranceProps {
  children: ReactNode[];
}

const tornadoVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const tornadoChildVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 80,
    y: -40,
    rotateZ: 25,
    rotateX: 30,
    scale: 0.6,
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    rotateZ: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 180,
      damping: 20,
    },
  },
};

const fadeChildVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: 'easeOut',
    },
  },
};

const fadeContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

/**
 * Spiraling decorative SVG that traces behind children as they land.
 * Drawn with a stroke-dashoffset animation so the path "writes" itself in.
 */
function SpiralDecoration({ animate }: { animate: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 400 600"
      preserveAspectRatio="none"
      style={{ zIndex: 0 }}
    >
      <motion.path
        d="M200 20 C280 60, 340 140, 300 220 S180 340, 220 420 S320 500, 200 580"
        fill="none"
        stroke="var(--color-primary)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity={0.12}
        initial={{ pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 1.6, ease: 'easeInOut', delay: 0.2 }}
      />
      <motion.path
        d="M180 40 C120 100, 80 200, 140 280 S260 360, 200 440 S100 520, 180 580"
        fill="none"
        stroke="var(--color-secondary)"
        strokeWidth="1"
        strokeLinecap="round"
        strokeOpacity={0.08}
        initial={{ pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 2, ease: 'easeInOut', delay: 0.5 }}
      />
    </svg>
  );
}

export default function TornadoEntrance({ children }: TornadoEntranceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const containerVariants = prefersReducedMotion
    ? fadeContainerVariants
    : tornadoVariants;

  const childVariants = prefersReducedMotion
    ? fadeChildVariants
    : tornadoChildVariants;

  return (
    <div ref={containerRef} className="relative w-full" style={{ perspective: '1200px' }}>
      {/* Decorative spiral — hidden when reduced motion is on */}
      {!prefersReducedMotion && <SpiralDecoration animate={isInView} />}

      <motion.div
        className="relative z-10 flex flex-col gap-6"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {children.map((child, i) => (
          <motion.div
            key={i}
            variants={childVariants}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {child}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
