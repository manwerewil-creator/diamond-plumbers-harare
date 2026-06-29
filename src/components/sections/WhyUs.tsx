'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/SectionHeading';
import { Icon } from '@/components/icons';
import { whyUs, partners } from '@/lib/content';
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/motion';

export function WhyUs() {
  return (
    <section id="why" className="section bg-mist">
      <div className="container-px">
        <SectionHeading
          eyebrow="Why Diamond"
          title={<>The plumber you’d trust with your house <span className="grad-text">while you’re at work.</span></>}
          intro="No mystery call-out fees. No “we’ll see when we get there.” Just licensed technicians, fixed prices, and work we put our name behind."
        />

        <motion.ul
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {whyUs.map((c) => (
            <motion.li key={c.title} variants={staggerItem} className="card-surface flex h-full flex-col p-7">
              <span className="grid h-12 w-12 place-items-center rounded-card bg-navy text-white">
                <Icon name={c.icon} width={24} height={24} />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold text-ink">{c.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-muted">{c.body}</p>
            </motion.li>
          ))}
        </motion.ul>

        {/* Partner / supplier marquee */}
        <div className="mt-14">
          <p className="text-center text-xs font-semibold uppercase tracking-eyebrow text-slatey">
            We fit and service trusted brands {/* REPLACE_WITH_REAL_LOGO images */}
          </p>
          <div className="mask-fade-x relative mt-6 overflow-hidden">
            <div className="flex w-max animate-marquee gap-10">
              {[...partners, ...partners].map((p, i) => (
                <span key={`${p}-${i}`} className="whitespace-nowrap font-display text-xl font-semibold text-navy/35">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
