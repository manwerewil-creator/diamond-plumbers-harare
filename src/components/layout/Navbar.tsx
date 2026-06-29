'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '@/components/layout/Logo';
import { Button } from '@/components/ui/button';
import { QuoteButton } from '@/components/quote/QuoteButton';
import { Icon } from '@/components/icons';
import { site } from '@/lib/site';
import { cn } from '@/lib/utils';

const NAV = [
  { label: 'Services', href: '/#services' },
  { label: 'Why us', href: '/#why' },
  { label: 'How we work', href: '/#process' },
  { label: 'Service area', href: '/#area' },
  { label: 'Reviews', href: '/#reviews' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-all duration-300',
        scrolled ? 'border-b border-line bg-paper/85 shadow-nav backdrop-blur-md' : 'border-b border-transparent bg-transparent',
      )}
    >
      <nav className="container-px flex h-16 items-center justify-between gap-4 sm:h-[72px]">
        <Link href="/" aria-label={`${site.name} home`} className="rounded-lg">
          <Logo tone={scrolled ? 'dark' : 'light'} />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'rounded-full px-3.5 py-2 text-sm font-medium transition-colors',
                  scrolled ? 'text-muted hover:text-ink hover:bg-cloud' : 'text-white/80 hover:text-white hover:bg-white/10',
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 sm:flex">
          <Button asChild variant={scrolled ? 'ghost' : 'outline'} size="sm">
            <a href={`tel:${site.phoneE164}`} className="tnum">
              <Icon name="phone" width={16} height={16} /> {site.phoneDisplay}
            </a>
          </Button>
          <QuoteButton size="sm" source="navbar" withArrow={false}>Free quote</QuoteButton>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-2 sm:hidden">
          <Button asChild variant="emergency" size="sm">
            <a href={`tel:${site.phoneE164}`} aria-label="Call now">
              <Icon name="phone" width={16} height={16} /> Call
            </a>
          </Button>
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className={cn('grid h-10 w-10 place-items-center rounded-full', scrolled ? 'text-ink hover:bg-cloud' : 'text-white hover:bg-white/10')}
          >
            <Icon name="menu" width={22} height={22} />
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-navy-950/50 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
              className="absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col bg-paper p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <Logo />
                <button onClick={() => setOpen(false)} aria-label="Close menu" className="grid h-10 w-10 place-items-center rounded-full text-muted hover:bg-cloud">
                  <Icon name="close" width={22} height={22} />
                </button>
              </div>
              <ul className="mt-8 flex flex-col gap-1">
                {NAV.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} onClick={() => setOpen(false)} className="block rounded-card px-4 py-3 text-lg font-medium text-ink hover:bg-cloud">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-col gap-3 pt-6">
                <QuoteButton size="lg" source="mobile-nav" className="w-full" onClick={() => setOpen(false)}>
                  Get a free quote
                </QuoteButton>
                <Button asChild variant="emergency" size="lg" className="w-full">
                  <a href={`tel:${site.phoneE164}`}>
                    <Icon name="phone" width={18} height={18} /> Emergency? Call now
                  </a>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
