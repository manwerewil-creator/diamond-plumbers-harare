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
        // Primary CTA — the single accent (deep cyan). The default "do this".
        primary:
          'bg-accent text-white shadow-accentGlow ring-accent hover:-translate-y-0.5 hover:bg-accent-600',
        // EMERGENCY ONLY — warm orange. Never use this variant for anything else.
        emergency:
          'bg-emergency text-white shadow-emergencyGlow ring-emergency hover:-translate-y-0.5 hover:bg-emergency-dark',
        // Quiet secondary for non-urgent visitors.
        secondary:
          'bg-white text-ink border border-line ring-accent hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-liftSoft',
        // On dark backgrounds (hero / final CTA).
        outline:
          'border border-white/25 bg-white/5 text-white ring-white hover:bg-white/10 hover:border-white/40 backdrop-blur-sm',
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
