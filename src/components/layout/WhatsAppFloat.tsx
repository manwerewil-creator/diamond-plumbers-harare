'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { WhatsAppIcon } from '@/components/icons';
import { site, defaultWhatsAppMessage } from '@/lib/site';
import { whatsappLink } from '@/lib/utils';

/** Always-visible WhatsApp tap target, bottom-right. Pre-filled message. */
export function WhatsAppFloat() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.a
      href={whatsappLink(site.whatsapp, defaultWhatsAppMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={show ? { scale: 1, opacity: 1 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-0 overflow-hidden rounded-full bg-[#25D366] pl-3.5 pr-3.5 text-white shadow-lift transition-[padding] hover:pr-5 sm:bottom-6 sm:right-6"
      style={{ height: 56 }}
    >
      <span className="relative flex h-9 w-9 items-center justify-center">
        <span className="absolute inline-flex h-full w-full rounded-full bg-white/30 opacity-0 group-hover:animate-ping" />
        <WhatsAppIcon width={28} height={28} />
      </span>
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-300 group-hover:ml-2 group-hover:max-w-[140px] group-hover:opacity-100">
        Chat on WhatsApp
      </span>
    </motion.a>
  );
}
