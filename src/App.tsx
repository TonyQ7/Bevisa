import { lazy, Suspense, useEffect, useState } from 'react'
import { useLocale } from './components/LocaleProvider'
import { initializeAnalytics } from './lib/analytics'
import { useSmoothScroll } from './lib/useSmoothScroll'
import { Footer } from './sections/Footer'
import { Hero } from './sections/Hero'
import { Nav } from './sections/Nav'

const Narrative = lazy(async () => {
  const module = await import('./sections/Narrative')
  return { default: module.Narrative }
})

export default function App(): JSX.Element {
  const { copy } = useLocale()
  const [narrativeReady, setNarrativeReady] = useState(false)
  useSmoothScroll()

  useEffect(() => initializeAnalytics(), [])
  useEffect(() => {
    const reveal = (): void => setNarrativeReady(true)
    const timer = window.setTimeout(reveal, 1200)
    let pendingScroll = 0
    const queueDeferredScroll = (hash: string, updateHistory: boolean): void => {
      let attempts = 0
      let visibleFrames = 0
      let historyUpdated = false
      const scrollWhenReady = (): void => {
        const destination = document.getElementById(hash.slice(1))
        if (destination) {
          if (updateHistory && !historyUpdated) {
            window.history.pushState(null, '', hash)
            historyUpdated = true
          }

          const bounds = destination.getBoundingClientRect()
          const visible = bounds.top >= 0 && bounds.top < window.innerHeight
          if (visible) {
            visibleFrames += 1
          } else {
            visibleFrames = 0
            window.scrollTo({ top: window.scrollY + bounds.top - 64, behavior: 'instant' })
          }

          // ScrollTrigger adds pin spacing in a passive effect. Reconcile for a few
          // painted frames so a pre-mount anchor cannot land one pinned scene early.
          attempts += 1
          if (attempts < 120 && visibleFrames < 60) pendingScroll = window.requestAnimationFrame(scrollWhenReady)
          return
        }
        attempts += 1
        if (attempts < 120) pendingScroll = window.requestAnimationFrame(scrollWhenReady)
      }
      pendingScroll = window.requestAnimationFrame(scrollWhenReady)
    }
    const followDeferredAnchor = (event: MouseEvent): void => {
      if (!(event.target instanceof Element)) return
      const anchor = event.target.closest<HTMLAnchorElement>('a[href^="#"]')
      const hash = anchor?.getAttribute('href')
      if (!hash || hash === '#top' || hash === '#main-content' || document.getElementById(hash.slice(1))) return
      event.preventDefault()
      reveal()
      queueDeferredScroll(hash, true)
    }
    window.addEventListener('wheel', reveal, { once: true, passive: true })
    window.addEventListener('touchstart', reveal, { once: true, passive: true })
    window.addEventListener('keydown', reveal, { once: true })
    window.addEventListener('click', followDeferredAnchor)
    if (window.location.hash && !['#top', '#main-content'].includes(window.location.hash)) {
      reveal()
      queueDeferredScroll(window.location.hash, false)
    }
    return () => {
      window.clearTimeout(timer)
      window.cancelAnimationFrame(pendingScroll)
      window.removeEventListener('wheel', reveal)
      window.removeEventListener('touchstart', reveal)
      window.removeEventListener('keydown', reveal)
      window.removeEventListener('click', followDeferredAnchor)
    }
  }, [])

  return (
    <>
      <a className="skip-link" href="#main-content">
        {copy.common.skip}
      </a>
      <Nav />
      <main id="main-content">
        <Hero />
        {narrativeReady ? (
          <Suspense fallback={<div className="min-h-screen bg-arkiv" aria-hidden="true" />}>
            <Narrative />
          </Suspense>
        ) : (
          <div className="min-h-screen bg-arkiv" aria-hidden="true" />
        )}
      </main>
      <Footer />
    </>
  )
}
