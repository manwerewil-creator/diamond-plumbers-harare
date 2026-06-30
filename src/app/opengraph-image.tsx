import { ImageResponse } from 'next/og';
import { site } from '@/lib/site';

export const runtime = 'edge';
export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Dynamically generated social card so there's no binary placeholder to ship. */
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          background: 'linear-gradient(135deg, #07172B 0%, #0B1F3A 55%, #102A4C 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: 'linear-gradient(135deg,#0EA5E9,#14B8A6)' }} />
          <div style={{ display: 'flex', gap: 10, fontSize: 30, fontWeight: 700 }}>
            <span>Diamon</span>
            <span style={{ color: '#38BDF8' }}>Contractors</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 30, color: '#38BDF8', letterSpacing: 2, textTransform: 'uppercase' }}>
            Harare’s 24/7 plumbing team
          </div>
          <div style={{ fontSize: 78, fontWeight: 800, lineHeight: 1.05, marginTop: 18 }}>
            Burst pipe. Fixed today.
          </div>
          <div style={{ fontSize: 30, color: 'rgba(255,255,255,0.7)', marginTop: 18 }}>
            Fixed price · 1-year guarantee · average arrival 47 minutes
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          {['Emergency', 'Drains', 'Geysers', 'Leak detection', 'Boreholes'].map((t) => (
            <div key={t} style={{ fontSize: 22, padding: '10px 18px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.85)' }}>
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
