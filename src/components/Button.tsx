import type { ReactNode } from 'react'

type ButtonVariant = 'primary' | 'ghost-light' | 'ghost-dark'

interface ButtonProps {
  children: ReactNode
  href?: string
  variant?: ButtonVariant
  disabled?: boolean
  descriptionId?: string
  onClick?: () => void
  className?: string
}

const variantClass: Record<ButtonVariant, string> = {
  primary: 'button-primary',
  'ghost-light': 'button-ghost-light',
  'ghost-dark': 'button-ghost-dark',
}

export function Button({
  children,
  href,
  variant = 'primary',
  disabled = false,
  descriptionId,
  onClick,
  className = '',
}: ButtonProps): JSX.Element {
  const classes = `button-base ${variantClass[variant]} ${className}`.trim()

  if (href && !disabled) {
    const external = /^https?:\/\//.test(href)
    return (
      <a
        className={classes}
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer' : undefined}
        aria-describedby={descriptionId}
      >
        {children}
        {external ? <span aria-hidden="true">↗</span> : null}
      </a>
    )
  }

  return (
    <button
      className={classes}
      type="button"
      disabled={disabled}
      aria-disabled={disabled}
      aria-describedby={descriptionId}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
