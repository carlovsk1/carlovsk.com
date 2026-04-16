"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/lib/data";
import { useReducedMotion } from "@/lib/use-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      if (headerRef.current) gsap.set(headerRef.current, { opacity: 1 });
      itemsRef.current.forEach((item) => {
        if (item) gsap.set(item, { opacity: 1 });
      });
      return;
    }

    gsap.fromTo(
      headerRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        duration: 0.8,
        ease: "power3.out",
      }
    );

    itemsRef.current.forEach((item) => {
      if (!item) return;
      gsap.fromTo(
        item,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          },
          duration: 0.8,
          ease: "power3.out",
        }
      );
    });
  }, [prefersReducedMotion]);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="px-8 py-32 md:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <div ref={headerRef} className="mb-16 opacity-0">
          <p className="text-sm font-light uppercase tracking-widest text-muted">
            Recent work
          </p>
        </div>

        <div className="border-t border-border">
          {projects.map((project, i) => (
            <a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              ref={(el) => { itemsRef.current[i] = el as HTMLDivElement | null; }}
              className="group block cursor-pointer border-b border-border py-8 opacity-0 transition-colors duration-300 hover:bg-foreground/[0.02] md:py-12"
            >
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-8">
                  <h3 className="text-4xl font-light tracking-tight transition-all duration-300 group-hover:translate-x-4 md:text-6xl lg:text-7xl">
                    {project.title}
                  </h3>
                  <p className="text-sm font-light text-muted md:text-base">
                    {project.description}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border px-3 py-1 text-xs font-light text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-sm font-light text-muted">
                    {project.year}
                  </span>
                  <svg
                    className="h-4 w-4 text-muted transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 17L17 7M17 7H7M17 7v10"
                    />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
