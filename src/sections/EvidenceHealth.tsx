import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { MonoChip } from '../components/MonoChip'
import { Reveal } from '../components/Reveal'
import { SectionShell } from '../components/SectionShell'
import { useLocale } from '../components/LocaleProvider'
import { HEALTH_RECORDS, daysUntil, filterHealthRecords } from '../content/evidence'
import { useMediaQuery } from '../lib/useMediaQuery'
import { useReducedMotion } from '../lib/useReducedMotion'

type HealthFilter = 'all' | 'urgent' | 'quarter'

const COMPACT_ROWS = 6
const HORIZON_DAYS = 540

function toneForDays(days: number): 'approved' | 'expiring' | 'missing' {
  if (days < 0) return 'missing'
  if (days <= 90) return 'expiring'
  return 'approved'
}

const toneToken = {
  approved: '--sigill',
  expiring: '--expiry',
  missing: '--saknas',
} as const

// Compact renewal horizon: every record plotted by days-to-renewal on one rail.
function RenewalHorizon({ now }: { now: Date }): JSX.Element {
  return (
    <div className="relative mt-3 h-6 border-b hairline-strong" aria-hidden="true">
      {HEALTH_RECORDS.map((record) => {
        const days = daysUntil(record.expiresAt, now)
        const offset = Math.min(1, Math.max(0, days / HORIZON_DAYS))
        return (
          <span
            className="absolute bottom-0 w-[3px]"
            style={{ left: `${offset * 100}%`, height: `${100 - offset * 55}%`, background: `var(${toneToken[toneForDays(days)]})` }}
            key={record.id}
          />
        )
      })}
    </div>
  )
}

export function EvidenceHealth(): JSX.Element {
  const { copy, locale } = useLocale()
  const reducedMotion = useReducedMotion()
  const compact = useMediaQuery('(max-width: 639px)', true)
  const [filter, setFilter] = useState<HealthFilter>('all')
  const [expanded, setExpanded] = useState(false)
  const now = useMemo(() => new Date(), [])
  const records = useMemo(() => filterHealthRecords(filter, now), [filter, now])
  const visibleRecords = compact && !expanded ? records.slice(0, COMPACT_ROWS) : records
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
          <div className="mt-9 border-y hairline-strong bg-[var(--paper-raised)] px-4 py-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="mono text-[0.65rem] uppercase tracking-[0.08em] text-graphite">{copy.health.scoreLabel}</p>
                <p className="mt-2 font-display text-[3.4rem] font-bold leading-none tracking-[-0.05em]">{score}%</p>
              </div>
              <div className="border-l hairline-strong pl-4">
                <p className="mono text-[0.65rem] uppercase tracking-[0.08em] text-graphite">{copy.health.digest}</p>
                <div className="mt-3 flex gap-1" aria-hidden="true">
                  {Array.from({ length: 10 }, (_, index) => (
                    <span className={`h-7 w-2 ${index < Math.round(score / 10) ? 'bg-sigill' : 'bg-graphite/15'}`} key={index} />
                  ))}
                </div>
              </div>
            </div>
            <p className="mono mt-5 text-[0.6rem] uppercase tracking-[0.08em] text-graphite">{copy.health.columns.status}</p>
            <RenewalHorizon now={now} />
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="border hairline-strong bg-[var(--paper-raised)] p-3 sm:p-5">
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

            <motion.ul layout={!reducedMotion} className="sm:min-h-[25rem]">
              <AnimatePresence initial={false} mode="popLayout">
                {visibleRecords.map((record) => {
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

            {compact && records.length > COMPACT_ROWS ? (
              <button
                className="mono mt-4 w-full rounded-sm border border-graphite/25 px-3 py-2.5 text-[0.68rem] tracking-[0.06em] text-ink transition-colors hover:border-ink"
                type="button"
                aria-expanded={expanded}
                onClick={() => setExpanded((current) => !current)}
              >
                {expanded ? copy.health.showLess : copy.health.showAll}
              </button>
            ) : null}
          </div>
        </Reveal>
      </div>
    </SectionShell>
  )
}
