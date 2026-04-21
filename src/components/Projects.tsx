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
          style={{ fontSize: "clamp(2.5rem, 10vw, 9rem)" }}
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
