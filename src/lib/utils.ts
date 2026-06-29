import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge Tailwind classes without conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Build a wa.me click-to-chat link with a context-aware pre-filled message. */
export function whatsappLink(number: string, message: string) {
  const digits = number.replace(/[^\d]/g, '');
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

/** Build a tel: link from any formatted phone string. */
export function telLink(number: string) {
  return `tel:${number.replace(/[^\d+]/g, '')}`;
}
