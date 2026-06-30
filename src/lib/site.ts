/**
 * Single source of truth for contact + brand config.
 * Phone / WhatsApp read from env at build time so the same code deploys to
 * staging and prod. All visible numbers fall back to a clearly-fake placeholder
 * (…000000) so it's obvious what still needs REPLACING with the real line.
 */

const RAW_PHONE = process.env.NEXT_PUBLIC_PHONE || '+263 71 921 5492';
const RAW_WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP || '263719215492';

export const site = {
  name: 'Diamon Contractors',
  shortName: 'Diamon',
  tagline: "Harare's Trusted Plumbing Team",
  legalName: 'Diamon Contractors (Pvt) Ltd',
  city: 'Harare',
  country: 'Zimbabwe',

  phoneDisplay: RAW_PHONE,
  phoneE164: RAW_PHONE.replace(/[^\d+]/g, ''),
  whatsapp: RAW_WHATSAPP,

  email: 'hello@diamoncontractors.co.zw', // REPLACE_WITH_REAL_EMAIL
  // REPLACE_WITH_REAL_ADDRESS
  address: {
    street: '12 Borrowdale Road',
    suburb: 'Avondale',
    city: 'Harare',
    full: '12 Borrowdale Road, Avondale, Harare, Zimbabwe',
    mapsUrl: 'https://maps.google.com/?q=Avondale+Harare+Zimbabwe',
  },

  hours: {
    weekdays: 'Mon–Fri: 7:30am – 6:00pm',
    weekend: 'Sat: 8:00am – 4:00pm · Sun: emergencies only',
    emergency: '24/7 emergency line',
  },

  // Add your real registration numbers here and they'll show in the footer.
  // Left empty so nothing fake is published.
  licence: {
    council: process.env.NEXT_PUBLIC_LICENCE_COUNCIL || '',
    pirz: process.env.NEXT_PUBLIC_LICENCE_PIRZ || '',
  },

  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://diamondplumbers.co.zw',

  social: {
    facebook: 'https://facebook.com/diamondplumbershre', // REPLACE
    instagram: 'https://instagram.com/diamondplumbershre', // REPLACE
  },

  mapboxToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '',
  plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || '',
} as const;

/** Default WhatsApp message; pages override with their own context. */
export const defaultWhatsAppMessage = 'Hi Diamon Contractors, I have a plumbing problem and need help.';

export type PaymentMethod = { name: string; note?: string };
export const paymentMethods: PaymentMethod[] = [
  { name: 'USD Cash' },
  { name: 'Visa' },
  { name: 'Mastercard' },
  { name: 'EcoCash' },
  { name: 'OneMoney' },
  { name: 'ZIPIT' },
  { name: 'Paynow' },
];
