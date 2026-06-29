'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import type { Photo } from '@/lib/images';
import { heroImage } from '@/lib/images';

/**
 * Full-bleed photographic hero backdrop with a warm espresso wash for text
 * contrast, a hairline grid, and a very subtle pointer parallax — the Rylo
 * editorial-hero pattern, repainted warm.
 */
export function HeroBackground({ photo = heroImage }: { photo?: Photo }) {
  const reduced = usePrefersReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 60, damping: 20 });
  const py = useSpring(my, { stiffness: 60, damping: 20 });
  const tx = useTransform(px, [-1, 1], [-12, 12]);
  const ty = useTransform(py, [-1, 1], [-10, 10]);

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
      <motion.div className="absolute inset-[-4%]" style={{ x: tx, y: ty, scale: 1.08 }}>
        <Image
          src={photo.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Lighter, center-weighted veil — lets the photo read clearly while
          keeping the centered white headline crisp. */}
      <div className="absolute inset-0 bg-navy-950/15" />
      <div className="absolute inset-0 hero-veil" />
      <div className="absolute inset-0 bg-grid opacity-20" />
    </div>
  );
}
