import './style.css'
import { renderGauge, syncGaugeReadout } from './gauge'
import { renderPage } from './layout'
import { getLocale, type Locale } from './i18n/locale'
import { translations } from './i18n/translations'

const screenshots = [
  { key: 'gauge', file: '01_gauge.webp' },
  { key: 'trip', file: '02_trip.webp' },
  { key: 'settings', file: '03_settings.webp' },
  { key: 'log', file: 'log.webp' },
] as const

const featureIcons = [
  '<svg viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="14" r="8" fill="none" stroke="var(--accent)" stroke-width="2"/><line x1="12" y1="14" x2="17" y2="8" stroke="var(--accent)" stroke-width="2" stroke-linecap="round"/><line x1="12" y1="4" x2="12" y2="6" stroke="var(--accent)" stroke-width="2" stroke-linecap="round"/></svg>',
  '<svg viewBox="0 0 24 24" width="24" height="24"><path d="M4 8h12M13 5l3 3-3 3" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 16H8M11 19l-3-3 3-3" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  '<svg viewBox="0 0 24 24" width="24" height="24"><rect x="5" y="3" width="14" height="18" rx="2" fill="none" stroke="var(--accent)" stroke-width="2"/><line x1="8" y1="8" x2="16" y2="8" stroke="var(--accent)" stroke-width="1.6" stroke-linecap="round"/><line x1="8" y1="12" x2="16" y2="12" stroke="var(--accent)" stroke-width="1.6" stroke-linecap="round"/><line x1="8" y1="16" x2="13" y2="16" stroke="var(--accent)" stroke-width="1.6" stroke-linecap="round"/></svg>',
  '<svg viewBox="0 0 24 24" width="24" height="24"><line x1="5" y1="20" x2="5" y2="12" stroke="var(--accent)" stroke-width="2.4" stroke-linecap="round"/><line x1="12" y1="20" x2="12" y2="6" stroke="var(--accent)" stroke-width="2.4" stroke-linecap="round"/><line x1="19" y1="20" x2="19" y2="15" stroke="var(--accent)" stroke-width="2.4" stroke-linecap="round"/></svg>',
  '<svg viewBox="0 0 24 24" width="24" height="24"><path d="M3 18l6-9 4 5 3-4 5 8z" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/></svg>',
  '<svg viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="12" r="9" fill="none" stroke="var(--accent)" stroke-width="2"/><path d="M8 13l4-5 4 5" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="12" y1="8" x2="12" y2="16" stroke="var(--accent)" stroke-width="2" stroke-linecap="round"/></svg>',
]

function screenshotSrc(locale: Locale, file: string): string {
  return `/screenshots/${locale}/${file}`
}

const featureCards = translations.en.features.items
  .map(
    (_, i) => `
      <div class="feature-item">
        <span class="feature-icon" aria-hidden="true">${featureIcons[i]}</span>
        <div>
          <h3 data-i18n="features.items.${i}.title"></h3>
          <p data-i18n="features.items.${i}.description"></p>
        </div>
      </div>
    `,
  )
  .join('')

const highlightItems = translations.en.highlights
  .map((_, i) => `<li data-i18n="highlights.${i}"></li>`)
  .join('')

const galleryFigures = screenshots
  .map(
    ({ key, file }) => `
      <figure class="gallery-item">
        <div class="phone-frame">
          <img
            data-screenshot="${key}"
            src="${screenshotSrc(getLocale(), file)}"
            alt=""
            loading="lazy"
          />
        </div>
        <figcaption data-i18n="gallery.captions.${key}"></figcaption>
      </figure>
    `,
  )
  .join('')

renderPage(`
  <main id="main-content" tabindex="-1">
    <section class="hero">
      <div class="hero-inner">
        <div>
          <p class="hero-eyebrow" data-i18n="hero.eyebrow"></p>
          <h1 data-i18n="hero.title"></h1>
          <p class="hero-tagline" data-i18n="hero.tagline"></p>
          <div class="hero-ctas">
            <a class="btn btn-primary" href="#" data-i18n="hero.ctaAppStore"></a>
            <a
              class="btn btn-secondary"
              href="https://github.com/klekanger/BikeSpeed"
              target="_blank"
              rel="noopener"
              data-i18n="hero.ctaGithub"
            ></a>
          </div>
        </div>

        ${renderGauge()}
      </div>
    </section>

    <section class="highlight-strip">
      <ul>
        ${highlightItems}
      </ul>
    </section>

    <section class="features" data-reveal>
      <div class="wrap">
        <h2 data-i18n="features.title"></h2>
        <div class="feature-grid">
          ${featureCards}
        </div>
      </div>
    </section>

    <section class="gallery" data-reveal>
      <div class="wrap">
        <h2 data-i18n="gallery.title"></h2>
        <div class="gallery-grid">
          ${galleryFigures}
        </div>
      </div>
    </section>

    <section class="open-source" data-reveal>
      <div class="wrap open-source-inner">
        <div>
          <h2 data-i18n="openSource.title"></h2>
          <p data-i18n="openSource.body"></p>
        </div>
        <a
          class="btn btn-primary"
          href="https://github.com/klekanger/BikeSpeed"
          target="_blank"
          rel="noopener"
          data-i18n="openSource.cta"
        ></a>
      </div>
    </section>
  </main>
`)

syncGaugeReadout()

function updateScreenshots(locale: Locale): void {
  document.querySelectorAll<HTMLImageElement>('[data-screenshot]').forEach((img) => {
    const key = img.dataset.screenshot
    const match = screenshots.find((s) => s.key === key)
    if (match) img.src = screenshotSrc(locale, match.file)
  })
}

document.addEventListener('bikespeed:localechange', (e) => {
  updateScreenshots((e as CustomEvent<Locale>).detail)
})
