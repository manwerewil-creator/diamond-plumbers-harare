'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/SectionHeading';
import { Icon } from '@/components/icons';
import { testimonials } from '@/lib/content';
import { expoOut, viewportOnce } from '@/lib/motion';

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon key={i} name="star" width={16} height={16} className={i < n ? 'text-amber-400' : 'text-line'} />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="reviews" className="section bg-paper">
      <div className="container-px">
        <SectionHeading
          eyebrow="What Harare says"
          title={<>Not “trusted by thousands.” <span className="grad-text">Trusted by these people.</span></>}
          intro="Real reviews from real jobs, named and placed. The kind of word-of-mouth you can’t buy."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.55, ease: expoOut, delay: (i % 3) * 0.1 }}
              // staircase: nudge the middle column down on desktop
              className={(i % 3 === 1) ? 'lg:mt-8' : ''}
            >
              <div className="card-surface flex h-full flex-col p-6">
                <Stars n={t.rating} />
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink">“{t.quote}”</blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full bg-navy text-sm font-bold text-white">
                    {/* REPLACE_WITH_REAL_PHOTO — customer headshot */}
                    {t.name.split(' ').map((p) => p[0]).join('').slice(0, 2)}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-ink">{t.name}</span>
                    <span className="block text-xs text-muted">{t.area} · {t.service}</span>
                  </span>
                </figcaption>
              </div>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
