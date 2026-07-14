/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BOOKING_URL?: string
  readonly VITE_CONTACT_EMAIL?: string
  readonly VITE_PLAUSIBLE_DOMAIN?: string
  readonly VITE_SAMPLE_REPORT_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
