'use client';

import { motion } from 'framer-motion';
import { heroStats } from '@/lib/content';
import { expoOut } from '@/lib/motion';

export function TrustStrip() {
  return (
    <motion.dl
      className="mx-auto grid max-w-2xl grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 sm:gap-x-8"
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.4 } } }}
    >
      {heroStats.map((s) => (
        <motion.div
          key={s.label}
          variants={{
            hidden: { opacity: 0, y: 14 },
            show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: expoOut } },
          }}
          className="text-center"
        >
          <dt className="font-display text-2xl font-semibold text-white sm:text-3xl">{s.top}</dt>
          <dd className="mt-1 text-sm leading-snug text-white/65">{s.label}</dd>
        </motion.div>
      ))}
    </motion.dl>
  );
}
