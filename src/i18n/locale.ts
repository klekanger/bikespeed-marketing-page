import { translations, type Locale } from './translations'

const STORAGE_KEY = 'bikespeed-locale'

const dynamicValues: Record<string, () => string> = {
  year: () => String(new Date().getFullYear()),
}

function interpolate(value: string): string {
  return value.replace(/\{(\w+)\}/g, (match, token) => (token in dynamicValues ? dynamicValues[token]() : match))
}

function detectLocale(): Locale {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'en' || stored === 'nb') return stored

  const browserLocales = navigator.languages?.length ? navigator.languages : [navigator.language]
  const isNorwegian = browserLocales.some((lang) => /^(nb|nn|no)\b/i.test(lang))
  return isNorwegian ? 'nb' : 'en'
}

let currentLocale: Locale = detectLocale()

export function getLocale(): Locale {
  return currentLocale
}

export function setLocale(locale: Locale): void {
  currentLocale = locale
  localStorage.setItem(STORAGE_KEY, locale)
  applyTranslations()
  document.dispatchEvent(new CustomEvent('bikespeed:localechange', { detail: locale }))
}

function resolve(path: string): string {
  let node: unknown = translations[currentLocale]
  for (const key of path.split('.')) {
    if (typeof node !== 'object' || node === null) return path
    node = (node as Record<string, unknown>)[key]
  }
  return typeof node === 'string' ? interpolate(node) : path
}

export function applyTranslations(root: ParentNode = document): void {
  document.documentElement.lang = currentLocale

  root.querySelectorAll<HTMLElement>('[data-i18n], [data-i18n-attr]').forEach((el) => {
    if (el.dataset.i18n) {
      el.textContent = resolve(el.dataset.i18n)
    }
    if (el.dataset.i18nAttr) {
      for (const pair of el.dataset.i18nAttr.split(';')) {
        const [attr, key] = pair.split(':').map((s) => s.trim())
        if (attr && key) el.setAttribute(attr, resolve(key))
      }
    }
  })
}

export { translations }
export type { Locale }
