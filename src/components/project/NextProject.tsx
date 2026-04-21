"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/use-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  title: string;
  slug: string;
};

export default function NextProject({ title, slug }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".next-project-inner", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} className="px-6 md:px-12 lg:px-20 py-24">
      <Link
        href={`/p/${slug}`}
        className="next-project-inner group block transition-transform duration-300 hover:scale-[1.01]"
      >
        <p className="text-xs uppercase tracking-widest text-muted">
          Next project
        </p>
        <h2 className="mt-4 text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter">
          {title}{" "}
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">
            →
          </span>
        </h2>
      </Link>
    </section>
  );
}
