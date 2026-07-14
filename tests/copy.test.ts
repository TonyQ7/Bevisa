import {
  EN_COPY,
  LEGAL_NOTICE,
  SOURCES,
} from '../src/content/copy'
import { BOOKING_URL, CONTACT_EMAIL, SAMPLE_REPORT_URL } from '../src/content/config'
import { SV_COPY } from '../src/content/copy.sv'

function objectShape(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(objectShape)
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, objectShape(child)]))
  }
  return typeof value
}

describe('content contracts', () => {
  it('keeps locales structurally aligned', () => {
    expect(objectShape(SV_COPY)).toEqual(objectShape(EN_COPY))
    expect(SV_COPY.locale).toBe('sv')
  })

  it('uses only the approved primary sources', () => {
    const statSources = EN_COPY.problem.stats.map(({ sourceUrl }) => sourceUrl)
    expect(new Set(statSources)).toEqual(new Set([SOURCES.bidders2024, SOURCES.supplierSurvey2025]))
    expect(EN_COPY.problem.context).toContain('982')
  })

  it('keeps launch destinations safely inactive', () => {
    expect(BOOKING_URL).toBeNull()
    expect(CONTACT_EMAIL).toBeNull()
    expect(SAMPLE_REPORT_URL).toBeNull()
  })

  it('repeats the exact legal notice in both required locations', () => {
    expect(EN_COPY.offer.legal).toBe(LEGAL_NOTICE)
    expect(EN_COPY.footer.legal).toBe(LEGAL_NOTICE)
  })
})
