'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useMotionTemplate, useTransform, animate } from 'framer-motion';
import { SectionHeading } from '@/components/SectionHeading';
import { PhotoPlaceholder } from '@/components/PhotoPlaceholder';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Icon } from '@/components/icons';
import { caseStudies, getService, type CaseStudy } from '@/lib/content';
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { QuoteButton } from '@/components/quote/QuoteButton';

export function BeforeAfter() {
  const [active, setActive] = useState<CaseStudy | null>(null);

  return (
    <section id="work" className="section bg-paper">
      <div className="container-px">
        <SectionHeading
          eyebrow="Real jobs, real homes"
          title={<>Before &amp; after — <span className="grad-text">drag to compare.</span></>}
          intro="No stock photos. These are actual jobs in actual Harare homes. Tap any one for the full story: the problem, the fix, and how long it took."
        />

        <motion.ul
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {caseStudies.map((c) => (
            <motion.li key={c.id} variants={staggerItem}>
              <Compare caseStudy={c} onOpen={() => setActive(c)} />
            </motion.li>
          ))}
          {/* Placeholder slots to fill the 3×3 grid as more jobs are added. */}
          {[1, 2, 3].map((n) => (
            <motion.li key={`ph-${n}`} variants={staggerItem}>
              <div className="card-surface flex aspect-[4/3] items-center justify-center text-center">
                <p className="px-6 text-sm text-slatey">
                  {/* REPLACE_WITH_REAL_PHOTO before/after of another completed job */}
                  Add another completed job here
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      <CaseStudyModal caseStudy={active} onClose={() => setActive(null)} />
    </section>
  );
}

function Compare({ caseStudy, onOpen }: { caseStudy: CaseStudy; onOpen: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const reduced = usePrefersReducedMotion();
  const pos = useMotionValue(50);
  const rightInset = useTransform(pos, (p) => 100 - p);
  const clip = useMotionTemplate`inset(0 ${rightInset}% 0 0)`;
  const handleLeft = useMotionTemplate`${pos}%`;

  function setFromClientX(clientX: number) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    pos.set(Math.max(0, Math.min(100, pct)));
  }

  return (
    <figure className="card-surface group overflow-hidden p-0">
      <div
        ref={ref}
        className="relative aspect-[4/3] cursor-ew-resize select-none touch-none"
        onPointerDown={(e) => { dragging.current = true; (e.target as HTMLElement).setPointerCapture?.(e.pointerId); setFromClientX(e.clientX); }}
        onPointerMove={(e) => dragging.current && setFromClientX(e.clientX)}
        onPointerUp={() => { dragging.current = false; }}
        onMouseEnter={() => { if (!reduced && !dragging.current) animate(pos, [50, 32, 66, 50], { duration: 1.8, ease: 'easeInOut' }); }}
        role="slider"
        aria-label={`Before and after: ${caseStudy.title}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={50}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') pos.set(Math.max(0, pos.get() - 5));
          if (e.key === 'ArrowRight') pos.set(Math.min(100, pos.get() + 5));
        }}
      >
        {/* AFTER (full, underneath) */}
        <div className="absolute inset-0">
          <PhotoPlaceholder label={caseStudy.afterAlt} icon={getService(caseStudy.service)?.icon ?? 'drop'} tone="accent" />
          <span className="absolute right-3 top-3 z-20 rounded-full bg-accent px-2.5 py-1 text-xs font-bold text-white">AFTER</span>
        </div>
        {/* BEFORE (clipped, on top) */}
        <motion.div className="absolute inset-0" style={{ clipPath: clip }}>
          <PhotoPlaceholder label={caseStudy.beforeAlt} icon="drain" tone="navy" />
          <span className="absolute left-3 top-3 z-20 rounded-full bg-navy-950/80 px-2.5 py-1 text-xs font-bold text-white">BEFORE</span>
        </motion.div>
        {/* Handle */}
        <motion.div className="absolute inset-y-0 z-30 w-0.5 bg-white/90" style={{ left: handleLeft }}>
          <span className="absolute left-1/2 top-1/2 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-navy shadow-lift">
            <Icon name="arrow" width={14} height={14} className="-scale-x-100" />
            <Icon name="arrow" width={14} height={14} className="-ml-1" />
          </span>
        </motion.div>
      </div>

      <figcaption className="flex items-center justify-between gap-3 p-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent-600">{caseStudy.area}</p>
          <h3 className="mt-1 font-display text-base font-semibold leading-snug text-ink">{caseStudy.title}</h3>
        </div>
        <button
          onClick={onOpen}
          className="shrink-0 rounded-full border border-line px-3.5 py-2 text-sm font-semibold text-ink transition-colors hover:border-accent/40 hover:text-accent-600"
        >
          Read
        </button>
      </figcaption>
    </figure>
  );
}

function CaseStudyModal({ caseStudy, onClose }: { caseStudy: CaseStudy | null; onClose: () => void }) {
  return (
    <Dialog open={!!caseStudy} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl">
        {caseStudy && (
          <>
            <div className="relative -mx-6 -mt-6 mb-2 grid grid-cols-2 gap-1 overflow-hidden sm:-mx-8 sm:-mt-8">
              <div className="aspect-[4/3]"><PhotoPlaceholder label={caseStudy.beforeAlt} icon="drain" tone="navy" /></div>
              <div className="aspect-[4/3]"><PhotoPlaceholder label={caseStudy.afterAlt} icon={getService(caseStudy.service)?.icon ?? 'drop'} tone="accent" /></div>
            </div>
            <DialogHeader>
              <p className="text-xs font-semibold uppercase tracking-eyebrow text-accent-600">
                {caseStudy.area} · {getService(caseStudy.service)?.title}
              </p>
              <DialogTitle>{caseStudy.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 text-[15px] leading-relaxed text-muted">
              <div>
                <h4 className="font-semibold text-ink">The problem</h4>
                <p className="mt-1">{caseStudy.problem}</p>
              </div>
              <div>
                <h4 className="font-semibold text-ink">How we fixed it</h4>
                <p className="mt-1">{caseStudy.fix}</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-ink">
                <Icon name="clock" width={16} height={16} className="text-accent-600" />
                <span className="font-semibold">{caseStudy.time}</span>
              </div>
              <blockquote className="rounded-card border-l-2 border-accent bg-mist p-4 italic text-ink">
                “{caseStudy.quote.text}”
                <footer className="mt-2 text-sm font-semibold not-italic text-muted">— {caseStudy.quote.name}</footer>
              </blockquote>
            </div>
            <QuoteButton service={caseStudy.service} source={`case-${caseStudy.id}`} size="lg" className="mt-2 w-full">
              Get a quote for a job like this
            </QuoteButton>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
