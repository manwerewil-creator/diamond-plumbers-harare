import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ServiceHero } from '@/components/service/ServiceHero';
import { StickyQuoteBar } from '@/components/service/StickyQuoteBar';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Icon } from '@/components/icons';
import { QuoteButton } from '@/components/quote/QuoteButton';
import { JsonLd } from '@/components/JsonLd';
import { services, getService, caseStudiesForService } from '@/lib/content';
import { caseImages } from '@/lib/images';
import { serviceSchema, faqSchema } from '@/lib/seo';
import { site } from '@/lib/site';

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const s = getService(params.slug);
  if (!s) return {};
  return {
    title: `${s.title} in Harare`,
    description: `${s.blurb} ${s.pricing.from}. Fixed written quote, 1-year guarantee, average arrival 47 minutes.`,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: {
      title: `${s.title} in Harare · ${site.name}`,
      description: s.blurb,
      url: `${site.url}/services/${s.slug}`,
    },
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = getService(params.slug);
  if (!service) notFound();

  const cases = caseStudiesForService(service.slug);
  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <ServiceHero
        slug={service.slug}
        title={service.title}
        blurb={service.blurb}
        rotator={service.rotator}
        icon={service.icon}
        emergency={service.emergency}
      />

      {/* What we fix */}
      <section className="section bg-paper">
        <div className="container-px grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow">What we fix</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              The symptoms we sort, <span className="grad-text">in plain language.</span>
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Recognise any of these? That’s us. Not sure if it’s covered? Send a photo and we’ll tell you straight.
            </p>
            <div className="mt-6 rounded-panel border border-line bg-mist p-5">
              <p className="text-sm font-semibold text-ink">{service.pricing.from}</p>
              <p className="mt-1 text-sm text-muted">{service.pricing.caveat}</p>
              <QuoteButton service={service.slug} source={`service-pricing-${service.slug}`} size="md" className="mt-4 w-full">
                Get my fixed price
              </QuoteButton>
            </div>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2">
            {service.symptoms.map((sym) => (
              <li key={sym} className="flex items-start gap-3 rounded-card border border-line bg-paper p-4">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent/10 text-accent-600">
                  <Icon name="check" width={15} height={15} />
                </span>
                <span className="text-[15px] leading-snug text-ink">{sym}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process for this service */}
      <section className="section bg-mist">
        <div className="container-px">
          <p className="eyebrow">Our process</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
            How a {service.title.toLowerCase()} job actually goes
          </h2>
          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step, i) => (
              <li key={step.title} className="card-surface p-6">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-navy text-sm font-bold text-white tnum">{i + 1}</span>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{step.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Case studies */}
      {cases.length > 0 && (
        <section className="section bg-paper">
          <div className="container-px">
            <p className="eyebrow">Recent jobs</p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              {service.title} we’ve handled lately
            </h2>
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {cases.map((c) => (
                <article key={c.id} className="card-surface overflow-hidden p-0">
                  <div className="grid grid-cols-2 gap-px">
                    <div className="relative aspect-[4/3]">
                      <Image src={caseImages[c.id].before.src} alt={caseImages[c.id].before.alt} fill sizes="(max-width:1024px) 50vw, 25vw" className="object-cover" />
                      <span className="absolute left-2 top-2 rounded-full bg-navy-950/80 px-2 py-0.5 text-[10px] font-bold text-white">BEFORE</span>
                    </div>
                    <div className="relative aspect-[4/3]">
                      <Image src={caseImages[c.id].after.src} alt={caseImages[c.id].after.alt} fill sizes="(max-width:1024px) 50vw, 25vw" className="object-cover" />
                      <span className="absolute right-2 top-2 rounded-full bg-coal px-2 py-0.5 text-[10px] font-bold text-white">AFTER</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-semibold uppercase tracking-wide text-accent-600">{c.area} · {c.time}</p>
                    <h3 className="mt-1 font-display text-lg font-semibold text-ink">{c.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted">{c.problem}</p>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink"><span className="font-semibold">Fix:</span> {c.fix}</p>
                    <blockquote className="mt-4 border-l-2 border-accent pl-3 text-sm italic text-muted">
                      “{c.quote.text}” <span className="not-italic font-semibold">— {c.quote.name}</span>
                    </blockquote>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="section bg-mist">
        <div className="container-px max-w-3xl">
          <p className="eyebrow">Questions</p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
            {service.title} — the usual questions
          </h2>
          <Accordion type="single" collapsible defaultValue="sfaq-0" className="mt-8">
            {service.faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`sfaq-${i}`}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Related services */}
      <section className="section-tight bg-paper">
        <div className="container-px">
          <h2 className="font-display text-xl font-semibold text-ink">Other things we fix</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {related.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="group card-surface flex items-center gap-3 p-5">
                <span className="grid h-11 w-11 place-items-center rounded-card bg-accent/10 text-accent-600 group-hover:bg-accent group-hover:text-white">
                  <Icon name={s.icon} width={22} height={22} />
                </span>
                <span className="font-semibold text-ink">{s.title}</span>
                <Icon name="arrow" width={18} height={18} className="ml-auto text-muted transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <StickyQuoteBar slug={service.slug} title={service.title} from={service.pricing.from} />

      <JsonLd data={serviceSchema(service.slug)!} />
      <JsonLd data={faqSchema(service.faqs)} />
    </>
  );
}
