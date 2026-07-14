import {
  createEvidenceRecords,
  daysUntil,
  filterHealthRecords,
  statusLabel,
} from '../src/content/evidence'

describe('evidence seed data', () => {
  it('creates a deterministic 70/20/10 field', () => {
    const first = createEvidenceRecords()
    const second = createEvidenceRecords()
    expect(first).toEqual(second)
    expect(first).toHaveLength(90)
    expect(first.filter(({ status }) => status === 'approved')).toHaveLength(63)
    expect(first.filter(({ status }) => status === 'expiring')).toHaveLength(18)
    expect(first.filter(({ status }) => status === 'missing')).toHaveLength(9)
  })

  it('sorts and filters the health horizon without mutating source order', () => {
    const now = new Date('2026-07-14T12:00:00Z')
    const all = filterHealthRecords('all', now)
    const urgent = filterHealthRecords('urgent', now)
    const thisYear = filterHealthRecords('quarter', now)
    expect(all).toHaveLength(12)
    expect(urgent.every((record) => daysUntil(record.expiresAt, now) <= 90)).toBe(true)
    expect(thisYear.every((record) => new Date(record.expiresAt).getUTCFullYear() === 2026)).toBe(true)
    expect(all.map(({ expiresAt }) => expiresAt)).toEqual([...all.map(({ expiresAt }) => expiresAt)].sort())
  })

  it('maps every evidence status to a readable label', () => {
    expect(statusLabel('approved')).toBe('Approved')
    expect(statusLabel('expiring')).toBe('Expiring')
    expect(statusLabel('missing')).toBe('Missing')
  })
})
