'use client';

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { QuoteForm } from '@/components/quote/QuoteForm';

type OpenOptions = { service?: string; urgency?: string; source?: string };

type Ctx = { open: (opts?: OpenOptions) => void; close: () => void };

const QuoteModalContext = createContext<Ctx | null>(null);

export function useQuoteModal() {
  const ctx = useContext(QuoteModalContext);
  if (!ctx) throw new Error('useQuoteModal must be used inside <QuoteModalProvider>');
  return ctx;
}

export function QuoteModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [opts, setOpts] = useState<OpenOptions>({});

  const open = useCallback((o?: OpenOptions) => {
    setOpts(o ?? {});
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <QuoteModalContext.Provider value={value}>
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Get a free quote</DialogTitle>
            <DialogDescription>
              Five fields, no email needed. We’ll call you back within 10 minutes during working hours.
            </DialogDescription>
          </DialogHeader>
          <QuoteForm
            defaultService={opts.service}
            defaultUrgency={opts.urgency}
            source={opts.source ?? 'modal'}
          />
        </DialogContent>
      </Dialog>
    </QuoteModalContext.Provider>
  );
}
