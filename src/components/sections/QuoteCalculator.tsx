'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '@/components/SectionHeading';
import { Icon } from '@/components/icons';
import { QuoteForm } from '@/components/quote/QuoteForm';
import { services, priceBands, urgencyOptions } from '@/lib/content';
import { cn } from '@/lib/utils';

export function QuoteCalculator() {
  const [step, setStep] = useState(1);
  const [service, setService] = useState('');
  const [urgency, setUrgency] = useState('');

  const band = service ? priceBands[service] : undefined;
  const progress = (step / 3) * 100;

  return (
    <section id="quote" className="section bg-mist">
      <div className="container-px">
        <SectionHeading
          align="center"
          eyebrow="Instant estimate"
          title={<>Get a price range in <span className="grad-text">three taps.</span></>}
          intro="See typical pricing before you hand over a single detail. No obligation, no email — just an honest range and a way to lock in a fixed quote."
        />

        <div className="mx-auto mt-10 max-w-2xl overflow-hidden rounded-panel border border-line bg-paper shadow-liftSoft">
          {/* Progress */}
          <div className="flex items-center gap-3 border-b border-line px-6 py-4">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-cloud">
              <motion.div className="h-full rounded-full bg-accent" initial={false} animate={{ width: `${progress}%` }} transition={{ ease: [0.22, 1, 0.36, 1] }} />
            </div>
            <span className="text-sm font-semibold text-muted tnum">Step {step}/3</span>
          </div>

          <div className="p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <Step key="1">
                  <StepTitle>What kind of issue?</StepTitle>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {services.map((s) => (
                      <button
                        key={s.slug}
                        onClick={() => { setService(s.slug); setStep(2); }}
                        className="group flex items-center gap-3 rounded-card border border-line p-4 text-left transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-liftSoft"
                      >
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-card bg-accent/10 text-accent-600 group-hover:bg-accent group-hover:text-white">
                          <Icon name={s.icon} width={22} height={22} />
                        </span>
                        <span>
                          <span className="block font-semibold text-ink">{s.title}</span>
                          <span className="block text-sm text-muted tnum">{priceBands[s.slug]?.range}</span>
                        </span>
                      </button>
                    ))}
                  </div>
                </Step>
              )}

              {step === 2 && (
                <Step key="2">
                  <StepTitle>How urgent is it?</StepTitle>
                  {band && (
                    <p className="mt-2 text-sm text-muted">
                      <span className="font-semibold text-ink">{band.label}</span> — typical range{' '}
                      <span className="font-semibold text-accent-600 tnum">{band.range}</span>
                    </p>
                  )}
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {urgencyOptions.map((u) => (
                      <button
                        key={u.id}
                        onClick={() => { setUrgency(u.id); setStep(3); }}
                        className={cn(
                          'rounded-card border p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-liftSoft',
                          u.id === 'now' ? 'border-emergency/30 hover:border-emergency/60' : 'border-line hover:border-accent/40',
                        )}
                      >
                        <span className={cn('block font-semibold', u.id === 'now' ? 'text-emergency-dark' : 'text-ink')}>{u.label}</span>
                        <span className="block text-sm text-muted">{u.sub}</span>
                      </button>
                    ))}
                  </div>
                  <BackButton onClick={() => setStep(1)} />
                </Step>
              )}

              {step === 3 && (
                <Step key="3">
                  <StepTitle>Where do we send the quote?</StepTitle>
                  {band && (
                    <div className="mt-4 flex items-center gap-3 rounded-card bg-accent/8 p-4">
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-accent text-white">
                        <Icon name="tag" width={20} height={20} />
                      </span>
                      <p className="text-sm text-ink">
                        Typical fixes in this category run{' '}
                        <span className="font-bold text-accent-600 tnum">{band.range}</span>. We’ll confirm a fixed price in writing — free.
                      </p>
                    </div>
                  )}
                  <div className="mt-5">
                    <QuoteForm defaultService={service} defaultUrgency={urgency} source="calculator" />
                  </div>
                  <BackButton onClick={() => setStep(2)} />
                </Step>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function Step({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  );
}

function StepTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="font-display text-xl font-semibold text-ink">{children}</h3>;
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-ink">
      <Icon name="arrow" width={16} height={16} className="-scale-x-100" /> Back
    </button>
  );
}
