'use client';

import { Button, type ButtonProps } from '@/components/ui/button';
import { useQuoteModal } from '@/components/quote/QuoteModalProvider';
import { Icon } from '@/components/icons';

/** Any "Get a free quote" CTA. Opens the quote modal with optional context. */
export function QuoteButton({
  children = 'Get a free quote',
  service,
  urgency,
  source,
  withArrow = true,
  onClick,
  ...rest
}: ButtonProps & { service?: string; urgency?: string; source?: string; withArrow?: boolean }) {
  const { open } = useQuoteModal();
  return (
    <Button
      onClick={(e) => {
        onClick?.(e); // run any caller handler (e.g. close the mobile menu)…
        open({ service, urgency, source }); // …then open the quote modal
      }}
      {...rest}
    >
      {children}
      {withArrow && <Icon name="arrow" width={18} height={18} />}
    </Button>
  );
}
