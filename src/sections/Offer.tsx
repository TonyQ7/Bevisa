import { useState } from 'react'
import { Button } from '../components/Button'
import { useLocale } from '../components/LocaleProvider'
import { BOOKING_URL, CONTACT_EMAIL, SAMPLE_REPORT_URL } from '../content/config'
import { copyText } from '../lib/clipboard'

export function Offer(): JSX.Element {
  const { copy } = useLocale()
  const [copied, setCopied] = useState(false)

  const copyEmail = async (): Promise<void> => {
    if (!CONTACT_EMAIL) return
    const success = await copyText(CONTACT_EMAIL)
    setCopied(success)
    if (success) window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <section id="offer" className="paper-section px-[var(--page-gutter)] py-[var(--space-section)]" aria-labelledby="offer-title">
      <div className="mx-auto w-full max-w-[86rem] bg-ink px-5 py-8 text-arkiv sm:px-10 sm:py-12 lg:px-16 lg:py-16">
        <div className="grid gap-14 lg:grid-cols-[1fr_0.82fr] lg:gap-20">
          <div>
            <p className="eyebrow eyebrow-on-ink">{copy.offer.eyebrow}</p>
            <h2 id="offer-title" className="section-heading max-w-[13ch]">
              {copy.offer.title}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-arkiv/65">{copy.offer.body}</p>
            <ul className="mono mt-9 grid border-y border-white/15 text-[0.68rem] tracking-[0.06em] sm:grid-cols-2">
              {copy.offer.terms.map((term) => (
                <li className="border-b border-white/10 px-3 py-3 sm:border-r" key={term}>
                  <span className="mr-2 text-[var(--sigill-light)]" aria-hidden="true">✓</span>
                  {term}
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-white/15 p-5 sm:p-7">
            <h3 className="mono text-xs tracking-[0.08em] text-arkiv/55">{copy.offer.qualifiersTitle}</h3>
            <ul className="mt-5 space-y-3">
              {copy.offer.qualifiers.map((qualifier) => (
                <li className="flex gap-3 text-sm text-arkiv/75" key={qualifier}>
                  <span className="mono text-[var(--sigill-light)]" aria-hidden="true">□</span>
                  {qualifier}
                </li>
              ))}
            </ul>

            <div className="mt-8 grid gap-3">
              <Button {...(BOOKING_URL ? { href: BOOKING_URL } : {})} disabled={!BOOKING_URL} descriptionId="booking-pending">
                {copy.offer.book}
              </Button>
              {!BOOKING_URL ? <p id="booking-pending" className="text-xs text-arkiv/55">{copy.offer.bookingPending}</p> : null}

              <div className="mt-2 border-t border-white/10 pt-4">
                <p className="mono text-sm text-arkiv/75">{CONTACT_EMAIL ?? copy.offer.plannedEmail}</p>
                {CONTACT_EMAIL ? (
                  <button className="source-link mt-2 text-xs text-arkiv/55" type="button" onClick={() => void copyEmail()}>
                    {copied ? copy.common.copied : copy.common.copyEmail}
                  </button>
                ) : (
                  <p className="mt-2 text-xs text-arkiv/55">{copy.offer.emailPending}</p>
                )}
              </div>

              <Button
                {...(SAMPLE_REPORT_URL ? { href: SAMPLE_REPORT_URL } : {})}
                disabled={!SAMPLE_REPORT_URL}
                variant="ghost-light"
                descriptionId="report-pending"
                className="mt-2"
              >
                {copy.offer.report}
              </Button>
              {!SAMPLE_REPORT_URL ? <p id="report-pending" className="text-xs text-arkiv/55">{copy.offer.reportPending}</p> : null}
            </div>
          </div>
        </div>

        <p className="mt-12 border-t border-white/15 pt-5 text-xs leading-relaxed text-arkiv/55">{copy.offer.legal}</p>
      </div>
    </section>
  )
}
