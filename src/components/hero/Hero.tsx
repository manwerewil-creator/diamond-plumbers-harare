'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { AnimatedHeadline } from '@/components/hero/AnimatedHeadline';
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
    <section className="relative isolate flex min-h-[88svh] flex-col justify-center overflow-hidden bg-navy-950 pt-24 pb-14 text-white sm:min-h-[92svh] sm:pt-28 sm:pb-16">
      {/* Background photo — pinned to a fixed-height box (NOT inset-0) so that the
          rotating headline reflowing can never resize the section and rescale the
          cover image (that was the "zoom in/out" flicker). */}
      <div className="absolute inset-x-0 top-0 -z-10 h-[88svh] sm:h-[92svh]">
        <Image
          src="/hero-bg.jpg"
          alt="Diamon Contractors technician sealing a leaking pipe with adjustable pliers"
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
        <div className="mx-auto max-w-2xl text-center">
          <AnimatedHeadline
            prefix="We fix"
            phrases={HERO_PHRASES}
            className="font-display text-display-sm font-semibold text-white sm:text-display"
            tailClassName="mt-1 justify-center"
            tailColorClass="text-[#EBCDA4]"
          />

          <motion.p
            variants={fadeUp}
            custom={0.25}
            initial="hidden"
            animate="show"
            className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg"
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
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          >
            {/* Fixed buttons (no magnetic pull). The Button variants already carry a
                subtle hover lift + shadow, so the motion stays gentle. */}
            <QuoteButton size="lg" source="hero" className="w-full sm:w-[230px]">
              Get a free quote
            </QuoteButton>

            <Button asChild variant="emergency" size="lg" className="w-full sm:w-[230px]">
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
