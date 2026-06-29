'use client';

import { motion } from 'framer-motion';
import { CountUp } from '@/components/CountUp';
import { heroStats } from '@/lib/content';
import { expoOut } from '@/lib/motion';

export function TrustStrip() {
  return (
    <motion.dl
      className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4 sm:gap-x-8"
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.5 } } }}
    >
      {heroStats.map((s) => (
        <motion.div
          key={s.label}
          variants={{
            hidden: { opacity: 0, y: 14 },
            show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: expoOut } },
          }}
          className="border-l border-white/15 pl-4"
        >
          <dt className="sr-only">{s.label}</dt>
          <dd className="font-display text-3xl font-semibold text-white sm:text-4xl">
            <CountUp value={s.value} suffix={s.suffix} startOnView={false} />
          </dd>
          <p className="mt-1 text-sm leading-snug text-white/65">{s.label}</p>
        </motion.div>
      ))}
    </motion.dl>
  );
}
