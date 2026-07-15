import { MonoChip } from '../components/MonoChip'
import { Reveal } from '../components/Reveal'
import { SectionShell } from '../components/SectionShell'
import { useLocale } from '../components/LocaleProvider'
import { SOURCES } from '../content/copy'

export function Sovereignty(): JSX.Element {
  const { copy } = useLocale()

  return (
    <SectionShell id="sovereignty" tone="ink" labelledBy="sovereignty-title">
      <Reveal>
        <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:gap-24">
          <div>
            <p className="eyebrow">{copy.sovereignty.eyebrow}</p>
            <h2 id="sovereignty-title" className="section-heading">
              {copy.sovereignty.title}
            </h2>
          </div>
          <div>
            <p className="text-[clamp(1.1rem,2vw,1.45rem)] leading-relaxed text-arkiv/80">{copy.sovereignty.body}</p>
            <p className="mt-6 leading-relaxed text-arkiv/55">{copy.sovereignty.commitment}</p>
            <a
              className="source-link mono mt-5 inline-block text-[0.68rem] tracking-[0.06em] text-[var(--sigill-light)]"
              href={SOURCES.cloudPolicy2026}
              target="_blank"
              rel="noreferrer"
            >
              {copy.sovereignty.sourceLabel} ↗
            </a>
          </div>
        </div>
        <div className="mt-16 border-t hairline-strong pt-8">
          <p className="mono text-[0.68rem] tracking-[0.1em] text-arkiv/55">{copy.sovereignty.custodyTitle}</p>
          <ol className="mt-5 flex flex-col gap-2 lg:flex-row lg:items-stretch">
            {copy.sovereignty.custody.map((stage, index) => {
              const isBoundary = index === 1
              const isDecision = index === copy.sovereignty.custody.length - 1
              return (
                <li className="flex flex-1 items-center gap-2" key={stage}>
                  <div
                    className={`flex min-h-[3.4rem] w-full items-center gap-3 px-4 py-3 ${
                      isBoundary
                        ? 'border border-dashed border-[var(--sigill-light)] bg-transparent'
                        : isDecision
                          ? 'border border-white/25 bg-[var(--ink-raised)]'
                          : 'border border-white/15 bg-[var(--ink-raised)]'
                    }`}
                  >
                    <span className="mono text-[0.6rem] text-[var(--sigill-light)]">{String(index + 1).padStart(2, '0')}</span>
                    <span className={`text-sm ${isDecision ? 'font-semibold text-arkiv' : 'text-arkiv/80'}`}>{stage}</span>
                  </div>
                  {index < copy.sovereignty.custody.length - 1 ? (
                    <span className="mono shrink-0 text-arkiv/40" aria-hidden="true">
                      →
                    </span>
                  ) : null}
                </li>
              )
            })}
          </ol>
        </div>
        <div className="mt-10 grid gap-3 border-y border-white/15 py-6 sm:grid-cols-3">
          {copy.sovereignty.badges.map((badge) => (
            <MonoChip key={badge} className="justify-center border-white/15 py-3 text-arkiv/70">
              {badge}
            </MonoChip>
          ))}
        </div>
      </Reveal>
    </SectionShell>
  )
}
