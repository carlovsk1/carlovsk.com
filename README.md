# carlovsk.com

My portfolio, live at **[carlovsk.com](https://carlovsk.com)**.

Next.js 16, React 19, TypeScript, Tailwind v4. Three runtime dependencies: `next`, `react`,
`react-dom`. No framer-motion, no GSAP, no three.js, no Lottie. That is the point.

## The graphics are hand-written canvas

The visual language is Brazilian modernism. Two pieces of it are drawn per frame in
`CanvasRenderingContext2D`, not imported:

- **The wall** (`WallHero`, `StoryWall`) is a grid of half-square tiles in the Athos Bulcão
  tradition. `StoryWall` carries a color mix per era, so the wall changes palette as the
  timeline moves from 2020 to now.
- **The tides** (`WaveBand`) are the Burle Marx sidewalk curve, redrawn on every frame with a
  phase offset so no two bands are in step.

Both renderers do the boring parts properly, because that is what makes them feel fast:

- `prefers-reduced-motion` cuts animation to 15% instead of killing it.
- An `IntersectionObserver` stops the RAF loop when the canvas is off screen.
- A `ResizeObserver` plus a DPR-capped backing store keeps it sharp without paying for 3x
  pixels on a 3x display.

## The palette is the design system

`src/lib/palette.ts` is the only place a color exists, and every value carries the contrast
ratio it was measured at:

```ts
/** Reads on the sand ground and behind sand text (5.07:1 both ways). */
blue: "#2762BC",
/** The same hue lifted for small text on the dark greens, where `blue` only reaches 3:1. */
blueInk: "#7FB0F2",
```

Blue is the one accent that cannot be both a tile fill and body text, so anything drawing an
accent as text on a dark ground routes through `onDark()`. Nothing in `INK` is a decorative
guess either: each opacity is the lowest one that still clears 4.5:1 on both dark grounds.

## Run it

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

## Structure

```
src/app/         layout, page, opengraph-image, twitter-image
src/components/  one file per section of the page
src/lib/         palette.ts, the single source of color
```
