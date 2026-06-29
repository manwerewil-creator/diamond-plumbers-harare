'use client';

import { useEffect, useState } from 'react';

/**
 * Returns true when the user has requested reduced motion.
 * Defaults to `true` on the server / first paint so we never flash a heavy
 * animation before we know the user's preference.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
