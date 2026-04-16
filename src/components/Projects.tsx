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
    <section ref={sectionRef} id="work" className="px-6 md:px-12 lg:px-20 py-24">
      <div className="mb-16">
        <p className="text-sm uppercase tracking-widest text-muted">Featured</p>
        <h2 className="mt-2 text-5xl md:text-7xl font-bold">Work</h2>
        <p className="mt-6 max-w-2xl text-base text-muted leading-relaxed">
          My creative spirit comes alive in the digital realm. With a sharp eye for
          logic and design, I shape seamless user experiences using visual tools and
          dynamic workflows. In Bubble, I build, connect, and launch, turning raw
          ideas into fully functional products.
        </p>
      </div>

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
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-muted/80 uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
                <span className="text-xs text-muted/60">|</span>
                <span className="text-xs text-muted/80">{project.year}</span>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold">
                {project.title}
                {"badge" in project && project.badge && (
                  <span className="ml-2 text-sm font-normal text-muted">
                    [{project.badge}]
                  </span>
                )}
              </h3>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
