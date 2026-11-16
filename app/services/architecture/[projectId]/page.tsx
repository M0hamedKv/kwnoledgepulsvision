import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ARCHITECTURE_DESIGN_PROJECTS,
  getArchitectureProjectById,
} from "@/components/services/architectureData";
import { ArchitectureProjectDetailPage } from "@/components/services/pages";

interface ArchitectureProjectRouteProps {
  params: Promise<{ projectId: string }>;
}

export async function generateMetadata({
  params,
}: ArchitectureProjectRouteProps): Promise<Metadata> {
  const { projectId } = await params;
  const project = getArchitectureProjectById(projectId);

  if (!project) {
    return {
      title: "Project Not Found — KV STUDIO",
      description: "Architecture project not found.",
    };
  }

  return {
    title: `${project.title} — ${project.typology} | KV STUDIO`,
    description: project.description,
  };
}

export async function generateStaticParams() {
  return ARCHITECTURE_DESIGN_PROJECTS.map((p) => ({
    projectId: p.id,
  }));
}

export default async function ArchitectureProjectPage({
  params,
}: ArchitectureProjectRouteProps) {
  const { projectId } = await params;
  const project = getArchitectureProjectById(projectId);

  if (!project) {
    notFound();
  }

  const currentIndex = ARCHITECTURE_DESIGN_PROJECTS.findIndex((p) => p.id === project.id);
  const prevProject =
    currentIndex > 0 ? ARCHITECTURE_DESIGN_PROJECTS[currentIndex - 1] : undefined;
  const nextProject =
    currentIndex < ARCHITECTURE_DESIGN_PROJECTS.length - 1
      ? ARCHITECTURE_DESIGN_PROJECTS[currentIndex + 1]
      : undefined;

  return (
    <main className="w-full min-h-screen bg-black">
      <ArchitectureProjectDetailPage
        project={project}
        prevProject={prevProject}
        nextProject={nextProject}
      />
    </main>
  );
}
