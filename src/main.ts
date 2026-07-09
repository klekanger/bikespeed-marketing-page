import './style.css'
import { renderPage } from './layout'
import { getLocale, type Locale } from './i18n/locale'
import { translations } from './i18n/translations'

const screenshots = [
  { key: 'gauge', file: '01_gauge.png' },
  { key: 'trip', file: '02_trip.png' },
  { key: 'settings', file: '03_settings.png' },
  { key: 'log', file: 'log.png' },
] as const

function screenshotSrc(locale: Locale, file: string): string {
  return `/screenshots/${locale}/${file}`
}

const featureCards = translations.en.features.items
  .map(
    (_, i) => `
      <article class="feature-card">
        <span class="feature-icon" aria-hidden="true" data-i18n="features.items.${i}.icon"></span>
        <h3 data-i18n="features.items.${i}.title"></h3>
        <p data-i18n="features.items.${i}.description"></p>
      </article>
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
        <img
          data-screenshot="${key}"
          src="${screenshotSrc(getLocale(), file)}"
          alt=""
          loading="lazy"
        />
        <figcaption data-i18n="gallery.captions.${key}"></figcaption>
      </figure>
    `,
  )
  .join('')

renderPage(`
  <main>
    <section class="hero">
      <div class="wrap hero-inner">
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
        <div class="hero-graphic" aria-hidden="true">
          <svg viewBox="0 0 200 120" class="gauge-placeholder">
            <path d="M20 100 A80 80 0 0 1 180 100" fill="none" stroke-width="10" stroke-linecap="round" class="gauge-track" />
            <path d="M20 100 A80 80 0 0 1 130 26" fill="none" stroke-width="10" stroke-linecap="round" class="gauge-fill" />
            <line x1="100" y1="100" x2="150" y2="55" class="gauge-needle" stroke-width="4" stroke-linecap="round" />
            <circle cx="100" cy="100" r="8" class="gauge-hub" />
          </svg>
        </div>
      </div>
    </section>

    <section class="highlight-strip">
      <ul class="wrap">
        ${highlightItems}
      </ul>
    </section>

    <section class="features">
      <div class="wrap">
        <h2 data-i18n="features.title"></h2>
        <div class="feature-grid">
          ${featureCards}
        </div>
      </div>
    </section>

    <section class="gallery">
      <div class="wrap">
        <h2 data-i18n="gallery.title"></h2>
        <div class="gallery-grid">
          ${galleryFigures}
        </div>
      </div>
    </section>

    <section class="open-source">
      <div class="wrap">
        <h2 data-i18n="openSource.title"></h2>
        <p data-i18n="openSource.body"></p>
        <a
          class="btn btn-secondary"
          href="https://github.com/klekanger/BikeSpeed"
          target="_blank"
          rel="noopener"
          data-i18n="openSource.cta"
        ></a>
      </div>
    </section>
  </main>
`)

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
