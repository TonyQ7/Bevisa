import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MonoChip } from '../components/MonoChip'
import { useLocale } from '../components/LocaleProvider'
import { useMediaQuery } from '../lib/useMediaQuery'
import { useReducedMotion } from '../lib/useReducedMotion'
import { useWebGLSupport } from '../lib/useWebGLSupport'

gsap.registerPlugin(ScrollTrigger)

const PipelineCanvas = lazy(async () => {
  const module = await import('../three/Scene')
  return { default: module.PipelineCanvas }
})

function FallbackPipeline(): JSX.Element {
  const { copy } = useLocale()

  return (
    <ol className="mt-12 grid gap-10">
      {copy.pipeline.steps.map((step, index) => (
        <li className="grid gap-5 border-t border-white/15 pt-6 md:grid-cols-[0.7fr_1fr]" key={step.id}>
          <img
            className="aspect-[16/10] w-full border border-white/10 bg-ink object-cover"
            src={`./fallback-frames/0${index + 1}-${step.id}.svg`}
            alt=""
          />
          <div>
            <p className="mono text-xs text-[var(--sigill-light)]">{step.number}</p>
            <h3 className="mt-2 font-display text-3xl font-bold">{step.title}</h3>
            <p className="mt-4 max-w-xl leading-relaxed text-arkiv/65">{step.body}</p>
            <p className="mono mt-5 text-[0.65rem] tracking-[0.08em] text-arkiv/55">{step.signal}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

export function HowItWorks(): JSX.Element {
  const { copy } = useLocale()
  const stageRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef(0)
  const reducedMotion = useReducedMotion()
  const compact = useMediaQuery('(max-width: 767px)', true)
  const webgl = useWebGLSupport()
  const fallback = reducedMotion || compact || !webgl
  const [activeStep, setActiveStep] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage || fallback) return
    const observer = new IntersectionObserver(([entry]) => setVisible(Boolean(entry?.isIntersecting)), { rootMargin: '100% 0px' })
    observer.observe(stage)
    return () => observer.disconnect()
  }, [fallback])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage || fallback) return

    const context = gsap.context(() => {
      // One normalized progress value drives both DOM state and the 3D scene, so reverse scrolling cannot leave stale beats behind.
      ScrollTrigger.create({
        trigger: stage,
        start: 'top top',
        end: '+=400%',
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: ({ progress }) => {
          progressRef.current = progress
          const next = Math.min(4, Math.floor(progress * 5))
          setActiveStep((current) => (current === next ? current : next))
        },
      })
    }, stage)
    return () => context.revert()
  }, [fallback])

  const active = copy.pipeline.steps[activeStep] ?? copy.pipeline.steps[0]

  return (
    <section id="process" className="ink-section px-[var(--page-gutter)] py-[var(--space-section)] text-arkiv" aria-labelledby="process-title">
      <div className="mx-auto w-full max-w-[86rem]">
        <p className="eyebrow">{copy.pipeline.eyebrow}</p>
        <h2 id="process-title" className="section-heading">
          {copy.pipeline.title}
        </h2>
        <p className="lede">{copy.pipeline.intro}</p>
        <p className="visually-hidden">{copy.pipeline.sceneDescription}</p>

        {fallback ? (
          <FallbackPipeline />
        ) : (
          <div
            ref={stageRef}
            data-testid="pipeline-stage"
            className="mt-12 grid min-h-[100svh] items-center gap-8 lg:grid-cols-[0.34fr_0.66fr]"
          >
            <div className="relative z-10 py-16">
              <ol className="border-y border-white/15">
                {copy.pipeline.steps.map((step, index) => (
                  <li
                    aria-current={index === activeStep ? 'step' : undefined}
                    className={`grid grid-cols-[2.5rem_1fr] gap-3 border-b border-white/10 py-4 transition-opacity last:border-b-0 ${
                      index === activeStep ? 'opacity-100' : 'opacity-35'
                    }`}
                    key={step.id}
                  >
                    <span className="mono text-xs text-[var(--sigill-light)]">{step.number}</span>
                    <span className="font-display text-xl font-semibold">{step.title}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-7 min-h-40">
                <h3 data-testid="pipeline-active-title" className="font-display text-3xl font-bold">{active?.title}</h3>
                <p className="mt-3 max-w-md leading-relaxed text-arkiv/65">{active?.body}</p>
                <p className="mono mt-4 text-[0.65rem] tracking-[0.08em] text-arkiv/55">{active?.signal}</p>
              </div>
              <div className="h-px bg-white/10">
                <div className="h-px bg-sigill transition-[width] duration-200" style={{ width: `${((activeStep + 1) / 5) * 100}%` }} />
              </div>
            </div>

            <div className="relative h-[72svh] min-h-[34rem] overflow-hidden border border-white/10 bg-ink/40">
              <Suspense fallback={null}>
                <PipelineCanvas progressRef={progressRef} active={visible} />
              </Suspense>
              {activeStep === 4 ? (
                <p className="mono pointer-events-none absolute inset-x-4 bottom-8 text-center text-[10px] tracking-[0.08em] text-arkiv/70">
                  {copy.pipeline.approval}
                </p>
              ) : null}
              {activeStep === 1 ? (
                <div className="absolute left-4 top-4 max-w-xs border border-saknas/50 bg-ink/90 p-3 backdrop-blur">
                  <MonoChip tone="missing">{copy.pipeline.ambiguous}</MonoChip>
                </div>
              ) : null}
              {activeStep === 3 ? (
                <div className="absolute bottom-5 right-5 w-[min(24rem,calc(100%-2.5rem))] border border-white/15 bg-ink/95 p-5 shadow-2xl backdrop-blur">
                  <MonoChip tone="approved">{copy.pipeline.owner}</MonoChip>
                  <p className="mt-4 text-sm leading-relaxed text-arkiv/75">
                    {copy.pipeline.draft} <sup className="mono text-[var(--sigill-light)]">{copy.pipeline.citationOne}</sup>.
                    <span className="mt-2 block">{copy.pipeline.requirementCount} <sup className="mono text-[var(--sigill-light)]">{copy.pipeline.citationTwo}</sup>.</span>
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
