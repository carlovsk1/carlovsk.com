# Visual Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align carlovsk.com to the reference Framer design through token refactor and per-component visual adjustments, keeping structure and dependencies intact.

**Architecture:** Token-first refactor. Colors, typography scale, and spacing move into CSS variables in `globals.css`. Each component is then re-styled by swapping className values — no new components, no new dependencies, no font swap. Inter stays as the single family (weight 900 is added for display).

**Tech Stack:** Next.js 16 (App Router), Tailwind CSS v4 (`@theme inline`), Inter via `next/font/google`, GSAP + ScrollTrigger (existing animations preserved).

**Spec:** [docs/superpowers/specs/2026-04-16-visual-refinement-design.md](../specs/2026-04-16-visual-refinement-design.md)

**Validation note:** This plan has no automated tests — the work is purely visual. Each task has a manual validation step: open `http://localhost:3000` (or the relevant route), visually compare against the reference, confirm the specific changes described. Keep `npm run dev` running in a separate terminal throughout execution.

---

## Task 1: Update design tokens in globals.css

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Replace the `@theme inline` block with the new token set**

Open `src/app/globals.css` and replace the existing `@theme inline` block (currently lines 3-10) with:

```css
@theme inline {
  --color-background: #0a0a0a;
  --color-foreground: #ebe6df;
  --color-muted: #6b6b6b;
  --color-muted-strong: #a8a39c;
  --color-accent: #9ae66e;
  --color-border: #1f1f1f;
  --color-surface: #111111;
  --font-sans: var(--font-inter);
}
```

- [ ] **Step 2: Update the `::selection` block to use foreground instead of white**

Find (currently lines 24-27):

```css
::selection {
  background: var(--color-accent);
  color: white;
}
```

Replace with:

```css
::selection {
  background: var(--color-accent);
  color: var(--color-background);
}
```

- [ ] **Step 3: Start the dev server and verify tokens apply**

Run (in a separate terminal, leave running):

```bash
npm run dev
```

Open `http://localhost:3000` in a browser. Expected: background visibly darker than before (near-black), off-white text slightly warmer, any existing indigo accent (on hover, selections) now replaced with a light green. No broken layout.

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css
git commit -m "style(tokens): refactor color palette to match reference design"
```

---

## Task 2: Add weight 900 to Inter font loader

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Add `"900"` to the weight array**

Open `src/app/layout.tsx`, find (currently lines 5-9):

```tsx
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});
```

Replace with:

```tsx
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});
```

- [ ] **Step 2: Reload the page and verify Inter 900 is loaded**

Reload `http://localhost:3000`. Open DevTools → Network → filter for "font". Expected: one of the loaded Inter subsets includes weight 900 (look for `-900-` in the filename or check the computed font-weight on a test element with `font-weight: 900`).

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "style(fonts): add Inter weight 900 for display headings"
```

---

## Task 3: Refactor Header

**Files:**
- Modify: `src/components/Header.tsx`

Goal: Left shows "CARLOVSK 012704" as a logo. Right shows only "CONTACT NOW" button. Time widget and AVAILABLE chip are removed (AVAILABLE moves into the Hero in Task 4).

- [ ] **Step 1: Replace the full Header component**

Open `src/components/Header.tsx` and replace the **entire file** with:

```tsx
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      if (headerRef.current) gsap.set(headerRef.current, { opacity: 1 });
      return;
    }

    gsap.fromTo(
      headerRef.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: "power3.out" }
    );
  }, [prefersReducedMotion]);

  return (
    <header
      id="nav"
      ref={headerRef}
      className="fixed top-0 left-0 z-50 flex w-full items-center justify-between px-6 py-5 md:px-10"
      style={{ opacity: 0 }}
    >
      <Link
        href="/"
        className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-strong"
      >
        Carlovsk/012704
      </Link>

      <a
        href="mailto:carlovsk.edits@gmail.com"
        className="rounded-full border border-border px-5 py-2 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 hover:bg-foreground hover:text-background"
      >
        Contact Now
      </a>
    </header>
  );
}
```

- [ ] **Step 2: Verify in browser**

Reload `http://localhost:3000`. Expected: top bar shows only "CARLOVSK/012704" on the left (small caps) and a "CONTACT NOW" pill-button on the right. No time display, no AVAILABLE chip in the header. Hover on CONTACT NOW inverts colors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Header.tsx
git commit -m "style(header): simplify to logo and CTA only"
```

---

## Task 4: Refactor Hero

**Files:**
- Modify: `src/components/Hero.tsx`

Goal: AVAILABLE chip at top (centered, with accent dot). "CARLOVSK" display title centered, uppercase, weight 900, tight tracking. Three-column meta row below with `BASED IN BR, PORTO SEGURO BA` / (empty) / `BUBBLE DEVELOPER`, separated by top borders.

- [ ] **Step 1: Replace the full Hero component**

Open `src/components/Hero.tsx` and replace the **entire file** with:

```tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const chipRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      [chipRef, nameRef, metaRef].forEach((ref) => {
        if (ref.current) gsap.set(ref.current, { opacity: 1 });
      });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.8 });

      tl.fromTo(
        chipRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }
      )
        .fromTo(
          nameRef.current,
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2 },
          "-=0.3"
        )
        .fromTo(
          metaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.4"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col justify-center px-6 pt-32 pb-10 md:px-10"
    >
      <div className="flex flex-col items-center justify-center flex-1">
        <div
          ref={chipRef}
          className="mb-8 flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-muted-strong opacity-0"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Available
        </div>

        <h1
          ref={nameRef}
          className="text-center font-black uppercase leading-[0.85] tracking-[-0.04em] opacity-0"
          style={{ fontSize: "clamp(5rem, 14vw, 12rem)" }}
        >
          Carlovsk
        </h1>
      </div>

      <div
        ref={metaRef}
        className="mt-12 grid grid-cols-3 border-t border-border pt-5 text-[11px] uppercase tracking-[0.2em] text-muted opacity-0"
      >
        <p className="text-left">Based in BR, Porto Seguro BA</p>
        <p className="text-center" aria-hidden>
          ●
        </p>
        <p className="text-right">Bubble Developer</p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify in browser**

Reload `http://localhost:3000`. Expected: Hero shows a centered "✦ AVAILABLE" chip with a green dot, then "CARLOVSK" in massive black-weight uppercase with tight tracking, then at the bottom a three-column row with meta info separated by a thin top border. All elements fade/slide in on load. No lowercase "carlovsk" anywhere.

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "style(hero): add availability chip, uppercase display, three-col meta"
```

---

## Task 5: Refactor Projects

**Files:**
- Modify: `src/components/Projects.tsx`

Goal: Section header becomes a two-column layout — "FEATURED WORK" as display-scale title on the left, descriptive paragraph on the right. Project cards lose their dark gradient overlay; project name, tech tags and year sit **below** the image, not on top of it. Year is right-aligned.

- [ ] **Step 1: Replace the full Projects component**

Open `src/components/Projects.tsx` and replace the **entire file** with:

```tsx
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects, type Project } from "@/lib/data";
import { isPublished } from "@/lib/projects";
import { useReducedMotion } from "@/lib/use-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".project-card").forEach((card) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="px-6 md:px-10 py-24 md:py-40"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-16 md:mb-24 items-end">
        <h2
          className="font-black uppercase leading-[0.85] tracking-[-0.04em]"
          style={{ fontSize: "clamp(4rem, 10vw, 9rem)" }}
        >
          Featured
          <br />
          Work
        </h2>

        <p className="text-base md:text-lg leading-relaxed text-muted-strong">
          My creative spirit comes alive in the digital realm. With a sharp eye
          for logic and design, I shape seamless user experiences using visual
          tools and dynamic workflows. In Bubble, I build, connect, and launch,
          turning raw ideas into fully functional products.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const cardClasses = "project-card group block";

  const inner = (
    <>
      <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-surface">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      <div className="mt-4 flex items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm md:text-base font-semibold uppercase tracking-wider">
            {project.title}
            {project.badge && (
              <span className="ml-2 text-xs font-normal normal-case text-muted">
                [{project.badge}]
              </span>
            )}
          </h3>
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted">
            {project.tags.join(" + ")}
          </p>
        </div>
        <span className="text-[11px] uppercase tracking-[0.2em] text-muted shrink-0">
          {project.year}
        </span>
      </div>
    </>
  );

  if (isPublished(project)) {
    return (
      <Link href={`/p/${project.slug}`} className={cardClasses}>
        {inner}
      </Link>
    );
  }

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cardClasses}
    >
      {inner}
    </a>
  );
}
```

- [ ] **Step 2: Verify in browser**

Reload `http://localhost:3000`. Expected: Below Hero, a two-column row with a massive "FEATURED WORK" title on the left and a paragraph on the right. Below that, a 2-column grid of project cards. Each card: image on top (rounded, no overlay), then a row below with project name + tech list on the left and the year on the right. Hovering on a card subtly scales only the inner image.

- [ ] **Step 3: Commit**

```bash
git add src/components/Projects.tsx
git commit -m "style(projects): split title+paragraph two-col, move meta below card"
```

---

## Task 6: Refactor About

**Files:**
- Modify: `src/components/About.tsx`

Goal: Display-scale "MORE ABOUT CARLOVSK" centered headline. Paragraph centered with constrained width. Download Resume CTA styled like the Header's button.

- [ ] **Step 1: Replace the full About component**

Open `src/components/About.tsx` and replace the **entire file** with:

```tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/use-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 80%" },
      });

      gsap.from(textRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: textRef.current, start: "top 80%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="px-6 md:px-10 py-24 md:py-40 text-center"
    >
      <div ref={headingRef}>
        <h2
          className="font-black uppercase leading-[0.85] tracking-[-0.04em]"
          style={{ fontSize: "clamp(4rem, 10vw, 9rem)" }}
        >
          More about
          <br />
          Carlovsk<span className="text-muted">&copy;</span>
        </h2>
      </div>

      <div ref={textRef} className="mt-16 flex flex-col items-center">
        <p className="max-w-[55ch] text-base md:text-lg leading-relaxed text-muted-strong">
          Carlos Henrique, professionally known as carlovsk, is a passionate
          Bubble Developer with a strong background in building dynamic,
          user-friendly web applications. Driven by innovation and efficiency,
          carlovsk excels in turning complex ideas into simple, functional
          digital solutions. He started his career at age 12 as a video editor,
          ventured into digital marketing selling info-products, and
          successfully managed three dropshipping e-commerce stores. A natural
          entrepreneur, he constantly seeks to create valuable solutions for
          others, leading him to discover and specialize in the NoCode platform
          Bubble.
        </p>

        <a
          href="https://drive.google.com/file/d/1K9hDVy3nky5zg8f_GgjPVR1ZQOQgku55/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-block rounded-full border border-border px-6 py-3 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 hover:bg-foreground hover:text-background"
        >
          Download Resume
        </a>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify in browser**

Reload `http://localhost:3000` and scroll to the About section. Expected: "MORE ABOUT / CARLOVSK©" as a massive two-line centered display headline, then a centered paragraph with comfortable line-length (around 55 characters), then a Download Resume pill CTA.

- [ ] **Step 3: Commit**

```bash
git add src/components/About.tsx
git commit -m "style(about): display headline + centered paragraph + pill CTA"
```

---

## Task 7: Refactor Expertise

**Files:**
- Modify: `src/components/Expertise.tsx`

Goal: "MY EXPERTISE" as a section-label display title. Grid of cards with `bg-surface`, item number at top, title uppercase bold below, short description under it.

- [ ] **Step 1: Replace the full Expertise component**

Open `src/components/Expertise.tsx` and replace the **entire file** with:

```tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { expertise } from "@/lib/data";
import { useReducedMotion } from "@/lib/use-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

export default function Expertise() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".expertise-item").forEach((item, i) => {
        gsap.from(item, {
          y: 40,
          opacity: 0,
          duration: 0.6,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 85%" },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} className="px-6 md:px-10 py-24 md:py-40">
      <h2
        className="mb-12 md:mb-16 font-black uppercase leading-[0.85] tracking-[-0.04em]"
        style={{ fontSize: "clamp(4rem, 10vw, 9rem)" }}
      >
        My
        <br />
        Expertise
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {expertise.map((item) => (
          <div
            key={item.number}
            className="expertise-item rounded-lg bg-surface px-6 py-8"
          >
            <span className="text-[11px] uppercase tracking-[0.2em] text-muted">
              ({item.number})
            </span>
            <h3 className="mt-6 text-lg font-semibold uppercase tracking-wider">
              {item.title}
            </h3>
            <p className="mt-2 text-sm text-muted-strong leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify in browser**

Reload `http://localhost:3000` and scroll to the Expertise section. Expected: "MY / EXPERTISE" as a two-line display title, then 3-column grid (on desktop) of dark cards. Each card: small `(01)` label at top, uppercase title middle, muted description at bottom. No borders on cards — just the surface background.

- [ ] **Step 3: Commit**

```bash
git add src/components/Expertise.tsx
git commit -m "style(expertise): display title + surface cards with numbered prefix"
```

---

## Task 8: Refactor Motivation

**Files:**
- Modify: `src/components/Motivation.tsx`

Goal: Two-column layout — "MOTIVATION" uppercase label on the left, long paragraph on the right.

- [ ] **Step 1: Replace the full Motivation component**

Open `src/components/Motivation.tsx` and replace the **entire file** with:

```tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/use-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

export default function Motivation() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: textRef.current, start: "top 80%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} className="px-6 md:px-10 py-24 md:py-32">
      <div
        ref={textRef}
        className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start"
      >
        <h2 className="text-2xl md:text-4xl font-black uppercase tracking-[-0.02em]">
          Motivation
        </h2>

        <p className="text-base md:text-lg leading-relaxed text-muted-strong">
          carlovsk is motivated by the endless possibilities of technology and
          its power to simplify lives. He thrives on solving challenging
          problems and is continually inspired by seeing the positive impact
          his solutions have on users and businesses alike. Committed to
          lifelong learning and professional growth, he embraces every new
          challenge as an opportunity to innovate and excel.
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify in browser**

Reload `http://localhost:3000` and scroll to the Motivation section. Expected: Two columns. Left: "MOTIVATION" uppercase bold. Right: paragraph with relaxed leading in muted-strong color.

- [ ] **Step 3: Commit**

```bash
git add src/components/Motivation.tsx
git commit -m "style(motivation): switch to two-column label+paragraph layout"
```

---

## Task 9: Refactor Experience

**Files:**
- Modify: `src/components/Experience.tsx`

Goal: Rows separated by thin borders. Each row: company name on the left, role title in the middle, dates right-aligned. Description below spanning the row. Section title "EXPERIENCE" as a section-label display.

- [ ] **Step 1: Replace the full Experience component**

Open `src/components/Experience.tsx` and replace the **entire file** with:

```tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experience } from "@/lib/data";
import { useReducedMotion } from "@/lib/use-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".exp-item").forEach((item, i) => {
        gsap.from(item, {
          y: 40,
          opacity: 0,
          duration: 0.6,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 85%" },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} className="px-6 md:px-10 py-24 md:py-40">
      <h2
        className="mb-12 md:mb-16 font-black uppercase tracking-[-0.02em]"
        style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
      >
        Experience
      </h2>

      <div className="border-t border-border">
        {experience.map((exp) => (
          <div
            key={`${exp.company}-${exp.period}`}
            className="exp-item border-b border-border py-6 md:py-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 md:items-baseline">
              <h3 className="md:col-span-4 text-base md:text-lg font-semibold uppercase tracking-wider">
                {exp.company}
              </h3>
              <p className="md:col-span-5 text-[11px] uppercase tracking-[0.2em] text-muted-strong">
                {exp.role}
              </p>
              <p className="md:col-span-3 text-[11px] uppercase tracking-[0.2em] text-muted md:text-right">
                {exp.period}
              </p>
            </div>
            <p className="mt-3 md:mt-4 md:ml-[33%] text-sm text-muted-strong max-w-2xl leading-relaxed">
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify in browser**

Reload `http://localhost:3000` and scroll to the Experience section. Expected: "EXPERIENCE" section title (smaller than the other display titles, matching reference). Each entry is a row with 3 columns: bold company name on the left, role in muted caps in the middle, dates in muted caps right-aligned. Thin borders between rows. The description sits below the row, offset to align under the role column.

- [ ] **Step 3: Commit**

```bash
git add src/components/Experience.tsx
git commit -m "style(experience): three-column row layout with hairline dividers"
```

---

## Task 10: Refactor FavoriteTools (Stack)

**Files:**
- Modify: `src/components/FavoriteTools.tsx`

Goal: Vertical list (not a grid). Each row: icon placeholder in a `bg-surface` square on the left, stack name + category label in the middle, description below. Section title "FAVOURITE / STACK" as section-label display.

- [ ] **Step 1: Replace the full FavoriteTools component**

Open `src/components/FavoriteTools.tsx` and replace the **entire file** with:

```tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { stack } from "@/lib/data";
import { useReducedMotion } from "@/lib/use-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

export default function FavouriteStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".stack-item").forEach((item, i) => {
        gsap.from(item, {
          y: 40,
          opacity: 0,
          duration: 0.6,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 85%" },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} className="px-6 md:px-10 py-24 md:py-40">
      <h2
        className="mb-12 md:mb-16 font-black uppercase tracking-[-0.02em]"
        style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
      >
        Favourite
        <br />
        Stack
      </h2>

      <div className="flex flex-col gap-3">
        {stack.map((item) => (
          <div
            key={item.name}
            className="stack-item rounded-lg bg-surface p-5 md:p-6 grid grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_2fr] gap-4 md:gap-6 items-center"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-background text-muted-strong text-xs font-semibold uppercase">
              {item.name.slice(0, 1)}
            </div>
            <div className="flex flex-col">
              <h3 className="text-base md:text-lg font-semibold uppercase tracking-wider">
                {item.name}
              </h3>
              <p className="text-[11px] uppercase tracking-[0.2em] text-muted">
                {item.category}
              </p>
            </div>
            <p className="col-span-2 md:col-span-1 text-sm text-muted-strong leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

Note: the icon square uses the stack name's first letter as a placeholder. If the user later wants real icons, they can be swapped in without restructuring.

- [ ] **Step 2: Verify in browser**

Reload `http://localhost:3000` and scroll to the Favourite Stack section. Expected: "FAVOURITE / STACK" display title, then a vertical stack of 4 rows. Each row has a dark square with the first letter of the tool on the left, the tool name + category in the middle, and the description on the right (or below, on mobile).

- [ ] **Step 3: Commit**

```bash
git add src/components/FavoriteTools.tsx
git commit -m "style(stack): vertical list rows with icon squares and category captions"
```

---

## Task 11: Refactor Contact

**Files:**
- Modify: `src/components/Contact.tsx`

Goal: Single-line display headline "LET'S WORK TOGETHER" (no split into "LET'S WORK" + "TOGETHER"), centered. CTA styled like the Header's button.

- [ ] **Step 1: Replace the full Contact component**

Open `src/components/Contact.tsx` and replace the **entire file** with:

```tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/use-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      if (headingRef.current) gsap.set(headingRef.current, { opacity: 1 });
      if (contentRef.current) gsap.set(contentRef.current, { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 80%" },
      });

      gsap.from(contentRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: { trigger: contentRef.current, start: "top 85%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="px-6 md:px-10 py-24 md:py-40 text-center"
    >
      <div ref={headingRef} className="opacity-0">
        <h2
          className="font-black uppercase leading-[0.85] tracking-[-0.04em]"
          style={{ fontSize: "clamp(4rem, 10vw, 9rem)" }}
        >
          Let&apos;s work
          <br />
          Together
        </h2>
      </div>

      <div ref={contentRef} className="mt-12 opacity-0">
        <a
          href="mailto:carlovsk.edits@gmail.com"
          className="inline-block rounded-full border border-border px-6 py-3 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 hover:bg-foreground hover:text-background"
        >
          Contact Now
        </a>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify in browser**

Reload `http://localhost:3000` and scroll to the Contact section. Expected: "LET'S WORK / TOGETHER" as a two-line display headline, weight 900, tight tracking, centered. Below, a single "CONTACT NOW" pill button. The previous intro paragraph is gone (moved to the Footer meta row in Task 12).

- [ ] **Step 3: Commit**

```bash
git add src/components/Contact.tsx
git commit -m "style(contact): display headline + minimal CTA, remove intro paragraph"
```

---

## Task 12: Refactor Footer

**Files:**
- Modify: `src/components/Footer.tsx`

Goal: Top row with meta text on the left ("BASED IN BRAZIL..."), Instagram/LinkedIn links on the right. Below: a massive "CARLOVSK" watermark clipped at the bottom so only the top ~70% shows (via `overflow-hidden` + negative bottom margin).

- [ ] **Step 1: Replace the full Footer component**

Open `src/components/Footer.tsx` and replace the **entire file** with:

```tsx
export default function Footer() {
  return (
    <footer className="px-6 md:px-10 pt-16 md:pt-20 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-10 border-b border-border">
        <p className="text-[11px] uppercase tracking-[0.2em] text-muted-strong leading-relaxed max-w-md">
          Based in Brazil, I am an innovative Bubble Developer and entrepreneur.
          My passion for intuitive user experiences, elegant solutions, and
          simplifying complex processes is evident in my work.
        </p>

        <div className="flex items-start gap-6 md:justify-end">
          <a
            href="https://www.instagram.com/1carlovsk/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] uppercase tracking-[0.2em] text-muted hover:text-foreground transition-colors"
          >
            Instagram ↗
          </a>
          <a
            href="https://www.linkedin.com/in/carlovsk/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] uppercase tracking-[0.2em] text-muted hover:text-foreground transition-colors"
          >
            LinkedIn ↗
          </a>
        </div>
      </div>

      <div className="pt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <p className="text-[11px] uppercase tracking-[0.2em] text-muted">
          &copy;{new Date().getFullYear()} Carlovsk Studios
        </p>
        <a
          href="#nav"
          className="text-[11px] uppercase tracking-[0.2em] text-muted hover:text-foreground transition-colors"
        >
          Go Back to Top
        </a>
      </div>

      <p
        aria-hidden
        className="mt-12 text-center font-black uppercase leading-[0.85] tracking-[-0.04em] text-foreground/90 select-none translate-y-[25%]"
        style={{ fontSize: "clamp(5rem, 22vw, 22rem)" }}
      >
        Carlovsk
      </p>
    </footer>
  );
}
```

- [ ] **Step 2: Verify in browser**

Reload `http://localhost:3000` and scroll to the very bottom. Expected: Two-column meta row (blurb left, Instagram↗ LinkedIn↗ right) with a divider below. Below that, copyright left + "Go Back to Top" right. Below that, a massive "CARLOVSK" watermark cut off at the bottom — only the top portion visible, giving the clipped-typography effect from the reference.

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "style(footer): two-col meta row, clipped watermark typography"
```

---

## Task 13: Final verification pass

**Files:** none (manual check)

- [ ] **Step 1: Full-page visual review**

With `npm run dev` still running, reload `http://localhost:3000` and scroll from top to bottom. Compare each section against the reference image side-by-side. Confirm:

- Background is near-black, foreground is warm off-white
- Typography in hero / section titles is heavy (weight 900), tight-tracked, uppercase
- AVAILABLE chip has a green dot
- Projects grid cards have year top-right of their meta row, image above is clean (no overlay gradient)
- Expertise cards use the dark surface background, no borders
- Experience rows have hairline top/bottom borders
- Footer watermark is clipped at the bottom

- [ ] **Step 2: Mobile breakpoint check**

In the browser DevTools, toggle to a mobile viewport (≤ 375px). Scroll through the page. Expected: every section remains readable, no horizontal overflow, display titles scale down via `clamp()`. Three-column meta rows either stay or collapse gracefully.

- [ ] **Step 3: Reduced-motion check**

In the browser DevTools → Rendering tab, enable "Emulate CSS media feature prefers-reduced-motion: reduce". Reload the page. Expected: no entry animations play; content appears immediately with full opacity.

- [ ] **Step 4: Production build smoke test**

Run:

```bash
npm run build
```

Expected: build completes with no errors, no type errors, no missing modules.

- [ ] **Step 5: Commit anything pending (should be nothing)**

Run:

```bash
git status
```

Expected: working tree clean. If any files were modified (formatting, etc.), review and commit them with a descriptive message.

---

## Out of scope (explicit)

- Glued Posters "TURN YOUR IDEAS INTO REALITY" break section — skipped per user decision
- Client logos row between About and Expertise — skipped (would require sourcing and adding logo assets)
- Dynamic project pages (`/p/[slug]`) and their child components (`src/components/project/*`) — already in flight on this branch, will inherit the new tokens automatically
- Swapping the font family — staying on Inter
- Removing the custom cursor — kept
