'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { AnimatedHeadline } from '@/components/hero/AnimatedHeadline';
import { MagneticButton } from '@/components/hero/MagneticButton';
import { TrustStrip } from '@/components/hero/TrustStrip';
import { ScrollIndicator } from '@/components/hero/ScrollIndicator';
import { QuoteButton } from '@/components/quote/QuoteButton';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/icons';
import { site } from '@/lib/site';
import { expoOut } from '@/lib/motion';

const HERO_PHRASES = [
  'Burst pipe. Fixed today.',
  'Blocked drain. Cleared fast.',
  'Cold shower. Sorted.',
  'Leak detected. Stopped.',
  'Built to last. Backed for a year.',
];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (d: number) => ({ opacity: 1, y: 0, transition: { duration: 0.6, ease: expoOut, delay: d } }),
};

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden bg-navy-950 pt-28 pb-16 text-white">
      {/* Background photo — full bleed, aspect ratio preserved (no stretch). */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/hero-bg.jpg"
          alt="Diamond Plumbers technician sealing a leaking pipe with adjustable pliers"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Warm espresso veil — center-weighted so the white headline reads over
            the bright pipe + water, fading the edges into the espresso base. */}
        <div className="hero-veil absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-navy-950 via-navy-950/55 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-navy-950/70 to-transparent" />
      </div>

      <div className="container-px relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <AnimatedHeadline
            prefix="We fix"
            phrases={HERO_PHRASES}
            className="font-display text-display-lg font-semibold text-white"
            tailClassName="mt-1 justify-center"
            tailColorClass="text-[#EBCDA4]"
          />

          <motion.p
            variants={fadeUp}
            custom={0.25}
            initial="hidden"
            animate="show"
            className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/80"
          >
            From a midnight burst pipe to a full bathroom refit, we show up, fix it properly, and
            guarantee the work. Licensed Harare plumbers,{' '}
            <span className="font-semibold text-white">fast same-day response</span>.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            custom={0.4}
            initial="hidden"
            animate="show"
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          >
            <MagneticButton className="w-full sm:w-auto">
              <QuoteButton size="xl" source="hero" className="w-full sm:w-[260px]">
                Get a free quote
              </QuoteButton>
            </MagneticButton>

            <Button asChild variant="emergency" size="xl" className="w-full sm:w-[260px]">
              <a href={`tel:${site.phoneE164}`} aria-label={`Emergency, call ${site.phoneDisplay}`}>
                <span className="relative mr-1 flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-live-dot rounded-full bg-white/90" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
                </span>
                Emergency? Call now
              </a>
            </Button>
          </motion.div>

          <motion.p variants={fadeUp} custom={0.5} initial="hidden" animate="show" className="mt-3 text-sm text-white/60">
            No call-out games. Fixed written price before we start.
          </motion.p>

          {/* Trust strip */}
          <div className="mt-12 border-t border-white/10 pt-8">
            <TrustStrip />
          </div>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
