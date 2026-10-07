"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createOrUpdateProject, deleteProject } from "@/app/admin/actions";
import type { ProjectRow } from "@/lib/supabase/types";

const CATEGORIES = ["Hôtel", "Restaurant", "Villa", "Lounge"];

export default function ProjectForm({
  mode,
  initialData,
}: {
  mode: "create" | "edit";
  initialData?: ProjectRow;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    if (initialData?.id) formData.append("id", initialData.id);

    const result = await createOrUpdateProject(formData);

    if (result.success) {
      router.push("/admin/projets");
      router.refresh();
    } else {
      setError(result.error || "Erreur lors de l'enregistrement.");
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!initialData?.id) return;
    if (!confirm("Supprimer ce projet ?")) return;

    setDeleting(true);
    const result = await deleteProject(initialData.id);
    if (result.success) {
      router.push("/admin/projets");
      router.refresh();
    } else {
      setError(result.error || "Erreur lors de la suppression.");
      setDeleting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl">
      <div className="space-y-6">
        <Field label="Titre du projet *">
          <input
            type="text"
            name="title"
            required
            defaultValue={initialData?.title ?? ""}
            className="w-full px-4 py-3 bg-transparent text-[0.95rem] outline-none"
            style={{ border: "1px solid var(--color-border-line)" }}
          />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Field label="Catégorie">
            <select
              name="category"
              defaultValue={initialData?.category ?? "Hôtel"}
              className="w-full px-4 py-3 bg-transparent text-[0.95rem] outline-none cursor-pointer"
              style={{ border: "1px solid var(--color-border-line)" }}
            >
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </Field>

          <Field label="Lieu">
            <input
              type="text"
              name="location"
              defaultValue={initialData?.location ?? ""}
              placeholder="Bordeaux, France"
              className="w-full px-4 py-3 bg-transparent text-[0.95rem] outline-none"
              style={{ border: "1px solid var(--color-border-line)" }}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Field label="Année">
            <input
              type="text"
              name="year"
              defaultValue={initialData?.year ?? ""}
              placeholder="2024"
              className="w-full px-4 py-3 bg-transparent text-[0.95rem] outline-none"
              style={{ border: "1px solid var(--color-border-line)" }}
            />
          </Field>

          <Field label="Surface">
            <input
              type="text"
              name="surface"
              defaultValue={initialData?.surface ?? ""}
              placeholder="1 200 m²"
              className="w-full px-4 py-3 bg-transparent text-[0.95rem] outline-none"
              style={{ border: "1px solid var(--color-border-line)" }}
            />
          </Field>
        </div>

        <Field label="Description">
          <textarea
            name="description"
            rows={4}
            defaultValue={initialData?.description ?? ""}
            className="w-full px-4 py-3 bg-transparent text-[0.95rem] outline-none resize-none"
            style={{ border: "1px solid var(--color-border-line)" }}
          />
        </Field>

        <Field label="URL de l'image">
          <input
            type="url"
            name="image"
            defaultValue={initialData?.image ?? ""}
            placeholder="https://..."
            className="w-full px-4 py-3 bg-transparent text-[0.95rem] outline-none"
            style={{ border: "1px solid var(--color-border-line)" }}
          />
        </Field>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={initialData?.featured ?? false}
            className="w-4 h-4 accent-[var(--color-espresso)]"
          />
          <span className="text-[0.85rem] text-[var(--color-espresso)]/75">
            Mettre en avant
          </span>
        </label>
      </div>

      {error && (
        <p className="text-[0.82rem] text-[var(--color-bordeaux)] mt-6">{error}</p>
      )}

      <div className="flex flex-wrap items-center gap-4 mt-10">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2
                     bg-[var(--color-espresso)] text-[var(--color-cafe-light)]
                     px-6 py-3 text-[0.68rem] font-medium uppercase tracking-[0.22em]
                     hover:bg-[var(--color-bordeaux)] transition-colors
                     disabled:opacity-50"
        >
          {loading
            ? "Enregistrement…"
            : mode === "create"
            ? "Créer le projet"
            : "Enregistrer"}
        </button>

        {mode === "edit" && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="text-[0.68rem] uppercase tracking-[0.2em]
                       text-[var(--color-bordeaux)]
                       underline underline-offset-[5px]
                       disabled:opacity-50"
          >
            {deleting ? "Suppression…" : "Supprimer"}
          </button>
        )}

        <button
          type="button"
          onClick={() => router.push("/admin/projets")}
          className="text-[0.68rem] uppercase tracking-[0.2em]
                     text-[var(--color-espresso)]/55
                     underline underline-offset-[5px] ml-auto"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-[0.65rem] uppercase tracking-[0.22em]
                        text-[var(--color-espresso)]/55 mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}