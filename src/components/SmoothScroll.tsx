"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

let lenisInstance: Lenis | null = null;

export function scrollToTop() {
  if (lenisInstance) {
    lenisInstance.scrollTo(0);
  } else if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

export default function SmoothScroll() {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisInstance = lenis;
    lenis.scrollTo(0, { immediate: true });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return null;
}
