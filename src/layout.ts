import { applyTranslations, getLocale, setLocale, type Locale } from './i18n/locale'

export function renderHeader(): string {
  return `
    <a class="skip-link" href="#main-content" data-i18n="a11y.skipToContent"></a>
    <header class="site-header">
      <div class="wrap header-inner">
        <a href="index.html" class="wordmark">
          <span class="wordmark-icon" aria-hidden="true">🚴</span>BikeSpeed
        </a>
        <div class="lang-selector" role="group" data-i18n-attr="aria-label:nav.languageLabel">
          <button type="button" data-locale="en" aria-label="English">EN</button>
          <button type="button" data-locale="nb" aria-label="Norwegian">NO</button>
        </div>
      </div>
    </header>
  `
}

export function renderFooter(): string {
  return `
    <footer class="site-footer">
      <div class="wrap footer-inner">
        <nav class="footer-links" data-i18n-attr="aria-label:nav.footerLabel">
          <a href="privacy.html" data-i18n="nav.privacy"></a>
          <a href="support.html" data-i18n="nav.support"></a>
          <a href="https://github.com/klekanger/BikeSpeed" target="_blank" rel="noopener">GitHub</a>
        </nav>
        <p class="footer-copy" data-i18n="footer.copyright"></p>
      </div>
    </footer>
  `
}

function updateActiveButtons(buttons: NodeListOf<HTMLButtonElement>, locale: Locale): void {
  buttons.forEach((btn) => {
    btn.classList.toggle('is-active', btn.dataset.locale === locale)
    btn.setAttribute('aria-pressed', String(btn.dataset.locale === locale))
  })
}

export function initLayout(): void {
  const buttons = document.querySelectorAll<HTMLButtonElement>('.lang-selector button')
  updateActiveButtons(buttons, getLocale())

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const locale = btn.dataset.locale as Locale
      setLocale(locale)
    })
  })

  document.addEventListener('bikespeed:localechange', (e) => {
    updateActiveButtons(buttons, (e as CustomEvent<Locale>).detail)
  })
}

export function renderPage(content: string): void {
  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `${renderHeader()}${content}${renderFooter()}`
  initLayout()
  applyTranslations()
}

export function renderI18nList(
  basePath: string,
  count: number,
  className: string,
  fields: readonly [string, string],
): string {
  return Array.from(
    { length: count },
    (_, i) => `
      <div class="${className}">
        <h2 data-i18n="${basePath}.${i}.${fields[0]}"></h2>
        <p data-i18n="${basePath}.${i}.${fields[1]}"></p>
      </div>
    `,
  ).join('')
}
