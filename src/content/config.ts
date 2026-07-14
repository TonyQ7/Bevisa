const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validatedHttpsUrl(value: string | undefined): string | null {
  const candidate = value?.trim()
  if (!candidate) return null
  try {
    return new URL(candidate).protocol === 'https:' ? candidate : null
  } catch {
    return null
  }
}

export function validatedEmail(value: string | undefined): string | null {
  const candidate = value?.trim()
  if (!candidate || candidate.length > 254 || !EMAIL_PATTERN.test(candidate)) return null
  return candidate
}

export function validatedReportUrl(value: string | undefined): string | null {
  const candidate = value?.trim()
  if (!candidate) return null
  if (validatedHttpsUrl(candidate)) return candidate
  if (!candidate.startsWith('./') || candidate.includes('..') || candidate.includes('\\')) return null
  return candidate
}

export const BOOKING_URL: string | null = validatedHttpsUrl(import.meta.env?.VITE_BOOKING_URL)
export const CONTACT_EMAIL: string | null = validatedEmail(import.meta.env?.VITE_CONTACT_EMAIL)
export const SAMPLE_REPORT_URL: string | null = validatedReportUrl(import.meta.env?.VITE_SAMPLE_REPORT_URL)
