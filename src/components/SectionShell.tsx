import type { ElementType, ReactNode } from 'react'

interface SectionShellProps {
  children: ReactNode
  id?: string
  tone?: 'paper' | 'ink'
  compact?: boolean
  className?: string
  as?: ElementType
  labelledBy?: string
}

export function SectionShell({
  children,
  id,
  tone = 'paper',
  compact = false,
  className = '',
  as: Component = 'section',
  labelledBy,
}: SectionShellProps): JSX.Element {
  return (
    <Component
      id={id}
      aria-labelledby={labelledBy}
      className={`section-shell ${tone === 'ink' ? 'ink-section' : 'paper-section'} ${compact ? 'section-shell-compact' : ''} ${className}`}
    >
      <div className="section-inner">{children}</div>
    </Component>
  )
}
