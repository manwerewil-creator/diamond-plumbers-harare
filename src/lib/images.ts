/**
 * Real photography for the site — sourced from Unsplash (free license) and
 * verified live (all return HTTP 200). Swap any `id` for your own shoot later;
 * `next/image` optimises and resizes from these sources automatically.
 *
 * To replace with your own hosted photos, change the URL to your CDN path and
 * add the host to `images.remotePatterns` in next.config.mjs.
 */

const BASE = 'https://images.unsplash.com/photo-';

/** Build an optimised Unsplash URL. Pass h for a hard-cropped aspect ratio. */
export function img(id: string, w = 1400, h?: number) {
  const fit = h ? `&h=${h}&fit=crop&crop=entropy` : '&fit=crop';
  return `${BASE}${id}?auto=format&q=72&w=${w}${fit}`;
}

export type Photo = { src: string; alt: string };

export const heroImage: Photo = {
  src: img('1558618666-fcd25c85cd64', 2000, 1300),
  alt: 'A Diamond Plumbers technician fitting pipework beneath a sink',
};

/** One hero/feature photo per service (keyed by slug). */
export const serviceImages: Record<string, Photo> = {
  'emergency-plumbing': { src: img('1542013936693-884638332954', 1400, 1000), alt: 'Plumber tightening a pipe fitting with a wrench' },
  'drainage-blockages': { src: img('1606340671662-27ee685dd111', 1400, 1000), alt: 'Drainage pipework being serviced' },
  'geyser-water-heater': { src: img('1607472586893-edb57bdc0e39', 1400, 1000), alt: 'Water heater and geyser installation' },
  'leak-detection': { src: img('1543674892-7d64d45df18b', 1400, 1000), alt: 'Copper pipework inspected for leaks' },
  'bathroom-kitchen': { src: img('1584622650111-993a426fbf0a', 1400, 1000), alt: 'A clean, modern fitted bathroom' },
  'borehole-tanks-pumps': { src: img('1586057285471-2f78bffaf074', 1400, 1000), alt: 'Pump and pipework for a water system' },
};

/** Before / after photos per case-study id. */
export const caseImages: Record<string, { before: Photo; after: Photo }> = {
  'borrowdale-burst': {
    before: { src: img('1545193329-4a052e14eb8f', 1000, 750), alt: 'Exposed, corroded pipework before repair' },
    after: { src: img('1631889993959-41b4e9c6e3c5', 1000, 750), alt: 'Clean, finished bathroom after repair' },
  },
  'avondale-geyser': {
    before: { src: img('1607472586893-edb57bdc0e39', 1000, 750), alt: 'Old geyser before replacement' },
    after: { src: img('1507652313519-d4e9174996dd', 1000, 750), alt: 'Bathroom with restored hot water' },
  },
  'greendale-drain': {
    before: { src: img('1565538810643-b5bdb714032a', 1000, 750), alt: 'Blocked sink before clearance' },
    after: { src: img('1609210884848-2d530cfb2a07', 1000, 750), alt: 'Clear, free-flowing sink after jetting' },
  },
};

/** Technician portraits, in the same order as `team` in content.ts. */
export const teamImages: Photo[] = [
  { src: img('1518882570151-157128e78fa1', 800, 1000), alt: 'Portrait of technician Simba Moyo' },
  { src: img('1605980776566-0486c3ac7617', 800, 1000), alt: 'Portrait of technician Tatenda Chari' },
  { src: img('1564541558234-ef406c118d0c', 800, 1000), alt: 'Portrait of technician Kuda Ncube' },
  { src: img('1593351799227-75df2026356b', 800, 1000), alt: 'Portrait of technician Patience Dube' },
];

/** Customer avatars, in the same order as `testimonials` in content.ts. */
export const testimonialImages: Photo[] = [
  { src: img('1643904524951-2a3a58856745', 200, 200), alt: 'Customer Tendai M.' },
  { src: img('1534470717-233b39a41c54', 200, 200), alt: 'Customer Rumbi C.' },
  { src: img('1612214070782-b97cad77ca54', 200, 200), alt: 'Customer Farai N.' },
  { src: img('1619694770795-e21c58464159', 200, 200), alt: 'Customer Chiedza R.' },
  { src: img('1532437698276-c2ac365e7147', 200, 200), alt: 'Customer Brian K.' },
  { src: img('1613876215075-276fd62c89a4', 200, 200), alt: 'Customer Nyasha D.' },
];

/** Wide editorial photo for the "why us" / final CTA bands. */
export const craftImage: Photo = {
  src: img('1621905252507-b35492cc74b4', 1600, 1100),
  alt: 'Plumber at work in a Harare home',
};
