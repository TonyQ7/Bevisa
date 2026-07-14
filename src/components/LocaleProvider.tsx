/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { COPY_BY_LOCALE } from '../content/locales'
import type { Locale, LocalizedCopy } from '../content/copy'

interface LocaleContextValue {
  locale: Locale
  copy: LocalizedCopy
  setLocale: (locale: Locale) => void
}

const STORAGE_KEY = 'bevisa-locale'
const LocaleContext = createContext<LocaleContextValue | null>(null)

function storedLocale(): Locale {
  if (typeof window === 'undefined') return 'en'
  return window.localStorage.getItem(STORAGE_KEY) === 'sv' ? 'sv' : 'en'
}

export function LocaleProvider({ children }: { children: ReactNode }): JSX.Element {
  const [locale, setLocaleState] = useState<Locale>(storedLocale)
  const copy = COPY_BY_LOCALE[locale]

  const setLocale = (nextLocale: Locale): void => {
    window.localStorage.setItem(STORAGE_KEY, nextLocale)
    setLocaleState(nextLocale)
  }

  useEffect(() => {
    document.documentElement.lang = locale
    document.title = copy.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', copy.meta.description)
  }, [copy, locale])

  const value = useMemo(() => ({ locale, copy, setLocale }), [copy, locale])
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale(): LocaleContextValue {
  const value = useContext(LocaleContext)
  if (!value) throw new Error('useLocale must be used inside LocaleProvider')
  return value
}
