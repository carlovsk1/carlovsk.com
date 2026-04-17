"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";

type Props = {
  title: string;
  tagline: string;
  image: string;
};

export default function ProjectHero({ title, tagline, image }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      [labelRef, titleRef, taglineRef, imageRef].forEach((ref) => {
        if (ref.current) gsap.set(ref.current, { opacity: 1 });
      });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.8 });

      tl.fromTo(
        labelRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }
      )
        .fromTo(
          titleRef.current,
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2 },
          "-=0.3"
        )
        .fromTo(
          taglineRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.5"
        )
        .fromTo(
          imageRef.current,
          { opacity: 0, scale: 1.05 },
          { opacity: 1, scale: 1, duration: 1.2 },
          "-=0.8"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[90vh] items-center px-6 md:px-12 lg:px-20 pt-28 pb-16"
    >
      <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-2 md:gap-12 md:items-center">
        <div className="flex flex-col">
          <p
            ref={labelRef}
            className="text-xs uppercase tracking-widest text-muted opacity-0"
          >
            Case
          </p>

          <h1
            ref={titleRef}
            className="mt-4 text-[12vw] md:text-[6.5vw] font-bold leading-[0.9] tracking-tighter opacity-0"
          >
            {title}
          </h1>

          <p
            ref={taglineRef}
            className="mt-6 max-w-xl text-lg md:text-xl text-muted leading-relaxed opacity-0"
          >
            {tagline}
          </p>
        </div>

        <div
          ref={imageRef}
          className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#222] opacity-0"
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </div>
    </section>
  );
}
