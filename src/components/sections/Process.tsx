'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionHeading } from '@/components/SectionHeading';
import { Icon, type IconName } from '@/components/icons';
import { processSteps } from '@/lib/content';
import { expoOut, viewportOnce } from '@/lib/motion';

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' });

  return (
    <section id="process" className="section relative overflow-hidden bg-navy-950 text-white">
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden />
      <div className="container-px relative">
        <SectionHeading
          eyebrow="How we work"
          tone="light"
          title={<>Four steps from <span className="text-[#EBCDA4]">leak to guarantee.</span></>}
          intro="No surprises, no hovering by the door wondering what it’ll cost. You always know what happens next."
        />

        <div ref={ref} className="relative mt-14">
          {/* Connecting line — drawn left→right on scroll into view (desktop). */}
          <svg className="absolute left-0 right-0 top-7 hidden h-2 w-full lg:block" preserveAspectRatio="none" viewBox="0 0 100 1" aria-hidden>
            <motion.line
              x1="2" y1="0.5" x2="98" y2="0.5"
              stroke="url(#processGrad)"
              strokeWidth="0.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 1, ease: expoOut }}
            />
            <defs>
              <linearGradient id="processGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#6B4A2F" />
                <stop offset="50%" stopColor="#A9743F" />
                <stop offset="100%" stopColor="#EBCDA4" />
              </linearGradient>
            </defs>
          </svg>

          <ol className="grid gap-8 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <motion.li
                key={step.n}
                initial={{ opacity: 0, y: 22 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: expoOut, delay: 0.4 + i * 0.18 }}
                className="relative"
              >
                <div className="relative z-10 grid h-14 w-14 place-items-center rounded-2xl border border-white/15 bg-navy-900 text-accent-400">
                  <Icon name={step.icon as IconName} width={26} height={26} />
                  <span className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-accent text-xs font-bold text-white tnum">
                    {step.n}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/65">{step.detail}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
