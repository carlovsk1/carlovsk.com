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
