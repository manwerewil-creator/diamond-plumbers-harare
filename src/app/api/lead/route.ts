import { NextResponse } from 'next/server';
import { leadSchema } from '@/lib/leadSchema';
import { saveLead, uploadPhotos, notifyEmail, notifyWhatsApp, confirmToCustomer, type LeadRecord } from '@/lib/leads';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }

  // Honeypot: silently accept (so bots think they succeeded) but do nothing.
  if ((form.get('company') as string)?.length) {
    return NextResponse.json({ ok: true });
  }

  const raw = {
    name: (form.get('name') as string) || '',
    phone: (form.get('phone') as string) || '',
    problem: (form.get('problem') as string) || '',
    area: (form.get('area') as string) || '',
    service: (form.get('service') as string) || '',
    urgency: (form.get('urgency') as string) || '',
    email: (form.get('email') as string) || '',
    source: (form.get('source') as string) || '',
    company: '',
  };

  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'validation', issues: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  // Collect photos (already compressed client-side; cap to 5).
  const files = form.getAll('photos').filter((f): f is File => f instanceof File && f.size > 0).slice(0, 5);

  let photo_urls: string[] = [];
  try {
    photo_urls = await uploadPhotos(files);
  } catch {
    photo_urls = [];
  }

  const lead: LeadRecord = { ...parsed.data, photo_urls };

  // Persist first, then fan out notifications. Notifications never block the
  // response from succeeding — a captured lead matters more than a sent email.
  const { id } = await saveLead(lead);

  // Fire notifications without letting a single failure 500 the request.
  await Promise.allSettled([
    notifyEmail(lead),
    notifyWhatsApp(lead),
    confirmToCustomer(lead),
  ]);

  return NextResponse.json({ ok: true, id });
}
