'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { QuoteButton } from '@/components/quote/QuoteButton';
import { MagneticButton } from '@/components/hero/MagneticButton';
import { Icon } from '@/components/icons';
import { site } from '@/lib/site';
import { viewportOnce } from '@/lib/motion';

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-24 text-white sm:py-32">
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden />
      <motion.div
        className="absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.25), transparent 65%)' }}
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.6 }}
        className="container-px relative text-center"
      >
        <h2 className="mx-auto max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
          Stop fighting your pipes. <span className="text-[#EBCDA4]">Let us.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/70">
          One call and it’s handled — fixed price, written guarantee, average arrival 47 minutes. The
          number to save before you need it.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <MagneticButton>
            <QuoteButton size="xl" source="final-cta">Get a free quote</QuoteButton>
          </MagneticButton>
          <Button asChild variant="emergency" size="xl">
            <a href={`tel:${site.phoneE164}`}>
              <Icon name="phone" width={20} height={20} /> Call now
              <span className="ml-1 hidden font-normal text-white/80 sm:inline tnum">{site.phoneDisplay}</span>
            </a>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
