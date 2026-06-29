'use client';

import { SectionHeading } from '@/components/SectionHeading';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { QuoteButton } from '@/components/quote/QuoteButton';
import { Icon } from '@/components/icons';
import { faqs } from '@/lib/content';
import { site, defaultWhatsAppMessage } from '@/lib/site';
import { whatsappLink } from '@/lib/utils';

export function FAQ({ items = faqs }: { items?: { q: string; a: string }[] }) {
  return (
    <section id="faq" className="section bg-paper">
      <div className="container-px grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="Good questions"
            title={<>The things <span className="grad-text">people ask us.</span></>}
            intro="Can’t see your question? Ask us directly — we’d rather answer it now than have you wondering."
          />
          <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col">
            <QuoteButton source="faq" size="lg">Ask in a quote</QuoteButton>
            <Button asChild variant="secondary" size="lg">
              <a href={whatsappLink(site.whatsapp, defaultWhatsAppMessage)} target="_blank" rel="noopener noreferrer">
                <Icon name="whatsapp" width={18} height={18} /> WhatsApp a question
              </a>
            </Button>
          </div>
        </div>

        <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
          {items.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`}>
              <AccordionTrigger>{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
