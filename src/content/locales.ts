import { EN_COPY, type Locale, type LocalizedCopy } from './copy'
import { SV_COPY } from './copy.sv'

export const COPY_BY_LOCALE: Record<Locale, LocalizedCopy> = {
  en: EN_COPY,
  sv: SV_COPY,
}
