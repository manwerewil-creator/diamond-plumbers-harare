# Diamond Plumbers — Harare

A premium, conversion-first lead-generation site for **Diamond Plumbers**, Harare's
24/7 plumbing team. Built to make a person with a leak in their kitchen call,
WhatsApp, or fill in the quote form — fast.

> Design language: think Stripe / Linear / Vercel, applied to a Zimbabwean
> plumbing brand. Deep navy, a single deep-cyan accent for water + reliability,
> and warm orange reserved **exclusively** for emergency CTAs.

---

## Stack

| Concern        | Choice                                                            |
| -------------- | ----------------------------------------------------------------- |
| Framework      | Next.js 14 (App Router, RSC, TypeScript)                          |
| Styling        | Tailwind CSS + shadcn-style UI primitives (Radix)                 |
| Animation      | Framer Motion (hero split-text is hand-rolled — no GSAP needed)   |
| Forms          | React Hook Form + Zod                                             |
| Database       | Supabase (Postgres) — `leads`, `services`, `case_studies`, etc.   |
| Email          | Resend                                                            |
| WhatsApp       | Twilio WhatsApp Business API                                      |
| Maps           | Custom SVG map (Mapbox swap-in documented below)                  |
| Analytics      | Plausible (optional)                                              |
| Deploy         | Vercel                                                            |

**Every backend integration is optional.** With no env vars set, the quote form
still works in **demo mode** (the lead is logged to the server console), so you
can deploy and click through the whole funnel before wiring anything up.

---

## Quick start

```bash
npm install
cp .env.example .env.local   # fill in what you have (all optional to start)
npm run dev                  # http://localhost:3000
```

Build for production:

```bash
npm run build && npm start
```

---

## Brand-name note (read me)

The existing demo site (`demo-diamon-plumbers.onrender.com`) is a thin
client-rendered SPA whose only server-readable text is the title:

> **"Diamon Plumbers - Harare's Trusted Plumber Company"**

The brief consistently refers to the company as **"Diamond Plumbers"**, so that
is used as the canonical brand throughout. If the real spelling is **"Diamon"**,
change it in one place: [`src/lib/site.ts`](src/lib/site.ts) → `name` / `shortName`.

---

## Where to put real content

All copy and data live in **two files** — change them and the whole site updates:

- [`src/lib/site.ts`](src/lib/site.ts) — phone, WhatsApp, email, address, hours,
  licence numbers, social links, payment methods.
- [`src/lib/content.ts`](src/lib/content.ts) — services, stats, case studies,
  testimonials, team, service areas, FAQ, price bands.

### Find every placeholder

Search the codebase for these markers:

```bash
grep -rn "REPLACE_WITH_REAL" src
```

| Marker                          | What to supply                                         |
| ------------------------------- | ------------------------------------------------------ |
| `REPLACE_WITH_REAL_PHONE` / `_WHATSAPP` | Real `+263` numbers (set via env — see below)  |
| `REPLACE_WITH_REAL_EMAIL` / `_ADDRESS`  | Business email + physical address              |
| `REPLACE_WITH_REAL_LICENCE`     | HCC plumbing licence + PIRZ registration numbers       |
| `REPLACE_WITH_REAL_PHOTO_OF_X`  | Real technician / van / before-after job photos        |
| `REPLACE_WITH_REAL_LOGO`        | Partner/supplier logo images (currently text)          |
| `REPLACE_WITH_REAL_HERO_VIDEO`  | Optional < 1.5 MB water WebM (see Hero below)           |
| `REPLACE_WITH_REAL_NEWSLETTER`  | Wire the footer signup to your email provider          |

### Swapping in real photos

Photos currently render as on-brand `<PhotoPlaceholder>` panels with the
required shot described in their label. To use a real image, replace the
`<PhotoPlaceholder .../>` usage with `next/image`:

```tsx
import Image from 'next/image';
<Image src="/jobs/borrowdale-burst-before.jpg" alt="Burst pipe, Borrowdale" fill className="object-cover" />
```

Add the host to `images.remotePatterns` in [`next.config.mjs`](next.config.mjs)
if the images are remote (e.g. Supabase Storage).

---

## Environment variables

See [`.env.example`](.env.example) for the full annotated list. Summary:

```bash
# Public
NEXT_PUBLIC_SITE_URL=https://diamondplumbers.co.zw
NEXT_PUBLIC_PHONE=+263772123456
NEXT_PUBLIC_WHATSAPP=263772123456

# Supabase (leads + photo storage)
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...        # server-only

# Email (Resend)
RESEND_API_KEY=...
LEAD_NOTIFY_EMAIL=leads@diamondplumbers.co.zw

# WhatsApp (Twilio)
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
TECHNICIAN_WHATSAPP=whatsapp:+263772123456

# Optional
NEXT_PUBLIC_MAPBOX_TOKEN=...         # enables real map (see below)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=...     # enables analytics
```

---

## Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. In the SQL editor, run [`supabase/schema.sql`](supabase/schema.sql) then
   [`supabase/seed.sql`](supabase/seed.sql).
3. Copy the project URL + anon key + **service-role** key into `.env.local`.
4. The `lead-photos` storage bucket is created by the schema. Photos uploaded on
   the quote form land there and their public URLs are saved on the lead.

The `leads` table has RLS enabled with **no anon policy** — only the server
(service-role key, used in [`src/app/api/lead/route.ts`](src/app/api/lead/route.ts))
can write it. The browser never touches the database directly.

---

## The lead pipeline

`POST /api/lead` (multipart form) → validate (Zod) →
[`src/lib/leads.ts`](src/lib/leads.ts):

1. **Save** to Supabase `leads` (or log in demo mode).
2. **Upload** photos to Supabase Storage.
3. **Email** the business (Resend).
4. **WhatsApp** the on-call technician (Twilio).
5. **Confirm** to the customer (email if supplied; WhatsApp handled client-side).

Each step is independent and best-effort — one failure never loses the lead or
500s the request.

---

## The hero animation

The centrepiece lives in
[`src/components/hero/AnimatedHeadline.tsx`](src/components/hero/AnimatedHeadline.tsx):

- **First load:** a one-off 600 ms scramble-reveal settles into the real text.
- **Then rotates** through value phrases every 4 s:
  - Exit — characters fly upward + fade, staggered 30 ms (expo-out).
  - Entrance — characters fall from above, `blur(8px)→0`, springy overshoot,
    staggered 25 ms.
- A terminal-style cursor pulses 1 Hz at the end of the changing word.
- The static `"We fix"` lead never re-animates.
- **`prefers-reduced-motion`:** all of the above is skipped — phrases just
  cross-fade over 200 ms. (Respected on every animation site-wide.)

Other hero motion: magnetic primary CTA
([`MagneticButton.tsx`](src/components/hero/MagneticButton.tsx)), subtle
pointer parallax on the background, count-up trust stats, and a scroll indicator
that fades after 50 px.

### Optional water video

The hero ships with a light, no-asset drifting mesh gradient. To use the spec'd
water video instead, drop a `< 1.5 MB` WebM at `public/hero/water.webm` and a
poster at `public/hero/poster.jpg`, then uncomment the `<video>` block in
[`HeroBackground.tsx`](src/components/hero/HeroBackground.tsx).

---

## Real map (Mapbox)

The service-area section renders a custom dark SVG map — instant, tokenless, and
light on 3G. To use a real Mapbox map instead:

1. `npm install mapbox-gl`
2. Set `NEXT_PUBLIC_MAPBOX_TOKEN`.
3. Replace the `<svg>` in
   [`src/components/sections/ServiceArea.tsx`](src/components/sections/ServiceArea.tsx)
   with a `mapbox-gl` map using a dark style, centred on Harare CBD
   (`31.0534, -17.8292`), and add the `areaPins` from `content.ts` as markers.

---

## Performance & accessibility

- Homepage initial payload kept lean for slow connections (hero is gradient-only
  by default; images are `next/image` AVIF/WebP; `lucide`/`framer` imports
  optimised in `next.config.mjs`).
- Photos compressed client-side before upload (`browser-image-compression`).
- WCAG 2.1 AA: keyboard-navigable, visible focus rings, semantic landmarks,
  `prefers-reduced-motion` honoured everywhere, AA-contrast body text.
- SEO: full metadata, Open Graph (dynamic social card via
  `opengraph-image.tsx`), `LocalBusiness`/`Plumber`/`Service`/`FAQ` structured
  data, `sitemap.xml`, `robots.txt`.

---

## Deploy to Vercel

1. Push to GitHub (done).
2. Import the repo in Vercel.
3. Add the env vars above in the Vercel project settings.
4. Deploy. `NEXT_PUBLIC_SITE_URL` should match the production domain.

---

## Project structure

```
src/
  app/
    layout.tsx            # fonts, metadata, providers, global chrome
    page.tsx              # homepage (composes all sections)
    services/[slug]/      # 6 service detail pages (dynamic, static-generated)
    api/lead/route.ts     # lead capture endpoint
    opengraph-image.tsx   # dynamic social card
    sitemap.ts / robots.ts
  components/
    hero/                 # the animated hero system
    sections/             # homepage sections
    service/              # service-page hero + sticky CTA
    quote/                # quote form, modal provider, CTA button
    ui/                   # button, input, dialog, accordion, …
    icons.tsx             # custom plumbing line icons
  lib/
    site.ts               # contact + brand config
    content.ts            # all marketing content (source of truth)
    leads.ts              # save + notify pipeline
    seo.ts                # structured data
supabase/
  schema.sql / seed.sql
```

---

Built as a redesign of `demo-diamon-plumbers.onrender.com`. Content preserved;
visual language rebuilt from scratch.
