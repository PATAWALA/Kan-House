import { notFound } from "next/navigation";
import ProjectForm from "@/components/admin/ProjectForm";
import { getProjectById } from "@/lib/supabase/projects";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectById(id);
  return {
    title: project
      ? `Éditer ${project.title} — Admin Kan House`
      : "Projet introuvable",
  };
}

export default async function EditerProjetPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) notFound();

  return <ProjectForm mode="edit" initialData={project} />;
}