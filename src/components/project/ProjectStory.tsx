"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/use-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  paragraphs: string[];
};

export default function ProjectStory({ paragraphs }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".story-paragraph").forEach((p) => {
        gsap.from(p, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: p,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} className="px-6 md:px-12 lg:px-20 py-24">
      <div className="mx-auto max-w-3xl flex flex-col gap-8">
        {paragraphs.map((paragraph, i) => (
          <p
            key={i}
            className="story-paragraph text-lg md:text-xl leading-relaxed text-foreground/90"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
