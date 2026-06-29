import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/icons';
import { site } from '@/lib/site';

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden bg-navy-950 text-white">
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden />
      <div className="container-px relative text-center">
        <p className="eyebrow justify-center text-accent-400">Error 404</p>
        <h1 className="mt-4 font-display text-5xl font-semibold sm:text-6xl">
          That page sprung a leak.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-white/70">
          We couldn’t find what you were looking for — but we can find your leak. Let’s get you back on track.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild variant="primary" size="lg">
            <Link href="/">Back to home <Icon name="arrow" width={18} height={18} /></Link>
          </Button>
          <Button asChild variant="emergency" size="lg">
            <a href={`tel:${site.phoneE164}`}>
              <Icon name="phone" width={18} height={18} /> Call now
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
