'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { AnimatedHeadline } from '@/components/hero/AnimatedHeadline';
import { MagneticButton } from '@/components/hero/MagneticButton';
import { QuoteButton } from '@/components/quote/QuoteButton';
import { Button } from '@/components/ui/button';
import { Icon, type IconName } from '@/components/icons';
import { site } from '@/lib/site';
import { expoOut } from '@/lib/motion';
import { serviceImages, heroImage } from '@/lib/images';

export function ServiceHero({
  slug,
  title,
  blurb,
  rotator,
  icon,
  emergency,
}: {
  slug: string;
  title: string;
  blurb: string;
  rotator: string[];
  icon: IconName;
  emergency?: boolean;
}) {
  return (
    <section className="relative isolate flex min-h-[72svh] flex-col justify-center overflow-hidden bg-navy-950 pt-28 pb-14 text-white">
      {/* Pinned-height image box (not inset-0) so the rotating headline can't
          resize the section and rescale the cover image. */}
      <div className="absolute inset-x-0 top-0 -z-10 h-[72svh]">
        <Image
          src={(serviceImages[slug] ?? heroImage).src}
          alt={(serviceImages[slug] ?? heroImage).alt}
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="hero-veil absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-navy-950 via-navy-950/55 to-transparent" />
      </div>
      <div className="container-px relative z-10">
        <motion.nav
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6 flex items-center gap-2 text-sm text-white/55"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-white">Home</Link>
          <span aria-hidden>/</span>
          <Link href="/#services" className="hover:text-white">Services</Link>
          <span aria-hidden>/</span>
          <span className="text-white/80">{title}</span>
        </motion.nav>

        <div className="max-w-3xl">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="eyebrow text-accent-400">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-accent/15">
              <Icon name={icon} width={16} height={16} />
            </span>
            Harare plumbing {emergency && '· 24/7'}
          </motion.p>

          <AnimatedHeadline
            prefix={title}
            phrases={rotator}
            className="mt-4 font-display text-display font-semibold text-white"
            tailClassName="mt-1 text-[0.7em]"
            tailColorClass="text-[#EBCDA4]"
          />

          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2, ease: expoOut }} className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
            {blurb}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.32 }} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <MagneticButton>
              <QuoteButton service={slug} source={`service-hero-${slug}`} size="lg">Get a free quote</QuoteButton>
            </MagneticButton>
            <Button asChild variant="emergency" size="lg">
              <a href={`tel:${site.phoneE164}`}>
                <Icon name="phone" width={18} height={18} /> {emergency ? 'Emergency? Call now' : 'Call us'}
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
