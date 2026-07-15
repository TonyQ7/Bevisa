import { useEffect, useRef, useState } from 'react'
import { MonoChip } from '../components/MonoChip'
import { Reveal } from '../components/Reveal'
import { SectionShell } from '../components/SectionShell'
import { SOURCES } from '../content/copy'
import { useLocale } from '../components/LocaleProvider'

// The sourced figure stays in the DOM at all times; only a clip mask reveals it.
function StatValue({ value }: { value: string }): JSX.Element {
  const ref = useRef<HTMLSpanElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <span ref={ref} className={`stat-reveal ${inView ? 'is-in' : ''}`}>
      {value}
    </span>
  )
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

        <div className="grid border-t hairline-strong sm:grid-cols-3">
          {copy.problem.stats.map((stat, index) => (
            <Reveal key={stat.id} delay={index * 0.08}>
              <article className="flex h-full min-h-[15rem] flex-col border-b hairline-strong px-0 py-7 sm:border-l sm:px-6">
                <p className="mono text-[clamp(2rem,4vw,3.3rem)] font-medium tracking-[-0.06em]">
                  <StatValue value={stat.value} />
                </p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-graphite">{stat.label}</p>
                <a
                  className="source-link mono mt-5 text-[0.66rem] font-medium leading-relaxed text-graphite"
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

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {copy.problem.fragments.map((fragment, index) => (
          <Reveal key={fragment.id} delay={index * 0.08}>
            <article className="h-full border hairline-strong bg-[var(--paper-raised)] p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="mono text-[0.62rem] tracking-[0.1em] text-graphite">{fragment.tag}</span>
                <MonoChip tone={fragment.status}>{copy.common.status[fragment.status]}</MonoChip>
              </div>
              <p className="mt-3 font-medium">{fragment.title}</p>
              <p className="mt-1 text-sm text-graphite">{fragment.note}</p>
              <div className="mt-4 space-y-1.5" aria-hidden="true">
                <div className="h-1 w-4/5 bg-graphite/20" />
                <div className="h-1 w-3/5 bg-graphite/20" />
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.18}>
        <div className="mt-14 flex flex-col gap-2 border-y hairline-strong py-5 md:flex-row md:items-center md:justify-between">
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
