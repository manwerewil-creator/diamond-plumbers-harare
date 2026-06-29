import { site } from '@/lib/site';
import { services, serviceAreas, faqs } from '@/lib/content';

/** LocalBusiness / Plumber schema for the homepage. */
export function plumberSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Plumber',
    '@id': `${site.url}/#business`,
    name: site.name,
    description: `${site.tagline}. Licensed, insured plumbers covering greater Harare. 24/7 emergency response, average arrival 47 minutes.`,
    url: site.url,
    telephone: site.phoneE164,
    email: site.email,
    image: `${site.url}/opengraph-image`,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.suburb,
      addressRegion: 'Harare',
      addressCountry: 'ZW',
    },
    geo: { '@type': 'GeoCoordinates', latitude: -17.8292, longitude: 31.0534 },
    areaServed: serviceAreas.map((a) => ({ '@type': 'City', name: `${a}, Harare` })),
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '07:30', closes: '18:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '08:00', closes: '16:00' },
    ],
    makesOffer: services.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.title, description: s.short },
    })),
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '212' },
  };
}

export function serviceSchema(slug: string) {
  const s = services.find((x) => x.slug === slug);
  if (!s) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.title,
    serviceType: s.title,
    description: s.blurb,
    provider: { '@type': 'Plumber', name: site.name, telephone: site.phoneE164, url: site.url },
    areaServed: { '@type': 'City', name: 'Harare, Zimbabwe' },
    url: `${site.url}/services/${s.slug}`,
  };
}

export function faqSchema(items: { q: string; a: string }[] = faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
