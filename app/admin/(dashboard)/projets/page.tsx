import Link from "next/link";
import { Plus } from "lucide-react";
import { getProjects } from "@/lib/supabase/projects";
import ProjectsTable from "@/components/admin/ProjectsTable";

export const metadata = {
  title: "Projets — Admin Kan House",
};

export default async function AdminProjetsPage() {
  const projects = await getProjects();

  const stats = {
    total: projects.length,
    featured: projects.filter((p) => p.featured).length,
    hotels: projects.filter((p) => p.category === "Hôtel").length,
    restaurants: projects.filter((p) => p.category === "Restaurant").length,
  };

  return (
    <div className="max-w-[1400px]">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between
                      gap-4 mb-6">
        <div>
          <p className="text-[0.62rem] font-medium uppercase tracking-[0.24em]
                        text-[var(--color-espresso)]/45 mb-1">
            Contenu
          </p>
          <h1 className="text-[1.35rem] lg:text-[1.5rem] font-normal
                         text-[var(--color-espresso)]">
            Projets
          </h1>
        </div>

        <Link
          href="/admin/projets/nouveau"
          className="inline-flex items-center gap-2 shrink-0
                     bg-[var(--color-espresso)] text-[var(--color-cafe-light)]
                     px-5 py-3 text-[0.72rem] font-medium uppercase tracking-[0.22em]
                     hover:bg-[var(--color-bordeaux)] transition-colors"
        >
          <Plus size={14} strokeWidth={2} />
          Nouveau projet
        </Link>
      </div>

      {/* Mini-stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total", value: stats.total, accent: false },
          { label: "Hôtels", value: stats.hotels, accent: true },
          { label: "Restaurants", value: stats.restaurants, accent: false },
          { label: "Mis en avant", value: stats.featured, accent: false },
        ].map((s) => (
          <div
            key={s.label}
            className="p-4 flex flex-col justify-between min-h-[80px]"
            style={{
              border: "1px solid var(--color-border-line)",
              backgroundColor: s.accent
                ? "var(--color-bordeaux)"
                : "transparent",
            }}
          >
            <p
              className="text-[1.35rem] font-normal tabular-nums leading-none mb-1.5"
              style={{
                color: s.accent
                  ? "var(--color-cafe-light)"
                  : "var(--color-espresso)",
              }}
            >
              {s.value}
            </p>
            <p
              className="text-[0.6rem] font-medium uppercase tracking-[0.2em]"
              style={{
                color: s.accent
                  ? "rgba(239, 236, 230, 0.6)"
                  : "rgba(26, 26, 26, 0.5)",
              }}
            >
              {s.label}
            </p>
          </div>
        ))}
      </div>

      <ProjectsTable projects={projects} />
    </div>
  );
}