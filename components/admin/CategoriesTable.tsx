"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash2,
  ArrowUpDown,
  X,
  Tag,
  Plus,
  Package,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { useToast } from "@/lib/store/toast";
import { deleteCategory } from "@/app/admin/actions";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import type { CategoryRow } from "@/lib/supabase/types";

type SortKey = "name" | "position" | "created_at";
type SortDir = "asc" | "desc";

interface CategoryWithCount extends CategoryRow {
  productsCount: number;
}

export default function CategoriesTable({
  categories: initialCategories,
}: {
  categories: CategoryWithCount[];
}) {
  const router = useRouter();
  const toast = useToast();

  const [categories, setCategories] = useState(initialCategories);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("position");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    id?: string;
    name?: string;
    count?: number;
  }>({ open: false });
  const [deleting, setDeleting] = useState(false);

  // ============================================
  // FILTRAGE + TRI
  // ============================================
  const filtered = useMemo(() => {
    let list = [...categories];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.slug.toLowerCase().includes(q) ||
          c.description?.toLowerCase().includes(q)
      );
    }

    list.sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case "name":
          cmp = a.name.localeCompare(b.name);
          break;
        case "position":
          cmp = a.position - b.position;
          break;
        case "created_at":
          cmp =
            new Date(a.created_at).getTime() -
            new Date(b.created_at).getTime();
          break;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });

    return list;
  }, [categories, search, sortKey, sortDir]);

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
  const handleDeleteClick = (
    id: string,
    name: string,
    count: number
  ) => {
    setDeleteDialog({ open: true, id, name, count });
  };

  const confirmDelete = async () => {
    if (!deleteDialog.id) return;
    setDeleting(true);

    try {
      const result = await deleteCategory(deleteDialog.id);
      if (!result.success) throw new Error(result.error);

      setCategories((prev) => prev.filter((c) => c.id !== deleteDialog.id));
      toast.success("Catégorie supprimée", deleteDialog.name);
      setDeleteDialog({ open: false });
      router.refresh();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Erreur lors de la suppression"
      );
    } finally {
      setDeleting(false);
    }
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
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher une catégorie…"
            className="w-full pl-9 pr-9 py-2.5 bg-transparent text-[0.85rem]
                       outline-none focus:border-[var(--color-espresso)]/50
                       transition-colors"
            style={{ border: "1px solid var(--color-border-line)" }}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              aria-label="Effacer"
              className="absolute right-3 top-1/2 -translate-y-1/2
                         text-[var(--color-espresso)]/40
                         hover:text-[var(--color-espresso)] transition-colors"
            >
              <X size={13} />
            </button>
          )}
        </div>

        <p className="text-[0.78rem] text-[var(--color-espresso)]/55 shrink-0">
          {filtered.length} catégorie{filtered.length > 1 ? "s" : ""}
        </p>
      </div>

      {/* Tableau */}
      {filtered.length === 0 ? (
        <div
          className="py-20 text-center"
          style={{
            border: "1px solid var(--color-border-line)",
            borderTop: "none",
          }}
        >
          <Tag
            size={36}
            strokeWidth={1.2}
            className="mx-auto mb-4 text-[var(--color-espresso)]/25"
          />
          <p className="text-[0.9rem] text-[var(--color-espresso)]/45 italic mb-6">
            {search
              ? "Aucun résultat pour cette recherche."
              : "Aucune catégorie pour le moment."}
          </p>
          {search && (
            <button
              onClick={() => setSearch("")}
              className="text-[0.75rem] font-medium uppercase tracking-[0.18em]
                         text-[var(--color-espresso)]/60 underline underline-offset-[5px]
                         hover:text-[var(--color-espresso)] transition-colors"
            >
              Effacer la recherche
            </button>
          )}
        </div>
      ) : (
        <div
          className="overflow-x-auto"
          style={{
            border: "1px solid var(--color-border-line)",
            borderTop: "none",
          }}
        >
          <table className="w-full min-w-[700px]">
            <thead>
              <tr style={{ backgroundColor: "var(--color-cafe-dark)" }}>
                <SortHeader
                  label="Nom"
                  active={sortKey === "name"}
                  dir={sortDir}
                  onClick={() => handleSort("name")}
                  className="text-left w-[30%]"
                />

                <th className="text-left text-[0.65rem] uppercase tracking-[0.2em]
                               text-[var(--color-espresso)]/55 font-medium px-4 py-3">
                  Slug
                </th>

                <th className="text-left text-[0.65rem] uppercase tracking-[0.2em]
                               text-[var(--color-espresso)]/55 font-medium px-4 py-3">
                  Description
                </th>

                <SortHeader
                  label="Position"
                  active={sortKey === "position"}
                  dir={sortDir}
                  onClick={() => handleSort("position")}
                  className="text-center w-[100px]"
                />

                <th className="text-center text-[0.65rem] uppercase tracking-[0.2em]
                               text-[var(--color-espresso)]/55 font-medium px-4 py-3">
                  Produits
                </th>

                <th className="text-right text-[0.65rem] uppercase tracking-[0.2em]
                               text-[var(--color-espresso)]/55 font-medium px-4 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((cat) => (
                <tr
                  key={cat.id}
                  className="hover:bg-[var(--color-cafe-dark)]/30 transition-colors"
                  style={{ borderTop: "1px solid var(--color-border-line)" }}
                >
                  <td className="px-4 py-3">
                    <p className="text-[0.9rem] font-medium
                                  text-[var(--color-espresso)]">
                      {cat.name}
                    </p>
                  </td>

                  <td className="px-4 py-3">
                    <span className="text-[0.78rem] font-mono
                                     text-[var(--color-espresso)]/50">
                      {cat.slug}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-[0.82rem]
                                 text-[var(--color-espresso)]/60 truncate max-w-[300px]">
                    {cat.description || "—"}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center justify-center
                                     min-w-[32px] h-7 px-2 text-[0.78rem]
                                     font-medium tabular-nums
                                     bg-[var(--color-cafe-dark)]
                                     text-[var(--color-espresso)]">
                      {cat.position}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-center">
                    {cat.productsCount > 0 ? (
                      <span className="inline-flex items-center gap-1.5
                                       text-[0.82rem] text-[var(--color-espresso)]/70">
                        <Package size={12} strokeWidth={1.5} />
                        {cat.productsCount}
                      </span>
                    ) : (
                      <span className="text-[0.82rem] text-[var(--color-espresso)]/35">
                        0
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => {
                          // Ouvre la modale d'édition
                          window.dispatchEvent(
                            new CustomEvent("open-category-edit", {
                              detail: cat,
                            })
                          );
                        }}
                        aria-label="Éditer"
                        className="p-2 text-[var(--color-espresso)]/45
                                   hover:text-[var(--color-espresso)]
                                   hover:bg-[var(--color-cafe-dark)]
                                   transition-colors"
                      >
                        <Pencil size={14} strokeWidth={1.5} />
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteClick(cat.id, cat.name, cat.productsCount)
                        }
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
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false })}
        onConfirm={confirmDelete}
        loading={deleting}
        title={`Supprimer "${deleteDialog.name}" ?`}
        description={
          deleteDialog.count && deleteDialog.count > 0
            ? `Cette catégorie est utilisée par ${deleteDialog.count} produit${
                deleteDialog.count > 1 ? "s" : ""
              }. La suppression échouera probablement.`
            : "Cette action est irréversible. La catégorie sera définitivement supprimée."
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