'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { expoOut } from '@/lib/motion';
import { cn } from '@/lib/utils';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&/<>*+';

/* ── Per-character motion ──────────────────────────────────────────────────
 * Entrance: characters fall from above, blur(8px)→0, land with a springy
 *           overshoot, staggered 25ms.
 * Exit:     characters fly upward and fade, staggered 30ms, expo-out feel.
 */
const tailContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.025 } },
  exit: { transition: { staggerChildren: 0.03 } },
};

const charVariant: Variants = {
  hidden: { y: '-0.6em', opacity: 0, filter: 'blur(8px)' },
  show: {
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 540, damping: 22, mass: 0.6 },
  },
  exit: {
    y: '-0.9em',
    opacity: 0,
    filter: 'blur(4px)',
    transition: { duration: 0.42, ease: expoOut },
  },
};

function splitChars(text: string) {
  return text.split('').map((ch, i) => ({ ch: ch === ' ' ? ' ' : ch, key: `${i}-${ch}` }));
}

export function AnimatedHeadline({
  prefix,
  phrases,
  intervalMs = 4000,
  className,
  tailClassName,
  tailColorClass = 'grad-text',
}: {
  prefix: string;
  phrases: string[];
  intervalMs?: number;
  className?: string;
  tailClassName?: string;
  tailColorClass?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<'scramble' | 'rotating'>('scramble');
  const [scrambled, setScrambled] = useState(phrases[0]);
  const startedRef = useRef(false);

  // Avoid hydration mismatch: render the plain first phrase on the server,
  // then take over on the client.
  useEffect(() => setMounted(true), []);

  /* First-load scramble-reveal of the first phrase (~600ms), then hand off
     to the rotator. Runs once. */
  useEffect(() => {
    if (!mounted || reduced || startedRef.current) return;
    startedRef.current = true;
    const target = phrases[0];
    const total = 600;
    const tick = 40;
    let elapsed = 0;
    const id = setInterval(() => {
      elapsed += tick;
      const progress = elapsed / total;
      const revealCount = Math.floor(progress * target.length);
      const next = target
        .split('')
        .map((c, i) => {
          if (c === ' ' || c === '.' ) return c;
          if (i < revealCount) return c;
          return GLYPHS[Math.floor(((elapsed + i * 7) / tick) % GLYPHS.length)];
        })
        .join('');
      setScrambled(next);
      if (elapsed >= total) {
        clearInterval(id);
        setScrambled(target);
        setPhase('rotating');
      }
    }, tick);
    return () => clearInterval(id);
  }, [mounted, reduced, phrases]);

  /* Rotate phrases once the scramble has handed off. */
  useEffect(() => {
    if (!mounted || phase !== 'rotating') return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % phrases.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [mounted, phase, phrases.length, intervalMs]);

  const Cursor = (
    <span
      aria-hidden
      className={cn(
        'ml-1 inline-block h-[0.86em] w-[3px] translate-y-[0.08em] rounded-full bg-accent align-baseline',
        !reduced && 'animate-cursor-pulse',
      )}
    />
  );

  // ── Reduced motion / not yet mounted: simple, accessible cross-fade ───────
  if (reduced || !mounted) {
    return (
      <h1 className={className}>
        <span className="block">{prefix}</span>
        <span className={cn('relative inline-flex items-baseline', tailClassName)}>
          <AnimatePresence mode="wait">
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={tailColorClass}
            >
              {phrases[index]}
            </motion.span>
          </AnimatePresence>
          {Cursor}
        </span>
      </h1>
    );
  }

  return (
    <h1 className={className}>
      <span className="block">{prefix}</span>
      <span className={cn('relative inline-flex flex-wrap items-baseline', tailClassName)}>
        <span className="sr-only">{phrases[index]}</span>

        {phase === 'scramble' ? (
          <span aria-hidden className={tailColorClass}>{scrambled}</span>
        ) : (
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={index}
              aria-hidden
              className={`${tailColorClass} inline-flex flex-wrap items-baseline will-blur`}
              variants={tailContainer}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              {splitChars(phrases[index]).map(({ ch, key }) => (
                <motion.span key={key} variants={charVariant} className="inline-block will-blur" style={{ whiteSpace: 'pre' }}>
                  {ch}
                </motion.span>
              ))}
            </motion.span>
          </AnimatePresence>
        )}
        {Cursor}
      </span>
    </h1>
  );
}
