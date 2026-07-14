import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { MonoChip } from '../components/MonoChip'
import { Reveal } from '../components/Reveal'
import { SectionShell } from '../components/SectionShell'
import { useLocale } from '../components/LocaleProvider'
import { daysUntil, filterHealthRecords } from '../content/evidence'
import { useReducedMotion } from '../lib/useReducedMotion'

type HealthFilter = 'all' | 'urgent' | 'quarter'

function toneForDays(days: number): 'approved' | 'expiring' | 'missing' {
  if (days < 0) return 'missing'
  if (days <= 90) return 'expiring'
  return 'approved'
}

export function EvidenceHealth(): JSX.Element {
  const { copy, locale } = useLocale()
  const reducedMotion = useReducedMotion()
  const [filter, setFilter] = useState<HealthFilter>('all')
  const now = useMemo(() => new Date(), [])
  const records = useMemo(() => filterHealthRecords(filter, now), [filter, now])
  const healthy = filterHealthRecords('all', now).filter((record) => daysUntil(record.expiresAt, now) > 90).length
  const score = Math.round((healthy / 12) * 100)
  const filters = Object.entries(copy.health.filters) as Array<[HealthFilter, string]>

  return (
    <SectionShell id="health" labelledBy="health-title">
      <div className="grid items-start gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow">{copy.health.eyebrow}</p>
          <h2 id="health-title" className="section-heading">
            {copy.health.title}
          </h2>
          <p className="lede">{copy.health.body}</p>
          <div className="mt-9 grid grid-cols-2 gap-4 border-y hairline py-5">
            <div>
              <p className="mono text-[0.65rem] uppercase tracking-[0.08em] text-graphite">{copy.health.scoreLabel}</p>
              <p className="mt-2 font-display text-4xl font-bold tracking-[-0.05em]">{score}%</p>
            </div>
            <div className="border-l hairline pl-4">
              <p className="mono text-[0.65rem] uppercase tracking-[0.08em] text-graphite">{copy.health.digest}</p>
              <div className="mt-3 flex gap-1" aria-hidden="true">
                {Array.from({ length: 10 }, (_, index) => (
                  <span className={`h-7 w-2 ${index < Math.round(score / 10) ? 'bg-sigill' : 'bg-graphite/15'}`} key={index} />
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="border border-graphite/25 bg-white/30 p-3 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b hairline pb-4">
              <p className="mono text-[0.68rem] tracking-[0.08em] text-graphite">{copy.health.filterLabel}</p>
              <div className="flex flex-wrap gap-1" role="group" aria-label={copy.health.filterLabel}>
                {filters.map(([value, label]) => (
                  <button
                    className={`mono rounded-sm border px-2.5 py-1.5 text-[0.64rem] transition-colors ${
                      filter === value ? 'border-ink bg-ink text-arkiv' : 'border-graphite/25 text-graphite hover:border-ink'
                    }`}
                    type="button"
                    aria-pressed={filter === value}
                    key={value}
                    onClick={() => setFilter(value)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="hidden grid-cols-[1.4fr_1fr_auto] gap-4 border-b hairline py-3 sm:grid">
              {Object.values(copy.health.columns).map((label) => (
                <span className="mono text-[0.6rem] uppercase tracking-[0.08em] text-graphite" key={label}>
                  {label}
                </span>
              ))}
            </div>

            <motion.ul layout={!reducedMotion} className="min-h-[25rem]">
              <AnimatePresence initial={false} mode="popLayout">
                {records.map((record) => {
                  const days = daysUntil(record.expiresAt, now)
                  return (
                    <motion.li
                      layout={!reducedMotion}
                      initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      {...(reducedMotion ? {} : { exit: { opacity: 0, y: -8 } })}
                      transition={{ duration: 0.18 }}
                      className="grid gap-2 border-b hairline py-3.5 sm:grid-cols-[1.4fr_1fr_auto] sm:items-center sm:gap-4"
                      key={record.id}
                    >
                      <div>
                        <span className="font-medium">{record.label}</span>
                        <span className="mono ml-2 text-[0.58rem] text-graphite">{record.id}</span>
                      </div>
                      <span className="text-sm text-graphite">{record.owner}</span>
                      <MonoChip tone={toneForDays(days)}>
                        {days >= 0 ? `+${days}d` : `${days}d`} ·{' '}
                        {new Intl.DateTimeFormat(locale === 'sv' ? 'sv-SE' : 'en-GB', { dateStyle: 'medium' }).format(
                          new Date(`${record.expiresAt}T00:00:00Z`),
                        )}
                      </MonoChip>
                    </motion.li>
                  )
                })}
              </AnimatePresence>
            </motion.ul>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  )
}
