import type { Variants } from 'framer-motion';

/** The "expo-out" feel used across the site (matches the hero spec bezier). */
export const expoOut = [0.22, 1, 0.36, 1] as const;
export const easeOutQuart = [0.25, 1, 0.5, 1] as const;

/** Section reveal: fade + small rise, triggered on scroll into view. */
export const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: expoOut, delay: i * 0.0 },
  }),
};

/** Staggered container — children animate 100ms apart (services/testimonials). */
export const staggerContainer = (stagger = 0.1, delayChildren = 0.05): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: expoOut } },
};

export const viewportOnce = { once: true, margin: '0px 0px -12% 0px' } as const;
