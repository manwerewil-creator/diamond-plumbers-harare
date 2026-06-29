'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/** Thin drawing line + label. Fades out the instant the user scrolls 50px. */
export function ScrollIndicator() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => setHidden(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          className="pointer-events-none absolute inset-x-0 bottom-6 flex flex-col items-center gap-2"
          aria-hidden
        >
          <span className="text-[11px] uppercase tracking-eyebrow text-white/55">Scroll to see services</span>
          <span className="relative block h-10 w-px overflow-hidden bg-white/15">
            <motion.span
              className="absolute inset-x-0 top-0 h-4 bg-accent"
              animate={{ y: ['-100%', '260%'] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
