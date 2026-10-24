import './style.css'
import { renderGauge, syncGaugeReadout } from './gauge'
import { GITHUB_ICON_PATH, renderPage, renderRepoCards } from './layout'
import { getLocale, type Locale } from './i18n/locale'
import { translations } from './i18n/translations'

const screenshots = [
  { key: 'gauge', file: '01_gauge.webp' },
  { key: 'log', file: '02_log.webp' },
  { key: 'bests', file: '03_bests.webp' },
  { key: 'map', file: '04_map.webp' },
  { key: 'profile', file: '05_profile.webp' },
  { key: 'settings', file: '06_settings.webp' },
] as const

// One icon per feature card, in the same order as `features.items` in the dictionary.
const featureIcons = [
  // Speedometer
  '<svg viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="14" r="8" fill="none" stroke="var(--accent)" stroke-width="2"/><line x1="12" y1="14" x2="17" y2="8" stroke="var(--accent)" stroke-width="2" stroke-linecap="round"/><line x1="12" y1="4" x2="12" y2="6" stroke="var(--accent)" stroke-width="2" stroke-linecap="round"/></svg>',
  // Metric / imperial
  '<svg viewBox="0 0 24 24" width="24" height="24"><path d="M4 8h12M13 5l3 3-3 3" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 16H8M11 19l-3-3 3-3" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  // Customize
  '<svg viewBox="0 0 24 24" width="24" height="24"><line x1="4" y1="8" x2="20" y2="8" stroke="var(--accent)" stroke-width="2" stroke-linecap="round"/><line x1="4" y1="16" x2="20" y2="16" stroke="var(--accent)" stroke-width="2" stroke-linecap="round"/><circle cx="9" cy="8" r="2.8" fill="var(--bg)" stroke="var(--accent)" stroke-width="2"/><circle cx="15" cy="16" r="2.8" fill="var(--bg)" stroke="var(--accent)" stroke-width="2"/></svg>',
  // Auto-pause
  '<svg viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="12" r="9" fill="none" stroke="var(--accent)" stroke-width="2"/><line x1="10" y1="9" x2="10" y2="15" stroke="var(--accent)" stroke-width="2" stroke-linecap="round"/><line x1="14" y1="9" x2="14" y2="15" stroke="var(--accent)" stroke-width="2" stroke-linecap="round"/></svg>',
  // Climb, descent, gradient
  '<svg viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="12" r="9" fill="none" stroke="var(--accent)" stroke-width="2"/><path d="M8 13l4-5 4 5" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="12" y1="8" x2="12" y2="16" stroke="var(--accent)" stroke-width="2" stroke-linecap="round"/></svg>',
  // Trip log
  '<svg viewBox="0 0 24 24" width="24" height="24"><rect x="5" y="3" width="14" height="18" rx="2" fill="none" stroke="var(--accent)" stroke-width="2"/><line x1="8" y1="8" x2="16" y2="8" stroke="var(--accent)" stroke-width="1.6" stroke-linecap="round"/><line x1="8" y1="12" x2="16" y2="12" stroke="var(--accent)" stroke-width="1.6" stroke-linecap="round"/><line x1="8" y1="16" x2="13" y2="16" stroke="var(--accent)" stroke-width="1.6" stroke-linecap="round"/></svg>',
  // Height & speed profile
  '<svg viewBox="0 0 24 24" width="24" height="24"><path d="M3 18l6-9 4 5 3-4 5 8z" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/></svg>',
  // Totals & personal bests
  '<svg viewBox="0 0 24 24" width="24" height="24"><line x1="5" y1="20" x2="5" y2="12" stroke="var(--accent)" stroke-width="2.4" stroke-linecap="round"/><line x1="12" y1="20" x2="12" y2="6" stroke="var(--accent)" stroke-width="2.4" stroke-linecap="round"/><line x1="19" y1="20" x2="19" y2="15" stroke="var(--accent)" stroke-width="2.4" stroke-linecap="round"/></svg>',
  // iCloud sync
  '<svg viewBox="0 0 24 24" width="24" height="24"><path d="M7.5 19h9.2a3.8 3.8 0 0 0 .5-7.56A5.4 5.4 0 0 0 7 10.4 4.2 4.2 0 0 0 7.5 19z" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linejoin="round"/></svg>',
  // GPX export
  '<svg viewBox="0 0 24 24" width="24" height="24"><path d="M12 4v10" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round"/><path d="M8.5 7.5L12 4l3.5 3.5" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 14v4.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V14" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
]

function screenshotSrc(locale: Locale, file: string): string {
  return `/screenshots/${locale}/${file}`
}

// Screenshots are 1284×2778 but render at most 280px wide (see .gallery-item in
// style.css). Serve downscaled variants so desktop pulls a small file while
// hi-DPI mobile still gets the full-resolution original.
function screenshotSrcset(locale: Locale, file: string): string {
  const base = screenshotSrc(locale, file).replace(/\.webp$/, '')
  return `${base}-320.webp 320w, ${base}-560.webp 560w, ${base}.webp 1284w`
}

// Frames cap at 280px above the carousel breakpoint. Below it the grid is two
// columns, so each image is half the .wrap content box minus the column gap and
// the phone frame's own padding+border: (100vw - 48 - 28) / 2 - 22.
const SCREENSHOT_SIZES = '(min-width: 561px) 280px, calc(50vw - 60px)'

function appStoreBadge(locale: Locale): string {
  return locale === 'nb'
    ? '/Download_on_the_App_Store_Badge_NO_RGB_blk_100317.svg'
    : '/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg'
}

function googlePlayBadge(locale: Locale): string {
  return locale === 'nb'
    ? '/badges/google-play-no.webp'
    : '/badges/google-play-en.webp'
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

const whatsNewItems = translations.en.whatsNew.items
  .map((_, i) => `<li data-i18n="whatsNew.items.${i}"></li>`)
  .join('')

const galleryFigures = screenshots
  .map(
    ({ key, file }) => `
      <figure class="gallery-item">
        <div class="phone-frame">
          <img
            data-screenshot="${key}"
            src="${screenshotSrc(getLocale(), file)}"
            srcset="${screenshotSrcset(getLocale(), file)}"
            sizes="${SCREENSHOT_SIZES}"
            width="1284"
            height="2778"
            alt=""
            loading="lazy"
            decoding="async"
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
            <a class="btn-appstore" href="https://apps.apple.com/us/app/bikespeed-gps-speedometer/id6788777869" >
              <img
                data-appstore
                src="${appStoreBadge(getLocale())}"
                alt=""
                width="120"
                height="40"
                data-i18n-attr="alt:hero.altAppStore"
              />
            </a>
            <a class="btn-appstore" href="https://play.google.com/store/apps/details?id=no.lekanger.bikespeed">
              <img
                data-googleplay
                src="${googlePlayBadge(getLocale())}"
                alt=""
                width="192"
                height="57"
                data-i18n-attr="alt:hero.altGooglePlay"
              />
            </a>
          </div>
          <a class="hero-source-link" href="#open-source">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
              <path d="${GITHUB_ICON_PATH}"/>
            </svg>
            <span data-i18n="hero.ctaGithub"></span>
            <span aria-hidden="true">↓</span>
          </a>
        </div>

        ${renderGauge()}
      </div>
    </section>

    <section class="highlight-strip">
      <ul>
        ${highlightItems}
      </ul>
    </section>

    <section class="whats-new" data-reveal>
      <div class="wrap whats-new-inner">
        <div class="whats-new-intro">
          <p class="whats-new-badge" data-i18n="whatsNew.badge"></p>
          <h2 data-i18n="whatsNew.title"></h2>
          <p data-i18n="whatsNew.body"></p>
        </div>
        <ul class="whats-new-list">
          ${whatsNewItems}
        </ul>
      </div>
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

    <section class="open-source" id="open-source" data-reveal>
      <div class="wrap open-source-inner">
        <div>
          <h2 data-i18n="openSource.title"></h2>
          <p data-i18n="openSource.body"></p>
        </div>
        ${renderRepoCards()}
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
      if (match) {
        img.src = screenshotSrc(locale, match.file)
        img.srcset = screenshotSrcset(locale, match.file)
      }
    })
}

function updateAppStoreBadge(locale: Locale): void {
  document
    .querySelectorAll<HTMLImageElement>('[data-appstore]')
    .forEach((img) => {
      img.src = appStoreBadge(locale)
    })
  document
    .querySelectorAll<HTMLImageElement>('[data-googleplay]')
    .forEach((img) => {
      img.src = googlePlayBadge(locale)
    })
}

document.addEventListener('bikespeed:localechange', (e) => {
  const locale = (e as CustomEvent<Locale>).detail
  updateScreenshots(locale)
  updateAppStoreBadge(locale)
})
