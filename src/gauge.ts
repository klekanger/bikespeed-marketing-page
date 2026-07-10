/**
 * Hero speedometer, drawn to match the gauge the BikeSpeed app renders.
 *
 * Every constant below mirrors GaugeFaceView.swift / SpeedometerGaugeView.swift, and the tick
 * positions come from the same formulas, so the marketing dial and the real dial stay the same
 * instrument. The one deliberate divergence: the app paints the needle, danger arc and readout in
 * SwiftUI's system orange, while here they use the page's `--accent` brand token.
 *
 * Lengths are in viewBox units of a 200x200 square, matching the app's `side = min(w, h)`.
 */

const SIDE = 200
const CENTER = SIDE / 2
/** GaugeFaceView: `radius = min(w, h) / 2 * 0.92`. Every `R * n` below echoes that file. */
const R = (SIDE / 2) * 0.92

const START_ANGLE = -135
const SWEEP_ANGLE = 270
const MINOR_PER_MAJOR = 5
const DANGER_START_FRACTION = 0.85

/** SettingsStore's default `maxGaugeSpeedKMH`, and the `majorStep(for: 60)` it resolves to. */
const MAX_SPEED = 60
const MAJOR_STEP = 10
const MINOR_STEP = MAJOR_STEP / MINOR_PER_MAJOR
const TOTAL_MINOR_TICKS = Math.floor(MAX_SPEED / MINOR_STEP)

/** The speed the gauge comes to rest at. Drives both the needle angle and the digital readout. */
const DISPLAY_SPEED = 18

const BEZEL_WIDTH = R * 0.05

/** The readout uses `design: .rounded` in the app; the rest of the dial uses the system face. */
const READOUT_FONT =
  "ui-rounded, 'SF Pro Rounded', 'Space Grotesk', system-ui, sans-serif"

/**
 * SwiftUI sizes the unit label and readout stack from font metrics and offsets the pair by
 * `side * 0.23`, so these three come from measuring that layout rather than from a formula.
 */
const UNIT_LABEL_Y = 128.5
const READOUT_BOX_Y = 145
const READOUT_BOX_HEIGHT = 25

const round = (n: number) => Number(n.toFixed(3))

const angleFor = (fraction: number) => START_ANGLE + SWEEP_ANGLE * fraction

/** GaugeFaceView.point(center:radius:angle:) — degrees measured clockwise from twelve o'clock. */
function pt(radius: number, deg: number): { x: number; y: number } {
  const a = (deg * Math.PI) / 180
  return { x: CENTER + radius * Math.sin(a), y: CENTER - radius * Math.cos(a) }
}

/**
 * `Gradient.metallicBezel`, swept around the rim. SVG has no conic gradient, and one smooth CSS
 * `conic-gradient` beats the colour banding you get from approximating the cone with stroked arc
 * segments — so the ring is an HTML element layered over the dial rather than part of the drawing.
 *
 * It has to be a *sibling* of the svg, not a foreignObject inside it: Safari lays foreignObject
 * children out in CSS pixels and never applies the viewBox scale, so the ring renders undersized and
 * anchored to the top-left. Positioning it as a percentage of the same square box sidesteps scaling
 * entirely. Both percentages come from the gauge constants so the ring cannot drift off the face.
 */
function bezel(): string {
  const outer = R + BEZEL_WIDTH / 2
  const inner = R - BEZEL_WIDTH / 2
  const inset = round(((CENTER - outer) / SIDE) * 100)
  const ratio = round((inner / outer) * 100)

  return `<div class="hero-gauge-bezel" style="--bezel-inset: ${inset}%; --bezel-ratio: ${ratio}%"></div>`
}

/** The orange arc hugging the top of the scale, from 85% to full. */
function dangerArc(): string {
  const radius = R * 0.92
  const from = pt(radius, angleFor(DANGER_START_FRACTION))
  const to = pt(radius, angleFor(1))
  const d = `M${round(from.x)} ${round(from.y)} A${round(radius)} ${round(radius)} 0 0 1 ${round(to.x)} ${round(to.y)}`

  return `<path d="${d}" fill="none" stroke="var(--accent)" stroke-width="${round(R * 0.05)}" stroke-linecap="round" />`
}

function ticksAndLabels(): string {
  const outer = R * 0.88
  const majorWidth = round(R * 0.02)
  const minorWidth = round(R * 0.01)
  const labelSize = round(R * 0.16)
  const parts: string[] = []

  for (let i = 0; i <= TOTAL_MINOR_TICKS; i++) {
    const value = i * MINOR_STEP
    const fraction = value / MAX_SPEED
    const isMajor = i % MINOR_PER_MAJOR === 0
    const isDanger = fraction >= DANGER_START_FRACTION
    const angle = angleFor(fraction)

    const inner = isMajor ? R * 0.76 : R * 0.82
    const p1 = pt(outer, angle)
    const p2 = pt(inner, angle)
    const color = isDanger ? 'var(--accent)' : isMajor ? '#ffffff' : '#999999'

    parts.push(
      `<line x1="${round(p1.x)}" y1="${round(p1.y)}" x2="${round(p2.x)}" y2="${round(p2.y)}" stroke="${color}" stroke-width="${isMajor ? majorWidth : minorWidth}" />`,
    )

    if (isMajor) {
      const label = pt(R * 0.64, angle)
      parts.push(
        `<text x="${round(label.x)}" y="${round(label.y)}" fill="#ffffff" font-size="${labelSize}" font-weight="600" text-anchor="middle" dominant-baseline="central" font-family="var(--sans)">${value}</text>`,
      )
    }
  }

  return parts.join('')
}

/**
 * NeedleShape: tip at 42% of the frame above centre, a short tail below, narrow base.
 *
 * The sweep animation lives in CSS but its angles come from here, so the needle and the digital
 * readout can never disagree about what speed the dial is showing.
 */
function needle(): string {
  const tip = CENTER - SIDE * 0.42
  const tail = CENTER + SIDE * 0.06
  const halfBase = (SIDE * 0.055) / 2
  const points = `${CENTER - halfBase},${CENTER} ${CENTER},${tip} ${CENTER + halfBase},${CENTER} ${CENTER},${tail}`
  const angles = `--needle-start: ${START_ANGLE}deg; --needle-angle: ${round(angleFor(DISPLAY_SPEED / MAX_SPEED))}deg`

  return `<g class="gauge-needle-group" style="${angles}"><polygon points="${points}" fill="var(--accent)" filter="url(#gaugeNeedleShadow)" /></g>`
}

/** A dark sphere lit from up and to the left, not a silver disc. */
function hub(): string {
  const radius = (SIDE * 0.12) / 2

  return `<circle cx="${CENTER}" cy="${CENTER}" r="${radius}" fill="url(#gaugeHub)" stroke="#8c8c8c" stroke-width="${SIDE * 0.004}" filter="url(#gaugeHubShadow)" />`
}

/** Unit label and digital speed, seated inside the lower half of the dial. */
function readout(): string {
  const boxWidth = SIDE * 0.22

  return [
    `<text x="${CENTER}" y="${UNIT_LABEL_Y}" fill="#8e8e93" font-size="${SIDE * 0.05}" font-weight="500" text-anchor="middle" dominant-baseline="central" font-family="var(--sans)">KM/H</text>`,
    `<rect x="${CENTER - boxWidth / 2}" y="${READOUT_BOX_Y}" width="${boxWidth}" height="${READOUT_BOX_HEIGHT}" rx="${SIDE * 0.03}" fill="#2e2e2e" />`,
    `<text class="gauge-speed" x="${CENTER}" y="${READOUT_BOX_Y + READOUT_BOX_HEIGHT / 2}" fill="var(--accent)" font-size="${SIDE * 0.08}" font-weight="700" text-anchor="middle" dominant-baseline="central" font-family="${READOUT_FONT}" style="font-variant-numeric: tabular-nums">${DISPLAY_SPEED}</text>`,
  ].join('')
}

export function renderGauge(): string {
  return `
    <div class="hero-gauge-wrap" aria-hidden="true">
    <svg viewBox="0 0 ${SIDE} ${SIDE}" class="hero-gauge">
      <defs>
        <radialGradient id="gaugeFace" gradientUnits="userSpaceOnUse" cx="${CENTER}" cy="${CENTER}" r="${R}">
          <stop offset="0%" stop-color="#262626" />
          <stop offset="100%" stop-color="#1b1b1b" />
        </radialGradient>
        <radialGradient id="gaugeHub" gradientUnits="userSpaceOnUse" cx="${CENTER - SIDE * 0.12 * 0.15}" cy="${CENTER - SIDE * 0.12 * 0.18}" r="${SIDE * 0.07}">
          <stop offset="0%" stop-color="#cccccc" />
          <stop offset="50%" stop-color="#666666" />
          <stop offset="100%" stop-color="#1f1f1f" />
        </radialGradient>
        <filter id="gaugeNeedleShadow">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1" flood-color="#000000" flood-opacity="0.45" />
        </filter>
        <filter id="gaugeHubShadow">
          <feDropShadow dx="0" dy="0.8" stdDeviation="0.8" flood-color="#000000" flood-opacity="0.5" />
        </filter>
      </defs>

      <circle cx="${CENTER}" cy="${CENTER}" r="${R}" fill="url(#gaugeFace)" />
      ${dangerArc()}
      ${ticksAndLabels()}
      ${needle()}
      ${hub()}
      ${readout()}
    </svg>
    ${bezel()}
    </div>
  `
}

/** Inverse of `angleFor`, clamped to the dial. */
function speedAt(deg: number): number {
  const fraction = (deg - START_ANGLE) / SWEEP_ANGLE
  return Math.min(Math.max(fraction, 0), 1) * MAX_SPEED
}

/** The needle's rotation right now, read back out of its animated transform matrix. */
function needleAngle(needle: Element): number {
  const transform = getComputedStyle(needle).transform
  if (transform === 'none') return START_ANGLE

  const { a, b } = new DOMMatrixReadOnly(transform)
  return (Math.atan2(b, a) * 180) / Math.PI
}

/**
 * Counts the digital readout up while the needle sweeps, so the two always agree.
 *
 * Rather than run a second animation alongside the CSS one and hope the easings stay in step, each
 * frame reads the needle's actual rotation back and converts it to a speed. The keyframes remain the
 * only place timing lives — including the overshoot, which the digits briefly follow past the
 * resting speed just as a real needle would drag them.
 *
 * With `prefers-reduced-motion` there is no animation to follow, and the markup already renders the
 * resting speed, so this leaves it alone. Same if scripting never runs.
 */
export function syncGaugeReadout(): void {
  const needle = document.querySelector('.gauge-needle-group')
  const digits = document.querySelector('.gauge-speed')
  if (!needle || !digits) return

  const frame = () => {
    const [sweep] = needle.getAnimations()
    if (!sweep || sweep.playState !== 'running') {
      digits.textContent = String(DISPLAY_SPEED)
      return
    }

    digits.textContent = String(Math.round(speedAt(needleAngle(needle))))
    requestAnimationFrame(frame)
  }

  requestAnimationFrame(frame)
}
