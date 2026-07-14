export type EvidenceStatus = 'approved' | 'expiring' | 'missing'
export type EvidenceCategory = 'certificate' | 'case' | 'cv' | 'policy' | 'financial'

export interface EvidenceRecord {
  id: string
  label: string
  category: EvidenceCategory
  status: EvidenceStatus
  owner: string
  expiresAt: string | null
  approvedAt: string | null
  position: readonly [number, number, number]
}

export interface RequirementRecord {
  id: string
  label: string
  status: EvidenceStatus
  evidenceId: string | null
  owner: string
}

const labels: ReadonlyArray<{
  label: string
  category: EvidenceCategory
  owner: string
}> = [
  { label: 'ISO 9001 certificate', category: 'certificate', owner: 'Quality lead' },
  { label: 'Information-security policy', category: 'policy', owner: 'Security lead' },
  { label: 'Senior delivery lead CV', category: 'cv', owner: 'People operations' },
  { label: 'Municipal service reference', category: 'case', owner: 'Bid lead' },
  { label: 'Framework delivery case', category: 'case', owner: 'Commercial lead' },
  { label: 'Environmental management certificate', category: 'certificate', owner: 'Sustainability lead' },
  { label: 'Audited annual report', category: 'financial', owner: 'Finance lead' },
  { label: 'Business continuity policy', category: 'policy', owner: 'Operations lead' },
  { label: 'Technical specialist CV', category: 'cv', owner: 'People operations' },
  { label: 'Data-processing procedure', category: 'policy', owner: 'Privacy lead' },
]

function mulberry32(seed: number): () => number {
  return () => {
    let value = (seed += 0x6d2b79f5)
    value = Math.imul(value ^ (value >>> 15), value | 1)
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61)
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296
  }
}

function statusForIndex(index: number): EvidenceStatus {
  if (index < 63) return 'approved'
  if (index < 81) return 'expiring'
  return 'missing'
}

export function createEvidenceRecords(count = 90, seed = 20260714): EvidenceRecord[] {
  const random = mulberry32(seed)

  return Array.from({ length: count }, (_, index) => {
    const source = labels[index % labels.length] ?? labels[0]
    const status = statusForIndex(index)
    const azimuth = random() * Math.PI * 2
    const radius = 2.5 + random() * 7.5
    const elevation = (random() - 0.5) * 7
    const expiresAt =
      status === 'missing'
        ? null
        : new Date(Date.UTC(2026 + (index % 2), (index * 5) % 12, 6 + (index % 20)))
            .toISOString()
            .slice(0, 10)

    return {
      id: `EV-${String(index + 1).padStart(3, '0')}`,
      label: source?.label ?? 'Evidence object',
      category: source?.category ?? 'policy',
      status,
      owner: source?.owner ?? 'Bid lead',
      expiresAt,
      approvedAt: status === 'missing' ? null : `2026-${String((index % 6) + 1).padStart(2, '0')}-15`,
      position: [
        Math.cos(azimuth) * radius,
        elevation,
        Math.sin(azimuth) * radius - 2,
      ] as const,
    }
  })
}

export const EVIDENCE_RECORDS = createEvidenceRecords()

export const REQUIREMENTS: RequirementRecord[] = Array.from({ length: 24 }, (_, index) => {
  const status: EvidenceStatus = index === 7 || index === 18 ? 'missing' : index % 6 === 0 ? 'expiring' : 'approved'
  return {
    id: `KRAV-${String(index + 1).padStart(3, '0')}`,
    label: `Mandatory requirement ${String(index + 1).padStart(3, '0')}`,
    status,
    evidenceId: status === 'missing' ? null : EVIDENCE_RECORDS[index]?.id ?? null,
    owner: status === 'missing' ? 'Bid lead' : EVIDENCE_RECORDS[index]?.owner ?? 'Quality lead',
  }
})

export interface HealthRecord {
  id: string
  label: string
  owner: string
  expiresAt: string
}

export const HEALTH_RECORDS: readonly HealthRecord[] = [
  { id: 'H-001', label: 'ISO 9001', owner: 'Quality lead', expiresAt: '2026-08-12' },
  { id: 'H-002', label: 'Cyber liability insurance', owner: 'Finance lead', expiresAt: '2026-09-03' },
  { id: 'H-003', label: 'Senior architect CV', owner: 'People operations', expiresAt: '2026-09-24' },
  { id: 'H-004', label: 'Environmental certificate', owner: 'Sustainability lead', expiresAt: '2026-10-18' },
  { id: 'H-005', label: 'Service reference A', owner: 'Commercial lead', expiresAt: '2026-11-09' },
  { id: 'H-006', label: 'Business continuity test', owner: 'Operations lead', expiresAt: '2026-12-02' },
  { id: 'H-007', label: 'Data-processing procedure', owner: 'Privacy lead', expiresAt: '2027-01-11' },
  { id: 'H-008', label: 'Information-security policy', owner: 'Security lead', expiresAt: '2027-02-20' },
  { id: 'H-009', label: 'Audited annual report', owner: 'Finance lead', expiresAt: '2027-03-31' },
  { id: 'H-010', label: 'Framework delivery case', owner: 'Bid lead', expiresAt: '2027-05-14' },
  { id: 'H-011', label: 'Technical specialist CV', owner: 'People operations', expiresAt: '2027-07-08' },
  { id: 'H-012', label: 'Quality handbook', owner: 'Quality lead', expiresAt: '2027-09-16' },
]

export function daysUntil(date: string, now = new Date()): number {
  const start = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  const end = Date.parse(`${date}T00:00:00Z`)
  return Math.ceil((end - start) / 86_400_000)
}

export function filterHealthRecords(
  filter: 'all' | 'urgent' | 'quarter',
  now = new Date(),
): HealthRecord[] {
  const yearEnd = Date.UTC(now.getUTCFullYear(), 11, 31)
  return [...HEALTH_RECORDS]
    .filter((record) => {
      const remaining = daysUntil(record.expiresAt, now)
      if (filter === 'urgent') return remaining <= 90
      if (filter === 'quarter') return Date.parse(`${record.expiresAt}T00:00:00Z`) <= yearEnd
      return true
    })
    .sort((a, b) => Date.parse(a.expiresAt) - Date.parse(b.expiresAt))
}

export function statusLabel(status: EvidenceStatus): string {
  return status === 'approved' ? 'Approved' : status === 'expiring' ? 'Expiring' : 'Missing'
}
