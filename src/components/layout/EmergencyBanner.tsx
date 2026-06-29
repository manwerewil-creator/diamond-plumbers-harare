'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@/components/icons';
import { site, defaultWhatsAppMessage } from '@/lib/site';
import { whatsappLink } from '@/lib/utils';

const KEY = 'dp_emergency_dismissed_at';
const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Thin slide-down emergency banner. Appears 800ms after load (NOT a full-screen
 * pop-up). Dismissal is remembered in localStorage for 24 hours.
 */
export function EmergencyBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let dismissed = false;
    try {
      const at = Number(localStorage.getItem(KEY) || 0);
      dismissed = at > 0 && Date.now() - at < DAY_MS;
    } catch { /* ignore */ }
    if (dismissed) return;
    const t = setTimeout(() => setShow(true), 800);
    return () => clearTimeout(t);
  }, []);

  function dismiss() {
    setShow(false);
    try { localStorage.setItem(KEY, String(Date.now())); } catch { /* ignore */ }
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: '-100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ type: 'spring', stiffness: 260, damping: 30 }}
          className="fixed inset-x-0 top-0 z-[60] bg-emergency text-white"
          role="region"
          aria-label="Emergency contact"
        >
          <div className="container-px flex items-center justify-center gap-3 py-2 text-sm">
            <span aria-hidden>🚨</span>
            <p className="text-center font-medium">
              Plumbing emergency?{' '}
              <a href={`tel:${site.phoneE164}`} className="font-bold underline underline-offset-2 tnum">
                Call {site.phoneDisplay}
              </a>{' '}
              or{' '}
              <a
                href={whatsappLink(site.whatsapp, defaultWhatsAppMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline underline-offset-2"
              >
                WhatsApp now
              </a>
              <span className="hidden sm:inline"> — average arrival 47 min.</span>
            </p>
            <button
              onClick={dismiss}
              aria-label="Dismiss emergency banner"
              className="ml-1 grid h-6 w-6 shrink-0 place-items-center rounded-full hover:bg-white/20"
            >
              <Icon name="close" width={14} height={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
