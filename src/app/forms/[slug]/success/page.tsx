'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { orgTheme } from '@/config/theme';
import { CheckCircle2, Home } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const message = searchParams.get('msg') || 'Thank you for your submission!';
  const hasLaunched = useRef(false);

  useEffect(() => {
    if (hasLaunched.current) return;
    hasLaunched.current = true;

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Launch confetti burst
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ['#E85D26', '#6C3FC5', '#F5A623', '#2E7D32', '#FF6B6B'];

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    // Initial big burst
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.6 },
      colors,
    });

    frame();
  }, []);

  return (
    <main
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: 'var(--color-background)' }}
    >
      {/* Decorative circles */}
      <div
        className="absolute top-1/4 -left-20 w-60 h-60 rounded-full blur-3xl opacity-20"
        style={{ background: 'var(--color-primary)' }}
      />
      <div
        className="absolute bottom-1/4 -right-20 w-60 h-60 rounded-full blur-3xl opacity-20"
        style={{ background: 'var(--color-secondary)' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="relative z-10 bg-surface rounded-3xl shadow-soft-lg border border-border p-8 sm:p-12 max-w-lg w-full text-center"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.2 }}
          className="flex justify-center mb-6"
        >
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center"
            style={{ background: 'var(--color-success-light)' }}
          >
            <CheckCircle2 size={48} style={{ color: 'var(--color-success)' }} />
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-heading text-3xl font-bold mb-4 gradient-text"
        >
          Submitted Successfully!
        </motion.h1>

        {/* Custom Message */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-muted text-lg mb-8 leading-relaxed"
        >
          {message}
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link href="/">
            <Button variant="primary" icon={<Home size={16} />}>
              Back to Home
            </Button>
          </Link>
        </motion.div>

        {/* Brand */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-10 pt-6 border-t border-border-light flex items-center justify-center gap-2"
        >
          <div className="relative w-6 h-6 rounded-full overflow-hidden">
            <Image
              src={orgTheme.logoUrl}
              alt={orgTheme.orgName}
              fill
              className="object-cover"
              sizes="24px"
            />
          </div>
          <span className="text-xs text-muted">{orgTheme.poweredByText}</span>
        </motion.div>
      </motion.div>
    </main>
  );
}
