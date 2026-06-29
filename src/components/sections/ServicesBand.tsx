'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/SectionHeading';
import { Icon } from '@/components/icons';
import { services } from '@/lib/content';
import { serviceImages } from '@/lib/images';
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/motion';

export function ServicesBand() {
  return (
    <section id="services" className="section bg-paper">
      <div className="container-px">
        <SectionHeading
          eyebrow="What we do"
          title={<>Everything plumbing, <span className="grad-text">done properly.</span></>}
          intro="One team for the 11pm emergency and the planned bathroom refit. Tap any service for symptoms, process and pricing."
        />

        <motion.ul
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((s) => {
            const photo = serviceImages[s.slug];
            return (
              <motion.li key={s.slug} variants={staggerItem}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group card-surface relative flex h-full flex-col overflow-hidden p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/45 to-transparent" />
                    <span className="absolute left-4 top-4 grid h-11 w-11 place-items-center rounded-card bg-cream/90 text-ink backdrop-blur-sm">
                      <Icon name={s.icon} width={24} height={24} />
                    </span>
                    {s.emergency && (
                      <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-emergency px-2.5 py-1 text-xs font-semibold text-white">
                        <span className="h-1.5 w-1.5 rounded-full bg-white" /> 24/7
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-xl font-semibold text-ink">{s.title}</h3>
                    <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted">{s.short}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
                      Learn more
                      <Icon name="arrow" width={16} height={16} className="text-accent-600 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
