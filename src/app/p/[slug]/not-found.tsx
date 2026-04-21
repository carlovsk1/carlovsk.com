import type { Metadata } from "next";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Project not found — Carlovsk",
  description: "The case study you're looking for doesn't exist.",
};

export default function ProjectNotFound() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen items-center px-6 md:px-12 lg:px-20">
        <div className="mx-auto flex max-w-2xl flex-col items-start gap-6 py-24">
          <p className="text-xs uppercase tracking-widest text-muted">404</p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
            Project not found
          </h1>
          <p className="text-base md:text-lg text-muted leading-relaxed">
            The case study you&apos;re looking for doesn&apos;t exist. It may
            have been renamed or moved.
          </p>
          <Link
            href="/#work"
            className="mt-4 rounded-full border border-foreground/30 px-6 py-3 text-sm font-medium uppercase tracking-wider transition-colors duration-300 hover:bg-foreground hover:text-background"
          >
            Back to work →
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
