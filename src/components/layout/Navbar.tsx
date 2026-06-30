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
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-2.5 sm:px-5 sm:pt-3">
      {/* Floating liquid-glass pill — slim, transparent, refracts whatever is behind it. */}
      <nav
        className={cn(
          'group/nav relative mx-auto flex h-11 max-w-[64rem] items-center justify-between gap-4 rounded-full px-2.5 pl-3.5 transition-all duration-500 ease-out sm:h-12 sm:px-3 sm:pl-5',
          scrolled
            ? 'border border-white/40 bg-cream/55 shadow-nav backdrop-blur-2xl backdrop-saturate-150 supports-[backdrop-filter]:bg-cream/45'
            : 'border border-white/20 bg-white/[0.07] backdrop-blur-xl backdrop-saturate-150',
        )}
        style={{
          boxShadow: scrolled
            ? '0 1px 0 rgba(255,255,255,.55) inset, 0 -1px 0 rgba(36,24,17,.04) inset, 0 12px 34px -16px rgba(36,24,17,.28)'
            : '0 1px 0 rgba(255,255,255,.35) inset, 0 -1px 0 rgba(255,255,255,.08) inset, 0 10px 30px -18px rgba(16,12,9,.45)',
        }}
      >
        {/* Glossy specular sheen — a soft top-light that reads as polished glass */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
        >
          <span
            className="absolute inset-x-0 top-0 h-1/2"
            style={{ background: 'linear-gradient(180deg, rgba(255,255,255,.28), transparent)' }}
          />
          <span
            className="absolute inset-x-6 top-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,.7), transparent)' }}
          />
        </span>

        <Link href="/" aria-label={`${site.name} home`} className="relative z-10 rounded-lg">
          <Logo tone={scrolled ? 'dark' : 'light'} />
        </Link>

        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 lg:flex">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'group relative text-[13px] font-medium tracking-tight transition-colors',
                  scrolled ? 'text-muted hover:text-ink' : 'text-white/80 hover:text-white',
                )}
              >
                {item.label}
                <span className={cn('absolute -bottom-1 left-0 h-px w-0 transition-all duration-300 group-hover:w-full', scrolled ? 'bg-ink' : 'bg-white')} />
              </Link>
            </li>
          ))}
        </ul>

        <div className="relative z-10 hidden items-center gap-1.5 sm:flex">
          <a
            href={`tel:${site.phoneE164}`}
            className={cn('inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[13px] font-medium tnum transition-colors', scrolled ? 'text-ink hover:bg-ink/5' : 'text-white/80 hover:text-white hover:bg-white/10')}
          >
            <Icon name="phone" width={15} height={15} /> {site.phoneDisplay}
          </a>
          <QuoteButton size="sm" source="navbar" withArrow={false} className="h-9 px-4 text-[13px]">Free quote</QuoteButton>
        </div>

        {/* Mobile */}
        <div className="relative z-10 flex items-center gap-1.5 sm:hidden">
          <QuoteButton size="sm" source="navbar-mobile" withArrow={false} className="h-8 px-3.5 text-[13px]">Quote</QuoteButton>
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className={cn('grid h-8 w-8 place-items-center rounded-full', scrolled ? 'text-ink hover:bg-ink/5' : 'text-white hover:bg-white/10')}
          >
            <Icon name="menu" width={20} height={20} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-navy-950/55 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
              className="absolute right-0 top-0 flex h-full w-[84%] max-w-sm flex-col bg-cream p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <Logo />
                <button onClick={() => setOpen(false)} aria-label="Close menu" className="grid h-10 w-10 place-items-center rounded-full text-muted hover:bg-ink/5">
                  <Icon name="close" width={22} height={22} />
                </button>
              </div>
              <ul className="mt-8 flex flex-col gap-1">
                {NAV.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} onClick={() => setOpen(false)} className="block rounded-card px-4 py-3 text-lg font-medium text-ink hover:bg-ink/5">
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
