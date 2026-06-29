-- ============================================================================
-- Diamond Plumbers — Supabase schema
-- Run in the Supabase SQL editor (or `supabase db push`) on a fresh project.
-- Content tables are world-readable; `leads` is writable only by the server
-- (service-role key, which bypasses RLS). See README for setup.
-- ============================================================================

create extension if not exists "pgcrypto";

-- ── Leads (the whole point of the site) ────────────────────────────────────
create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null,
  phone       text not null,
  problem     text not null,
  area        text,
  service     text,            -- service slug
  urgency     text,            -- now | today | week | planning
  email       text,
  source      text,            -- which CTA/page the lead came from
  photo_urls  text[] not null default '{}',
  status      text not null default 'new'  -- new | contacted | quoted | won | lost
);
create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);

-- ── Services ───────────────────────────────────────────────────────────────
create table if not exists public.services (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  title         text not null,
  short         text not null,
  blurb         text,
  icon          text,
  emergency     boolean not null default false,
  price_from    text,
  sort_order    int not null default 0
);

-- ── Service areas ──────────────────────────────────────────────────────────
create table if not exists public.service_areas (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  lng         double precision,
  lat         double precision,
  same_day    boolean not null default true,
  sort_order  int not null default 0
);

-- ── Case studies (before/after) ────────────────────────────────────────────
create table if not exists public.case_studies (
  id            text primary key,                 -- human slug, e.g. 'borrowdale-burst'
  service_slug  text references public.services(slug),
  area          text,
  title         text not null,
  problem       text,
  fix           text,
  time_taken    text,
  quote_text    text,
  quote_name    text,
  before_url    text,                             -- REPLACE_WITH_REAL_PHOTO
  after_url     text,
  sort_order    int not null default 0
);

-- ── Testimonials ───────────────────────────────────────────────────────────
create table if not exists public.testimonials (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  area        text,
  service     text,
  rating      int not null default 5 check (rating between 1 and 5),
  quote       text not null,
  photo_url   text,                               -- REPLACE_WITH_REAL_PHOTO
  source      text,                               -- 'google' | 'client'
  sort_order  int not null default 0
);

-- ── Technicians (the team) ─────────────────────────────────────────────────
create table if not exists public.technicians (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  role        text,
  years       int,
  specialty   text,
  personal    text,
  photo_url   text,                               -- REPLACE_WITH_REAL_PHOTO
  sort_order  int not null default 0
);

-- ── Row Level Security ─────────────────────────────────────────────────────
alter table public.leads          enable row level security;
alter table public.services       enable row level security;
alter table public.service_areas  enable row level security;
alter table public.case_studies   enable row level security;
alter table public.testimonials   enable row level security;
alter table public.technicians    enable row level security;

-- Public read for content tables (anon key, used if you later fetch live).
drop policy if exists "public read services" on public.services;
create policy "public read services" on public.services for select using (true);
drop policy if exists "public read areas" on public.service_areas;
create policy "public read areas" on public.service_areas for select using (true);
drop policy if exists "public read case_studies" on public.case_studies;
create policy "public read case_studies" on public.case_studies for select using (true);
drop policy if exists "public read testimonials" on public.testimonials;
create policy "public read testimonials" on public.testimonials for select using (true);
drop policy if exists "public read technicians" on public.technicians;
create policy "public read technicians" on public.technicians for select using (true);

-- NOTE: `leads` has RLS ENABLED with NO anon policy on purpose — only the
-- server (service-role key) can read/write it. The browser never touches it.

-- ── Storage bucket for lead photos ─────────────────────────────────────────
insert into storage.buckets (id, name, public)
values ('lead-photos', 'lead-photos', true)
on conflict (id) do nothing;
