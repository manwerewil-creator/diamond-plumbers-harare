import { Hero } from '@/components/hero/Hero';
import { ServicesBand } from '@/components/sections/ServicesBand';
import { WhyUs } from '@/components/sections/WhyUs';
import { Process } from '@/components/sections/Process';
import { BeforeAfter } from '@/components/sections/BeforeAfter';
import { FinalCTA } from '@/components/sections/FinalCTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesBand />
      <WhyUs />
      <Process />
      <BeforeAfter />
      <FinalCTA />
    </>
  );
}
