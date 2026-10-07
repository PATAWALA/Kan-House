"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, X } from "lucide-react";
import { createOrUpdateCategory, deleteCategory } from "@/app/admin/actions";
import type { CategoryRow } from "@/lib/supabase/types";

export default function CategoryForm({
  mode,
  initialData,
}: {
  mode: "create" | "edit";
  initialData?: CategoryRow;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(mode === "create");
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    if (initialData?.id) formData.append("id", initialData.id);

    const result = await createOrUpdateCategory(formData);

    if (result.success) {
      router.refresh();
      setLoading(false);
      if (mode === "edit") setOpen(false);
    } else {
      setError(result.error || "Erreur");
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!initialData?.id) return;
    if (!confirm("Supprimer cette catégorie ?")) return;

    setDeleting(true);
    const result = await deleteCategory(initialData.id);
    if (result.success) {
      router.refresh();
    } else {
      setError(result.error || "Erreur");
      setDeleting(false);
    }
  };

  if (mode === "create") {
    return (
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl p-5 lg:p-6 mb-6"
        style={{ border: "1px solid var(--color-border-line)" }}
      >
        <p className="text-[0.7rem] uppercase tracking-[0.22em] text-[var(--color-espresso)]/55 mb-5">
          Nouvelle catégorie
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          <input
            type="text"
            name="name"
            required
            placeholder="Nom *"
            className="sm:col-span-2 px-4 py-3 bg-transparent text-[0.9rem] outline-none"
            style={{ border: "1px solid var(--color-border-line)" }}
          />
          <input
            type="number"
            name="position"
            defaultValue={0}
            className="px-4 py-3 bg-transparent text-[0.9rem] outline-none tabular-nums"
            style={{ border: "1px solid var(--color-border-line)" }}
          />
        </div>

        <input
          type="text"
          name="description"
          placeholder="Description (optionnel)"
          className="w-full px-4 py-3 mb-5 bg-transparent text-[0.9rem] outline-none"
          style={{ border: "1px solid var(--color-border-line)" }}
        />

        {error && <p className="text-[0.82rem] text-[var(--color-bordeaux)] mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 bg-[var(--color-espresso)] text-[var(--color-cafe-light)] px-5 py-3 text-[0.68rem] font-medium uppercase tracking-[0.22em] hover:bg-[var(--color-bordeaux)] transition-colors disabled:opacity-50"
        >
          <Plus size={14} />
          {loading ? "Création…" : "Créer"}
        </button>
      </form>
    );
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 text-[0.7rem] uppercase tracking-[0.16em] text-[var(--color-espresso)]/60 hover:text-[var(--color-espresso)] transition-colors"
      >
        <Pencil size={12} />
        Éditer
      </button>
    );
  }

  return (
    <div
      className="p-5 min-w-[320px] text-left"
      style={{ border: "1px solid var(--color-border-line)", backgroundColor: "var(--color-cafe-light)" }}
    >
      <div className="flex items-center justify-between mb-4">
        <p className="text-[0.65rem] uppercase tracking-[0.22em] text-[var(--color-espresso)]/55">
          Éditer
        </p>
        <button onClick={() => setOpen(false)} className="text-[var(--color-espresso)]/45">
          <X size={16} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          required
          defaultValue={initialData?.name}
          className="w-full px-3 py-2 bg-transparent text-[0.85rem] outline-none"
          style={{ border: "1px solid var(--color-border-line)" }}
        />
        <input
          type="text"
          name="description"
          defaultValue={initialData?.description ?? ""}
          className="w-full px-3 py-2 bg-transparent text-[0.85rem] outline-none"
          style={{ border: "1px solid var(--color-border-line)" }}
        />
        <input
          type="number"
          name="position"
          defaultValue={initialData?.position ?? 0}
          className="w-full px-3 py-2 bg-transparent text-[0.85rem] outline-none tabular-nums"
          style={{ border: "1px solid var(--color-border-line)" }}
        />

        {error && <p className="text-[0.75rem] text-[var(--color-bordeaux)]">{error}</p>}

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 bg-[var(--color-espresso)] text-[var(--color-cafe-light)] px-4 py-2 text-[0.65rem] font-medium uppercase tracking-[0.2em] hover:bg-[var(--color-bordeaux)] transition-colors disabled:opacity-50"
          >
            {loading ? "…" : "Enregistrer"}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="text-[0.65rem] uppercase tracking-[0.2em] text-[var(--color-bordeaux)] underline underline-offset-[5px] disabled:opacity-50"
          >
            {deleting ? "…" : "Supprimer"}
          </button>
        </div>
      </form>
    </div>
  );
}