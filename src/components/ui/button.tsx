'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-[transform,background-color,box-shadow,border-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:opacity-50 active:translate-y-px [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        // Primary CTA — glossy black pill (the signature). The default "do this".
        primary:
          'bg-coal text-white shadow-ink ring-coal border border-white/10 hover:-translate-y-0.5 hover:bg-coal-soft hover:shadow-inkHover',
        // EMERGENCY ONLY — warm rust. Never use this variant for anything else.
        emergency:
          'bg-emergency text-white shadow-emergencyGlow ring-emergency hover:-translate-y-0.5 hover:bg-emergency-dark',
        // Quiet bordered secondary for non-urgent visitors.
        secondary:
          'bg-paper text-ink border border-ink/15 ring-accent hover:-translate-y-0.5 hover:border-ink/40 hover:shadow-liftSoft',
        // On dark espresso backgrounds — inverts to a cream pill.
        onDark:
          'bg-cream text-ink shadow-ink ring-white border border-black/5 hover:-translate-y-0.5 hover:bg-white',
        // Bordered ghost on dark backgrounds.
        outline:
          'border border-white/25 bg-white/5 text-white ring-white hover:bg-white/10 hover:border-white/45 backdrop-blur-sm',
        ghost: 'text-ink ring-accent hover:bg-cloud',
        link: 'text-accent-600 underline-offset-4 hover:underline rounded-none',
      },
      size: {
        sm: 'h-10 px-4 text-sm',
        md: 'h-12 px-6 text-[15px]',
        lg: 'h-14 px-7 text-base',
        xl: 'h-[60px] px-8 text-lg',
        icon: 'h-12 w-12',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
