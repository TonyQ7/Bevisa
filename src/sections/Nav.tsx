import { useEffect, useState } from 'react'
import { SITE_NAME } from '../content/copy'
import { Button } from '../components/Button'
import { LanguageToggle } from '../components/LanguageToggle'
import { useLocale } from '../components/LocaleProvider'
import { BOOKING_URL } from '../content/config'

export function Nav(): JSX.Element {
  const { copy } = useLocale()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const update = (): void => setScrolled(window.scrollY > 24)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  useEffect(() => {
    const close = (): void => setOpen(false)
    window.addEventListener('resize', close)
    return () => window.removeEventListener('resize', close)
  }, [])

  const links = [
    ['#problem', copy.nav.problem],
    ['#process', copy.nav.process],
    ['#health', copy.nav.health],
    ['#sovereignty', copy.nav.sovereignty],
  ] as const

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-200 ${
        scrolled || open
          ? 'nav-elevated border-white/10 bg-ink/90 backdrop-blur-xl'
          : 'border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-[90rem] items-center justify-between px-[var(--page-gutter)] text-arkiv">
        <a className="font-display text-xl font-bold tracking-[-0.03em]" href="#top" onClick={() => setOpen(false)}>
          {SITE_NAME}<span className="text-sigill">.</span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex" aria-label={copy.nav.label}>
          {links.map(([href, label]) => (
            <a className="text-sm text-arkiv/70 transition-colors hover:text-arkiv" href={href} key={href}>
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 sm:flex">
          <LanguageToggle />
            <Button href={BOOKING_URL ?? '#offer'} className="min-h-0 py-2 text-xs">
            {copy.nav.book}
          </Button>
        </div>

        <button
          className="grid size-10 place-items-center rounded-sm border border-white/20 sm:hidden"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? copy.nav.closeMenu : copy.nav.openMenu}
          onClick={() => setOpen((current) => !current)}
        >
          <span aria-hidden="true" className="mono text-lg">
            {open ? '×' : '≡'}
          </span>
        </button>
      </div>

      {open ? (
        <nav id="mobile-nav" className="border-t border-white/10 px-[var(--page-gutter)] py-5 text-arkiv sm:hidden" aria-label={copy.nav.label}>
          <div className="flex flex-col gap-1">
            {links.map(([href, label]) => (
              <a className="border-b border-white/10 py-3 text-base" href={href} key={href} onClick={() => setOpen(false)}>
                {label}
              </a>
            ))}
            <a className="py-3 text-base" href="#offer" onClick={() => setOpen(false)}>
              {copy.nav.offer}
            </a>
            <div className="mt-4 flex items-center justify-between">
              <LanguageToggle />
                <Button href={BOOKING_URL ?? '#offer'} className="min-h-0 py-2 text-xs">
                {copy.nav.book}
              </Button>
            </div>
          </div>
        </nav>
      ) : null}
    </header>
  )
}
