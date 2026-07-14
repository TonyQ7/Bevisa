const PLAUSIBLE_DOMAIN = import.meta.env.VITE_PLAUSIBLE_DOMAIN as string | undefined

export function initializeAnalytics(): void {
  if (!PLAUSIBLE_DOMAIN || document.querySelector('[data-bevisa-analytics]')) return

  const script = document.createElement('script')
  script.defer = true
  script.src = 'https://plausible.io/js/script.js'
  script.dataset.domain = PLAUSIBLE_DOMAIN
  script.dataset.bevisaAnalytics = 'true'
  document.head.append(script)
}
