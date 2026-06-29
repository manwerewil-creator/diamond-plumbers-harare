-- ============================================================================
-- Diamond Plumbers — seed data
-- 6 services · 11 service areas · 3 case studies · 6 testimonials · 4 technicians
-- Mirrors src/lib/content.ts so the DB and the static fallback stay in sync.
-- Photo URLs are intentionally NULL — REPLACE_WITH_REAL_PHOTO before launch.
-- ============================================================================

-- ── Services ────────────────────────────────────────────────────────────────
insert into public.services (slug, title, short, icon, emergency, price_from, sort_order) values
  ('emergency-plumbing',   'Emergency plumbing',           'Burst pipes, flooding and urgent leaks — fixed today.',                 'drop',   true,  'From $45', 1),
  ('drainage-blockages',   'Drainage & blockages',         'Kitchen, bathroom, outside and municipal-connection blockages cleared.','drain',  false, 'From $40', 2),
  ('geyser-water-heater',  'Geyser & water heater',        'Repair, replace and solar geyser installs — hot water restored.',       'geyser', false, 'From $35', 3),
  ('leak-detection',       'Leak detection',               'Acoustic + thermal leak detection. No-dig where possible.',             'gauge',  false, 'From $60', 4),
  ('bathroom-kitchen',     'Bathroom & kitchen plumbing',  'Full installs, taps, toilets, basins — done properly.',                 'wrench', false, 'From $25', 5),
  ('borehole-tanks-pumps', 'Borehole, tanks & pumps',      'Jojo tanks, pressure pumps, borehole and water treatment.',             'pump',   false, 'From $80', 6)
on conflict (slug) do nothing;

-- ── Service areas ────────────────────────────────────────────────────────────
insert into public.service_areas (name, lng, lat, same_day, sort_order) values
  ('Avondale',       31.04, -17.79, true, 1),
  ('Borrowdale',     31.10, -17.74, true, 2),
  ('Greendale',      31.13, -17.80, true, 3),
  ('Highlands',      31.11, -17.79, true, 4),
  ('Mount Pleasant', 31.05, -17.76, true, 5),
  ('Mabelreign',     31.00, -17.79, true, 6),
  ('Westgate',       30.97, -17.77, true, 7),
  ('Eastlea',        31.08, -17.82, true, 8),
  ('Belvedere',      31.02, -17.83, true, 9),
  ('Marlborough',    31.00, -17.74, true, 10),
  ('Glen Lorne',     31.16, -17.72, true, 11)
on conflict do nothing;

-- ── Case studies ─────────────────────────────────────────────────────────────
insert into public.case_studies (id, service_slug, area, title, problem, fix, time_taken, quote_text, quote_name, sort_order) values
  ('borrowdale-burst', 'emergency-plumbing', 'Borrowdale',
   'Midnight burst pipe flooding a kitchen',
   'A corroded copper joint behind the kitchen units let go at 11:40pm, flooding the floor and soaking a cabinet run.',
   'Isolated the supply, cut out the failed section, re-piped in PEX with proper isolation, and dried the cavity. Back to full pressure the same night.',
   '1 hr 50 min on site',
   'Phoned at midnight in a panic. They talked me through the stop-cock on the phone and were at the gate in under an hour. Calm, clean, fixed.',
   'Tendai M., Borrowdale', 1),
  ('avondale-geyser', 'geyser-water-heater', 'Avondale',
   'Geyser failing every time the power came back',
   'A 150L geyser kept blowing its element when ZESA returned after load-shedding — three cold-shower mornings in a row.',
   'Replaced element and thermostat, fitted surge protection on the geyser circuit, and quoted a solar conversion for the dry season.',
   'Same-day, 2 hr 10 min',
   'Third element in two months until Diamond fitted surge protection. Six months on, no problems. Honest about the solar option without pushing it.',
   'Rumbi C., Avondale', 2),
  ('greendale-drain', 'drainage-blockages', 'Greendale',
   'Sewage surfacing in the back yard',
   'Recurring blockage at the municipal connection had raw sewage rising in the outside gully every few weeks.',
   'Camera survey found root ingress at a cracked clay junction. Jetted the line, replaced the broken section, and logged a report for the City of Harare.',
   'Half-day',
   'Two other plumbers just rodded it and left. Diamond put a camera down, found the actual problem, and it hasn''t come back since.',
   'Farai N., Greendale', 3)
on conflict (id) do nothing;

-- ── Testimonials ─────────────────────────────────────────────────────────────
insert into public.testimonials (name, area, service, rating, quote, source, sort_order) values
  ('Tendai M.',  'Borrowdale',    'Emergency burst pipe', 5, 'Midnight call, at the gate in under an hour, calm and clean. They''re saved in my phone now.', 'client', 1),
  ('Rumbi C.',   'Avondale',      'Geyser repair',        5, 'Fixed the real problem — surge protection — instead of just selling me another element. Six months, no issues.', 'client', 2),
  ('Farai N.',   'Greendale',     'Drain clearance',      5, 'Put a camera down and found the actual cause. Hasn''t blocked since. Worth every cent.', 'google', 3),
  ('Chiedza R.', 'Mount Pleasant','Bathroom refit',       5, 'Re-plumbed our whole bathroom. Tidy every day, finished on the day they promised, and the price didn''t move.', 'client', 4),
  ('Brian K.',   'Highlands',     'Borehole pump',        5, 'Sorted our pressure pump and changeover so the house runs off the tank during cuts. Proper job.', 'google', 5),
  ('Nyasha D.',  'Mabelreign',    'Leak detection',       5, 'Bill had doubled. They found a hidden hot-water leak under the slab without smashing the floor. Brilliant.', 'client', 6)
on conflict do nothing;

-- ── Technicians ──────────────────────────────────────────────────────────────
insert into public.technicians (name, role, years, specialty, personal, sort_order) values
  ('Simba Moyo',     'Founder & master plumber', 12, 'Leak detection & re-piping', 'Supports Dynamos. Will find your leak before his tea goes cold.', 1),
  ('Tatenda Chari',  'Senior technician',         9, 'Geysers & solar installs',   'Fixes geysers faster than load-shedding can break them.', 2),
  ('Kuda Ncube',     'Drainage specialist',       7, 'Jetting & camera surveys',   'Has seen things in drains he won''t talk about at dinner.', 3),
  ('Patience Dube',  'Pumps & boreholes',         8, 'Pressure systems & tanks',   'Believes every Harare home deserves water that just works.', 4)
on conflict do nothing;
