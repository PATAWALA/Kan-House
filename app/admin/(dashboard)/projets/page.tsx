import Image from "next/image";
import Link from "next/link";
import { Plus, Pencil, Briefcase } from "lucide-react";
import { getProjects } from "@/lib/supabase/projects";

export default async function AdminProjetsPage() {
  const projects = await getProjects();

  return (
    <div>
      {/* En-tête */}
      <div className="flex items-center justify-between mb-8">
        <p className="text-[0.85rem] text-[var(--color-espresso)]/55">
          {projects.length} projet{projects.length > 1 ? "s" : ""}
        </p>

        <Link
          href="/admin/projets/nouveau"
          className="inline-flex items-center gap-2
                     bg-[var(--color-espresso)] text-[var(--color-cafe-light)]
                     px-5 py-3 text-[0.68rem] font-medium uppercase tracking-[0.22em]
                     hover:bg-[var(--color-bordeaux)] transition-colors"
        >
          <Plus size={14} />
          Nouveau projet
        </Link>
      </div>

      {/* Liste vide */}
      {projects.length === 0 ? (
        <div
          className="py-20 text-center"
          style={{ border: "1px solid var(--color-border-line)" }}
        >
          <Briefcase
            size={32}
            strokeWidth={1.2}
            className="mx-auto mb-4 text-[var(--color-espresso)]/25"
          />
          <p className="text-[0.9rem] text-[var(--color-espresso)]/45 italic mb-6">
            Aucun projet pour l'instant.
          </p>
          <Link
            href="/admin/projets/nouveau"
            className="inline-flex items-center gap-2
                       bg-[var(--color-espresso)] text-[var(--color-cafe-light)]
                       px-5 py-3 text-[0.68rem] font-medium uppercase tracking-[0.22em]
                       hover:bg-[var(--color-bordeaux)] transition-colors"
          >
            <Plus size={14} />
            Créer le premier projet
          </Link>
        </div>
      ) : (
        <div
          className="overflow-x-auto"
          style={{ border: "1px solid var(--color-border-line)" }}
        >
          <table className="w-full min-w-[800px]">
            <thead>
              <tr style={{ backgroundColor: "var(--color-cafe-dark)" }}>
                <th className="text-left text-[0.65rem] uppercase tracking-[0.2em]
                               text-[var(--color-espresso)]/55 font-medium px-4 py-3">
                  Projet
                </th>
                <th className="text-left text-[0.65rem] uppercase tracking-[0.2em]
                               text-[var(--color-espresso)]/55 font-medium px-4 py-3">
                  Catégorie
                </th>
                <th className="text-left text-[0.65rem] uppercase tracking-[0.2em]
                               text-[var(--color-espresso)]/55 font-medium px-4 py-3">
                  Lieu
                </th>
                <th className="text-left text-[0.65rem] uppercase tracking-[0.2em]
                               text-[var(--color-espresso)]/55 font-medium px-4 py-3">
                  Année
                </th>
                <th className="text-left text-[0.65rem] uppercase tracking-[0.2em]
                               text-[var(--color-espresso)]/55 font-medium px-4 py-3">
                  Surface
                </th>
                <th className="text-right text-[0.65rem] uppercase tracking-[0.2em]
                               text-[var(--color-espresso)]/55 font-medium px-4 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr
                  key={p.id}
                  style={{ borderTop: "1px solid var(--color-border-line)" }}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {p.image && (
                        <div
                          className="relative w-12 h-10 shrink-0 bg-[var(--color-cafe-dark)] overflow-hidden"
                          style={{ border: "1px solid var(--color-border-line)" }}
                        >
                          <Image
                            src={p.image}
                            alt={p.title}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                      )}
                      <span className="text-[0.85rem] text-[var(--color-espresso)] truncate">
                        {p.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[0.82rem] text-[var(--color-espresso)]/60">
                    {p.category || "—"}
                  </td>
                  <td className="px-4 py-3 text-[0.82rem] text-[var(--color-espresso)]/60">
                    {p.location || "—"}
                  </td>
                  <td className="px-4 py-3 text-[0.82rem] text-[var(--color-espresso)]/60 tabular-nums">
                    {p.year || "—"}
                  </td>
                  <td className="px-4 py-3 text-[0.82rem] text-[var(--color-espresso)]/60 tabular-nums">
                    {p.surface || "—"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/projets/${p.id}`}
                      className="inline-flex items-center gap-1.5
                                 text-[0.7rem] uppercase tracking-[0.16em]
                                 text-[var(--color-espresso)]/60
                                 hover:text-[var(--color-espresso)]
                                 transition-colors"
                    >
                      <Pencil size={12} />
                      Éditer
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}