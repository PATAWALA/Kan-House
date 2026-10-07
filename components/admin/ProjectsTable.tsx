"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash2,
  ArrowUpDown,
  X,
  Briefcase,
  Download,
  Star,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { useToast } from "@/lib/store/toast";
import { deleteProject } from "@/app/admin/actions";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import type { ProjectRow } from "@/lib/supabase/types";

const ITEMS_PER_PAGE = 10;

const CATEGORIES = ["Hôtel", "Restaurant", "Villa", "Lounge"];

type SortKey = "title" | "category" | "year" | "created_at";
type SortDir = "asc" | "desc";

export default function ProjectsTable({
  projects: initialProjects,
}: {
  projects: ProjectRow[];
}) {
  const router = useRouter();
  const toast = useToast();

  const [projects, setProjects] = useState(initialProjects);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [sortKey, setSortKey] = useState<SortKey>("created_at");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    id?: string;
    name?: string;
    bulk?: boolean;
  }>({ open: false });
  const [deleting, setDeleting] = useState(false);

  // ============================================
  // FILTRAGE + TRI
  // ============================================
  const filtered = useMemo(() => {
    let list = [...projects];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q)
      );
    }

    if (categoryFilter !== "all") {
      list = list.filter((p) => p.category === categoryFilter);
    }

    list.sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case "title":
          cmp = a.title.localeCompare(b.title);
          break;
        case "category":
          cmp = (a.category ?? "").localeCompare(b.category ?? "");
          break;
        case "year":
          cmp = (a.year ?? "").localeCompare(b.year ?? "");
          break;
        case "created_at":
        default:
          cmp =
            new Date(a.created_at).getTime() -
            new Date(b.created_at).getTime();
      }
      return sortDir === "asc" ? cmp : -cmp;
    });

    return list;
  }, [projects, search, categoryFilter, sortKey, sortDir]);

  // ============================================
  // PAGINATION
  // ============================================
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  );

  const resetToFirstPage = () => setPage(1);

  // ============================================
  // SÉLECTION
  // ============================================
  const toggleOne = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const toggleAll = () => {
    if (selected.size === paginated.length) setSelected(new Set());
    else setSelected(new Set(paginated.map((p) => p.id)));
  };

  const clearSelection = () => setSelected(new Set());
  const allSelected = paginated.length > 0 && selected.size === paginated.length;

  // ============================================
  // TRI
  // ============================================
  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  // ============================================
  // SUPPRESSION
  // ============================================
  const handleDeleteClick = (id: string, name: string) => {
    setDeleteDialog({ open: true, id, name });
  };

  const handleBulkDeleteClick = () => {
    setDeleteDialog({ open: true, bulk: true });
  };

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      if (deleteDialog.bulk) {
        const ids = Array.from(selected);
        for (const id of ids) {
          const result = await deleteProject(id);
          if (!result.success) throw new Error(result.error);
        }
        setProjects((prev) => prev.filter((p) => !selected.has(p.id)));
        toast.success(
          `${ids.length} projet${ids.length > 1 ? "s" : ""} supprimé${
            ids.length > 1 ? "s" : ""
          }`
        );
        clearSelection();
      } else if (deleteDialog.id) {
        const result = await deleteProject(deleteDialog.id);
        if (!result.success) throw new Error(result.error);
        setProjects((prev) => prev.filter((p) => p.id !== deleteDialog.id));
        toast.success("Projet supprimé");
      }
      setDeleteDialog({ open: false });
      router.refresh();
    } catch {
      toast.error("Erreur lors de la suppression");
    } finally {
      setDeleting(false);
    }
  };

  // ============================================
  // EXPORT CSV
  // ============================================
  const handleExportCSV = () => {
    const headers = [
      "Titre",
      "Catégorie",
      "Lieu",
      "Année",
      "Surface",
      "Mis en avant",
    ];
    const rows = filtered.map((p) => [
      p.title,
      p.category ?? "",
      p.location ?? "",
      p.year ?? "",
      p.surface ?? "",
      p.featured ? "Oui" : "Non",
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");

    const blob = new Blob([`\uFEFF${csv}`], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `kan-house-projets-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Export CSV téléchargé");
  };

  // ============================================
  // RENDER
  // ============================================
  return (
    <>
      {/* Barre d'outils */}
      <div
        className="flex flex-col lg:flex-row lg:items-center gap-3 p-4"
        style={{
          borderTop: "1px solid var(--color-border-line)",
          borderLeft: "1px solid var(--color-border-line)",
          borderRight: "1px solid var(--color-border-line)",
        }}
      >
        <div className="relative flex-1 min-w-[200px]">
          <Search
            size={15}
            strokeWidth={1.5}
            className="absolute left-3 top-1/2 -translate-y-1/2
                       text-[var(--color-espresso)]/40 pointer-events-none"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              resetToFirstPage();
            }}
            placeholder="Rechercher un projet…"
            className="w-full pl-9 pr-9 py-2.5 bg-transparent text-[0.85rem]
                       outline-none focus:border-[var(--color-espresso)]/50
                       transition-colors"
            style={{ border: "1px solid var(--color-border-line)" }}
          />
          {search && (
            <button
              onClick={() => {
                setSearch("");
                resetToFirstPage();
              }}
              aria-label="Effacer"
              className="absolute right-3 top-1/2 -translate-y-1/2
                         text-[var(--color-espresso)]/40
                         hover:text-[var(--color-espresso)] transition-colors"
            >
              <X size={13} />
            </button>
          )}
        </div>

        <div className="relative shrink-0">
          <button
            onClick={() => setCategoryOpen((v) => !v)}
            className="inline-flex items-center gap-2 px-3.5 py-2.5
                       text-[0.82rem] text-[var(--color-espresso)]/70
                       hover:text-[var(--color-espresso)] transition-colors"
            style={{ border: "1px solid var(--color-border-line)" }}
          >
            <Filter size={14} strokeWidth={1.5} />
            <span>
              {categoryFilter === "all" ? "Toutes catégories" : categoryFilter}
            </span>
            <ChevronDown
              size={13}
              className={cn("transition-transform", categoryOpen && "rotate-180")}
            />
          </button>

          {categoryOpen && (
            <>
              <div
                className="fixed inset-0 z-20"
                onClick={() => setCategoryOpen(false)}
              />
              <div
                className="absolute right-0 top-full mt-1 w-52 py-1
                           bg-white shadow-xl z-30"
                style={{ border: "1px solid var(--color-border-line)" }}
              >
                <button
                  onClick={() => {
                    setCategoryFilter("all");
                    setCategoryOpen(false);
                    resetToFirstPage();
                  }}
                  className={cn(
                    "w-full text-left px-3 py-2 text-[0.82rem] transition-colors",
                    categoryFilter === "all"
                      ? "bg-[var(--color-cafe-light)] font-medium"
                      : "hover:bg-[var(--color-cafe-dark)]/50"
                  )}
                >
                  Toutes catégories
                </button>
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setCategoryFilter(c);
                      setCategoryOpen(false);
                      resetToFirstPage();
                    }}
                    className={cn(
                      "w-full text-left px-3 py-2 text-[0.82rem] transition-colors",
                      categoryFilter === c
                        ? "bg-[var(--color-cafe-light)] font-medium"
                        : "hover:bg-[var(--color-cafe-dark)]/50"
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-2 px-3.5 py-2.5 shrink-0
                     text-[0.82rem] text-[var(--color-espresso)]/70
                     hover:text-[var(--color-espresso)] transition-colors"
          style={{ border: "1px solid var(--color-border-line)" }}
        >
          <Download size={14} strokeWidth={1.5} />
          <span className="hidden md:inline">Export CSV</span>
        </button>
      </div>

      {/* Tableau */}
      {paginated.length === 0 ? (
        <div
          className="py-20 text-center"
          style={{
            border: "1px solid var(--color-border-line)",
            borderTop: "none",
          }}
        >
          <Briefcase
            size={36}
            strokeWidth={1.2}
            className="mx-auto mb-4 text-[var(--color-espresso)]/25"
          />
          <p className="text-[0.9rem] text-[var(--color-espresso)]/45 italic mb-6">
            {search || categoryFilter !== "all"
              ? "Aucun résultat pour ces critères."
              : "Aucun projet pour le moment."}
          </p>
          {(search || categoryFilter !== "all") && (
            <button
              onClick={() => {
                setSearch("");
                setCategoryFilter("all");
              }}
              className="text-[0.75rem] font-medium uppercase tracking-[0.18em]
                         text-[var(--color-espresso)]/60 underline underline-offset-[5px]
                         hover:text-[var(--color-espresso)] transition-colors"
            >
              Réinitialiser les filtres
            </button>
          )}
        </div>
      ) : (
        <>
          <div
            className="overflow-x-auto"
            style={{
              border: "1px solid var(--color-border-line)",
              borderTop: "none",
            }}
          >
            <table className="w-full min-w-[900px]">
              <thead>
                <tr style={{ backgroundColor: "var(--color-cafe-dark)" }}>
                  <th className="w-12 px-4 py-3">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={toggleAll}
                      className="w-4 h-4 accent-[var(--color-bordeaux)] cursor-pointer"
                    />
                  </th>

                  <SortHeader
                    label="Projet"
                    active={sortKey === "title"}
                    dir={sortDir}
                    onClick={() => handleSort("title")}
                    className="text-left w-[40%]"
                  />

                  <SortHeader
                    label="Catégorie"
                    active={sortKey === "category"}
                    dir={sortDir}
                    onClick={() => handleSort("category")}
                    className="text-left"
                  />

                  <th className="text-left text-[0.65rem] uppercase tracking-[0.2em]
                                 text-[var(--color-espresso)]/55 font-medium px-4 py-3">
                    Lieu
                  </th>

                  <SortHeader
                    label="Année"
                    active={sortKey === "year"}
                    dir={sortDir}
                    onClick={() => handleSort("year")}
                    className="text-left"
                  />

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
                {paginated.map((p) => {
                  const isSelected = selected.has(p.id);
                  return (
                    <tr
                      key={p.id}
                      className={cn(
                        "transition-colors",
                        isSelected
                          ? "bg-[var(--color-cafe-light)]"
                          : "hover:bg-[var(--color-cafe-dark)]/30"
                      )}
                      style={{ borderTop: "1px solid var(--color-border-line)" }}
                    >
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleOne(p.id)}
                          className="w-4 h-4 accent-[var(--color-bordeaux)] cursor-pointer"
                        />
                      </td>

                      <td className="px-4 py-3">
                        <Link
                          href={`/admin/projets/${p.id}`}
                          className="flex items-center gap-3 group"
                        >
                          {p.image && (
                            <div
                              className="relative w-14 h-10 shrink-0
                                         bg-[var(--color-cafe-dark)] overflow-hidden"
                              style={{
                                border: "1px solid var(--color-border-line)",
                              }}
                            >
                              <Image
                                src={p.image}
                                alt={p.title}
                                fill
                                sizes="56px"
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <p
                                className="text-[0.85rem] font-medium truncate
                                           text-[var(--color-espresso)]
                                           group-hover:text-[var(--color-bordeaux)]
                                           transition-colors"
                              >
                                {p.title}
                              </p>
                              {p.featured && (
                                <Star
                                  size={12}
                                  strokeWidth={1.8}
                                  className="text-[var(--color-bordeaux)] fill-[var(--color-bordeaux)] shrink-0"
                                />
                              )}
                            </div>
                            {p.description && (
                              <p className="text-[0.72rem] text-[var(--color-espresso)]/45 truncate mt-0.5">
                                {p.description}
                              </p>
                            )}
                          </div>
                        </Link>
                      </td>

                      <td className="px-4 py-3">
                        {p.category ? (
                          <span
                            className="inline-block px-2 py-1 text-[0.62rem]
                                       font-medium uppercase tracking-[0.14em]
                                       text-[var(--color-espresso)]/60
                                       bg-[var(--color-cafe-dark)]"
                          >
                            {p.category}
                          </span>
                        ) : (
                          <span className="text-[0.78rem] text-[var(--color-espresso)]/35">
                            —
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-3 text-[0.82rem]
                                     text-[var(--color-espresso)]/70 truncate max-w-[180px]">
                        {p.location || "—"}
                      </td>

                      <td className="px-4 py-3 text-[0.82rem]
                                     text-[var(--color-espresso)]/55 tabular-nums">
                        {p.year || "—"}
                      </td>

                      <td className="px-4 py-3 text-[0.82rem]
                                     text-[var(--color-espresso)]/55 tabular-nums whitespace-nowrap">
                        {p.surface || "—"}
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            href={`/admin/projets/${p.id}`}
                            aria-label="Éditer"
                            className="p-2 text-[var(--color-espresso)]/45
                                       hover:text-[var(--color-espresso)]
                                       hover:bg-[var(--color-cafe-dark)]
                                       transition-colors"
                          >
                            <Pencil size={14} strokeWidth={1.5} />
                          </Link>
                          <button
                            onClick={() => handleDeleteClick(p.id, p.title)}
                            aria-label="Supprimer"
                            className="p-2 text-[var(--color-espresso)]/45
                                       hover:text-red-600 hover:bg-red-500/10
                                       transition-colors"
                          >
                            <Trash2 size={14} strokeWidth={1.5} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div
            className="flex flex-col sm:flex-row sm:items-center justify-between
                       gap-3 px-4 py-3"
            style={{ border: "1px solid var(--color-border-line)" }}
          >
            <p className="text-[0.78rem] text-[var(--color-espresso)]/55">
              {filtered.length} projet{filtered.length > 1 ? "s" : ""} ·{" "}
              page {safePage} sur {totalPages}
            </p>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={safePage === 1}
                aria-label="Précédent"
                className="p-2 text-[var(--color-espresso)]/55
                           hover:text-[var(--color-espresso)]
                           hover:bg-[var(--color-cafe-dark)]
                           disabled:opacity-25 disabled:cursor-not-allowed
                           transition-colors"
              >
                <ChevronLeft size={15} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={cn(
                    "min-w-[32px] h-8 px-2 text-[0.78rem] tabular-nums transition-colors",
                    p === safePage
                      ? "bg-[var(--color-espresso)] text-[var(--color-cafe-light)]"
                      : "text-[var(--color-espresso)]/55 hover:bg-[var(--color-cafe-dark)]"
                  )}
                >
                  {p}
                </button>
              ))}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
                aria-label="Suivant"
                className="p-2 text-[var(--color-espresso)]/55
                           hover:text-[var(--color-espresso)]
                           hover:bg-[var(--color-cafe-dark)]
                           disabled:opacity-25 disabled:cursor-not-allowed
                           transition-colors"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </>
      )}

      {/* Barre d'actions groupées */}
      {selected.size > 0 && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40
                     flex items-center gap-3 px-5 py-3
                     bg-[var(--color-espresso)] text-[var(--color-cafe-light)]
                     shadow-2xl"
        >
          <span className="text-[0.82rem] font-medium">
            {selected.size} sélectionné{selected.size > 1 ? "s" : ""}
          </span>

          <span className="w-px h-5 bg-[var(--color-cafe-light)]/20" />

          <button
            onClick={handleBulkDeleteClick}
            className="inline-flex items-center gap-2 px-3 py-1.5
                       text-[0.78rem] font-medium
                       hover:bg-red-500/20 transition-colors"
          >
            <Trash2 size={13} strokeWidth={2} />
            Supprimer
          </button>

          <button
            onClick={clearSelection}
            aria-label="Annuler"
            className="p-1.5 hover:bg-[var(--color-cafe-light)]/10 transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      )}

      <ConfirmDialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false })}
        onConfirm={confirmDelete}
        loading={deleting}
        title={
          deleteDialog.bulk
            ? `Supprimer ${selected.size} projet${selected.size > 1 ? "s" : ""} ?`
            : `Supprimer "${deleteDialog.name}" ?`
        }
        description={
          deleteDialog.bulk
            ? "Cette action supprimera définitivement les projets sélectionnés. Elle est irréversible."
            : "Cette action est irréversible. Le projet sera définitivement supprimé."
        }
        confirmLabel="Supprimer"
        variant="danger"
      />
    </>
  );
}

// ============================================
// SOUS-COMPOSANT
// ============================================
function SortHeader({
  label,
  active,
  dir,
  onClick,
  className,
}: {
  label: string;
  active: boolean;
  dir: "asc" | "desc";
  onClick: () => void;
  className?: string;
}) {
  return (
    <th className={cn("px-4 py-3", className)}>
      <button
        onClick={onClick}
        className={cn(
          "inline-flex items-center gap-1.5 text-[0.65rem] uppercase",
          "tracking-[0.2em] font-medium transition-colors",
          active
            ? "text-[var(--color-espresso)]"
            : "text-[var(--color-espresso)]/55 hover:text-[var(--color-espresso)]/80"
        )}
      >
        {label}
        <ArrowUpDown
          size={11}
          strokeWidth={2}
          className={cn(
            "transition-opacity",
            active ? "opacity-100" : "opacity-30"
          )}
        />
      </button>
    </th>
  );
}