'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/SectionHeading';
import { Icon } from '@/components/icons';
import { services } from '@/lib/content';
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/motion';

export function ServicesBand() {
  return (
    <section id="services" className="section bg-paper">
      <div className="container-px">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="What we do"
            title={<>Everything plumbing, <span className="grad-text">done properly.</span></>}
            intro="One team for the 11pm emergency and the planned bathroom refit. Tap any service for symptoms, process and pricing."
          />
        </div>

        <motion.ul
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((s) => (
            <motion.li key={s.slug} variants={staggerItem}>
              <Link
                href={`/services/${s.slug}`}
                className="group card-surface relative flex h-full flex-col p-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                {s.emergency && (
                  <span className="absolute right-6 top-6 inline-flex items-center gap-1.5 rounded-full bg-emergency/10 px-2.5 py-1 text-xs font-semibold text-emergency-dark">
                    <span className="h-1.5 w-1.5 rounded-full bg-emergency" /> 24/7
                  </span>
                )}
                <span className="grid h-12 w-12 place-items-center rounded-card bg-accent/10 text-accent-600 transition-colors group-hover:bg-accent group-hover:text-white">
                  <Icon name={s.icon} width={26} height={26} />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted">{s.short}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-600">
                  Learn more
                  <Icon name="arrow" width={16} height={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
