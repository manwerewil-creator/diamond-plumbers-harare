import { Hero } from '@/components/hero/Hero';
import { ServicesBand } from '@/components/sections/ServicesBand';
import { WhyUs } from '@/components/sections/WhyUs';
import { Process } from '@/components/sections/Process';
import { BeforeAfter } from '@/components/sections/BeforeAfter';
import { ServiceArea } from '@/components/sections/ServiceArea';
import { QuoteCalculator } from '@/components/sections/QuoteCalculator';
import { Testimonials } from '@/components/sections/Testimonials';
import { Team } from '@/components/sections/Team';
import { FAQ } from '@/components/sections/FAQ';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { JsonLd } from '@/components/JsonLd';
import { faqSchema } from '@/lib/seo';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesBand />
      <WhyUs />
      <Process />
      <BeforeAfter />
      <ServiceArea />
      <QuoteCalculator />
      <Testimonials />
      <Team />
      <FAQ />
      <FinalCTA />
      <JsonLd data={faqSchema()} />
    </>
  );
}
