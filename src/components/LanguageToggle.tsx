import { useLocale } from './LocaleProvider'

export function LanguageToggle(): JSX.Element {
  const { copy, locale, setLocale } = useLocale()

  return (
    <div className="mono flex items-center gap-1" aria-label={copy.common.languageLabel}>
      <button
        className="rounded-sm px-2 py-1 text-[0.68rem] tracking-wide transition-colors"
        type="button"
        aria-pressed={locale === 'en'}
        onClick={() => setLocale('en')}
      >
        EN
      </button>
      <span aria-hidden="true" className="opacity-30">
        /
      </span>
      <button
        className="rounded-sm px-2 py-1 text-[0.68rem] tracking-wide transition-colors"
        type="button"
        aria-pressed={locale === 'sv'}
        onClick={() => setLocale('sv')}
      >
        SV
      </button>
    </div>
  )
}
