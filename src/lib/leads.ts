import 'server-only';
import { getSupabaseAdmin } from '@/lib/supabase';
import { site } from '@/lib/site';
import { services } from '@/lib/content';
import type { LeadInput } from '@/lib/leadSchema';

export type LeadRecord = LeadInput & { photo_urls: string[]; created_at?: string };

function serviceLabel(slug?: string) {
  return services.find((s) => s.slug === slug)?.title ?? slug ?? 'General enquiry';
}

/* ── 1. Persist the lead ──────────────────────────────────────────────────── */
export async function saveLead(lead: LeadRecord): Promise<{ id: string | null; persisted: boolean }> {
  const db = getSupabaseAdmin();
  if (!db) {
    // Demo mode — make sure the lead isn't silently lost.
    console.info('[lead] (demo mode, no Supabase) New lead:', JSON.stringify(lead, null, 2));
    return { id: null, persisted: false };
  }
  const { data, error } = await db
    .from('leads')
    .insert({
      name: lead.name,
      phone: lead.phone,
      problem: lead.problem,
      area: lead.area || null,
      service: lead.service || null,
      urgency: lead.urgency || null,
      email: lead.email || null,
      source: lead.source || null,
      photo_urls: lead.photo_urls,
      status: 'new',
    })
    .select('id')
    .single();

  if (error) {
    console.error('[lead] Supabase insert failed:', error.message);
    return { id: null, persisted: false };
  }
  return { id: data.id as string, persisted: true };
}

/* ── 2. Upload photos to Supabase Storage (best-effort) ───────────────────── */
export async function uploadPhotos(files: File[]): Promise<string[]> {
  const db = getSupabaseAdmin();
  if (!db || files.length === 0) return [];
  const urls: string[] = [];
  for (const file of files) {
    try {
      const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
      const path = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}.${ext}`;
      const buf = Buffer.from(await file.arrayBuffer());
      const { error } = await db.storage.from('lead-photos').upload(path, buf, {
        contentType: file.type || 'image/jpeg',
        upsert: false,
      });
      if (error) { console.error('[lead] photo upload failed:', error.message); continue; }
      const { data } = db.storage.from('lead-photos').getPublicUrl(path);
      urls.push(data.publicUrl);
    } catch (e) {
      console.error('[lead] photo error:', e);
    }
  }
  return urls;
}

/* ── 3. Email the business (Resend) ───────────────────────────────────────── */
export async function notifyEmail(lead: LeadRecord) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_EMAIL;
  if (!apiKey || !to) {
    console.info('[lead] (no Resend) would email business about lead from', lead.name);
    return;
  }
  try {
    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);
    const photoLines = lead.photo_urls.map((u) => `<li><a href="${u}">${u}</a></li>`).join('');
    await resend.emails.send({
      from: process.env.LEAD_FROM_EMAIL || `Diamon Contractors <onboarding@resend.dev>`,
      to,
      replyTo: lead.email || undefined,
      subject: `🔧 New ${lead.urgency === 'now' ? 'URGENT ' : ''}lead — ${serviceLabel(lead.service)} (${lead.area || 'Harare'})`,
      html: `
        <h2>New quote request</h2>
        <p><strong>Name:</strong> ${lead.name}<br/>
        <strong>Phone:</strong> <a href="tel:${lead.phone}">${lead.phone}</a><br/>
        <strong>Area:</strong> ${lead.area || '—'}<br/>
        <strong>Service:</strong> ${serviceLabel(lead.service)}<br/>
        <strong>Urgency:</strong> ${lead.urgency || '—'}<br/>
        <strong>From:</strong> ${lead.source || '—'}</p>
        <p><strong>Problem:</strong><br/>${lead.problem}</p>
        ${photoLines ? `<p><strong>Photos:</strong></p><ul>${photoLines}</ul>` : ''}
      `,
    });
  } catch (e) {
    console.error('[lead] Resend failed:', e);
  }
}

/* ── 4. WhatsApp the on-call technician (Twilio) ──────────────────────────── */
export async function notifyWhatsApp(lead: LeadRecord) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_WHATSAPP_FROM;
  const to = process.env.TECHNICIAN_WHATSAPP;
  if (!sid || !token || !from || !to) {
    console.info('[lead] (no Twilio) would WhatsApp technician about', lead.name);
    return;
  }
  try {
    const body = [
      `🔧 New ${lead.urgency === 'now' ? '🚨 URGENT ' : ''}lead`,
      `${lead.name} — ${lead.phone}`,
      `${serviceLabel(lead.service)} · ${lead.area || 'Harare'}`,
      lead.problem,
    ].join('\n');
    const params = new URLSearchParams({ From: from, To: to, Body: body });
    const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + Buffer.from(`${sid}:${token}`).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });
    if (!res.ok) console.error('[lead] Twilio responded', res.status, await res.text());
  } catch (e) {
    console.error('[lead] Twilio failed:', e);
  }
}

/* ── 5. Confirmation to the customer (optional, email only here) ──────────── */
export async function confirmToCustomer(lead: LeadRecord) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || !lead.email) return; // no email collected → WhatsApp confirmation handled client-side
  try {
    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: process.env.LEAD_FROM_EMAIL || `Diamon Contractors <onboarding@resend.dev>`,
      to: lead.email,
      subject: `We’ve got your request — ${site.name}`,
      html: `<p>Hi ${lead.name},</p>
        <p>Thanks for reaching out to ${site.name}. We’ve received your request and our team will call you back shortly. For anything urgent, call us on <a href="tel:${site.phoneE164}">${site.phoneDisplay}</a>.</p>
        <p>— The ${site.name} team</p>`,
    });
  } catch (e) {
    console.error('[lead] customer confirm failed:', e);
  }
}
