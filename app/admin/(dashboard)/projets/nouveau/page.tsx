import ProjectForm from "@/components/admin/ProjectForm";

export const metadata = {
  title: "Nouveau projet — Admin Kan House",
};

export default function NouveauProjetPage() {
  return <ProjectForm mode="create" />;
}