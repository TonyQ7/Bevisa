import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Button } from '../components/Button'
import { useLocale } from '../components/LocaleProvider'
import { BOOKING_URL, SAMPLE_REPORT_URL } from '../content/config'
import { useMediaQuery } from '../lib/useMediaQuery'
import { useReducedMotion } from '../lib/useReducedMotion'
import { useWebGLSupport } from '../lib/useWebGLSupport'
import type { EvidenceRecord } from '../content/evidence'

const HeroCanvas = lazy(async () => {
  const module = await import('../three/Scene')
  return { default: module.HeroCanvas }
})

function StaticHeroFrame(): JSX.Element {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <img className="h-full w-full object-cover opacity-70" src="./fallback-frames/03-map.svg" alt="" />
      <div className="hero-shade absolute inset-0" />
    </div>
  )
}

export function Hero(): JSX.Element {
  const { copy } = useLocale()
  const reducedMotion = useReducedMotion()
  const compact = useMediaQuery('(max-width: 767px)', true)
  const webgl = useWebGLSupport()
  const sectionRef = useRef<HTMLElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const [visible, setVisible] = useState(true)
  const [hoveredRecord, setHoveredRecord] = useState<EvidenceRecord | null>(null)
  const useStatic = reducedMotion || compact || !webgl

  useEffect(() => {
    const section = sectionRef.current
    if (!section || useStatic) return
    const observer = new IntersectionObserver(([entry]) => setVisible(Boolean(entry?.isIntersecting)))
    observer.observe(section)
    return () => observer.disconnect()
  }, [useStatic])

  useEffect(() => {
    if (reducedMotion) return
    const update = (): void => {
      const heroHeight = Math.max(window.innerHeight, 1)
      const progress = Math.min(1, Math.max(0, window.scrollY / heroHeight))
      const value = String(Math.round(1 + progress * 146)).padStart(3, '0')
      if (counterRef.current) counterRef.current.textContent = value
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [reducedMotion])

  return (
    <section ref={sectionRef} id="top" className="ink-section relative min-h-[100svh] overflow-hidden px-[var(--page-gutter)] pt-16 text-arkiv">
      {useStatic ? (
        <StaticHeroFrame />
      ) : (
        <Suspense fallback={<StaticHeroFrame />}>
          <HeroCanvas active={visible} onHoverRecord={setHoveredRecord} />
        </Suspense>
      )}

      {!useStatic && hoveredRecord ? (
        <div className="mono pointer-events-none absolute bottom-20 right-[var(--page-gutter)] z-20 w-max max-w-64 border border-white/20 bg-ink/95 px-3 py-2 text-[10px] leading-relaxed text-arkiv shadow-2xl backdrop-blur">
          <span className="block text-white">{hoveredRecord.label}</span>
          <span className="text-arkiv/55">{hoveredRecord.id} · {hoveredRecord.expiresAt ?? hoveredRecord.status}</span>
          <span className="block text-arkiv/55">{hoveredRecord.owner}</span>
        </div>
      ) : null}

      <p className="visually-hidden">{copy.hero.sceneDescription}</p>
      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-[90rem] items-center py-20">
        <div className="max-w-[51rem]">
          <p className="eyebrow">{copy.hero.eyebrow}</p>
          <h1 className="font-display text-[clamp(3rem,8.2vw,6.8rem)] font-bold leading-[0.89] tracking-[-0.055em] text-balance">
            {copy.hero.title}
          </h1>
          <p className="mt-7 max-w-[41rem] text-[clamp(1.05rem,1.7vw,1.35rem)] leading-relaxed text-arkiv/72">
            {copy.hero.body}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href={BOOKING_URL ?? '#offer'}>{copy.hero.book}</Button>
            <Button href={SAMPLE_REPORT_URL ?? '#offer'} variant="ghost-light">
              {copy.hero.sample}
            </Button>
          </div>
          {!useStatic ? (
            <p className="mono mt-6 text-[0.68rem] tracking-[0.08em] text-arkiv/55">{copy.hero.interactionHint}</p>
          ) : null}
        </div>
      </div>

      <div className="mono absolute bottom-6 left-[var(--page-gutter)] z-10 flex items-center gap-3 text-[0.68rem] tracking-[0.12em] text-arkiv/55">
        <span>{copy.hero.scrollPrefix}</span>
        <span ref={counterRef}>001</span>
        <span aria-hidden="true">↓</span>
      </div>
    </section>
  )
}
