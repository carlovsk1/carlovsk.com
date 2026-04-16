# Dynamic Project Pages — Design Spec

**Date:** 2026-04-16
**Scope:** Add a dynamic case-study page per project at `/p/[slug]`, starting with Mult Resorts. Home project cards link to the new internal page instead of the external live site.

---

## Goals

- Each project in `src/lib/data.ts` has a dedicated narrative case-study page at `/p/[slug]`.
- The page focuses on **story** (why / what / how), not tech stack or feature bullets.
- Consistent chrome with the homepage: same header, footer, smooth scroll, custom cursor.
- Per-project SEO metadata (title, description, Open Graph image).
- Custom 404 page for unknown slugs.
- Navigation between projects: a "Next Project" CTA at the bottom cycles through projects that **have a published page** (wraps from last back to first).
- Projects without a published story keep their current external link on the home card. A project is "published" when it has a `slug` and non-placeholder content.

## Non-Goals

- No CMS, no MDX, no external data source — content lives in `src/lib/data.ts`.
- No "results" / metrics block in this iteration. Narrative only.
- No tech-stack block on the project page. Tags remain only on the home card.
- No screenshot gallery or inline images in the story body.
- Only Mult Resorts gets a published page in this iteration. The other 6 projects stay in the home grid and keep their current external links until their stories are written.

---

## Architecture

### File layout

```
src/
  app/
    p/
      [slug]/
        page.tsx           server component; generateStaticParams + generateMetadata; calls notFound() for invalid slugs
        not-found.tsx      custom 404 (scoped to /p/* routes)
  components/
    project/
      ProjectHero.tsx      hero with title + tagline; fade-in animation
      ProjectMeta.tsx      client · year · live site link
      ProjectStory.tsx     narrative paragraphs; scroll-triggered fade-in
      NextProject.tsx      CTA linking to next project (cyclic)
  lib/
    data.ts                expanded Project type + all 7 entries
    projects.ts            helpers: getProjectBySlug, getNextProject
```

### Server vs. client components

- `app/p/[slug]/page.tsx` is a **server component** (Next.js 16 default). It:
  - exports `generateStaticParams` returning slugs of all published projects (1 route this iteration: `mult-resorts`);
  - exports `generateMetadata({ params })` for per-project SEO;
  - resolves the project via `getProjectBySlug(slug)`, calling `notFound()` if undefined (unpublished slugs or typos both hit 404);
  - renders `SmoothScroll`, `CustomCursor`, `Header`, the 4 `project/*` components, and `Footer` — matching the layering used in `src/app/page.tsx`;
  - passes the resolved `PublishedProject` object as props to the client components.
- The four `project/*` components stay `"use client"` because they use GSAP animations (consistent with existing components like `Hero.tsx`, `Projects.tsx`).

### Next.js 16 specifics

- `params` is a Promise: `const { slug } = await params;` in `page.tsx` and `generateMetadata`.
- Use `notFound()` from `next/navigation` to trigger the custom `not-found.tsx`.
- Use `generateStaticParams` to prerender all known slugs at build time — invalid slugs fall back to 404.

---

## Data

### Type

```ts
// src/lib/data.ts
export type Project = {
  title: string;         // display name, e.g. "Mult Resorts"
  year: string;          // "2023"
  url: string;           // live site URL (used for the meta block AND as external link on home card when slug is absent)
  image: string;         // home card image + OG image fallback
  tags: string[];        // shown on home card only
  badge?: string;        // optional, e.g. "+20,000 users"

  // Populated only for published case studies.
  // When these fields are present, the home card becomes an internal link to /p/{slug}
  // and the project participates in the "Next Project" cycle.
  slug?: string;         // URL segment, e.g. "mult-resorts"
  tagline?: string;      // one-line essence for the hero
  client?: string;       // usually same as title; kept separate to allow divergence
  story?: string[];      // narrative paragraphs
};

export type PublishedProject = Project & Required<Pick<Project, "slug" | "tagline" | "client" | "story">>;
```

A project is **published** when all four optional fields are present. A type guard in `src/lib/projects.ts` narrows `Project` to `PublishedProject` for the page code.

### Helpers

```ts
// src/lib/projects.ts
import { projects, type Project, type PublishedProject } from "./data";

export function isPublished(project: Project): project is PublishedProject {
  return Boolean(project.slug && project.tagline && project.client && project.story?.length);
}

export function getPublishedProjects(): PublishedProject[] {
  return projects.filter(isPublished);
}

export function getProjectBySlug(slug: string): PublishedProject | undefined {
  return getPublishedProjects().find((p) => p.slug === slug);
}

export function getNextProject(slug: string): PublishedProject {
  const list = getPublishedProjects();
  const index = list.findIndex((p) => p.slug === slug);
  // Caller guarantees slug is a published project (page already called notFound otherwise).
  return list[(index + 1) % list.length];
}
```

**Edge case:** if only Mult Resorts is published (this iteration), `getNextProject("mult-resorts")` returns Mult Resorts itself. The `NextProject` component must detect this and **hide itself** when `next.slug === current.slug` — showing the next-project CTA that cycles back to the same page would be confusing.

### Content plan for Mult Resorts

```ts
{
  slug: "mult-resorts",
  title: "Mult Resorts",
  tagline: "Secure timeshare marketplace",
  client: "Mult Resorts",
  year: "2023",
  url: "https://multresorts.com.br",
  image: "/images/projects/mult-resorts.webp",
  tags: ["Bubble"],
  story: [
    "Mult Resorts solves rampant fraud and low owner yields in informal timeshare resale markets. The platform formalizes what used to happen in WhatsApp groups and unsafe classifieds — turning it into a verified, end-to-end marketplace.",
    "Owners upload ID and property deed in a single workflow, with real-time verification status and calendar management built in. A two-step verification covers both the owner and the property before anything goes live.",
    "On the guest side, the booking flow mirrors Airbnb: search by resort, dates, and amenities, then pay in full or split via credit card or Pix at checkout. Funds are captured into an Asaas (Stripe) escrow and released to the owner only after guest check-in is confirmed — which is what kills the fraud problem."
  ],
}
```

### Content plan for the other 6 projects

The other 6 projects stay exactly as they are in `data.ts` today — no `slug`, `tagline`, `client`, or `story` fields added. They continue to render as external links on the home grid. When you're ready to write the story for any of them, you fill in those four fields and the card automatically becomes an internal link to `/p/{slug}`.

Reserved slug mapping for future use:

| Title         | Future Slug     |
| ------------- | --------------- |
| arOS          | aros            |
| Hello Maia    | hello-maia      |
| Fynance       | fynance         |
| Eu Na Europa  | eu-na-europa    |
| FixaAí        | fixaai          |
| Vetzco        | vetzco          |

---

## Page layout

Same design language as the home: dark theme, Inter font, large typography, generous whitespace. Standard horizontal padding `px-6 md:px-12 lg:px-20`.

```
Header (fixed top, reused from home)

HERO                                            ~90vh
  small label: "Case"
  H1 (big): {title}
  tagline paragraph: {tagline}

META                                            horizontal row, muted
  Client / {client}    Year / {year}    Live / {url} ↗

STORY                                           max-w-3xl centered
  paragraph 1
  paragraph 2
  paragraph 3

NEXT PROJECT                                    large clickable block
  small label: "Next project"                   (hidden entirely when only one project is published)
  H2 (big): {nextProject.title}
  subtle arrow → /p/{nextProject.slug}

Footer (reused from home)
```

### Animations

- Hero: GSAP `fromTo` fade-in on mount, matching the `Hero.tsx` pattern (respecting `useReducedMotion`).
- Story: each paragraph fades up on scroll via `ScrollTrigger`, matching `Projects.tsx` pattern.
- NextProject: same scroll-trigger fade-in; hover lifts the whole block slightly (scale ~1.02, same as current project cards).

### Interactions

- Clicking anywhere on the "Next Project" block navigates to `/p/{next.slug}` via `next/link`.
- Live site link in the meta block opens in a new tab (`target="_blank" rel="noopener noreferrer"`).

---

## SEO metadata

`generateMetadata` in `app/p/[slug]/page.tsx`:

```ts
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const title = `${project.title} — Carlovsk`;
  const description = project.tagline;
  const ogImage = project.image;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: ogImage }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
```

Metadata for the 404 page: generic "Project not found — Carlovsk".

---

## 404 page (`app/p/[slug]/not-found.tsx`)

Visual design — matches site language; server component:

- Reuses `Header` + `Footer`.
- Centered block with:
  - small label: "404"
  - H1: "Project not found"
  - subtle paragraph: "The case study you're looking for doesn't exist. It may have been renamed or moved."
  - link button: "Back to work →" pointing to `/#work` (anchor to home Projects section).

No GSAP animations here — keep it static for simplicity.

---

## Changes to existing files

### `src/components/Projects.tsx`

- For each project, decide the link target based on publication state:
  - **Published (has `slug`, `tagline`, `client`, `story`)** → render `<Link href={\`/p/${project.slug}\`}>` from `next/link`; no `target`/`rel`.
  - **Not published** → keep the current external `<a href={project.url} target="_blank" rel="noopener noreferrer">`.
- Use `isPublished(project)` helper from `src/lib/projects.ts` to branch.
- Card visual and hover behavior unchanged.

### `src/components/Header.tsx`

- Change the logo anchor from `href="#"` to `href="/"` so it behaves correctly from any route. On the home page it still scrolls to top (same effect, since the page top is `/`).

### `src/components/Footer.tsx`

- No change. `Go Back to Top` with `href="#nav"` still works because `Header` renders with `id="nav"` on every route.

### `src/app/page.tsx`

- No change to JSX. The home keeps its single-page structure.

### `src/lib/data.ts`

- Extend `Project` type as defined above (optional `slug`, `tagline`, `client`, `story`; add `PublishedProject` type).
- Add the four new fields **only to Mult Resorts** with the drafted content.
- Other 6 entries are left as-is.

---

## Isolation / boundaries

Each new unit has one responsibility:

- `ProjectHero`: renders the title + tagline. Depends on `Project` props only.
- `ProjectMeta`: renders the horizontal meta row. Depends on `client`, `year`, `url`.
- `ProjectStory`: renders paragraphs with scroll animations. Depends on `story: string[]`.
- `NextProject`: renders the next-project CTA. Depends on the next `Project` object.
- `getProjectBySlug` / `getNextProject`: pure functions over the `projects` array.

`page.tsx` is the only place that wires them together. You can change any internal component without touching others.

---

## Testing / verification

This is a statically rendered portfolio — no unit test infrastructure exists. Verification is manual:

1. `npm run dev` — open `/p/mult-resorts`, confirm hero / meta / story render.
2. Confirm the "Next Project" block is **hidden** (Mult Resorts is the only published project, so cycling returns itself).
3. Visit `/p/aros` (unpublished) — custom 404 renders.
4. Visit `/p/does-not-exist` — custom 404 renders.
5. On `/` home, click the Mult Resorts card → navigates to `/p/mult-resorts` (no new tab).
6. On `/` home, click any other card → still opens the live site in a new tab.
7. Header logo from `/p/mult-resorts` → navigates to `/`.
8. View page source (or share in Slack/iMessage) — confirm Mult Resorts has its own `<title>`, `<meta name="description">`, and OG image.
9. `npm run build` — confirm `/p/mult-resorts` prerenders (`generateStaticParams` working).
10. `npm run lint` — no new warnings.
11. Visually compare hero typography and spacing to the home page — same feel.

---

## Out of scope (for this spec)

- Writing real story content for the 6 non-Mult-Resorts projects.
- Results/metrics block (may return in a future iteration).
- Screenshot gallery inside the story.
- Blog-style inline components (callouts, quotes, embedded media).
- RSS / sitemap updates (Next.js handles sitemap generation separately if needed later).
