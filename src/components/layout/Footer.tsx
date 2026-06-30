'use client';

import Link from 'next/link';
import { Logo } from '@/components/layout/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Icon } from '@/components/icons';
import { site, paymentMethods, defaultWhatsAppMessage } from '@/lib/site';
import { services } from '@/lib/content';
import { whatsappLink } from '@/lib/utils';

export function Footer() {
  return (
    <footer className="bg-navy-950 text-white/70">
      <div className="container-px py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand + contact */}
          <div>
            <Logo tone="light" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              {site.tagline}. Licensed, insured and on call across greater Harare — fixed prices,
              written guarantees, real technicians.
            </p>
            <div className="mt-6 space-y-3 text-sm">
              <a href={`tel:${site.phoneE164}`} className="flex items-center gap-3 text-white hover:text-accent-400">
                <Icon name="phone" width={18} height={18} className="text-accent-400" />
                <span className="tnum">{site.phoneDisplay}</span>
              </a>
              <a href={whatsappLink(site.whatsapp, defaultWhatsAppMessage)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-accent-400">
                <Icon name="whatsapp" width={18} height={18} className="text-accent-400" />
                WhatsApp us
              </a>
              <a href={`mailto:${site.email}`} className="flex items-center gap-3 hover:text-accent-400">
                <Icon name="doc" width={18} height={18} className="text-accent-400" />
                {site.email}
              </a>
              <a href={site.address.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 hover:text-accent-400">
                <Icon name="map-pin" width={18} height={18} className="mt-0.5 shrink-0 text-accent-400" />
                <span>{site.address.full}</span>
              </a>
            </div>
          </div>

          {/* Services nav */}
          <nav aria-label="Services">
            <h3 className="text-sm font-semibold uppercase tracking-eyebrow text-white/45">Services</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="hover:text-accent-400">{s.title}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company nav + hours */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-eyebrow text-white/45">Company</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/#why" className="hover:text-accent-400">Why Diamon</Link></li>
              <li><Link href="/#process" className="hover:text-accent-400">How we work</Link></li>
            </ul>
            <h3 className="mt-6 text-sm font-semibold uppercase tracking-eyebrow text-white/45">Hours</h3>
            <ul className="mt-3 space-y-1.5 text-sm text-white/60">
              <li>{site.hours.weekdays}</li>
              <li>{site.hours.weekend}</li>
              <li className="font-medium text-accent-400">{site.hours.emergency}</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-eyebrow text-white/45">Stay dry</h3>
            <p className="mt-4 text-sm text-white/60">
              Plumbing tips for Zimbabwean homeowners. Once a month, no spam.
            </p>
            {/* REPLACE_WITH_REAL_NEWSLETTER — wire to your email provider. */}
            <form
              className="mt-4 flex gap-2"
              onSubmit={(e) => { e.preventDefault(); alert('Newsletter signup is a placeholder — wire to your email provider.'); }}
            >
              <Input type="email" required placeholder="you@email.com" aria-label="Email address" className="bg-white/5 text-white placeholder:text-white/40" />
              <Button type="submit" variant="primary" size="md" aria-label="Subscribe">
                <Icon name="arrow" width={18} height={18} />
              </Button>
            </form>
            <div className="mt-6 flex gap-3">
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="grid h-10 w-10 place-items-center rounded-full border border-white/15 hover:border-accent-400 hover:text-accent-400">
                <span className="text-sm font-bold">f</span>
              </a>
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full border border-white/15 hover:border-accent-400 hover:text-accent-400">
                <span className="text-sm font-bold">ig</span>
              </a>
            </div>
          </div>
        </div>

        {/* Payments */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-xs font-semibold uppercase tracking-eyebrow text-white/40">We accept</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {paymentMethods.map((p) => (
              <span key={p.name} className="rounded-md border border-white/12 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/75">
                {p.name}
              </span>
            ))}
          </div>
        </div>

        {/* Legal */}
        <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {/* year fixed at build to keep static */}2026 {site.legalName}. All rights reserved.</p>
          {(site.licence.council || site.licence.pirz) && (
            <p className="flex flex-wrap gap-x-4 gap-y-1">
              {site.licence.council && <span>{site.licence.council}</span>}
              {site.licence.pirz && <span>{site.licence.pirz}</span>}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
