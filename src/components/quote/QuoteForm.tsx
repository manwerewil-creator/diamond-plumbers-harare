'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { leadSchema, type LeadInput, PHOTO_LIMITS } from '@/lib/leadSchema';
import { serviceAreas, services, priceBands } from '@/lib/content';
import { site } from '@/lib/site';
import { whatsappLink } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Icon } from '@/components/icons';

type Props = {
  defaultService?: string;
  defaultUrgency?: string;
  source?: string;
  onSuccess?: () => void;
};

type Photo = { id: string; file: File; preview: string };

export function QuoteForm({ defaultService = '', defaultUrgency = '', source = 'quote-form', onSuccess }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: { service: defaultService, urgency: defaultUrgency, source },
  });

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [compressing, setCompressing] = useState(false);

  const selectedService = watch('service');
  const band = selectedService ? priceBands[selectedService] : undefined;

  async function onPhotos(list: FileList | null) {
    if (!list?.length) return;
    setCompressing(true);
    try {
      const { default: imageCompression } = await import('browser-image-compression');
      const room = PHOTO_LIMITS.maxCount - photos.length;
      const incoming = Array.from(list).slice(0, Math.max(0, room));
      const next: Photo[] = [];
      for (const file of incoming) {
        if (file.size > PHOTO_LIMITS.maxBytes) continue; // skip > 5MB originals
        const compressed = await imageCompression(file, {
          maxSizeMB: PHOTO_LIMITS.targetBytes / (1024 * 1024),
          maxWidthOrHeight: 1600,
          useWebWorker: true,
        });
        next.push({
          id: `${file.name}-${file.size}-${next.length}`,
          file: new File([compressed], file.name, { type: compressed.type }),
          preview: URL.createObjectURL(compressed),
        });
      }
      setPhotos((p) => [...p, ...next].slice(0, PHOTO_LIMITS.maxCount));
    } finally {
      setCompressing(false);
    }
  }

  function removePhoto(id: string) {
    setPhotos((p) => {
      const target = p.find((x) => x.id === id);
      if (target) URL.revokeObjectURL(target.preview);
      return p.filter((x) => x.id !== id);
    });
  }

  function buildWhatsApp(values: Partial<LeadInput>) {
    const parts = [
      `Hi ${site.name}, I'd like a quote.`,
      values.name ? `Name: ${values.name}` : '',
      values.problem ? `Problem: ${values.problem}` : '',
      values.area ? `Area: ${values.area}` : '',
      selectedService ? `Service: ${services.find((s) => s.slug === selectedService)?.title}` : '',
    ].filter(Boolean);
    return whatsappLink(site.whatsapp, parts.join('\n'));
  }

  async function onSubmit(values: LeadInput) {
    setStatus('idle');
    try {
      const fd = new FormData();
      Object.entries(values).forEach(([k, v]) => fd.append(k, v ?? ''));
      photos.forEach((p) => fd.append('photos', p.file, p.file.name));
      const res = await fetch('/api/lead', { method: 'POST', body: fd });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      onSuccess?.();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center">
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-accent/10 text-accent-600">
          <Icon name="check" width={28} height={28} />
        </div>
        <h3 className="font-display text-2xl text-ink">We’ve got it. Hang tight.</h3>
        <p className="mx-auto mt-2 max-w-sm text-[15px] text-muted">
          Your details are with our dispatch team. Expect a callback within{' '}
          <strong className="text-ink">10 minutes</strong> during working hours. For anything urgent,
          call or WhatsApp us now.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild variant="emergency" size="lg">
            <a href={`tel:${site.phoneE164}`}>
              <Icon name="phone" width={18} height={18} /> Call {site.phoneDisplay}
            </a>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <a href={whatsappLink(site.whatsapp, `Hi ${site.name}, I just submitted a quote request.`)} target="_blank" rel="noopener noreferrer">
              <Icon name="whatsapp" width={18} height={18} /> WhatsApp us
            </a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      {/* Honeypot — visually hidden, off-screen, not announced. */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        {...register('company')}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Your name" required error={errors.name?.message}>
          <Input placeholder="e.g. Tariro" autoComplete="name" aria-invalid={!!errors.name} {...register('name')} />
        </Field>
        <Field label="Phone / WhatsApp" required error={errors.phone?.message}>
          <Input
            placeholder="+263 77 …"
            inputMode="tel"
            autoComplete="tel"
            aria-invalid={!!errors.phone}
            {...register('phone')}
          />
        </Field>
      </div>

      <Field label="What’s broken?" required error={errors.problem?.message}>
        <Textarea
          rows={3}
          placeholder="e.g. Burst pipe under the kitchen sink, water everywhere"
          aria-invalid={!!errors.problem}
          {...register('problem')}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Area" hint="optional">
          <select
            className="flex h-12 w-full rounded-card border border-line bg-white px-4 text-[15px] text-ink focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30"
            {...register('area')}
          >
            <option value="">Select your suburb…</option>
            {serviceAreas.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
            <option value="Greater Harare">Elsewhere in greater Harare</option>
            <option value="Outside Harare">Outside Harare</option>
          </select>
        </Field>
        <Field label="Type of job" hint="optional">
          <select
            className="flex h-12 w-full rounded-card border border-line bg-white px-4 text-[15px] text-ink focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30"
            {...register('service')}
          >
            <option value="">Not sure / something else</option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>{s.title}</option>
            ))}
          </select>
        </Field>
      </div>

      {/* Value-before-contact: show the typical price band immediately. */}
      {band && (
        <p className="rounded-card bg-mist px-4 py-3 text-sm text-muted">
          <span className="font-semibold text-ink">{band.label}:</span>{' '}
          <span className="tnum text-accent-600">{band.range}</span> — typical range. You’ll get a
          fixed written quote before any work starts.
        </p>
      )}

      {/* Photos */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <Label>Photos of the problem <span className="font-normal text-muted">(optional, up to 5)</span></Label>
          {compressing && <span className="text-xs text-muted">Optimising…</span>}
        </div>
        <div className="flex flex-wrap gap-2">
          {photos.map((p) => (
            <div key={p.id} className="relative h-16 w-16 overflow-hidden rounded-card border border-line">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.preview} alt="Uploaded problem" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => removePhoto(p.id)}
                className="absolute right-0.5 top-0.5 grid h-5 w-5 place-items-center rounded-full bg-navy-950/80 text-white"
                aria-label="Remove photo"
              >
                <Icon name="close" width={12} height={12} />
              </button>
            </div>
          ))}
          {photos.length < PHOTO_LIMITS.maxCount && (
            <label className="grid h-16 w-16 cursor-pointer place-items-center rounded-card border border-dashed border-line text-muted transition-colors hover:border-accent/50 hover:text-accent-600">
              <input type="file" accept="image/*" multiple capture="environment" className="sr-only" onChange={(e) => onPhotos(e.target.files)} />
              <span className="text-2xl leading-none">+</span>
            </label>
          )}
        </div>
        <p className="mt-1.5 text-xs text-muted">A photo helps us quote accurately and arrive with the right parts. Compressed on your phone — light on data.</p>
      </div>

      {status === 'error' && (
        <p className="rounded-card border border-emergency/30 bg-emergency/5 px-4 py-3 text-sm text-emergency-dark">
          Something went wrong sending that. Please call or WhatsApp us instead — we don’t want you waiting.
        </p>
      )}

      <div className="flex flex-col gap-3 pt-1 sm:flex-row">
        <Button type="submit" variant="primary" size="lg" className="flex-1" disabled={isSubmitting}>
          {isSubmitting ? 'Sending…' : 'Get my free quote'}
          {!isSubmitting && <Icon name="arrow" width={18} height={18} />}
        </Button>
        <Button asChild variant="secondary" size="lg" className="sm:flex-none">
          <a href={buildWhatsApp(watch())} target="_blank" rel="noopener noreferrer">
            <Icon name="whatsapp" width={18} height={18} /> Prefer WhatsApp?
          </a>
        </Button>
      </div>
      <p className="text-center text-xs text-muted">No email needed. We only use your number to quote your job.</p>
    </form>
  );
}

function Field({
  label,
  required,
  hint,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="flex items-baseline gap-1.5">
        {label}
        {required && <span className="text-accent-600">*</span>}
        {hint && <span className="text-xs font-normal text-muted">{hint}</span>}
      </Label>
      {children}
      {error && <p className="text-xs text-emergency-dark">{error}</p>}
    </div>
  );
}
