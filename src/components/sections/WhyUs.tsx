'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/SectionHeading';
import { Icon } from '@/components/icons';
import { whyUs, partners } from '@/lib/content';
import { craftImage } from '@/lib/images';
import { expoOut, staggerContainer, staggerItem, viewportOnce } from '@/lib/motion';

export function WhyUs() {
  return (
    <section id="why" className="section bg-mist">
      <div className="container-px">
        <SectionHeading
          eyebrow="Why Diamond"
          title={<>The plumber you’d trust with your house <span className="grad-text">while you’re at work.</span></>}
          intro="No mystery call-out fees. No “we’ll see when we get there.” Just licensed technicians, fixed prices, and work we put our name behind."
        />

        {/* Editorial image showcase — clip-path reveal on scroll, slow zoom on hover. */}
        <motion.figure
          initial={{ clipPath: 'inset(0 0 100% 0)', opacity: 0 }}
          whileInView={{ clipPath: 'inset(0 0 0% 0)', opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.9, ease: expoOut }}
          className="group relative mt-12 aspect-[16/9] overflow-hidden rounded-panel border border-accent/15 shadow-liftSoft sm:aspect-[21/9]"
        >
          <Image
            src={craftImage.src}
            alt={craftImage.alt}
            fill
            sizes="(max-width:1280px) 100vw, 1280px"
            className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#1c120b]/70 via-[#1c120b]/15 to-transparent" />
          <figcaption className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10">
            <p className="max-w-md font-display text-2xl font-semibold leading-tight text-white text-shadow-soft sm:text-3xl">
              Licensed hands. Tidy worksites. Work we sign our name to.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-3">
              {[
                { v: '47 min', l: 'Avg arrival' },
                { v: '12 yrs', l: 'On the tools' },
                { v: '100%', l: 'Fixed-price quotes' },
              ].map((s) => (
                <div key={s.l} className="text-white">
                  <div className="font-display text-2xl font-semibold tnum [text-shadow:0_1px_8px_rgba(16,10,6,0.5)]">{s.v}</div>
                  <div className="text-xs font-medium uppercase tracking-eyebrow text-white/70">{s.l}</div>
                </div>
              ))}
            </div>
          </figcaption>
        </motion.figure>

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
