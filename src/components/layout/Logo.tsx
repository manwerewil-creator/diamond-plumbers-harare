import { cn } from '@/lib/utils';
import { site } from '@/lib/site';

/** Wordmark + custom water-drop-in-diamond glyph. No external asset needed. */
export function Logo({ className, tone = 'dark' }: { className?: string; tone?: 'dark' | 'light' }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight', className)}>
      <span className="grid h-9 w-9 place-items-center rounded-[10px] bg-gradient-to-br from-accent to-accent-teal text-white shadow-accentGlow">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 2.5 21 11l-9 10.5L3 11l9-8.5Z" stroke="white" strokeWidth="1.4" strokeLinejoin="round" opacity=".6" />
          <path d="M12 8c2 2.3 3.1 3.9 3.1 5.4A3.1 3.1 0 0 1 12 16.4a3.1 3.1 0 0 1-3.1-3C8.9 11.9 10 10.3 12 8Z" fill="white" />
        </svg>
      </span>
      <span className={tone === 'light' ? 'text-white' : 'text-ink'}>
        {site.shortName}<span className="text-accent-500"> Plumbers</span>
      </span>
    </span>
  );
}
