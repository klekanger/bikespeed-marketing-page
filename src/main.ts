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

function appStoreBadge(locale: Locale): string {
  return locale === 'nb'
    ? '/Download_on_the_App_Store_Badge_NO_RGB_blk_100317.svg'
    : '/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg'
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
            <a class="btn-appstore" href="https://apps.apple.com/us/app/bikespeed-gps-speedometer/id6788777869" data-i18n-attr="aria-label:hero.ctaAppStore">
              <img
                data-appstore
                src="${appStoreBadge(getLocale())}"
                alt=""
                width="120"
                height="40"
              />
            </a>
            <a
              class="btn btn-secondary"
              href="https://github.com/klekanger/BikeSpeed"
              target="_blank"
              rel="noopener"
            >
              <svg class="btn-icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
              <span data-i18n="hero.ctaGithub"></span>
            </a>
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

    <section class="on-road" data-reveal>
      <picture>
        <source
          type="image/webp"
          srcset="/photos/on-bike-1600.webp 1600w, /photos/on-bike-2400.webp 2400w"
          sizes="100vw"
        />
        <img
          class="on-road-photo"
          src="/photos/on-bike-1600.jpg"
          srcset="/photos/on-bike-1600.jpg 1600w, /photos/on-bike-2400.jpg 2400w"
          sizes="100vw"
          width="2400"
          height="923"
          alt=""
          data-i18n-attr="alt:onRoad.alt"
          loading="lazy"
          decoding="async"
        />
      </picture>
      <div class="on-road-scrim" aria-hidden="true"></div>
      <div class="wrap on-road-content">
        <p class="on-road-eyebrow" data-i18n="onRoad.eyebrow"></p>
        <h2 data-i18n="onRoad.title"></h2>
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
            class="btn btn-secondary btn-cta"
            href="https://github.com/klekanger/BikeSpeed"
            target="_blank"
            rel="noopener"
          >
          <svg class="btn-icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
          </svg>
          <span data-i18n="hero.ctaGithub"></span>
          </a>  
      </div>
    </section>
  </main>
`)

syncGaugeReadout()

function updateScreenshots(locale: Locale): void {
  document
    .querySelectorAll<HTMLImageElement>('[data-screenshot]')
    .forEach((img) => {
      const key = img.dataset.screenshot
      const match = screenshots.find((s) => s.key === key)
      if (match) img.src = screenshotSrc(locale, match.file)
    })
}

function updateAppStoreBadge(locale: Locale): void {
  document
    .querySelectorAll<HTMLImageElement>('[data-appstore]')
    .forEach((img) => {
      img.src = appStoreBadge(locale)
    })
}

document.addEventListener('bikespeed:localechange', (e) => {
  const locale = (e as CustomEvent<Locale>).detail
  updateScreenshots(locale)
  updateAppStoreBadge(locale)
})
