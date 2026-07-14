import type { ReactNode } from 'react'

interface MonoChipProps {
  children: ReactNode
  tone?: 'neutral' | 'approved' | 'expiring' | 'missing'
  className?: string
}

const toneClasses = {
  neutral: 'border-current/20 text-current',
  approved: 'border-sigill/40 bg-sigill/10 text-[var(--sigill-ink)]',
  expiring: 'border-expiry/45 bg-expiry/10 text-[var(--expiry-ink)]',
  missing: 'border-saknas/40 bg-saknas/10 text-saknas',
}

export function MonoChip({ children, tone = 'neutral', className = '' }: MonoChipProps): JSX.Element {
  return (
    <span
      className={`mono inline-flex items-center rounded-sm border px-2 py-1 text-[0.68rem] font-medium tracking-[0.08em] ${toneClasses[tone]} ${className}`}
    >
      {children}
    </span>
  )
}
