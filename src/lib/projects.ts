import { projects, type Project, type PublishedProject } from "./data";

export function isPublished(project: Project): project is PublishedProject {
  return Boolean(
    project.slug && project.tagline && project.client && project.story?.length
  );
}

export function getPublishedProjects(): PublishedProject[] {
  return projects.filter(isPublished);
}

export function getProjectBySlug(slug: string): PublishedProject | undefined {
  return getPublishedProjects().find((p) => p.slug === slug);
}

export function getNextProject(slug: string): PublishedProject {
  const list = getPublishedProjects();
  const index = list.findIndex((p) => p.slug === slug);
  return list[(index + 1) % list.length];
}
