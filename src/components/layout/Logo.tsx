import { cn } from '@/lib/utils';

/**
 * Pure-text wordmark — no glyph. "Diamond" set tight in the display face with a
 * caramel "Plumbers" lockup and a hairline divider for a crafted, logo-like feel.
 */
export function Logo({ className, tone = 'dark' }: { className?: string; tone?: 'dark' | 'light' }) {
  const light = tone === 'light';
  return (
    <span
      className={cn(
        'group inline-flex items-baseline gap-1.5 font-display text-[19px] font-semibold leading-none tracking-[-0.03em] sm:text-xl',
        className,
      )}
    >
      <span className={light ? 'text-white' : 'text-ink'}>Diamond</span>
      <span
        aria-hidden
        className={cn('mx-0.5 h-3.5 w-px self-center transition-colors', light ? 'bg-white/30' : 'bg-line')}
      />
      <span className="font-medium uppercase tracking-[0.16em] text-[0.62em] text-accent-400">
        Plumbers
      </span>
    </span>
  );
}
