# Visual Refinement — Aligning carlovsk.com to the reference design

**Status:** Draft
**Date:** 2026-04-16
**Branch:** `feat/design-improvements`

## Context

The portfolio project already mirrors the reference site (the production carlovsk.com Framer build) at the structural level: same sections in the same order (Hero, Projects, About, Expertise, Motivation, Experience, Favourite Stack, Contact, Footer). What separates the current implementation from the reference is purely visual: typography scale and weight, color palette warmth, vertical rhythm, and a handful of component-level details.

This spec describes a visual-token refinement + targeted component adjustments. No structural changes. No new dependencies. No font swap.

## Scope

**In scope**
- Global design tokens in `src/app/globals.css` (colors, typography scale, spacing)
- Per-component visual adjustments across all sections rendered by `src/app/page.tsx`
- Keep Inter as the single font family (use weight 900 + tight tracking for display)
- Keep the custom cursor component

**Out of scope**
- Glued posters / marketing break section from the reference (skipped)
- Adding new dependencies (shadcn, new fonts, new animation libs)
- Structural refactors (no new components, no extracted design-system module)
- Dynamic project pages (`/p/[slug]`) — that work is already in flight on this branch and is not touched here
- Mobile-only redesign passes — responsiveness is maintained but not redesigned

## Design Tokens

All token changes land in `src/app/globals.css` under the existing `@theme inline` block and `:root` selector.

### Colors

| Token | Current | New | Purpose |
|---|---|---|---|
| `--background` | `#1a1a1a` | `#0a0a0a` | Deeper near-black, matches reference |
| `--foreground` | `#e8e4df` | `#ebe6df` | Warmer off-white |
| `--muted` | `#999` | `#6b6b6b` | Meta text, dates, small caps labels |
| `--muted-strong` | — (new) | `#a8a39c` | Body descriptions, secondary paragraphs |
| `--border` | `#333` | `#1f1f1f` | Subtle dividers |
| `--accent` | `#6366f1` | `#9ae66e` | "AVAILABLE" chip dot and accent moments |
| `--surface` | — (new) | `#111111` | Card/box backgrounds (expertise, stack, client logos) |

### Typography

- Single family: Inter (already loaded via `next/font/google` in `src/app/layout.tsx`)
- Display usage: `font-weight: 900`, `letter-spacing: -0.04em`, `text-transform: uppercase`
- Body usage: weights 300–500, normal tracking, relaxed leading

Scale (clamp-based for fluid responsiveness):

| Role | Size |
|---|---|
| Display hero (`CARLOVSK`) | `clamp(5rem, 14vw, 12rem)` |
| Section title (`FEATURED WORK`, `MORE ABOUT CARLOVSK`, `MY EXPERTISE`, `LET'S WORK TOGETHER`) | `clamp(4rem, 10vw, 9rem)` |
| Section label (`EXPERIENCE`, `FAVOURITE STACK`, `MOTIVATION`) | `clamp(2rem, 4vw, 3rem)` |
| Meta caps (small uppercase labels) | `0.75rem` with `tracking-wider` |
| Body | `1rem` / `1.125rem`, leading-relaxed |

### Rhythm & spacing

- Section vertical padding: `py-24 md:py-40`
- Container: `max-w-[1400px]` with horizontal padding `px-6 md:px-10`
- Project grid gap: `gap-3` (tight, matches reference)
- Border radius: `rounded-sm` on media, `rounded-lg` on surface cards

## Component Adjustments

Each subsection lists only the deltas against the existing component. Structure and data wiring stay the same.

### `src/components/Header.tsx`
- Logo "CARLOVSK 012704" on left, uppercase small caps, `tracking-wider`, `text-xs`
- "CONTACT NOW" button on right: `border border-[var(--border)]` + `px-5 py-2 rounded-full text-xs uppercase tracking-wider`, hover state fills with `--foreground` and inverts text to `--background`
- Remove time/location widget if present; keep layout clean (logo left, CTA right)

### `src/components/Hero.tsx`
- Top chip: `✦ AVAILABLE` with a `--accent` dot, centered, small caps
- Headline `CARLOVSK` centered, display scale, weight 900, `tracking-[-0.04em]`, uppercase
- Three-column meta row below headline (`border-t border-[var(--border)]`, `py-4`, `text-xs uppercase tracking-wider text-[var(--muted)]`): `BASED IN BR, PORTO SEGURO BA` / (center empty or small separator) / `BUBBLE DEVELOPER`
- Next row: two-column layout — `FEATURED WORK` display-size title on the left, long descriptive paragraph on the right with `leading-relaxed text-[var(--muted-strong)]`

### `src/components/Projects.tsx`
- Grid: `grid-cols-1 md:grid-cols-2 gap-3`
- Card structure:
  - Image wrapper: `aspect-[4/3] rounded-sm overflow-hidden`, image fills with `object-cover`
  - Hover: image `scale-[1.02]` transition, no shadow/glow
  - Bottom row (outside image, `pt-4`): project name uppercase bold on the left, tech stack tag (small caps, `text-[var(--muted)]`) inline, year pushed to the right with `ml-auto text-[var(--muted)]`
- Remove any cursor-related hover styles that conflict with the custom cursor

### `src/components/About.tsx`
- Headline "MORE ABOUT CARLOVSK" at display-section scale, centered
- Descriptive paragraph centered, `max-w-[50ch]`, `text-[var(--muted-strong)]`
- CTA "DOWNLOAD RESUME" button using the same style as the Contact Now button

### Client logos row (currently likely part of `About.tsx` or its own block)
- Horizontal row, 5–6 cards visible per row on desktop
- Each card: `bg-[var(--surface)] rounded-lg` with logo centered in `text-[var(--muted)]`
- On mobile: horizontal scroll or 2-per-row grid, whichever current component already uses — keep as-is, only restyle cards

### `src/components/Expertise.tsx`
- Title "MY EXPERTISE" at display-section scale
- Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3`
- Each card: `bg-[var(--surface)] rounded-lg px-6 py-8`
  - Top: item number `(01)` `(02)` `(03)` in `text-xs text-[var(--muted)]`
  - Middle: item name uppercase bold, `text-lg`
  - Bottom: one-line description in `text-[var(--muted-strong)] text-sm`

### `src/components/Motivation.tsx`
- Two-column layout: "MOTIVATION" label on the left (`text-[var(--muted)] uppercase text-sm tracking-wider`), long paragraph on the right (`text-[var(--muted-strong)] leading-relaxed`)

### `src/components/Experience.tsx`
- Title "EXPERIENCE" at section-label scale, left-aligned
- Each item: three-column row separated by `border-t border-[var(--border)] py-6`
  - Left: company name, uppercase bold
  - Center: role title in caps + tech tag in `text-[var(--muted)]`
  - Right: dates in `text-[var(--muted)] text-sm`

### `src/components/FavoriteTools.tsx` (Stack)
- Title "FAVOURITE STACK" at section-label scale, left-aligned
- Vertical list (not grid). Each row: three columns separated by `border-t border-[var(--border)] py-6`
  - Left: icon in a `bg-[var(--surface)] rounded-lg p-3` square
  - Middle: stack name uppercase bold + category label (SOFTWARE / DATABASE INTEGRATION / AUTOMATIONS / FRONT-END DEVELOPMENT) in small caps `text-[var(--muted)]`
  - Right or below: one-line description in `text-[var(--muted-strong)] text-sm`

### `src/components/Contact.tsx`
- Centered layout
- "LET'S WORK TOGETHER" at display-section scale, uppercase, weight 900, `tracking-[-0.04em]`
- "CONTACT NOW" button below (same style as Header CTA)

### `src/components/Footer.tsx`
- Top meta row: left side "BASED IN BRAZIL, I AM AN INNOVATIVE BUBBLE DEVELOPER…" in `text-xs uppercase tracking-wider text-[var(--muted)]`, right side "INSTAGRAM ↗   LINKEDIN ↗" with hover state
- Below: full-width watermark "CARLOVSK" at the largest display scale, clipped at the bottom (`overflow-hidden` on footer, `translate-y-[25%]` on the text) so only the top portion is visible — mirrors the reference footer

### `src/components/CustomCursor.tsx`
- Keep as-is. No changes.

### `src/components/SmoothScroll.tsx`
- Keep as-is. No changes.

## File-by-file change matrix

| File | Nature of change |
|---|---|
| `src/app/globals.css` | Token refactor (colors, new surface + muted-strong vars, utility classes for display-heading and meta-caps if helpful) |
| `src/app/layout.tsx` | No change (Inter already loaded) |
| `src/app/page.tsx` | No change (structure stays) |
| `src/components/Header.tsx` | Classnames only |
| `src/components/Hero.tsx` | Classnames + three-column meta row structure |
| `src/components/Projects.tsx` | Card bottom row restructured (name / tag / year) |
| `src/components/About.tsx` | Classnames + CTA button style |
| `src/components/Expertise.tsx` | Classnames + card background + number prefix |
| `src/components/Motivation.tsx` | Classnames only |
| `src/components/Experience.tsx` | Three-column row layout |
| `src/components/FavoriteTools.tsx` | Vertical list with icon square + category caps |
| `src/components/Contact.tsx` | Classnames only |
| `src/components/Footer.tsx` | Watermark scale + meta row |
| `src/components/CustomCursor.tsx` | No change |
| `src/components/SmoothScroll.tsx` | No change |

## Testing / validation

This is a visual-only change. Validation approach:
- Run `npm run dev`, open in browser, scroll full page, compare section-by-section against the reference image
- Check reduced-motion query still works (existing CSS in globals.css)
- Check mobile breakpoint (< 768px) still readable and laid out correctly
- Lighthouse performance must not regress (same fonts, same images)

## Risks

- Clamp-based display sizes at very wide viewports (> 1920px) may over-scale. Mitigate with the `max` value in `clamp()`.
- Weight 900 Inter is already being loaded (weights 300-800 in layout.tsx) — need to add `900` to the `weight` array in `next/font`. Small bundle impact.
- Accent color change from indigo to green: verify no component hard-codes the old indigo hex. If found, migrate to the token.

## Out of scope / future

- Reviewing the untracked dynamic project pages (`src/app/p/[slug]`) and its child components (`src/components/project/*`) in the same visual language. That work can inherit the tokens defined here once merged.
