"use client";

import { useEffect, useRef } from "react";
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
      ref={headerRef}
      className="fixed top-0 left-0 z-50 flex w-full items-center justify-between px-8 py-6 mix-blend-difference md:px-12"
      style={{ opacity: 0 }}
    >
      <a href="#" className="text-sm font-bold uppercase tracking-widest">
        Carlovsk
      </a>
      <nav className="flex items-center gap-6 md:gap-8">
        {["Work", "About", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="group relative px-1 py-2 text-sm font-light"
          >
            {item}
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-foreground transition-all duration-300 group-hover:w-full" />
          </a>
        ))}
      </nav>
    </header>
  );
}
