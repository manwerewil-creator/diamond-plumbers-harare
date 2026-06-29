'use client';

import { motion } from 'framer-motion';
import { reveal, viewportOnce } from '@/lib/motion';
import { cn } from '@/lib/utils';

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  tone = 'dark',
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: 'left' | 'center';
  tone?: 'dark' | 'light';
  className?: string;
}) {
  return (
    <motion.div
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}
    >
      {eyebrow && <p className={cn('eyebrow', align === 'center' && 'justify-center')}>{eyebrow}</p>}
      <h2
        className={cn(
          'mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-[54px]',
          tone === 'light' ? 'text-white' : 'text-ink',
        )}
      >
        {title}
      </h2>
      {intro && (
        <p className={cn('mt-5 text-xl leading-relaxed', tone === 'light' ? 'text-white/70' : 'text-muted')}>
          {intro}
        </p>
      )}
    </motion.div>
  );
}
