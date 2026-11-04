import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  INTERIOR_PROJECTS,
  getInteriorProjectById,
} from "@/components/services/interiorData";
import { InteriorProjectDetailPage } from "@/components/services/pages";

interface InteriorProjectRouteProps {
  params: Promise<{ projectId: string }>;
}

export async function generateMetadata({
  params,
}: InteriorProjectRouteProps): Promise<Metadata> {
  const { projectId } = await params;
  const project = getInteriorProjectById(projectId);

  if (!project) {
    return {
      title: "Project Not Found — KV STUDIO",
      description: "Interior design project not found.",
    };
  }

  return {
    title: `${project.title} — ${project.typology} | KV STUDIO`,
    description: project.description,
  };
}

export async function generateStaticParams() {
  return INTERIOR_PROJECTS.map((p) => ({
    projectId: p.id,
  }));
}

export default async function InteriorProjectPage({
  params,
}: InteriorProjectRouteProps) {
  const { projectId } = await params;
  const project = getInteriorProjectById(projectId);

  if (!project) {
    notFound();
  }

  const currentIndex = INTERIOR_PROJECTS.findIndex((p) => p.id === project.id);
  const prevProject =
    currentIndex > 0 ? INTERIOR_PROJECTS[currentIndex - 1] : undefined;
  const nextProject =
    currentIndex < INTERIOR_PROJECTS.length - 1
      ? INTERIOR_PROJECTS[currentIndex + 1]
      : undefined;

  return (
    <main className="w-full min-h-screen bg-black">
      <InteriorProjectDetailPage
        project={project}
        prevProject={prevProject}
        nextProject={nextProject}
      />
    </main>
  );
}

