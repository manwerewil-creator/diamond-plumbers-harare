'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/**
 * Hero backdrop. Default: a slow-drifting cyan/teal mesh gradient over deep
 * navy with a hairline grid — light (no asset), fast, and on 3G it just works.
 *
 * To use the spec'd water video instead, drop a < 1.5MB WebM at
 * /public/hero/water.webm + a poster at /public/hero/poster.jpg and uncomment
 * the <video> block below (REPLACE_WITH_REAL_HERO_VIDEO). The gradient stays as
 * the poster/fallback layer.
 */
export function HeroBackground() {
  const reduced = usePrefersReducedMotion();

  // Very subtle parallax (5–10px) driven by pointer position.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 60, damping: 20 });
  const py = useSpring(my, { stiffness: 60, damping: 20 });
  const blobAX = useTransform(px, [-1, 1], [-10, 10]);
  const blobAY = useTransform(py, [-1, 1], [-8, 8]);
  const blobBX = useTransform(px, [-1, 1], [8, -8]);
  const blobBY = useTransform(py, [-1, 1], [6, -6]);

  useEffect(() => {
    if (reduced) return;
    function onMove(e: MouseEvent) {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    }
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [reduced, mx, my]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-navy-950" aria-hidden>
      {/*
      REPLACE_WITH_REAL_HERO_VIDEO — uncomment when a < 1.5MB WebM is available:
      <video
        autoPlay muted loop playsInline preload="none"
        poster="/hero/poster.jpg"
        className="absolute inset-0 h-full w-full object-cover opacity-40"
      >
        <source src="/hero/water.webm" type="video/webm" />
      </video>
      */}

      {/* Drifting mesh gradient (poster + fallback). */}
      <motion.div
        className="absolute -left-[10%] -top-[20%] h-[70vh] w-[70vh] rounded-full blur-3xl"
        style={{
          x: blobAX,
          y: blobAY,
          background: 'radial-gradient(circle, rgba(14,165,233,0.42), transparent 62%)',
        }}
        animate={reduced ? undefined : { scale: [1, 1.12, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-[8%] top-[10%] h-[60vh] w-[60vh] rounded-full blur-3xl"
        style={{
          x: blobBX,
          y: blobBY,
          background: 'radial-gradient(circle, rgba(20,184,166,0.34), transparent 62%)',
        }}
        animate={reduced ? undefined : { scale: [1.08, 1, 1.08], opacity: [0.7, 0.95, 0.7] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[-25%] left-[30%] h-[55vh] w-[55vh] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(2,132,199,0.30), transparent 65%)' }}
        animate={reduced ? undefined : { scale: [1, 1.15, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Hairline grid + navy overlay (the spec'd 60% dark wash). */}
      <div className="absolute inset-0 bg-grid opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/60 via-navy-900/70 to-navy-950" />
      {/* Bottom fade into the page for a seamless handoff to the next section. */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-paper" />
    </div>
  );
}
