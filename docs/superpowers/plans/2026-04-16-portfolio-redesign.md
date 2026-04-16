# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the carlovsk.com portfolio to match the reference design screenshot — featuring a bold hero with "DEATH REBORN LUNATIC" headline, visual project cards with screenshots, a motivation section with image collage, a favorite tools section, and a redesigned footer with large logo.

**Architecture:** Single-page Next.js App Router site with GSAP scroll animations and Lenis smooth scroll. Each section is a standalone React component in `src/components/`. Images go in `public/images/`. Data stays in `src/lib/data.ts` with new fields added (project images, tools list). No backend changes needed.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, GSAP + ScrollTrigger, Lenis, next/image

---

## File Structure

```
src/
├── app/
│   ├── page.tsx              — (modify) Update section order and add new sections
│   ├── layout.tsx            — (no change)
│   └── globals.css           — (modify) Add new animations/styles
├── components/
│   ├── Header.tsx            — (modify) Minor tweaks to match new design
│   ├── Hero.tsx              — (rewrite) New "DEATH REBORN LUNATIC" hero with laptop image
│   ├── Projects.tsx          — (rewrite) Visual grid cards with project screenshots
│   ├── About.tsx             — (create) Replaces Intro.tsx — "MORE ABOUT CARLOVSK" section
│   ├── Experience.tsx        — (create) Replaces Journey.tsx — "MY EXPERIENCE" section
│   ├── Motivation.tsx        — (create) New section with image collage + "TURN YOUR IDEAS INTO REALITY"
│   ├── FavoriteTools.tsx     — (create) New section showing tool icons/logos
│   ├── Contact.tsx           — (modify) "LET'S WORK TOGETHER" CTA redesign
│   ├── Footer.tsx            — (create) New footer with large "CARLOVSK" logo
│   ├── CustomCursor.tsx      — (no change)
│   └── SmoothScroll.tsx      — (no change)
├── lib/
│   └── data.ts               — (modify) Add project images, tools data
public/
└── images/
    ├── projects/             — Project screenshot placeholders
    │   ├── aros.webp
    │   ├── hello-maia.webp
    │   ├── fynance.webp
    │   ├── eu-na-europa.webp
    │   ├── fixaai.webp
    │   ├── vetzco.webp
    │   └── mult-resorts.webp
    ├── hero-laptop.webp      — Hero section laptop/screen image
    ├── motivation/           — Motivation section collage images
    │   ├── collage-1.webp
    │   ├── collage-2.webp
    │   ├── collage-3.webp
    │   └── collage-4.webp
    └── tools/                — Tool/technology logos (SVGs preferred)
        ├── react.svg
        ├── nextjs.svg
        ├── typescript.svg
        ├── tailwind.svg
        ├── figma.svg
        ├── supabase.svg
        ├── bubble.svg
        ├── n8n.svg
        └── openai.svg
```

**Files to delete after migration:**
- `src/components/Intro.tsx` (replaced by About.tsx)
- `src/components/Journey.tsx` (replaced by Experience.tsx)

---

## Task 0: Prepare Image Placeholders

**Files:**
- Create: `public/images/projects/.gitkeep`
- Create: `public/images/motivation/.gitkeep`
- Create: `public/images/tools/.gitkeep`

This task creates placeholder images so the site can render while real screenshots are added later. We'll use solid color placeholder images via CSS gradients initially, then the user can drop in real `.webp` files.

- [ ] **Step 0.1: Create directory structure**

```bash
mkdir -p public/images/projects public/images/motivation public/images/tools
```

- [ ] **Step 0.2: Create placeholder SVG for projects**

Create `public/images/placeholder-project.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <rect width="800" height="600" fill="#2a2a2a"/>
  <text x="400" y="300" text-anchor="middle" fill="#666" font-family="system-ui" font-size="24">Project Screenshot</text>
</svg>
```

- [ ] **Step 0.3: Commit**

```bash
git add public/images/
git commit -m "chore: add image directory structure and placeholders"
```

---

## Task 1: Update Data Layer

**Files:**
- Modify: `src/lib/data.ts`

- [ ] **Step 1.1: Add image field to projects and create tools data**

Replace the entire content of `src/lib/data.ts` with:

```typescript
export const projects = [
  {
    title: "arOS",
    description: "AI-powered sales platform with professional AI agents",
    tags: ["Bubble", "Supabase", "n8n"],
    year: "2025",
    users: "20,000+",
    url: "https://aros.app",
    image: "/images/projects/aros.webp",
  },
  {
    title: "Hello Maia",
    description: "Intelligent assistant for modern workflows",
    tags: ["Bubble", "Supabase", "n8n"],
    year: "2025",
    url: "https://hellomaia.com.br",
    image: "/images/projects/hello-maia.webp",
  },
  {
    title: "Fynance",
    description: "Financial management and tracking application",
    tags: ["Bubble"],
    year: "2025",
    url: "https://fynance.com.br",
    image: "/images/projects/fynance.webp",
  },
  {
    title: "Eu Na Europa",
    description: "Platform connecting Brazilians with European opportunities",
    tags: ["Bubble", "Supabase"],
    year: "2024",
    url: "https://eunaeuropa.com",
    image: "/images/projects/eu-na-europa.webp",
  },
  {
    title: "FixaAi",
    description: "AI-powered study tool for active learning",
    tags: ["Bubble", "OpenAI"],
    year: "2024",
    url: "https://fixaai.com",
    image: "/images/projects/fixaai.webp",
  },
  {
    title: "Vetzco",
    description: "Veterinary management system",
    tags: ["Bubble", "MongoDB"],
    year: "2024",
    url: "https://vetzco.com",
    image: "/images/projects/vetzco.webp",
  },
  {
    title: "Mult Resorts",
    description: "Resort booking and management platform",
    tags: ["Bubble"],
    year: "2023",
    url: "https://multresorts.com.br",
    image: "/images/projects/mult-resorts.webp",
  },
];

export const experience = [
  {
    role: "Senior Bubble Developer",
    company: "arOS",
    period: "2025 — Present",
  },
  {
    role: "Pleno Bubble Developer",
    company: "Hamurabi Apps",
    period: "2023 — 2025",
  },
  {
    role: "Founder",
    company: "FixaAi",
    period: "2023 — 2025",
  },
  {
    role: "E-commerce Entrepreneur",
    company: "Self-employed",
    period: "2021 — 2022",
  },
  {
    role: "Infoproducer",
    company: "Self-employed",
    period: "2020 — 2021",
  },
  {
    role: "Freelance Video Editor",
    company: "Self-employed",
    period: "2018 — 2020",
  },
];

export const tools = [
  { name: "React", icon: "/images/tools/react.svg" },
  { name: "Next.js", icon: "/images/tools/nextjs.svg" },
  { name: "TypeScript", icon: "/images/tools/typescript.svg" },
  { name: "Tailwind CSS", icon: "/images/tools/tailwind.svg" },
  { name: "Figma", icon: "/images/tools/figma.svg" },
  { name: "Supabase", icon: "/images/tools/supabase.svg" },
  { name: "Bubble", icon: "/images/tools/bubble.svg" },
  { name: "n8n", icon: "/images/tools/n8n.svg" },
  { name: "OpenAI", icon: "/images/tools/openai.svg" },
];
```

- [ ] **Step 1.2: Commit**

```bash
git add src/lib/data.ts
git commit -m "feat: add project images and tools data to data layer"
```

---

## Task 2: Rewrite Hero Section

**Files:**
- Modify: `src/components/Hero.tsx`

The hero in the reference design shows:
- Large bold text "DEATH REBORN LUNATIC" (or similar headline — user should confirm the actual text)
- A laptop/screen image showing a project
- Subtitle text below
- Dark background with high-contrast white text

- [ ] **Step 2.1: Rewrite Hero.tsx**

```tsx
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(headingRef.current, {
        y: 80,
        opacity: 0,
        duration: 1,
      })
        .from(
          imageRef.current,
          {
            y: 60,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.5"
        )
        .from(
          subtitleRef.current,
          {
            y: 40,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.3"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-32 pb-20"
    >
      <h1
        ref={headingRef}
        className="text-5xl md:text-7xl lg:text-[8rem] font-bold uppercase leading-[0.9] tracking-tight"
      >
        Death Reborn
        <br />
        Lunatic
      </h1>

      <div ref={imageRef} className="relative mt-12 w-full max-w-4xl">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-[#2a2a2a]">
          <Image
            src="/images/hero-laptop.webp"
            alt="Featured project preview"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
          />
        </div>
      </div>

      <p
        ref={subtitleRef}
        className="mt-8 text-lg md:text-xl text-muted max-w-xl"
      >
        Software Engineer — Porto Seguro, Brazil
      </p>
    </section>
  );
}
```

- [ ] **Step 2.2: Run dev server and verify rendering**

```bash
npm run dev
```

Open browser at `http://localhost:3000` and verify hero section renders with headline, image area (placeholder bg), and subtitle.

- [ ] **Step 2.3: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat: rewrite hero section with bold headline and project image"
```

---

## Task 3: Rewrite Projects Section as Visual Grid

**Files:**
- Modify: `src/components/Projects.tsx`

The reference shows a grid of project cards with screenshots, dark overlay, project titles. Layout is roughly 2 columns with varying card sizes.

- [ ] **Step 3.1: Rewrite Projects.tsx**

```tsx
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/lib/data";
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
      className="px-6 md:px-12 lg:px-20 py-24"
    >
      <h2 className="text-sm uppercase tracking-widest text-muted mb-12">
        Selected Work
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <a
            key={project.title}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card group relative block overflow-hidden rounded-xl bg-[#222] aspect-[4/3] transition-transform duration-300 hover:scale-[1.02]"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs text-muted uppercase tracking-wider">
                  {project.year}
                </span>
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-muted/70 uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-xl md:text-2xl font-semibold">
                {project.title}
              </h3>
              <p className="text-sm text-muted mt-1">{project.description}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3.2: Verify project grid renders**

Open browser and check the projects section shows a 2-column grid with cards. Images will show fallback bg color until real screenshots are added.

- [ ] **Step 3.3: Commit**

```bash
git add src/components/Projects.tsx
git commit -m "feat: rewrite projects section as visual card grid with screenshots"
```

---

## Task 4: Create About Section (replaces Intro)

**Files:**
- Create: `src/components/About.tsx`
- Delete: `src/components/Intro.tsx` (after page.tsx is updated)

The reference shows a "MORE ABOUT CARLOVSK" section with text and possibly a portrait/info layout.

- [ ] **Step 4.1: Create About.tsx**

```tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/use-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
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
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
        },
      });

      gsap.from(textRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="px-6 md:px-12 lg:px-20 py-24"
    >
      <h2
        ref={headingRef}
        className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase leading-tight"
      >
        More About
        <br />
        Carlovsk
      </h2>

      <div
        ref={textRef}
        className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-8"
      >
        <div className="md:col-span-4">
          <p className="text-sm uppercase tracking-widest text-muted">
            Who I Am
          </p>
        </div>

        <div className="md:col-span-8 space-y-6">
          <p className="text-lg md:text-xl leading-relaxed text-foreground/90">
            I&apos;m a software engineer from Porto Seguro, Brazil, passionate
            about building digital products that solve real problems. With years
            of experience spanning no-code platforms, full-stack development, and
            AI integration, I bring ideas to life through clean, functional
            design.
          </p>
          <p className="text-lg md:text-xl leading-relaxed text-foreground/90">
            My journey started as a video editor, evolved through
            e-commerce and info products, and led me to software engineering
            where I found my true calling — creating tools that empower people.
          </p>

          <a
            href="#contact"
            className="inline-block mt-4 text-sm uppercase tracking-widest border border-foreground/30 px-6 py-3 rounded-full hover:bg-foreground hover:text-background transition-colors duration-300"
          >
            Let&apos;s talk
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4.2: Commit**

```bash
git add src/components/About.tsx
git commit -m "feat: create About section replacing Intro"
```

---

## Task 5: Create Experience Section (replaces Journey)

**Files:**
- Create: `src/components/Experience.tsx`
- Delete: `src/components/Journey.tsx` (after page.tsx is updated)

- [ ] **Step 5.1: Create Experience.tsx**

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
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} className="px-6 md:px-12 lg:px-20 py-24">
      <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase leading-tight mb-16">
        My Experience
      </h2>

      <div className="space-y-0 border-t border-border">
        {experience.map((exp) => (
          <div
            key={`${exp.company}-${exp.period}`}
            className="exp-item group flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-border hover:bg-white/5 transition-colors duration-300 px-4 -mx-4"
          >
            <div className="flex-1">
              <h3 className="text-xl md:text-2xl font-medium">
                {exp.role}
              </h3>
              <p className="text-muted text-sm mt-1">{exp.company}</p>
            </div>
            <p className="text-muted text-sm mt-2 md:mt-0">{exp.period}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 5.2: Commit**

```bash
git add src/components/Experience.tsx
git commit -m "feat: create Experience section replacing Journey"
```

---

## Task 6: Create Motivation Section

**Files:**
- Create: `src/components/Motivation.tsx`

This is a new section visible in the reference design. It features:
- A heading "MOTIVATION" or similar
- An image collage/grid (landscape photos, abstract imagery)
- Large statement text: "TURN YOUR IDEAS INTO REALITY"
- Dark/moody aesthetic

- [ ] **Step 6.1: Create Motivation.tsx**

```tsx
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/use-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

export default function Motivation() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const collageRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLHeadingElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
        },
      });

      gsap.utils.toArray<HTMLElement>(".collage-item").forEach((item, i) => {
        gsap.from(item, {
          y: 40,
          opacity: 0,
          duration: 0.6,
          delay: i * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: collageRef.current,
            start: "top 75%",
          },
        });
      });

      gsap.from(statementRef.current, {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: statementRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const collageImages = [
    { src: "/images/motivation/collage-1.webp", alt: "Inspiration 1" },
    { src: "/images/motivation/collage-2.webp", alt: "Inspiration 2" },
    { src: "/images/motivation/collage-3.webp", alt: "Inspiration 3" },
    { src: "/images/motivation/collage-4.webp", alt: "Inspiration 4" },
  ];

  return (
    <section ref={sectionRef} className="px-6 md:px-12 lg:px-20 py-24">
      <h2
        ref={headingRef}
        className="text-sm uppercase tracking-widest text-muted mb-12"
      >
        Motivation
      </h2>

      <div
        ref={collageRef}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
      >
        {collageImages.map((img, i) => (
          <div
            key={img.src}
            className={`collage-item relative overflow-hidden rounded-lg bg-[#222] ${
              i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-[4/3]"
            }`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              sizes={i === 0 ? "50vw" : "25vw"}
            />
          </div>
        ))}
      </div>

      <h3
        ref={statementRef}
        className="text-4xl md:text-6xl lg:text-8xl font-bold uppercase leading-[0.95] max-w-5xl"
      >
        Turn Your
        <br />
        Ideas Into
        <br />
        Reality
      </h3>
    </section>
  );
}
```

- [ ] **Step 6.2: Commit**

```bash
git add src/components/Motivation.tsx
git commit -m "feat: create Motivation section with image collage and statement"
```

---

## Task 7: Create Favorite Tools Section

**Files:**
- Create: `src/components/FavoriteTools.tsx`

The reference shows a grid of tool/technology logos or icons with names.

- [ ] **Step 7.1: Create FavoriteTools.tsx**

```tsx
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { tools } from "@/lib/data";
import { useReducedMotion } from "@/lib/use-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

export default function FavoriteTools() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".tool-item").forEach((item, i) => {
        gsap.from(item, {
          y: 30,
          opacity: 0,
          duration: 0.5,
          delay: i * 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} className="px-6 md:px-12 lg:px-20 py-24">
      <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase leading-tight mb-16">
        Favorite
        <br />
        Tools
      </h2>

      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-8">
        {tools.map((tool) => (
          <div
            key={tool.name}
            className="tool-item flex flex-col items-center gap-3 group"
          >
            <div className="relative w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-xl bg-white/5 p-3 transition-colors duration-300 group-hover:bg-white/10">
              <Image
                src={tool.icon}
                alt={tool.name}
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <span className="text-xs text-muted text-center">
              {tool.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 7.2: Commit**

```bash
git add src/components/FavoriteTools.tsx
git commit -m "feat: create FavoriteTools section with tool grid"
```

---

## Task 8: Redesign Contact Section + Create Footer

**Files:**
- Modify: `src/components/Contact.tsx`
- Create: `src/components/Footer.tsx`

The reference shows:
- "LET'S WORK TOGETHER" as a large centered heading with a CTA
- Footer with large "CARLOVSK" text at the bottom

- [ ] **Step 8.1: Rewrite Contact.tsx**

```tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/use-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="px-6 md:px-12 lg:px-20 py-32 text-center"
    >
      <h2
        ref={headingRef}
        className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase leading-tight"
      >
        Let&apos;s Work
        <br />
        Together
      </h2>

      <a
        href="mailto:carlovsk.edits@gmail.com"
        className="inline-block mt-12 text-sm uppercase tracking-widest border border-foreground/30 px-8 py-4 rounded-full hover:bg-foreground hover:text-background transition-colors duration-300"
      >
        Get in touch
      </a>

      <div className="flex justify-center gap-8 mt-12">
        <a
          href="mailto:carlovsk.edits@gmail.com"
          className="text-sm text-muted hover:text-foreground transition-colors"
        >
          Email
        </a>
        <a
          href="https://linkedin.com/in/carlovsk"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted hover:text-foreground transition-colors"
        >
          LinkedIn
        </a>
        <a
          href="https://instagram.com/carlovsk"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted hover:text-foreground transition-colors"
        >
          Instagram
        </a>
        <a
          href="https://github.com/carlovsk"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted hover:text-foreground transition-colors"
        >
          GitHub
        </a>
      </div>
    </section>
  );
}
```

- [ ] **Step 8.2: Create Footer.tsx**

```tsx
export default function Footer() {
  return (
    <footer className="px-6 md:px-12 lg:px-20 pb-12">
      <div className="border-t border-border pt-8">
        <p className="text-[12vw] md:text-[10vw] font-bold uppercase leading-none tracking-tighter text-foreground/10 select-none">
          Carlovsk
        </p>

        <div className="flex justify-between items-center mt-8 text-xs text-muted">
          <span>&copy; {new Date().getFullYear()} carlovsk</span>
          <span>Porto Seguro, Brazil</span>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 8.3: Commit**

```bash
git add src/components/Contact.tsx src/components/Footer.tsx
git commit -m "feat: redesign Contact section and create Footer with large logo"
```

---

## Task 9: Update Header

**Files:**
- Modify: `src/components/Header.tsx`

Minor update to ensure nav links match new section IDs and design aligns with reference (logo is "CARLOVSK" in caps, clean nav).

- [ ] **Step 9.1: Read current Header.tsx and update nav links**

Read the current file first, then update navigation links to match the new sections: Work, About, Contact. Ensure the logo text reads "CARLOVSK" in uppercase bold. Keep the existing GSAP animation and mix-blend-difference styling.

- [ ] **Step 9.2: Commit**

```bash
git add src/components/Header.tsx
git commit -m "refactor: update header nav links for new sections"
```

---

## Task 10: Wire Everything Together in page.tsx

**Files:**
- Modify: `src/app/page.tsx`
- Delete: `src/components/Intro.tsx`
- Delete: `src/components/Journey.tsx`

- [ ] **Step 10.1: Rewrite page.tsx with new component order**

```tsx
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Motivation from "@/components/Motivation";
import FavoriteTools from "@/components/FavoriteTools";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Header />
      <main>
        <Hero />
        <Projects />
        <About />
        <Experience />
        <Motivation />
        <FavoriteTools />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
```

- [ ] **Step 10.2: Delete old components**

```bash
rm src/components/Intro.tsx src/components/Journey.tsx
```

- [ ] **Step 10.3: Run dev server and verify all sections render**

```bash
npm run dev
```

Open browser and scroll through the entire page. Verify:
- Header with navigation
- Hero with headline and image placeholder
- Projects grid with card placeholders
- About section with text
- Experience timeline
- Motivation collage with statement text
- Favorite Tools grid
- Contact CTA
- Footer with large logo

- [ ] **Step 10.4: Run TypeScript type check**

```bash
npx tsc --noEmit
```

Fix any type errors found.

- [ ] **Step 10.5: Commit**

```bash
git add -A
git commit -m "feat: wire all new sections together and remove old components"
```

---

## Task 11: Add CSS Animations and Polish

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 11.1: Add any new CSS needed**

Review the site in browser. Add any additional CSS needed for:
- Smooth image loading transitions
- Any hover effects not covered by Tailwind utilities
- Ensure marquee animation is removed if no longer used

- [ ] **Step 11.2: Commit**

```bash
git add src/app/globals.css
git commit -m "style: update global CSS for new design"
```

---

## Task 12: Final Visual Review and Fixes

- [ ] **Step 12.1: Full-page visual review in browser**

Run `npm run dev`, open browser, and compare every section against the reference screenshot:

1. Header: Logo + nav positioning
2. Hero: Headline size, image placement
3. Projects: Grid layout, card aspect ratios, hover effects
4. About: Text layout, spacing
5. Experience: List styling, hover states
6. Motivation: Collage grid, statement text size
7. Favorite Tools: Icon grid spacing
8. Contact: Centered layout, CTA button
9. Footer: Large logo text size and opacity

- [ ] **Step 12.2: Check responsive at 375px (mobile), 768px (tablet), 1440px (desktop)**

- [ ] **Step 12.3: Fix any issues found**

- [ ] **Step 12.4: Final commit**

```bash
git add -A
git commit -m "fix: visual polish and responsive adjustments"
```

---

## Notes for Implementation

- **Images:** The project uses placeholder backgrounds (`bg-[#222]`) until real `.webp` screenshots are provided. After implementation, drop real images into `public/images/projects/`, `public/images/motivation/`, and `public/images/tools/`.
- **Hero text:** "DEATH REBORN LUNATIC" is taken from the screenshot — confirm with the user if this is the desired headline text.
- **Tool icons:** SVG icons for the tools section need to be sourced. Consider using [Simple Icons](https://simpleicons.org/) or similar.
- **next/image:** Using `fill` prop with `sizes` attribute for responsive images per Next.js 16 docs. Static imports can be used once real images are added for automatic blur placeholders.
