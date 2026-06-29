'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/**
 * Counts a number up from 0 when it first scrolls into view.
 * Tabular numerals keep the width stable while it ticks.
 */
export function CountUp({
  value,
  prefix = '',
  suffix = '',
  durationMs = 1600,
  className,
  startOnView = true,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
  className?: string;
  startOnView?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState(0);

  const shouldRun = startOnView ? inView : true;

  useEffect(() => {
    if (!shouldRun) return;
    if (reduced) {
      setDisplay(value);
      return;
    }
    let raf = 0;
    let start: number | null = null;
    const step = (t: number) => {
      if (start === null) start = t;
      const p = Math.min((t - start) / durationMs, 1);
      // easeOutExpo
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setDisplay(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [shouldRun, reduced, value, durationMs]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <span className="tnum">{display.toLocaleString('en-US')}</span>
      {suffix}
    </span>
  );
}
