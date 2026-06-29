import { cn } from '@/lib/utils';
import { Icon, type IconName } from '@/components/icons';

/**
 * Branded stand-in for real photography. Renders an on-brand gradient panel with
 * the REPLACE_WITH_REAL_PHOTO instruction baked in, so the layout is complete and
 * it's obvious what to swap. Replace usages with <Image /> once shots are ready.
 */
export function PhotoPlaceholder({
  label,
  icon = 'drop',
  tone = 'navy',
  className,
}: {
  label: string;
  icon?: IconName;
  tone?: 'navy' | 'accent' | 'mist';
  className?: string;
}) {
  const tones = {
    navy: 'from-navy-800 to-navy-950 text-white/80',
    accent: 'from-accent-600 to-navy-900 text-white/85',
    mist: 'from-cloud to-mist text-navy/60',
  } as const;

  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        'relative flex h-full w-full items-end overflow-hidden bg-gradient-to-br',
        tones[tone],
        className,
      )}
    >
      <div className="absolute inset-0 bg-grid opacity-20" aria-hidden />
      <Icon name={icon} width={56} height={56} className="absolute right-4 top-4 opacity-25" aria-hidden />
      <div className="relative z-10 p-4">
        <span className="inline-block rounded-md bg-black/25 px-2 py-1 text-[11px] font-medium uppercase tracking-wide backdrop-blur-sm">
          {label}
        </span>
      </div>
    </div>
  );
}
