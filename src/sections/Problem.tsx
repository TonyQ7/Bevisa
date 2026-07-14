import { useEffect, useRef } from 'react'
import { Reveal } from '../components/Reveal'
import { SectionShell } from '../components/SectionShell'
import { SOURCES } from '../content/copy'
import { useLocale } from '../components/LocaleProvider'
import { useReducedMotion } from '../lib/useReducedMotion'

function AnimatedValue({ value, id }: { value: string; id: string }): JSX.Element {
  const ref = useRef<HTMLSpanElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const element = ref.current
    if (!element || reducedMotion || id === 'complexity') return

    const target = Number(value.replaceAll(/[^0-9]/g, ''))
    const separator = value.includes(',') ? ',' : value.includes(' ') ? ' ' : ''
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        const started = performance.now()
        const tick = (time: number): void => {
          const progress = Math.min(1, (time - started) / 900)
          const eased = 1 - (1 - progress) ** 3
          const current = Math.round(target * eased)
          element.textContent = separator ? current.toLocaleString(separator === ',' ? 'en-US' : 'sv-SE') : String(current)
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
        observer.disconnect()
      },
      { threshold: 0.5 },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [id, reducedMotion, value])

  return <span ref={ref}>{value}</span>
}

export function Problem(): JSX.Element {
  const { copy } = useLocale()

  return (
    <SectionShell id="problem" labelledBy="problem-title">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow">{copy.problem.eyebrow}</p>
          <h2 id="problem-title" className="section-heading">
            {copy.problem.title}
          </h2>
          <p className="lede">{copy.problem.body}</p>
        </Reveal>

        <div className="grid border-t hairline sm:grid-cols-3">
          {copy.problem.stats.map((stat, index) => (
            <Reveal key={stat.id} delay={index * 0.08}>
              <article className="flex min-h-[15rem] flex-col border-b hairline px-0 py-7 sm:border-l sm:px-6">
                <p className="mono text-[clamp(2rem,4vw,3.3rem)] font-medium tracking-[-0.06em]">
                  <AnimatedValue value={stat.value} id={stat.id} />
                </p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-graphite">{stat.label}</p>
                <a
                  className="source-link mono mt-5 text-[0.62rem] leading-relaxed text-graphite"
                  href={stat.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {stat.sourceLabel} ↗
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal delay={0.18}>
        <div className="mt-14 flex flex-col gap-2 border-y hairline py-5 md:flex-row md:items-center md:justify-between">
          <p className="text-sm font-medium">{copy.problem.context}</p>
          <p className="mono text-[0.65rem] text-graphite">
            {copy.problem.contextQualifier}{' '}
            <a className="source-link" href={SOURCES.procurementValue2025} target="_blank" rel="noreferrer">
              {copy.common.source} ↗
            </a>
          </p>
        </div>
      </Reveal>
    </SectionShell>
  )
}
