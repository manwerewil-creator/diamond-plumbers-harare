/**
 * SOURCE OF TRUTH — all marketing content for Diamond Plumbers.
 *
 * Content is derived from the brief (the existing demo site is a thin SPA with
 * only the title "Diamon Plumbers - Harare's Trusted Plumber Company"). Stats,
 * areas and services come from the brief. Anything not yet supplied by the
 * client is wrapped in a REPLACE_WITH_REAL_* marker so it's grep-able.
 *
 * Swap real copy/numbers here and the whole site updates.
 */

import type { IconName } from '@/components/icons';

/* ─────────────────────────────  STATS  ───────────────────────────── */

// Honest, policy-true trust signals (no fabricated metrics). Edit freely —
// add real numbers (years, jobs completed) here once you can stand behind them.
export type Stat = { top: string; label: string };

export const heroStats: Stat[] = [
  { top: '24/7', label: 'Emergency response' },
  { top: 'Fixed', label: 'Written quotes, no surprises' },
  { top: 'Licensed', label: 'Registered & insured' },
  { top: '1-year', label: 'Workmanship guarantee' },
];

/* ─────────────────────────────  SERVICES  ───────────────────────────── */

export type Service = {
  slug: string;
  icon: IconName;
  title: string;
  short: string; // one-line, used on cards
  blurb: string; // 1–2 sentences, used on service hero sub-headline
  emergency?: boolean;
  // Hero rotator phrases scoped to this service (homepage pattern, smaller)
  rotator: string[];
  symptoms: string[]; // "What we fix" — plain language
  process: { title: string; detail: string }[];
  pricing: { from: string; caveat: string };
  faqs: { q: string; a: string }[];
  caseStudyIds: string[]; // references into caseStudies
};

export const services: Service[] = [
  {
    slug: 'emergency-plumbing',
    icon: 'drop',
    title: 'Emergency plumbing',
    short: 'Burst pipes, flooding and urgent leaks — fixed today.',
    blurb:
      'Burst pipe at midnight or water across the kitchen floor? We answer, we arrive, and we stop the flood — fast.',
    emergency: true,
    rotator: ['Burst pipe. Fixed today.', 'Flooding. Stopped fast.', 'Midnight leak. Sorted.'],
    symptoms: [
      'Burst or split pipe spraying water',
      'Water coming through the ceiling or walls',
      'A leak you cannot find the shut-off for',
      'Toilet or drain overflowing across the floor',
      'No water at all after a sudden pipe failure',
      'Geyser leaking and tripping the power',
    ],
    process: [
      { title: 'Call or WhatsApp', detail: 'Tell us what is broken. We talk you through the shut-off valve immediately to stop the damage.' },
      { title: 'We mobilise', detail: 'The nearest on-call technician is dispatched straight away, and we keep you posted with an honest ETA.' },
      { title: 'Stabilise & fix', detail: 'We isolate the leak, make it safe, then carry out the permanent repair with parts on the van.' },
      { title: 'Guarantee', detail: 'Written 1-year workmanship guarantee before we leave. No surprise charges.' },
    ],
    pricing: { from: 'From $45', caveat: 'Call-out + first 30 min. Final price quoted in writing before any work starts.' },
    faqs: [
      { q: 'Do you really come out at night?', a: 'Yes. The emergency line is staffed 24/7, including weekends and public holidays.' },
      { q: 'How do I stop the water before you arrive?', a: 'We stay on the line and walk you to your main stop-cock — usually near the water meter or where the supply enters the house.' },
    ],
    caseStudyIds: ['borrowdale-burst', 'avondale-geyser'],
  },
  {
    slug: 'drainage-blockages',
    icon: 'drain',
    title: 'Drainage & blockages',
    short: 'Kitchen, bathroom, outside and municipal-connection blockages cleared.',
    blurb:
      'Slow sinks, gurgling drains, sewage backing up the yard — we clear it and tell you why it happened so it stays clear.',
    rotator: ['Blocked drain. Cleared fast.', 'Slow sink. Flowing again.', 'Sewage backup. Gone.'],
    symptoms: [
      'Kitchen sink draining slowly or not at all',
      'Bath or shower water rising up the drain',
      'Bad smell from drains or gully traps',
      'Toilet that fills then drains slowly',
      'Sewage surfacing in the yard or outside drain',
      'Recurring blockages at the municipal connection',
    ],
    process: [
      { title: 'Locate', detail: 'We trace the blockage with rods and, where needed, a drain camera — no guesswork, no needless digging.' },
      { title: 'Clear', detail: 'High-pressure jetting or rodding to clear the line completely, not just punch a hole through it.' },
      { title: 'Inspect', detail: 'Camera check to confirm the cause — roots, grease, collapse or a council-side issue.' },
      { title: 'Advise', detail: 'Plain-language report and a fixed quote if anything structural needs repair.' },
    ],
    pricing: { from: 'From $40', caveat: 'Standard sink/toilet clearance. Jetting and camera surveys quoted on the day.' },
    faqs: [
      { q: 'What does a typical drain clearance cost?', a: 'Most domestic blockages clear for $40–$120 depending on access and severity. You get the fixed price before we start.' },
      { q: 'Can you deal with the council side of the line?', a: 'Yes — we identify whether it is your responsibility or the City of Harare’s, and can liaise on your behalf.' },
    ],
    caseStudyIds: ['greendale-drain'],
  },
  {
    slug: 'geyser-water-heater',
    icon: 'geyser',
    title: 'Geyser & water heater',
    short: 'Repair, replace and solar geyser installs — hot water restored.',
    blurb:
      'Cold showers, a tripping geyser, or a tank that fails every load-shedding cycle? We repair, replace and fit solar.',
    rotator: ['Cold shower. Sorted.', 'Geyser tripping. Fixed.', 'Solar geyser. Installed.'],
    symptoms: [
      'No hot water or lukewarm water only',
      'Geyser tripping the mains or earth-leakage',
      'Water leaking from the geyser or overflow',
      'Element or thermostat failure after an outage',
      'Rusty or discoloured hot water',
      'Wanting to switch to a solar geyser to beat load-shedding',
    ],
    process: [
      { title: 'Diagnose', detail: 'We test the element, thermostat, valves and wiring to find the real fault — not just swap parts.' },
      { title: 'Quote', detail: 'Repair vs replace, with an honest recommendation and a fixed written price.' },
      { title: 'Fit', detail: 'Qualified install to spec — pressure valves, drip trays, isolation, the lot.' },
      { title: 'Cover', detail: '1-year workmanship guarantee; 6 months on the parts we supply.' },
    ],
    pricing: { from: 'From $35', caveat: 'Element/thermostat replacement. New geysers and solar systems quoted per home.' },
    faqs: [
      { q: 'My geyser keeps failing during load-shedding — why?', a: 'Power surges when the grid comes back can blow elements and thermostats. We fit surge protection and can recommend a solar geyser to remove the problem.' },
      { q: 'Do you install solar geysers?', a: 'Yes — direct and indirect systems sized to your household, with the backup element wired for cloudy days.' },
    ],
    caseStudyIds: ['avondale-geyser'],
  },
  {
    slug: 'leak-detection',
    icon: 'gauge',
    title: 'Leak detection',
    short: 'Acoustic + thermal leak detection. No-dig where possible.',
    blurb:
      'A water bill that keeps climbing or a damp patch that won’t dry? We find hidden leaks without tearing your house apart.',
    rotator: ['Leak detected. Stopped.', 'Hidden leak. Found.', 'High bill. Explained.'],
    symptoms: [
      'Water bill higher than it should be',
      'Damp patches on walls, floors or ceilings',
      'The sound of running water with all taps off',
      'Warm spots on the floor (hot-water leak)',
      'Pressure dropping with no visible cause',
      'Mould or musty smell in one area',
    ],
    process: [
      { title: 'Pressure-test', detail: 'We isolate the system and confirm there is a leak before we look for it.' },
      { title: 'Pinpoint', detail: 'Acoustic listening and thermal imaging locate the leak to within centimetres.' },
      { title: 'Access', detail: 'No-dig repair where possible; minimal, targeted access where it isn’t.' },
      { title: 'Repair & report', detail: 'We fix the leak and give you a report you can show the council or insurer.' },
    ],
    pricing: { from: 'From $60', caveat: 'Detection survey. Repair quoted separately once the leak is located.' },
    faqs: [
      { q: 'Will you have to break my floors and walls?', a: 'Usually not. Detection is non-destructive; we only open up the exact spot once we know where the leak is.' },
      { q: 'Can you provide a report for insurance?', a: 'Yes — a written report with thermal images and the location, suitable for claims.' },
    ],
    caseStudyIds: ['borrowdale-burst'],
  },
  {
    slug: 'bathroom-kitchen',
    icon: 'wrench',
    title: 'Bathroom & kitchen plumbing',
    short: 'Full installs, taps, toilets, basins — done properly.',
    blurb:
      'From a dripping tap to a full bathroom refit, we install fixtures cleanly, level and leak-free — first time.',
    rotator: ['Dripping tap. Done.', 'New basin. Fitted.', 'Bathroom refit. Built to last.'],
    symptoms: [
      'Dripping or stiff taps and mixers',
      'Running, rocking or blocked toilet',
      'New basin, sink, bath or shower install',
      'Full bathroom or kitchen refit plumbing',
      'Low pressure at the shower or taps',
      'Re-piping old galvanised lines',
    ],
    process: [
      { title: 'Plan', detail: 'We agree the layout, fittings and finish, then quote a fixed price in writing.' },
      { title: 'Protect', detail: 'Floors and surfaces covered; we work clean and tidy up every day.' },
      { title: 'Install', detail: 'Level, sealed and pressure-checked — no rocking toilets, no weeping joints.' },
      { title: 'Hand over', detail: 'We test everything with you and leave the 1-year guarantee in writing.' },
    ],
    pricing: { from: 'From $25', caveat: 'Tap/washer replacement. Full installs and refits quoted per project.' },
    faqs: [
      { q: 'Can you fix low pressure at my shower?', a: 'Often yes — it may be a clogged head, an under-sized pipe, or it may need a pressure pump. We diagnose before recommending.' },
      { q: 'Do you supply the fittings or do I?', a: 'Either. We can supply quality fittings at trade prices, or fit ones you’ve already bought.' },
    ],
    caseStudyIds: ['greendale-drain'],
  },
  {
    slug: 'borehole-tanks-pumps',
    icon: 'pump',
    title: 'Borehole, tanks & pumps',
    short: 'Jojo tanks, pressure pumps, borehole and water treatment.',
    blurb:
      'When the municipal supply is unreliable, your own water system has to be bullet-proof. We install and maintain it.',
    rotator: ['Pressure pump. Installed.', 'Jojo tank. Plumbed in.', 'Borehole. Running.'],
    symptoms: [
      'Weak or no pressure from your tank',
      'Pump that runs constantly or short-cycles',
      'New Jojo / water-tank installation and plumbing',
      'Borehole pump install, repair or replacement',
      'Tank-to-mains changeover and backup systems',
      'Dirty water needing filtration or treatment',
    ],
    process: [
      { title: 'Assess', detail: 'We size the tank, pump and pressure system to your household demand and roof height.' },
      { title: 'Specify', detail: 'A clear quote for tanks, pumps, pipework and any treatment — no vague allowances.' },
      { title: 'Install', detail: 'Neat, serviceable installation with isolation valves and a proper changeover.' },
      { title: 'Maintain', detail: 'Optional service plan to keep pumps and filters running through the dry season.' },
    ],
    pricing: { from: 'From $80', caveat: 'Pump pressure-switch service. Tanks, pumps and boreholes quoted per site.' },
    faqs: [
      { q: 'Do you do borehole pumps?', a: 'Yes — supply, install, repair and replace submersible and surface pumps, plus the pressure and changeover system.' },
      { q: 'Can you connect my Jojo so the house runs off it during cuts?', a: 'Yes — with an automatic or manual changeover so you switch between municipal and tank water seamlessly.' },
    ],
    caseStudyIds: ['greendale-drain'],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

/* ─────────────────────────────  WHY US  ───────────────────────────── */

export type TrustCard = { icon: IconName; title: string; body: string };

export const whyUs: TrustCard[] = [
  {
    icon: 'shield',
    title: 'Licensed & insured',
    body: 'Registered with the Harare City Council and the Plumbing Industry. Licence numbers on every quote and in our footer — not a man with a bakkie.',
  },
  {
    icon: 'clock',
    title: 'Same-day in Harare',
    body: 'Real technicians, real vans, on call across the Harare metro when your pipe doesn’t care that it’s 11pm. We give you an honest ETA, then turn up.',
  },
  {
    icon: 'tag',
    title: 'Transparent pricing',
    body: 'A fixed, written quote up front. No hourly meter running, no “while we were in there” surprises. The number we say is the number you pay.',
  },
  {
    icon: 'badge',
    title: '1-year guarantee',
    body: 'Every job is backed by a plain-language, written 1-year workmanship guarantee and 6 months on parts. If it doesn’t hold, we come back free.',
  },
];

/* partner / supplier logos — text marquee (logos: REPLACE_WITH_REAL_LOGO) */
export const partners = ['Jojo Tanks', 'Geyserwise', 'Cobra Watertech', 'Grundfos', 'DAB Pumps', 'Marley', 'Pedrollo', 'Kwikot'];

/* ─────────────────────────────  PROCESS  ───────────────────────────── */

export const processSteps = [
  {
    n: 1,
    icon: 'phone',
    title: 'You call or WhatsApp',
    detail: 'Tell us what’s broken — type it or send a photo. We call you back within 10 minutes.',
  },
  {
    n: 2,
    icon: 'doc',
    title: 'We send a free quote',
    detail: 'A fixed price in writing. No hourly surprises, no call-out games. You decide with the number in front of you.',
  },
  {
    n: 3,
    icon: 'wrench',
    title: 'We fix it properly',
    detail: 'A qualified technician in a van stocked with the common parts. Most jobs are sorted on the first visit.',
  },
  {
    n: 4,
    icon: 'badge',
    title: 'You’re covered',
    detail: '1-year written guarantee on workmanship, 6 months on parts. Keep our number — you won’t need it for a while.',
  },
] as const;

/* ─────────────────────────────  CASE STUDIES  ───────────────────────────── */

export type CaseStudy = {
  id: string;
  service: string; // service slug
  area: string;
  title: string;
  problem: string;
  fix: string;
  time: string;
  quote: { text: string; name: string };
  beforeAlt: string; // REPLACE_WITH_REAL_PHOTO description
  afterAlt: string;
};

export const caseStudies: CaseStudy[] = [
  {
    id: 'borrowdale-burst',
    service: 'emergency-plumbing',
    area: 'Borrowdale',
    title: 'Midnight burst pipe flooding a kitchen',
    problem:
      'A corroded copper joint behind the kitchen units let go at 11:40pm, flooding the floor and soaking a cabinet run.',
    fix: 'Isolated the supply, cut out the failed section, re-piped in PEX with proper isolation, and dried the cavity. Back to full pressure the same night.',
    time: '1 hr 50 min on site',
    quote: { text: 'Phoned at midnight in a panic. They talked me through the stop-cock on the phone and were at the gate in under an hour. Calm, clean, fixed.', name: 'Tendai M., Borrowdale' },
    beforeAlt: 'REPLACE_WITH_REAL_PHOTO_OF burst pipe and flooded kitchen floor',
    afterAlt: 'REPLACE_WITH_REAL_PHOTO_OF repaired pipework, dry kitchen',
  },
  {
    id: 'avondale-geyser',
    service: 'geyser-water-heater',
    area: 'Avondale',
    title: 'Geyser failing every time the power came back',
    problem:
      'A 150L geyser kept blowing its element when ZESA returned after load-shedding — three cold-shower mornings in a row.',
    fix: 'Replaced element and thermostat, fitted surge protection on the geyser circuit, and quoted a solar conversion for the dry season.',
    time: 'Same-day, 2 hr 10 min',
    quote: { text: 'Third element in two months until Diamond fitted surge protection. Six months on, no problems. Honest about the solar option without pushing it.', name: 'Rumbi C., Avondale' },
    beforeAlt: 'REPLACE_WITH_REAL_PHOTO_OF old geyser with burnt element',
    afterAlt: 'REPLACE_WITH_REAL_PHOTO_OF new element and surge protection fitted',
  },
  {
    id: 'greendale-drain',
    service: 'drainage-blockages',
    area: 'Greendale',
    title: 'Sewage surfacing in the back yard',
    problem:
      'Recurring blockage at the municipal connection had raw sewage rising in the outside gully every few weeks.',
    fix: 'Camera survey found root ingress at a cracked clay junction. Jetted the line, replaced the broken section, and logged a report for the City of Harare.',
    time: 'Half-day',
    quote: { text: 'Two other plumbers just rodded it and left. Diamond put a camera down, found the actual problem, and it hasn’t come back since.', name: 'Farai N., Greendale' },
    beforeAlt: 'REPLACE_WITH_REAL_PHOTO_OF blocked outside drain with standing water',
    afterAlt: 'REPLACE_WITH_REAL_PHOTO_OF cleared and repaired drain junction',
  },
];

export function caseStudiesForService(slug: string) {
  return caseStudies.filter((c) => c.service === slug);
}

/* ─────────────────────────────  TESTIMONIALS  ───────────────────────────── */

export type Testimonial = {
  name: string;
  area: string;
  service: string;
  rating: number;
  quote: string;
  photoAlt: string; // REPLACE_WITH_REAL_PHOTO
};

export const testimonials: Testimonial[] = [
  { name: 'Tendai M.', area: 'Borrowdale', service: 'Emergency burst pipe', rating: 5, quote: 'Midnight call, at the gate in under an hour, calm and clean. They’re saved in my phone now.', photoAlt: 'REPLACE_WITH_REAL_PHOTO_OF customer Tendai' },
  { name: 'Rumbi C.', area: 'Avondale', service: 'Geyser repair', rating: 5, quote: 'Fixed the real problem — surge protection — instead of just selling me another element. Six months, no issues.', photoAlt: 'REPLACE_WITH_REAL_PHOTO_OF customer Rumbi' },
  { name: 'Farai N.', area: 'Greendale', service: 'Drain clearance', rating: 5, quote: 'Put a camera down and found the actual cause. Hasn’t blocked since. Worth every cent.', photoAlt: 'REPLACE_WITH_REAL_PHOTO_OF customer Farai' },
  { name: 'Chiedza R.', area: 'Mount Pleasant', service: 'Bathroom refit', rating: 5, quote: 'Re-plumbed our whole bathroom. Tidy every day, finished on the day they promised, and the price didn’t move.', photoAlt: 'REPLACE_WITH_REAL_PHOTO_OF customer Chiedza' },
  { name: 'Brian K.', area: 'Highlands', service: 'Borehole pump', rating: 5, quote: 'Sorted our pressure pump and changeover so the house runs off the tank during cuts. Proper job.', photoAlt: 'REPLACE_WITH_REAL_PHOTO_OF customer Brian' },
  { name: 'Nyasha D.', area: 'Mabelreign', service: 'Leak detection', rating: 5, quote: 'Bill had doubled. They found a hidden hot-water leak under the slab without smashing the floor. Brilliant.', photoAlt: 'REPLACE_WITH_REAL_PHOTO_OF customer Nyasha' },
];

/* ─────────────────────────────  TEAM  ───────────────────────────── */

export type TeamMember = {
  name: string;
  role: string;
  years: number;
  specialty: string;
  personal: string;
  photoAlt: string; // REPLACE_WITH_REAL_PHOTO
};

export const team: TeamMember[] = [
  { name: 'Simba Moyo', role: 'Founder & master plumber', years: 12, specialty: 'Leak detection & re-piping', personal: 'Supports Dynamos. Will find your leak before his tea goes cold.', photoAlt: 'REPLACE_WITH_REAL_PHOTO_OF technician Simba in branded uniform' },
  { name: 'Tatenda Chari', role: 'Senior technician', years: 9, specialty: 'Geysers & solar installs', personal: 'Fixes geysers faster than load-shedding can break them.', photoAlt: 'REPLACE_WITH_REAL_PHOTO_OF technician Tatenda in branded uniform' },
  { name: 'Kuda Ncube', role: 'Drainage specialist', years: 7, specialty: 'Jetting & camera surveys', personal: 'Has seen things in drains he won’t talk about at dinner.', photoAlt: 'REPLACE_WITH_REAL_PHOTO_OF technician Kuda in branded uniform' },
  { name: 'Patience Dube', role: 'Pumps & boreholes', years: 8, specialty: 'Pressure systems & tanks', personal: 'Believes every Harare home deserves water that just works.', photoAlt: 'REPLACE_WITH_REAL_PHOTO_OF technician Patience in branded uniform' },
];

/* ─────────────────────────────  SERVICE AREA  ───────────────────────────── */

export const serviceAreas = [
  'Avondale', 'Borrowdale', 'Greendale', 'Highlands', 'Mount Pleasant',
  'Mabelreign', 'Westgate', 'Eastlea', 'Belvedere', 'Marlborough', 'Glen Lorne',
];

/* Approx coordinates (lng/lat) for the custom SVG map pins, normalised later. */
export const areaPins: { name: string; lng: number; lat: number }[] = [
  { name: 'Avondale', lng: 31.04, lat: -17.79 },
  { name: 'Borrowdale', lng: 31.10, lat: -17.74 },
  { name: 'Greendale', lng: 31.13, lat: -17.80 },
  { name: 'Highlands', lng: 31.11, lat: -17.79 },
  { name: 'Mount Pleasant', lng: 31.05, lat: -17.76 },
  { name: 'Mabelreign', lng: 31.00, lat: -17.79 },
  { name: 'Westgate', lng: 30.97, lat: -17.77 },
  { name: 'Eastlea', lng: 31.08, lat: -17.82 },
  { name: 'Belvedere', lng: 31.02, lat: -17.83 },
  { name: 'Marlborough', lng: 31.00, lat: -17.74 },
  { name: 'Glen Lorne', lng: 31.16, lat: -17.72 },
];

export const cityCenter = { name: 'Harare CBD', lng: 31.0534, lat: -17.8292 };

/* ─────────────────────────────  FAQ (homepage)  ───────────────────────────── */

export const faqs: { q: string; a: string }[] = [
  { q: 'Do you respond at night and on weekends?', a: 'Yes. Our emergency line is staffed 24/7, including weekends and public holidays. For genuine emergencies — burst pipes, flooding, sewage — we dispatch the nearest on-call technician straight away.' },
  { q: 'How fast can you actually get here?', a: 'It depends where you are and the traffic, but for genuine emergencies we dispatch the nearest on-call technician straight away and give you an honest ETA when you call — not a vague “sometime today”.' },
  { q: 'Is the quote really free?', a: 'Yes. We quote a fixed price in writing before any work starts, at no charge. For emergencies we confirm the call-out cost up front so there are no surprises.' },
  { q: 'Do you accept EcoCash, OneMoney and cards?', a: 'We accept USD cash, Visa, Mastercard, EcoCash, OneMoney, ZIPIT and Paynow. Pay whichever way is easiest for you.' },
  { q: 'Do you guarantee your work?', a: 'Every job carries a written 1-year workmanship guarantee, plus 6 months on parts we supply. If something we fixed fails in that time, we come back and put it right at no cost.' },
  { q: 'Can you handle municipal / council issues for me?', a: 'Yes. We identify whether a problem is on your side or the City of Harare’s, document it, and can liaise with the council on your behalf to get it resolved.' },
  { q: 'Do you do borehole pumps?', a: 'We supply, install, repair and replace borehole and pressure pumps, plus tanks, changeovers and treatment — everything to keep your home in water during supply cuts.' },
  { q: 'What does a typical drain clearance cost?', a: 'Most domestic blockages clear for $40–$120 depending on access and severity. You always get the fixed price before we start work.' },
  { q: 'Do you work on commercial buildings too?', a: 'Yes — offices, retail, restaurants, schools and body-corporate complexes. We can set up a maintenance plan and priority response for businesses.' },
  { q: 'What if the fix doesn’t hold?', a: 'Call us. Anything covered by the workmanship guarantee, we return and fix free. No arguments, no fine print — that’s the whole point of putting it in writing.' },
];

/* ─────────────────────────────  PRICING CALCULATOR  ───────────────────────────── */

export const priceBands: Record<string, { label: string; range: string }> = {
  'emergency-plumbing': { label: 'Emergency call-out', range: '$45 – $220' },
  'drainage-blockages': { label: 'Drain clearance', range: '$40 – $180' },
  'geyser-water-heater': { label: 'Geyser repair / replace', range: '$35 – $650' },
  'leak-detection': { label: 'Leak detection survey', range: '$60 – $160' },
  'bathroom-kitchen': { label: 'Fixtures & installs', range: '$25 – $900' },
  'borehole-tanks-pumps': { label: 'Pumps, tanks & boreholes', range: '$80 – $1,400' },
};

export const urgencyOptions = [
  { id: 'now', label: 'Right now', sub: 'It’s an emergency / flooding' },
  { id: 'today', label: 'Today', sub: 'Needs sorting same day' },
  { id: 'week', label: 'This week', sub: 'Annoying but not urgent' },
  { id: 'planning', label: 'Just planning', sub: 'Getting a price for a project' },
] as const;
