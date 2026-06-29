import type { SVGProps } from 'react';

/**
 * Custom line icons for Diamond Plumbers.
 * Built on a consistent 24px grid, 1.6 stroke, round caps/joins — the Lucide
 * visual language, but drawn for plumbing (drop, wrench, gauge, drain, geyser,
 * pump) so we avoid stock "plumber-with-thumbs-up" clip-art.
 *
 * All decorative by default (aria-hidden). Pass a `title` for meaningful use.
 */

export type IconName =
  | 'drop' | 'wrench' | 'gauge' | 'drain' | 'geyser' | 'pump'
  | 'shield' | 'clock' | 'tag' | 'badge' | 'phone' | 'doc'
  | 'whatsapp' | 'arrow' | 'check' | 'star' | 'map-pin' | 'menu' | 'close' | 'spark';

type Props = SVGProps<SVGSVGElement> & { title?: string };

function base(props: Props) {
  const { title, ...rest } = props;
  return {
    width: 24,
    height: 24,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': title ? undefined : true,
    role: title ? 'img' : undefined,
    ...rest,
  };
}

export function DropIcon(p: Props) {
  return (
    <svg {...base(p)}>
      {p.title && <title>{p.title}</title>}
      <path d="M12 3.2c3.2 3.7 5.8 6.9 5.8 10.2A5.8 5.8 0 0 1 12 19.2a5.8 5.8 0 0 1-5.8-5.8C6.2 10.1 8.8 6.9 12 3.2Z" />
      <path d="M9.6 13.6a2.6 2.6 0 0 0 2.6 2.6" />
    </svg>
  );
}

export function WrenchIcon(p: Props) {
  return (
    <svg {...base(p)}>
      {p.title && <title>{p.title}</title>}
      <path d="M15.8 6.3a3.8 3.8 0 0 1-4.9 4.9l-6 6a1.8 1.8 0 0 0 2.5 2.5l6-6a3.8 3.8 0 0 0 4.9-4.9l-2.3 2.3-2.2-.6-.6-2.2 2.6-2Z" />
    </svg>
  );
}

export function GaugeIcon(p: Props) {
  return (
    <svg {...base(p)}>
      {p.title && <title>{p.title}</title>}
      <path d="M3.5 15a8.5 8.5 0 0 1 17 0" />
      <path d="M12 15l3.5-3.2" />
      <circle cx="12" cy="15" r="1.1" fill="currentColor" stroke="none" />
      <path d="M3.5 18.5h17" />
    </svg>
  );
}

export function DrainIcon(p: Props) {
  return (
    <svg {...base(p)}>
      {p.title && <title>{p.title}</title>}
      <circle cx="12" cy="12" r="8.2" />
      <path d="M12 3.8v16.4M3.8 12h16.4M6.3 6.3l11.4 11.4M17.7 6.3 6.3 17.7" />
    </svg>
  );
}

export function GeyserIcon(p: Props) {
  return (
    <svg {...base(p)}>
      {p.title && <title>{p.title}</title>}
      <rect x="6" y="3.5" width="12" height="17" rx="4" />
      <path d="M9 8h6M9 11.5h6" />
      <path d="M10 20.5v1.5M14 20.5v1.5" />
      <path d="M12 14.5c1 .9 1.4 1.7 1.4 2.4A1.4 1.4 0 0 1 12 18.3a1.4 1.4 0 0 1-1.4-1.4c0-.7.4-1.5 1.4-2.4Z" />
    </svg>
  );
}

export function PumpIcon(p: Props) {
  return (
    <svg {...base(p)}>
      {p.title && <title>{p.title}</title>}
      <rect x="3.5" y="11" width="11" height="8" rx="2" />
      <path d="M14.5 14h3a2.5 2.5 0 0 0 2.5-2.5V6" />
      <path d="M18 3.5l2 2.5 2-2.5" />
      <path d="M6.5 11V8a2.5 2.5 0 0 1 5 0v3" />
      <path d="M6.5 19v1.5M11.5 19v1.5" />
    </svg>
  );
}

export function ShieldIcon(p: Props) {
  return (
    <svg {...base(p)}>
      {p.title && <title>{p.title}</title>}
      <path d="M12 3.2 19 6v5.4c0 4.2-2.9 7.2-7 9.4-4.1-2.2-7-5.2-7-9.4V6l7-2.8Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function ClockIcon(p: Props) {
  return (
    <svg {...base(p)}>
      {p.title && <title>{p.title}</title>}
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 1.8" />
    </svg>
  );
}

export function TagIcon(p: Props) {
  return (
    <svg {...base(p)}>
      {p.title && <title>{p.title}</title>}
      <path d="M12.6 3.5H19a1.5 1.5 0 0 1 1.5 1.5v6.4a2 2 0 0 1-.6 1.4l-6.6 6.6a2 2 0 0 1-2.8 0l-5.8-5.8a2 2 0 0 1 0-2.8l6.6-6.6a2 2 0 0 1 1.3-.7Z" />
      <circle cx="16" cy="8" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function BadgeIcon(p: Props) {
  return (
    <svg {...base(p)}>
      {p.title && <title>{p.title}</title>}
      <path d="M12 3.2 14 5l2.7-.5.8 2.6 2.3 1.5-1.1 2.5 1.1 2.5-2.3 1.5-.8 2.6L14 17l-2 1.8L10 17l-2.7.5-.8-2.6L4.2 13.4l1.1-2.5-1.1-2.5L6.5 7l.8-2.6L10 5l2-1.8Z" />
      <path d="m9.4 11.2 1.8 1.8 3.4-3.6" />
    </svg>
  );
}

export function PhoneIcon(p: Props) {
  return (
    <svg {...base(p)}>
      {p.title && <title>{p.title}</title>}
      <path d="M6.5 4h3l1.3 3.3-1.7 1.3a11 11 0 0 0 4.3 4.3l1.3-1.7L18 12.5v3a1.6 1.6 0 0 1-1.7 1.6A12.7 12.7 0 0 1 4.9 5.7 1.6 1.6 0 0 1 6.5 4Z" />
    </svg>
  );
}

export function DocIcon(p: Props) {
  return (
    <svg {...base(p)}>
      {p.title && <title>{p.title}</title>}
      <path d="M7 3.5h6.5L18 8v11a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 19V5A1.5 1.5 0 0 1 7 3.5Z" />
      <path d="M13 3.7V8h4.3M9 12.5h6M9 15.5h6M9 9.5h2" />
    </svg>
  );
}

export function WhatsAppIcon(p: Props) {
  return (
    <svg {...base(p)}>
      {p.title && <title>{p.title}</title>}
      <path d="M4 20l1.3-3.9A7.5 7.5 0 1 1 8 19l-4 1Z" />
      <path d="M9 8.5c-.3 0-.6.1-.8.4-.3.3-.9.9-.9 2.1s.9 2.5 1 2.6c.1.2 1.7 2.8 4.3 3.7 2.1.8 2.6.7 3 .6.5-.1 1.4-.6 1.6-1.2.2-.6.2-1 .1-1.2 0-.1-.3-.2-.6-.4l-1.4-.7c-.2-.1-.4-.1-.6.1l-.6.8c-.1.2-.3.2-.5.1-.3-.1-1.1-.4-2-1.2-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.4.1-.5l.4-.5c.1-.2.1-.3.2-.5 0-.2 0-.3 0-.5l-.6-1.5c-.2-.4-.4-.4-.6-.4H9Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ArrowIcon(p: Props) {
  return (
    <svg {...base(p)}>
      {p.title && <title>{p.title}</title>}
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function CheckIcon(p: Props) {
  return (
    <svg {...base(p)}>
      {p.title && <title>{p.title}</title>}
      <path d="m5 12.5 4.2 4.2L19 7" />
    </svg>
  );
}

export function StarIcon(p: Props) {
  return (
    <svg {...base(p)} fill="currentColor" stroke="none">
      {p.title && <title>{p.title}</title>}
      <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9L3.5 9.7l5.9-.9L12 3.5Z" />
    </svg>
  );
}

export function MapPinIcon(p: Props) {
  return (
    <svg {...base(p)}>
      {p.title && <title>{p.title}</title>}
      <path d="M12 21c4-4 6.5-7.1 6.5-10.5a6.5 6.5 0 0 0-13 0C5.5 13.9 8 17 12 21Z" />
      <circle cx="12" cy="10.5" r="2.3" />
    </svg>
  );
}

export function MenuIcon(p: Props) {
  return (
    <svg {...base(p)}>
      {p.title && <title>{p.title}</title>}
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon(p: Props) {
  return (
    <svg {...base(p)}>
      {p.title && <title>{p.title}</title>}
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function SparkIcon(p: Props) {
  return (
    <svg {...base(p)}>
      {p.title && <title>{p.title}</title>}
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
    </svg>
  );
}

export const ICONS: Record<IconName, (p: Props) => JSX.Element> = {
  drop: DropIcon,
  wrench: WrenchIcon,
  gauge: GaugeIcon,
  drain: DrainIcon,
  geyser: GeyserIcon,
  pump: PumpIcon,
  shield: ShieldIcon,
  clock: ClockIcon,
  tag: TagIcon,
  badge: BadgeIcon,
  phone: PhoneIcon,
  doc: DocIcon,
  whatsapp: WhatsAppIcon,
  arrow: ArrowIcon,
  check: CheckIcon,
  star: StarIcon,
  'map-pin': MapPinIcon,
  menu: MenuIcon,
  close: CloseIcon,
  spark: SparkIcon,
};

export function Icon({ name, ...props }: { name: IconName } & Props) {
  const Cmp = ICONS[name];
  return <Cmp {...props} />;
}
