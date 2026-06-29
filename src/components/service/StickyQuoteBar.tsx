'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuoteButton } from '@/components/quote/QuoteButton';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/icons';
import { site } from '@/lib/site';

/** Booking CTA pinned to the bottom of service pages once the hero scrolls past. */
export function StickyQuoteBar({ slug, title, from }: { slug: string; title: string; from: string }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: '120%' }}
          animate={{ y: 0 }}
          exit={{ y: '120%' }}
          transition={{ type: 'spring', stiffness: 280, damping: 30 }}
          className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/90 backdrop-blur-md"
        >
          <div className="container-px flex items-center justify-between gap-4 py-3">
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-ink">{title}</p>
              <p className="text-xs text-muted tnum">{from} · fixed written quote, free</p>
            </div>
            <div className="flex flex-1 items-center gap-2 sm:flex-none">
              <QuoteButton service={slug} source={`sticky-${slug}`} size="md" className="flex-1 sm:flex-none" withArrow={false}>
                Free quote
              </QuoteButton>
              <Button asChild variant="emergency" size="md" className="flex-1 sm:flex-none">
                <a href={`tel:${site.phoneE164}`}>
                  <Icon name="phone" width={18} height={18} /> Call
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
