import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';

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
      padding: '1.25rem',
      screens: { '2xl': '1200px' },
    },
    extend: {
      colors: {
        // Trust + text. Deep navy across a tonal range for layered dark sections.
        navy: {
          DEFAULT: '#0B1F3A',
          950: '#07172B',
          900: '#0B1F3A',
          800: '#102A4C',
          700: '#16395F',
          600: '#1E4B7A',
        },
        ink: '#0B1F3A',
        // The single bold accent — deep cyan. Signals water + reliability.
        accent: {
          DEFAULT: '#0EA5E9',
          50: '#ECFBFF',
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7',
          teal: '#14B8A6', // secondary, gradient energy only — never a solo CTA colour
        },
        // RESERVED EXCLUSIVELY FOR EMERGENCY CTAs. Do not use anywhere else.
        emergency: {
          DEFAULT: '#F97316',
          dark: '#EA580C',
        },
        // Neutrals
        paper: '#FFFFFF',
        mist: '#F6F8FB',
        cloud: '#EEF2F7',
        line: '#E2E8F0',
        muted: '#5A6B82',
        slatey: '#94A3B8',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Tightened display scale for hero sizes (80–120px range)
        'display-sm': ['clamp(2.5rem, 7vw, 3.5rem)', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
        'display': ['clamp(3rem, 9vw, 5rem)', { lineHeight: '1.0', letterSpacing: '-0.025em' }],
        'display-lg': ['clamp(3.25rem, 11vw, 7.25rem)', { lineHeight: '0.98', letterSpacing: '-0.03em' }],
      },
      borderRadius: {
        card: '12px',
        panel: '20px',
        xl: '16px',
      },
      boxShadow: {
        // Border-first elevation; shadows only on lift/sticky/modal.
        lift: '0 18px 40px -20px rgba(11, 31, 58, 0.28)',
        liftSoft: '0 8px 24px -12px rgba(11, 31, 58, 0.18)',
        nav: '0 2px 16px -8px rgba(11, 31, 58, 0.22)',
        modal: '0 30px 80px -24px rgba(7, 23, 43, 0.45)',
        accentGlow: '0 16px 44px -16px rgba(14, 165, 233, 0.55)',
        emergencyGlow: '0 16px 44px -14px rgba(249, 115, 22, 0.55)',
      },
      letterSpacing: {
        eyebrow: '0.16em',
      },
      maxWidth: {
        content: '1200px',
        prose: '65ch',
      },
      keyframes: {
        'cursor-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'live-dot': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.7)', opacity: '0' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'drift': {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(2%, -3%, 0) scale(1.06)' },
        },
      },
      animation: {
        'cursor-pulse': 'cursor-pulse 1s ease-in-out infinite',
        marquee: 'marquee 38s linear infinite',
        'live-dot': 'live-dot 2s ease-out infinite',
        'accordion-down': 'accordion-down 0.25s ease-out',
        'accordion-up': 'accordion-up 0.25s ease-out',
        drift: 'drift 18s ease-in-out infinite',
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
