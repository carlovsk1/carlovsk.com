"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "America/Bahia",
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

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
      className="fixed top-0 left-0 z-50 flex w-full items-center justify-between px-6 py-4 md:px-12"
      style={{ opacity: 0 }}
    >
      <a href="#" className="text-sm font-semibold uppercase tracking-wider">
        Carlovsk/
      </a>

      <div className="flex items-center gap-4 md:gap-6">
        <span className="hidden text-xs text-muted md:block" suppressHydrationWarning>
          {time}
        </span>

        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs uppercase tracking-wider text-muted">
            Available
          </span>
        </div>

        <a
          href="mailto:carlovsk.edits@gmail.com"
          className="rounded-full border border-foreground/30 px-4 py-2 text-xs font-medium uppercase tracking-wider transition-colors duration-300 hover:bg-foreground hover:text-background"
        >
          Contact Now
        </a>
      </div>
    </header>
  );
}
