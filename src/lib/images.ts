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
export function img(id: string, w = 1000, h?: number) {
  const fit = h ? `&h=${h}&fit=crop&crop=entropy` : '&fit=crop';
  // q=72 keeps photos sharp on retina displays while still trimming bytes.
  return `${BASE}${id}?auto=format&q=72&w=${w}${fit}`;
}

export type Photo = { src: string; alt: string };

export const heroImage: Photo = {
  // Higher resolution + quality than the default helper for a crisp, clear hero.
  src: `${BASE}1749532125405-70950966b0e5?auto=format&q=84&w=2400&h=1500&fit=crop&crop=entropy`,
  alt: 'A Diamond Plumbers technician repairing pipework in a home bathroom',
};

/** One hero/feature photo per service (keyed by slug). */
export const serviceImages: Record<string, Photo> = {
  'emergency-plumbing': { src: img('1673870861507-d72aa6855d89', 900, 640), alt: 'Plumber with a wrench in front of a wall of tools' },
  'drainage-blockages': { src: img('1526898943670-92bfa9f94c12', 900, 640), alt: 'Water flowing from a drainage pipe being serviced' },
  'geyser-water-heater': { src: img('1575299737366-39c143459bc5', 900, 640), alt: 'Wall-mounted water heater and geyser installation' },
  'leak-detection': { src: img('1560883123-04646fef95df', 900, 640), alt: 'Metal pipework inspected for hidden leaks' },
  'bathroom-kitchen': { src: img('1742134131017-44d377a611b1', 900, 640), alt: 'A clean, modern fitted bathroom with elegant lighting' },
  'borehole-tanks-pumps': { src: img('1572934272373-6dd3f9ea5943', 900, 640), alt: 'Water storage tank for a borehole and pump system' },
};

/** Before / after photos per case-study id. */
export const caseImages: Record<string, { before: Photo; after: Photo }> = {
  'borrowdale-burst': {
    before: { src: img('1769012334754-163a8eb781e9', 820, 615), alt: 'A pile of old, corroded pipework before repair' },
    after: { src: img('1646974400439-8472d58bb19e', 820, 615), alt: 'Clean, finished bathroom with a bathtub after repair' },
  },
  'avondale-geyser': {
    before: { src: img('1650551182991-b07558247564', 820, 615), alt: 'Old pipes and valves before the geyser replacement' },
    after: { src: img('1564540579594-0930edb6de43', 820, 615), alt: 'Bright bathroom with twin sinks and restored hot water' },
  },
  'greendale-drain': {
    before: { src: img('1769012334604-8b3bf24b474c', 820, 615), alt: 'Corroded, blocked pipework before clearance' },
    after: { src: img('1669920282730-ab422e592f97', 820, 615), alt: 'Clear, free-flowing tap after jetting' },
  },
};

/** Technician portraits, in the same order as `team` in content.ts. */
export const teamImages: Photo[] = [
  { src: img('1772442198677-10c8e7b46a5f', 560, 700), alt: 'Portrait of technician Simba Moyo in workwear' },
  { src: img('1679679811837-c28b2586f533', 560, 700), alt: 'Portrait of technician Tatenda Chari in a hard hat' },
  { src: img('1543357644-160b53c087e8', 560, 700), alt: 'Portrait of technician Kuda Ncube in a hard hat' },
  { src: img('1573497161161-c3e73707e25c', 560, 700), alt: 'Portrait of technician Patience Dube' },
];

/** Customer avatars, in the same order as `testimonials` in content.ts. */
export const testimonialImages: Photo[] = [
  { src: img('1500648767791-00dcc994a43e', 112, 112), alt: 'Customer Tendai M.' },
  { src: img('1494790108377-be9c29b29330', 112, 112), alt: 'Customer Rumbi C.' },
  { src: img('1507003211169-0a1dd7228f2d', 112, 112), alt: 'Customer Farai N.' },
  { src: img('1580489944761-15a19d654956', 112, 112), alt: 'Customer Chiedza R.' },
  { src: img('1600878459138-e1123b37cb30', 112, 112), alt: 'Customer Brian K.' },
  { src: img('1573497019940-1c28c88b4f3e', 112, 112), alt: 'Customer Nyasha D.' },
];

/** Wide editorial photo for the "why us" / final CTA bands. */
export const craftImage: Photo = {
  src: img('1676210134188-4c05dd172f89', 1200, 800),
  alt: 'Plumber at work on pipework in a Harare home',
};
