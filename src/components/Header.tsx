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
