'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { expoOut } from '@/lib/motion';
import { cn } from '@/lib/utils';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&/<>*+';

/* Per-character motion. Delay is driven by the character's global index so the
   stagger flows across the whole phrase even though characters are grouped into
   non-breaking words. */
const charVariant: Variants = {
  hidden: { y: '-0.55em', opacity: 0, filter: 'blur(8px)' },
  show: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 520, damping: 22, mass: 0.6, delay: i * 0.025 },
  }),
  exit: (i: number) => ({
    y: '-0.85em',
    opacity: 0,
    filter: 'blur(4px)',
    transition: { duration: 0.4, ease: expoOut, delay: i * 0.018 },
  }),
};

/** Split into words (kept on one line) of indexed characters. */
function splitWords(text: string) {
  let idx = 0;
  return text.split(' ').map((word, w) => ({
    key: `${w}-${word}`,
    chars: word.split('').map((ch) => ({ ch, index: idx++ })),
  }));
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

  useEffect(() => setMounted(true), []);

  /* First-load scramble-reveal of the first phrase (~600ms). */
  useEffect(() => {
    if (!mounted || reduced || startedRef.current) return;
    startedRef.current = true;
    const target = phrases[0];
    const total = 600;
    const tick = 40;
    let elapsed = 0;
    const id = setInterval(() => {
      elapsed += tick;
      const revealCount = Math.floor((elapsed / total) * target.length);
      const next = target
        .split('')
        .map((c, i) => {
          if (c === ' ' || c === '.') return c;
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

  /* Rotate phrases. */
  useEffect(() => {
    if (!mounted || phase !== 'rotating') return;
    const id = setInterval(() => setIndex((i) => (i + 1) % phrases.length), intervalMs);
    return () => clearInterval(id);
  }, [mounted, phase, phrases.length, intervalMs]);

  const Cursor = (
    <span
      aria-hidden
      className={cn(
        'ml-1.5 inline-block h-[0.82em] w-[3px] translate-y-[0.06em] rounded-full bg-current align-baseline opacity-80',
        !reduced && 'animate-cursor-pulse',
      )}
    />
  );

  // Reduced motion / pre-hydration: simple cross-fade.
  if (reduced || !mounted) {
    return (
      <h1 className={className}>
        <span className="block">{prefix}</span>
        <span className={cn('relative inline-flex items-baseline', tailClassName)}>
          <AnimatePresence mode="wait">
            <motion.span key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className={tailColorClass}>
              {phrases[index]}
            </motion.span>
          </AnimatePresence>
          <span className={tailColorClass}>{Cursor}</span>
        </span>
      </h1>
    );
  }

  return (
    <h1 className={className}>
      <span className="block">{prefix}</span>
      <span className={cn('relative block', tailClassName)}>
        <span className="sr-only">{phrases[index]}</span>

        {phase === 'scramble' ? (
          <span aria-hidden className={tailColorClass}>{scrambled}</span>
        ) : (
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={index}
              aria-hidden
              className={cn(tailColorClass, 'inline')}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              {splitWords(phrases[index]).map((word, w) => (
                <span key={word.key} className="inline-flex whitespace-nowrap">
                  {w > 0 && <span className="whitespace-pre"> </span>}
                  {word.chars.map(({ ch, index: i }) => (
                    <motion.span key={`${word.key}-${i}`} custom={i} variants={charVariant} className="inline-block will-blur">
                      {ch}
                    </motion.span>
                  ))}
                </span>
              ))}
            </motion.span>
          </AnimatePresence>
        )}
        <span className={cn('inline-block', tailColorClass)}>{Cursor}</span>
      </span>
    </h1>
  );
}
