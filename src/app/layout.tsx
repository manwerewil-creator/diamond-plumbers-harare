import type { Metadata, Viewport } from 'next';
import { Inter_Tight } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { site } from '@/lib/site';
import { plumberSchema } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { QuoteModalProvider } from '@/components/quote/QuoteModalProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { EmergencyBanner } from '@/components/layout/EmergencyBanner';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';

// Single typeface site-wide (Rylo Labz approach): Inter Tight at varying weights.
const display = Inter_Tight({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const sans = Inter_Tight({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description:
    '24/7 emergency plumbers in Harare. Burst pipes, blocked drains, geysers, leak detection and boreholes — fixed today, fixed price, 1-year guarantee. Average arrival 47 minutes.',
  keywords: ['plumber Harare', 'emergency plumber Zimbabwe', 'burst pipe Harare', 'geyser repair Harare', 'blocked drain Harare', 'borehole pump Harare'],
  applicationName: site.name,
  authors: [{ name: site.name }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_ZW',
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: 'Harare’s 24/7 plumbing team. Fixed today, fixed price, guaranteed. Average arrival 47 minutes.',
    // Social card is generated dynamically by src/app/opengraph-image.tsx
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — ${site.tagline}`,
    description: 'Harare’s 24/7 plumbing team. Fixed today, fixed price, guaranteed.',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0B1F3A',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        {/* LocalBusiness / Plumber structured data */}
        <JsonLd data={plumberSchema()} />
        {/* Privacy-friendly analytics, only when configured */}
        {site.plausibleDomain && (
          <Script
            defer
            strategy="afterInteractive"
            data-domain={site.plausibleDomain}
            src="https://plausible.io/js/script.js"
          />
        )}
        <QuoteModalProvider>
          <EmergencyBanner />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <WhatsAppFloat />
        </QuoteModalProvider>
      </body>
    </html>
  );
}
