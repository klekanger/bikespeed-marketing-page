# BikeSpeed Marketing Page

The marketing website for **[BikeSpeed](https://github.com/klekanger/BikeSpeed)** — a simple, free GPS speedometer for cyclists. No ads, no subscriptions, open source. Live at **[bikespeed.no](https://bikespeed.no/)**.

![BikeSpeed — GPS speedometer app mounted on bike handlebars](public/og-image.png)

## About the app

BikeSpeed turns an iPhone into a fullscreen, handlebar-mounted GPS speedometer styled after vintage 80s car dashboards. It's an intentionally distraction-free app — no setup, no accounts, no configuration.

- Analog speed gauge with a 270° dial and configurable max speed
- Digital speed readout and heading indicator (arrow + compass letters)
- Live trip stats: average speed, distance, altitude, GPS coordinates
- Trip controls (Start, Pause, Reset) with screen-sleep prevention
- Metric/imperial units and bilingual UI (English & Norwegian)
- Built in Swift for iOS 17+, MIT licensed

The app source lives at [github.com/klekanger/BikeSpeed](https://github.com/klekanger/BikeSpeed).

## About this repo

A small static marketing site built with [Vite](https://vitejs.dev/) and TypeScript (no framework). It renders an animated SVG gauge, screenshots, and App Store links, with a hand-rolled i18n layer that auto-detects English or Norwegian from the browser and remembers the choice in `localStorage`.

The site has three pages, each with its own entry point in `vite.config.ts`:

- `index.html` — landing page
- `privacy.html` — privacy policy
- `support.html` — support page

### Project structure

```
index.html, privacy.html, support.html   Page entry points
public/                                   Static assets (photos, screenshots, icons, og-image)
src/
  main.ts            Landing page bootstrap
  layout.ts          Page markup
  gauge.ts           Animated SVG speed gauge
  privacy.ts         Privacy page
  support.ts         Support page
  style.css          Styles
  i18n/
    locale.ts        Locale detection + persistence
    translations.ts  English & Norwegian strings
```

## Development

```bash
pnpm install     # install dependencies
pnpm dev         # start the dev server
pnpm build       # type-check and build to dist/
pnpm preview     # preview the production build
```
