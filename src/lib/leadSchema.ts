import { z } from 'zod';

/** Shared by the client form (RHF) and the /api/lead route (server validation). */
export const leadSchema = z.object({
  // Three required fields — keep it ridiculously easy.
  name: z.string().trim().min(2, 'Please enter your name'),
  phone: z
    .string()
    .trim()
    .min(7, 'Enter a phone number we can reach you on')
    .regex(/^[+\d][\d\s()-]{6,}$/, 'That doesn’t look like a phone number'),
  problem: z.string().trim().min(4, 'Tell us briefly what’s broken'),

  // Optional — never block the lead on these.
  area: z.string().trim().optional().or(z.literal('')),
  service: z.string().trim().optional().or(z.literal('')),
  urgency: z.string().trim().optional().or(z.literal('')),
  email: z.string().trim().email('Enter a valid email').optional().or(z.literal('')),

  // Context (which page / CTA the lead came from) — hidden, for the inbox.
  source: z.string().optional().or(z.literal('')),
  // Honeypot — must stay empty. Bots fill it; humans never see it.
  company: z.string().max(0).optional().or(z.literal('')),
});

export type LeadInput = z.infer<typeof leadSchema>;

export const PHOTO_LIMITS = {
  maxCount: 5,
  maxBytes: 5 * 1024 * 1024, // 5MB each (pre-compression cap)
  targetBytes: 700 * 1024, // compress down to ~0.7MB
} as const;
