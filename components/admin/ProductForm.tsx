"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createOrUpdateProduct, deleteProduct } from "@/app/admin/actions";
import type { ProductRow } from "@/lib/supabase/types";

const CATEGORIES = [
  "Canapés",
  "Fauteuils",
  "Tables",
  "Luminaires",
  "Rangement",
  "Textiles",
];

export default function ProductForm({
  mode,
  initialData,
}: {
  mode: "create" | "edit";
  initialData?: ProductRow;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const [image, setImage] = useState(initialData?.image ?? "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    if (initialData?.id) {
      formData.append("id", initialData.id);
    }

    const result = await createOrUpdateProduct(formData);

    if (result.success) {
      router.push("/admin/produits");
      router.refresh();
    } else {
      setError(result.error || "Erreur lors de l'enregistrement.");
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!initialData?.id) return;
    if (!confirm("Supprimer définitivement ce produit ?")) return;

    setDeleting(true);
    const result = await deleteProduct(initialData.id);

    if (result.success) {
      router.push("/admin/produits");
      router.refresh();
    } else {
      setError(result.error || "Erreur lors de la suppression.");
      setDeleting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl">
      <div className="space-y-6">
        <Field label="Nom du produit *">
          <input
            type="text"
            name="name"
            required
            defaultValue={initialData?.name ?? ""}
            className="w-full px-4 py-3 bg-transparent text-[0.95rem] outline-none
                       focus:border-[var(--color-espresso)]/60 transition-colors"
            style={{ border: "1px solid var(--color-border-line)" }}
          />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Field label="Catégorie *">
            <select
              name="category"
              required
              defaultValue={initialData?.category ?? "Canapés"}
              className="w-full px-4 py-3 bg-transparent text-[0.95rem] outline-none
                         cursor-pointer"
              style={{ border: "1px solid var(--color-border-line)" }}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </Field>

          <Field label="Prix *">
            <input
              type="text"
              name="price"
              required
              defaultValue={initialData?.price ?? ""}
              placeholder="€ 4 200"
              className="w-full px-4 py-3 bg-transparent text-[0.95rem] outline-none
                         focus:border-[var(--color-espresso)]/60 transition-colors"
              style={{ border: "1px solid var(--color-border-line)" }}
            />
          </Field>
        </div>

        <Field label="Description courte">
          <textarea
            name="description"
            rows={2}
            defaultValue={initialData?.description ?? ""}
            placeholder="Une phrase qui résume la pièce"
            className="w-full px-4 py-3 bg-transparent text-[0.95rem] outline-none
                       resize-none focus:border-[var(--color-espresso)]/60 transition-colors"
            style={{ border: "1px solid var(--color-border-line)" }}
          />
        </Field>

        <Field label="Description longue">
          <textarea
            name="long_description"
            rows={5}
            defaultValue={initialData?.long_description ?? ""}
            placeholder="Histoire, matériaux, détails de fabrication…"
            className="w-full px-4 py-3 bg-transparent text-[0.95rem] outline-none
                       resize-none focus:border-[var(--color-espresso)]/60 transition-colors"
            style={{ border: "1px solid var(--color-border-line)" }}
          />
        </Field>

        <Field label="URL de l'image">
          <input
            type="url"
            name="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://..."
            className="w-full px-4 py-3 bg-transparent text-[0.95rem] outline-none
                       focus:border-[var(--color-espresso)]/60 transition-colors"
            style={{ border: "1px solid var(--color-border-line)" }}
          />
        </Field>

        {/* Aperçu */}
        {image && (
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.22em]
                          text-[var(--color-espresso)]/55 mb-2">
              Aperçu
            </p>
            <div
              className="w-32 h-40 bg-[var(--color-cafe-dark)] overflow-hidden"
              style={{ border: "1px solid var(--color-border-line)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt="Aperçu"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          </div>
        )}

        {/* Featured */}
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={initialData?.featured ?? false}
            className="w-4 h-4 accent-[var(--color-espresso)]"
          />
          <span className="text-[0.85rem] text-[var(--color-espresso)]/75">
            Mettre en avant sur la home
          </span>
        </label>
      </div>

      {error && (
        <p className="text-[0.82rem] text-[var(--color-bordeaux)] mt-6">{error}</p>
      )}

      {/* Actions */}
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
            ? "Créer le produit"
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
                       hover:opacity-70 transition-opacity
                       disabled:opacity-50"
          >
            {deleting ? "Suppression…" : "Supprimer"}
          </button>
        )}

        <button
          type="button"
          onClick={() => router.push("/admin/produits")}
          className="text-[0.68rem] uppercase tracking-[0.2em]
                     text-[var(--color-espresso)]/55
                     underline underline-offset-[5px]
                     hover:text-[var(--color-espresso)] transition-colors
                     ml-auto"
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