import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';

/**
 * Diamond Plumbers — "warm cream + espresso" design system.
 * Adapted from the Rylo Labz editorial design language: single typeface
 * (Inter Tight), oversized headings with tight tracking, generous whitespace,
 * and a glossy black pill CTA. Palette is white/cream + brown, with a warm rust
 * reserved for emergency CTAs.
 *
 * Token NAMES are kept stable (ink/accent/navy/emergency/…) so components don't
 * need rewriting — only the VALUES change to repaint the whole site.
 */
const config: Config = {
  darkMode: ['class'],
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/lib/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: { '2xl': '1280px' },
    },
    extend: {
      colors: {
        // Espresso family — used for dark sections, text, and the deepest tones.
        // (Name kept as `navy` so existing dark-section classes keep working.)
        navy: {
          DEFAULT: '#241811',
          950: '#160E08',
          900: '#211610',
          800: '#33241A',
          700: '#4A3526',
          600: '#5E4632',
        },
        ink: { DEFAULT: '#221812', soft: '#3C2C20' },
        // Brand brown (name kept as `accent`).
        accent: {
          DEFAULT: '#6B4A2F',
          50: '#F4EADD',
          400: '#A9743F', // caramel — lighter accent / gradient end
          500: '#6B4A2F',
          600: '#54381F', // darker brown for text-on-cream links
          teal: '#A9743F', // gradient companion (warm caramel, not teal)
        },
        // The glossy CTA black.
        coal: { DEFAULT: '#100C09', soft: '#1E1712' },
        // Emergency only — warm rust that still signals urgency on cream.
        emergency: { DEFAULT: '#BD4528', dark: '#9A3620' },
        // Neutrals — warm, not grey.
        paper: '#FFFFFF',
        cream: '#FBF8F3',
        mist: '#F6F0E7',
        cloud: '#EFE7D9',
        line: '#E7DCCB',
        muted: '#6E5C4D',
        slatey: '#A2907D',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Inter Tight', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'Inter Tight', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-sm': ['clamp(2.5rem, 6vw, 3.5rem)', { lineHeight: '1.0', letterSpacing: '-0.03em' }],
        'display': ['clamp(2.75rem, 7vw, 5rem)', { lineHeight: '0.98', letterSpacing: '-0.035em' }],
        'display-lg': ['clamp(3rem, 9vw, 7rem)', { lineHeight: '0.94', letterSpacing: '-0.04em' }],
      },
      borderRadius: {
        card: '14px',
        panel: '24px',
        xl: '20px',
      },
      boxShadow: {
        // Border-first elevation; warm shadows.
        lift: '0 22px 48px -24px rgba(36, 24, 17, 0.34)',
        liftSoft: '0 10px 28px -14px rgba(36, 24, 17, 0.20)',
        nav: '0 12px 34px -16px rgba(36, 24, 17, 0.22)',
        modal: '0 36px 90px -28px rgba(22, 14, 8, 0.5)',
        // Glossy black pill CTA (the signature move).
        ink: '0 1px 0 rgba(255,255,255,.18) inset, 0 14px 34px -12px rgba(16,12,9,.55)',
        inkHover: '0 1px 0 rgba(255,255,255,.28) inset, 0 20px 44px -12px rgba(16,12,9,.7)',
        accentGlow: '0 16px 40px -16px rgba(107, 74, 47, 0.5)',
        emergencyGlow: '0 14px 36px -12px rgba(189, 69, 40, 0.5)',
      },
      letterSpacing: {
        eyebrow: '0.18em',
      },
      maxWidth: {
        content: '1280px',
        prose: '65ch',
      },
      keyframes: {
        'cursor-pulse': { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.35' } },
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        'live-dot': { '0%, 100%': { transform: 'scale(1)', opacity: '1' }, '50%': { transform: 'scale(1.7)', opacity: '0' } },
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
        'sheen': { '0%': { backgroundPosition: '130% 0' }, '55%': { backgroundPosition: '-30% 0' }, '100%': { backgroundPosition: '-30% 0' } },
      },
      animation: {
        'cursor-pulse': 'cursor-pulse 1s ease-in-out infinite',
        marquee: 'marquee 40s linear infinite',
        'live-dot': 'live-dot 2s ease-out infinite',
        'accordion-down': 'accordion-down 0.25s ease-out',
        'accordion-up': 'accordion-up 0.25s ease-out',
        sheen: 'sheen 9s ease-in-out infinite',
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
