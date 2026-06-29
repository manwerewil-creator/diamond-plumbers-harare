'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/SectionHeading';
import { Icon } from '@/components/icons';
import { QuoteButton } from '@/components/quote/QuoteButton';
import { Button } from '@/components/ui/button';
import { areaPins, cityCenter, serviceAreas } from '@/lib/content';
import { site } from '@/lib/site';
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/motion';

const W = 440;
const H = 360;
const PAD = 46;

/**
 * Custom dark-styled service-area map. No external tiles or token required — it
 * renders instantly and weighs nothing on 3G. To swap in a real Mapbox map,
 * see README → "Real map". Pins are anonymised to suburb level.
 */
export function ServiceArea() {
  const { project, radius } = useMemo(() => {
    const all = [...areaPins, cityCenter];
    const lngs = all.map((p) => p.lng);
    const lats = all.map((p) => p.lat);
    const minLng = Math.min(...lngs), maxLng = Math.max(...lngs);
    const minLat = Math.min(...lats), maxLat = Math.max(...lats);
    const project = (lng: number, lat: number) => ({
      x: PAD + ((lng - minLng) / (maxLng - minLng)) * (W - PAD * 2),
      // invert lat so north is up
      y: PAD + ((maxLat - lat) / (maxLat - minLat)) * (H - PAD * 2),
    });
    return { project, radius: (W - PAD * 2) * 0.52 };
  }, []);

  const c = project(cityCenter.lng, cityCenter.lat);

  return (
    <section id="area" className="section relative overflow-hidden bg-navy-950 text-white">
      <div className="container-px relative grid items-center gap-12 lg:grid-cols-2">
        {/* Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6 }}
          className="relative order-2 overflow-hidden rounded-panel border border-white/10 bg-navy-900 lg:order-1"
        >
          <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" role="img" aria-label="Map of Diamond Plumbers' same-day coverage across Harare">
            <defs>
              <radialGradient id="cover" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.28" />
                <stop offset="70%" stopColor="#0EA5E9" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* grid */}
            {Array.from({ length: 9 }).map((_, i) => (
              <line key={`v${i}`} x1={(W / 8) * i} y1={0} x2={(W / 8) * i} y2={H} stroke="rgba(255,255,255,0.05)" />
            ))}
            {Array.from({ length: 7 }).map((_, i) => (
              <line key={`h${i}`} x1={0} y1={(H / 6) * i} x2={W} y2={(H / 6) * i} stroke="rgba(255,255,255,0.05)" />
            ))}

            {/* coverage radius */}
            <motion.circle
              cx={c.x} cy={c.y} r={radius} fill="url(#cover)" stroke="#0EA5E9" strokeOpacity="0.5" strokeDasharray="4 5"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: `${c.x}px ${c.y}px` }}
            />

            {/* job pins */}
            {areaPins.map((p, i) => {
              const { x, y } = project(p.lng, p.lat);
              return (
                <motion.g key={p.name} initial={{ opacity: 0, y: -6 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} transition={{ delay: 0.3 + i * 0.05 }}>
                  <circle cx={x} cy={y} r="4.5" fill="#14B8A6" />
                  <circle cx={x} cy={y} r="4.5" fill="none" stroke="#14B8A6" strokeOpacity="0.4">
                    <animate attributeName="r" from="4.5" to="12" dur="2.4s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.5" to="0" dur="2.4s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
                  </circle>
                  <text x={x + 8} y={y + 3} fill="rgba(255,255,255,0.55)" fontSize="9" fontFamily="Inter, sans-serif">{p.name}</text>
                </motion.g>
              );
            })}

            {/* HQ marker */}
            <g>
              <circle cx={c.x} cy={c.y} r="7" fill="#0EA5E9" stroke="#fff" strokeWidth="1.5" />
              <text x={c.x} y={c.y - 12} fill="#fff" fontSize="10" fontWeight="700" textAnchor="middle" fontFamily="Inter, sans-serif">Harare CBD</text>
            </g>
          </svg>
          <span className="absolute bottom-3 right-3 rounded-md bg-black/30 px-2 py-1 text-[10px] text-white/60">Same-day coverage radius</span>
        </motion.div>

        {/* Copy + area list */}
        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="Service area"
            tone="light"
            title={<>Covering greater Harare, <span className="text-[#EBCDA4]">suburb by suburb.</span></>}
            intro="Same-day response across the Harare metro. If you’re just outside the radius, call us — we’ll quote over the phone and still get to you."
          />

          <motion.ul
            variants={staggerContainer(0.04)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-7 flex flex-wrap gap-2"
          >
            {serviceAreas.map((a) => (
              <motion.li key={a} variants={staggerItem}>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/5 px-3 py-1.5 text-sm text-white/80">
                  <Icon name="map-pin" width={14} height={14} className="text-accent-400" />
                  {a}
                </span>
              </motion.li>
            ))}
            <motion.li variants={staggerItem}>
              <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-sm font-medium text-accent-400">
                + greater Harare &amp; surrounds
              </span>
            </motion.li>
          </motion.ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <QuoteButton source="area" size="lg">Check my area</QuoteButton>
            <Button asChild variant="outline" size="lg">
              <a href={`tel:${site.phoneE164}`}>
                <Icon name="phone" width={18} height={18} /> Outside Harare? Call us
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
