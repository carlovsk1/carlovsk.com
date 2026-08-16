# Product Engineer Positioning — Design Spec

**Date:** 2026-04-27
**Owner:** Carlos (carlovsk)
**Goal:** Reposition the portfolio from "Senior Bubble Developer" to "Product Engineer" — a permanent hybrid identity that signals "I pick code or no-code by the problem, not by habit."

## Strategic Context

- Today's portfolio anchors heavily on Bubble (Hero, About, Projects intro, Favorite Tools order, meta tags).
- Carlos has always been a Senior Bubble Developer and is now also building with Next.js / React / TypeScript.
- He wants to be hired for **both** kinds of work going forward (permanent hybrid), not transition out of one.
- Concrete code-side proof exists but is not yet shipped: the carlovsk.com site itself (Next.js), an in-progress project, and a Bubble plugin creator/editor with AI. The plugin creator and the in-progress project will be added to the site later — they are **out of scope for this redesign**.

## Out of Scope

- "Currently Building" section (deferred until the in-progress projects are ready).
- New project pages or case study layout changes.
- Visual redesign (typography, color, layout). This spec changes copy, structure of the stack list, and meta tags only.
- Adding testimonials or new social proof.
- Changes to role titles in `experience` (those reflect actual past job titles and stay factual).

## Section-by-Section Changes

### 1. Hero (`src/components/Hero.tsx`)

| Field | Current | New |
|---|---|---|
| Chip | `Available` | `Available for new projects` |
| Name (H1) | `Carlovsk` | `Carlovsk` (unchanged) |
| Meta line | `Based in Brazil ● Software Engineer` | `Based in Brazil ● Product Engineer` |

Animations and layout stay as-is.

### 2. About (`src/components/About.tsx`)

Single-sentence edit inside `PARAGRAPHS[0]`. Replace:

> *"That's what pulled me into Bubble — turning concepts into working products in days, not months."*

with:

> *"That's how I became a product engineer — picking the tool that gets the idea live fastest, whether that's Bubble and Supabase for a SaaS in weeks, or Next.js and TypeScript when the problem demands code."*

The rest of the paragraph (origin story, closing line "I don't just write code. I build things people use.") and all component logic stay as-is.

### 3. Projects (`src/components/Projects.tsx`)

Rewrite the intro paragraph that sits next to the "Featured Work" heading.

**Replace:**

> *"My creative spirit comes alive in the digital realm. With a sharp eye for logic and design, I shape seamless user experiences using visual tools and dynamic workflows. In Bubble, I build, connect, and launch, turning raw ideas into fully functional products."*

**With:**

> *"Seven years shipping products in production. The work below spans no-code SaaS, custom integrations, and AI workflows — built in Bubble, Supabase, n8n, and Next.js, picked by what each problem needed. Common thread: every one of them went live with real users."*

The 7 project cards stay exactly as they are.

### 4. Favorite Tools (`src/lib/data.ts` — `stack` array)

Reorganize the list to break the Bubble-first reading and rewrite categories as job-to-be-done.

**New order and shape:**

| # | Name | Category | Notes |
|---|---|---|---|
| 1 | Next.js | Code Product Builds | leads the list |
| 2 | Bubble | No-code Product Builds | symmetric pair with Next.js |
| 3 | TypeScript | Language | replaces the JavaScript entry |
| 4 | Supabase | Database & Auth | category rewritten |
| 5 | n8n | Automation & Integrations | category rewritten |

- **React entry is removed** (implied by Next.js; listing both is noise).
- **JavaScript entry is replaced by TypeScript** (signals senior code work in 2026).
- Logos: existing `bubble.svg`, `supabase.svg`, `n8n.svg`, `nextdotjs.svg` are reused. A new `typescript.svg` logo needs to be added to `public/images/tools/`. The current `javascript.svg` becomes unused and can be deleted.
- Existing `description` strings for **Bubble**, **Supabase**, **n8n**, and **Next.js** stay unchanged.
- New **TypeScript** description (replacing the JavaScript entry): *"Typed superset of JavaScript that catches bugs at compile time and scales codebases as they grow."*

The component (`FavoriteTools.tsx`) is **not** edited. Heading "Favourite Stack" stays as-is.

### 5. Experience (`src/lib/data.ts` — `experience` array)

Roles and periods stay as written. Only one description tightens: **arOS**.

**Replace:**

> *"Software that helps people sell more easily with simple marketing using professional AI agents."*

**With:**

> *"Built the multi-agent core of arOS — a marketing OS now used by 20K+ users — orchestrating AI workflows on Bubble, Supabase, and n8n."*

All other entries (RE Cost Seg, Hamurabi Apps, FixaAí, Self-employed e-commerce, Self-employed video editor) stay unchanged.

### 6. Meta tags (`src/app/layout.tsx`)

Apply to all three blocks (`metadata`, `openGraph`, `twitter`).

| Field | Current | New |
|---|---|---|
| `title` | `CARLOVSK - PORTFOLIO` | `Carlovsk — Product Engineer` |
| `description` | `Senior Bubble Developer Carlos Henrique (aka carlovsk) crafts AI-powered SaaS, Supabase back-ends, Stripe integrations & PropTech solutions. Explore his portfolio.` | `Product engineer building SaaS end-to-end. Seven years shipping with Bubble, Supabase, n8n, and Next.js — picking the right tool by what each problem needs.` |

`metadataBase`, `siteName`, `locale`, and `card` stay as-is.

## Files Touched

- `src/components/Hero.tsx` — chip text, meta line.
- `src/components/About.tsx` — one sentence inside `PARAGRAPHS[0]`.
- `src/components/Projects.tsx` — intro paragraph next to "Featured Work" heading.
- `src/lib/data.ts` — `stack` array (reordered + rewritten + TypeScript replaces JavaScript + React removed); `experience` array (arOS description only).
- `src/app/layout.tsx` — title and description in `metadata`, `openGraph`, `twitter`.
- `public/images/tools/typescript.svg` — new asset to add.
- `public/images/tools/javascript.svg` — delete (unused after the edit).

No new components, routes, or dependencies.

## Acceptance

The repositioning is successful when:

1. A first-time visitor reading only the Hero meta sees "Product Engineer", not "Software Engineer" or "Bubble Developer".
2. The About paragraph names both stacks (Bubble + Next.js) as deliberate tool choices, not as sequential phases.
3. The Projects intro leads with "Seven years shipping in production" and lists tools as means.
4. The Favorite Stack list opens with Next.js, pairs Next.js and Bubble symmetrically, and shows TypeScript instead of JavaScript.
5. The `<title>` rendered in the browser tab and the meta description served to social previews both lead with "Product Engineer".
6. No copy on the homepage describes Carlos as a "Bubble Developer" or "Senior Bubble Developer" (those titles remain only inside Experience entries, where they are factually correct).
