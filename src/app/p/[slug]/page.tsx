import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import ProjectHero from "@/components/project/ProjectHero";
import ProjectMeta from "@/components/project/ProjectMeta";
import ProjectStory from "@/components/project/ProjectStory";
import NextProject from "@/components/project/NextProject";
import {
  getProjectBySlug,
  getPublishedProjects,
  getNextProject,
} from "@/lib/projects";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getPublishedProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const title = `${project.title} — Carlovsk`;
  const description = project.tagline;
  const ogImage = project.image;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: ogImage }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const next = getNextProject(slug);
  const showNext = next.slug !== project.slug;

  return (
    <>
      <SmoothScroll />
      <CustomCursor />
      <Header />
      <main>
        <ProjectHero
          title={project.title}
          tagline={project.tagline}
          image={project.image}
        />
        <ProjectMeta
          client={project.client}
          year={project.year}
          url={project.url}
        />
        <ProjectStory paragraphs={project.story} />
        {showNext && <NextProject title={next.title} slug={next.slug} />}
      </main>
      <Footer />
    </>
  );
}
