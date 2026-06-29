'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { reveal, viewportOnce } from '@/lib/motion';

/**
 * Fade + rise on scroll into view. Reduced-motion users get a static element
 * (the global CSS media query neutralises the transition).
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'li' | 'section';
}) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}
