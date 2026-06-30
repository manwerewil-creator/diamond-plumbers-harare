'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/SectionHeading';
import { Icon } from '@/components/icons';
import { services } from '@/lib/content';
import { serviceImages } from '@/lib/images';
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/motion';
import { cn } from '@/lib/utils';

// Bento spans — one big feature tile, two squares, three wide tiles.
const SPANS = [
  'sm:col-span-2 lg:col-span-2 lg:row-span-2', // emergency — feature
  'lg:col-span-1',
  'lg:col-span-1',
  'sm:col-span-2 lg:col-span-2',
  'sm:col-span-2 lg:col-span-2',
  'sm:col-span-2 lg:col-span-2',
];

export function ServicesBand() {
  return (
    <section id="services" className="section bg-paper">
      <div className="container-px">
        <SectionHeading
          eyebrow="What we do"
          title={<>Everything plumbing, <span className="grad-text">done properly.</span></>}
          intro="One team for the 11pm emergency and the planned bathroom refit. Tap any service for symptoms, process and pricing."
        />

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-12 grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((s, i) => {
            const photo = serviceImages[s.slug];
            const featured = i === 0;
            return (
              <motion.div key={s.slug} variants={staggerItem} className={cn('min-h-[220px]', SPANS[i])}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group relative flex h-full w-full flex-col justify-end overflow-hidden rounded-panel border border-accent/15 transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1.5 hover:border-accent/30 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes={featured ? '(max-width:1024px) 100vw, 50vw' : '(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw'}
                    className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.06]"
                  />
                  <div className="bento-scrim absolute inset-0" />

                  <span className="absolute left-5 top-5 grid h-11 w-11 place-items-center rounded-card bg-cream/90 text-ink backdrop-blur-sm">
                    <Icon name={s.icon} width={22} height={22} />
                  </span>
                  {s.emergency && (
                    <span className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-emergency px-2.5 py-1 text-xs font-semibold text-white">
                      <span className="h-1.5 w-1.5 rounded-full bg-white" /> 24/7
                    </span>
                  )}

                  <div className="relative z-10 p-5 text-white sm:p-6">
                    <h3 className={cn('text-shadow-soft font-display font-semibold leading-tight', featured ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl')}>
                      {s.title}
                    </h3>
                    {featured && <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-white/85 [text-shadow:0_1px_8px_rgba(16,10,6,0.5)]">{s.short}</p>}
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-white/95 [text-shadow:0_1px_6px_rgba(16,10,6,0.5)]">
                      Learn more
                      <Icon name="arrow" width={16} height={16} className="transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-1.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
