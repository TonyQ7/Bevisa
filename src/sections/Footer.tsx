import { SITE_NAME } from '../content/copy'
import { useLocale } from '../components/LocaleProvider'

export function Footer(): JSX.Element {
  const { copy } = useLocale()

  return (
    <footer className="bg-arkiv px-[var(--page-gutter)] pb-8 text-ink">
      <div className="mx-auto grid w-full max-w-[86rem] gap-8 border-t hairline pt-8 md:grid-cols-[0.7fr_1.3fr]">
        <div>
          <p className="font-display text-xl font-bold">{copy.footer.tagline}</p>
          <p className="mono mt-3 text-[0.62rem] tracking-[0.06em] text-graphite">{copy.footer.copyright}</p>
          <p className="mono mt-2 text-[0.62rem] tracking-[0.06em] text-graphite">{copy.footer.privacy}</p>
        </div>
        <p className="text-xs leading-relaxed text-graphite">{copy.footer.legal}</p>
      </div>
      <span className="visually-hidden">{SITE_NAME}</span>
    </footer>
  )
}
