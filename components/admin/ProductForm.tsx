"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Save,
  Trash2,
  Image as ImageIcon,
  FileText,
  Info,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { useToast } from "@/lib/store/toast";
import { createOrUpdateProduct, deleteProduct } from "@/app/admin/actions";
import ImageUploader from "@/components/admin/ImageUploader";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
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
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: initialData?.name ?? "",
    category: initialData?.category ?? "Canapés",
    price: initialData?.price ?? "",
    description: initialData?.description ?? "",
    long_description: initialData?.long_description ?? "",
    image: initialData?.image ?? "",
    featured: initialData?.featured ?? false,
  });

  const update = <K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K]
  ) => setForm((f) => ({ ...f, [key]: value }));

  // ============================================
  // SOUMISSION
  // ============================================
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim()) {
      setError("Le nom du produit est obligatoire.");
      return;
    }
    if (!form.price.trim()) {
      setError("Le prix est obligatoire.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      if (initialData?.id) formData.append("id", initialData.id);
      formData.append("name", form.name.trim());
      formData.append("category", form.category);
      formData.append("price", form.price.trim());
      formData.append("description", form.description);
      formData.append("long_description", form.long_description);
      formData.append("image", form.image);
      if (form.featured) formData.append("featured", "on");

      const result = await createOrUpdateProduct(formData);

      if (!result.success) {
        throw new Error(result.error || "Erreur");
      }

      toast.success(
        mode === "create" ? "Produit créé avec succès" : "Produit mis à jour",
        form.name
      );

      router.push("/admin/produits");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur serveur");
      toast.error("Erreur lors de l'enregistrement");
      setLoading(false);
    }
  };

  // ============================================
  // SUPPRESSION
  // ============================================
  const confirmDelete = async () => {
    if (!initialData?.id) return;
    setDeleting(true);

    try {
      const result = await deleteProduct(initialData.id);
      if (!result.success) throw new Error(result.error);

      toast.success("Produit supprimé", initialData.name);
      router.push("/admin/produits");
      router.refresh();
    } catch (err) {
      toast.error("Erreur lors de la suppression");
      setDeleting(false);
      setDeleteOpen(false);
    }
  };

  const isEdit = mode === "edit";

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-[1400px]">

        {/* ============================================
            HEADER DE PAGE
            ============================================ */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between
                        gap-4 mb-6">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/produits"
              aria-label="Retour"
              className="p-2 text-[var(--color-espresso)]/55
                         hover:text-[var(--color-espresso)]
                         hover:bg-[var(--color-cafe-dark)]
                         transition-colors"
            >
              <ArrowLeft size={18} strokeWidth={1.5} />
            </Link>
            <div>
              <p className="text-[0.62rem] font-medium uppercase tracking-[0.24em]
                            text-[var(--color-espresso)]/45 mb-1">
                Catalogue
              </p>
              <h1 className="text-[1.35rem] lg:text-[1.5rem] font-normal
                             text-[var(--color-espresso)]">
                {isEdit ? form.name || "Éditer le produit" : "Nouveau produit"}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isEdit && (
              <button
                type="button"
                onClick={() => setDeleteOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-3
                           text-[0.72rem] font-medium uppercase tracking-[0.2em]
                           text-red-700 border border-red-200
                           hover:bg-red-50 transition-colors"
              >
                <Trash2 size={13} strokeWidth={2} />
                <span className="hidden md:inline">Supprimer</span>
              </button>
            )}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2
                         bg-[var(--color-espresso)] text-[var(--color-cafe-light)]
                         px-5 py-3 text-[0.72rem] font-medium uppercase tracking-[0.22em]
                         hover:bg-[var(--color-bordeaux)]
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transition-colors"
            >
              <Save size={13} strokeWidth={2} />
              {loading
                ? "Enregistrement…"
                : isEdit
                ? "Enregistrer"
                : "Créer le produit"}
            </button>
          </div>
        </div>

        {/* Erreur globale */}
        {error && (
          <div
            className="mb-6 px-4 py-3 text-[0.85rem] text-red-800 bg-red-50"
            style={{ border: "1px solid rgba(239, 68, 68, 0.2)" }}
          >
            {error}
          </div>
        )}

        {/* ============================================
            GRILLE : Formulaire + Aperçu
            ============================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">

          {/* ---------- COLONNE FORMULAIRE (8 colonnes) ---------- */}
          <div className="lg:col-span-8 space-y-5 lg:space-y-6">

            {/* Section : Informations */}
            <Section
              icon={Info}
              title="Informations principales"
              description="Le nom et la catégorie du produit"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field label="Nom du produit *" className="sm:col-span-2">
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Sofa Atelier N°1"
                    className="input-kan"
                  />
                </Field>

                <Field label="Catégorie *">
                  <select
                    value={form.category}
                    onChange={(e) => update("category", e.target.value)}
                    className="input-kan cursor-pointer"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label="Prix *">
                <input
                  type="text"
                  required
                  value={form.price}
                  onChange={(e) => update("price", e.target.value)}
                  placeholder="€ 4 200"
                  className="input-kan"
                />
              </Field>
            </Section>

            {/* Section : Description */}
            <Section
              icon={FileText}
              title="Description"
              description="Texte affiché sur la fiche produit"
            >
              <Field label="Description courte">
                <textarea
                  rows={2}
                  value={form.description}
                  onChange={(e) => update("description", e.target.value)}
                  placeholder="Canapé 3 places en lin lavé, structure chêne massif."
                  className="input-kan resize-none"
                />
              </Field>

              <Field label="Description longue">
                <textarea
                  rows={5}
                  value={form.long_description}
                  onChange={(e) => update("long_description", e.target.value)}
                  placeholder="Histoire, matériaux, détails de fabrication…"
                  className="input-kan resize-none"
                />
              </Field>
            </Section>

            {/* Section : Image */}
            <Section
              icon={ImageIcon}
              title="Image du produit"
              description="Format portrait 4:5 recommandé"
            >
              <ImageUploader
                value={form.image}
                onChange={(url) => update("image", url)}
                folder="products"
                label="Image principale"
                aspect="portrait"
              />
            </Section>

            {/* Section : Mise en avant */}
            <Section
              icon={Sparkles}
              title="Options"
              description="Visibilité et mise en avant"
            >
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => update("featured", e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-[var(--color-bordeaux)] cursor-pointer"
                />
                <div>
                  <p className="text-[0.85rem] text-[var(--color-espresso)] font-medium">
                    Mettre en avant sur la home
                  </p>
                  <p className="text-[0.78rem] text-[var(--color-espresso)]/55 mt-0.5">
                    Le produit apparaîtra dans la section mise en avant.
                  </p>
                </div>
              </label>
            </Section>
          </div>

          {/* ---------- COLONNE APERÇU (4 colonnes, sticky) ---------- */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
            <div
              className="p-5"
              style={{ border: "1px solid var(--color-border-line)" }}
            >
              <p className="text-[0.62rem] font-medium uppercase tracking-[0.24em]
                            text-[var(--color-espresso)]/45 mb-4">
                Aperçu
              </p>

              {/* Carte produit */}
              <div className="space-y-4">
                {/* Image */}
                <div
                  className="relative aspect-[4/5] bg-[var(--color-cafe-dark)] overflow-hidden"
                  style={{ border: "1px solid var(--color-border-line)" }}
                >
                  {form.image ? (
                    <Image
                      src={form.image}
                      alt={form.name || "Aperçu"}
                      fill
                      sizes="320px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full grid place-items-center">
                      <ImageIcon
                        size={32}
                        strokeWidth={1.2}
                        className="text-[var(--color-espresso)]/25"
                      />
                    </div>
                  )}
                </div>

                {/* Meta */}
                <div className="space-y-2">
                  <p className="text-[0.62rem] font-medium uppercase tracking-[0.24em]
                                text-[var(--color-espresso)]/45">
                    {form.category}
                  </p>
                  <h3 className="text-[1.05rem] font-medium leading-tight
                                 text-[var(--color-espresso)]">
                    {form.name || "Nom du produit"}
                  </h3>
                  <p className="text-[0.95rem] font-medium
                                text-[var(--color-bordeaux)]">
                    {form.price || "€ 0"}
                  </p>
                  {form.description && (
                    <p className="text-[0.78rem] leading-[1.6]
                                  text-[var(--color-espresso)]/55">
                      {form.description}
                    </p>
                  )}
                </div>

                {/* Badge featured */}
                {form.featured && (
                  <div className="flex items-center gap-2 px-3 py-2
                                  bg-[var(--color-bordeaux)]/8
                                  text-[var(--color-bordeaux)]">
                    <Sparkles size={12} strokeWidth={2} />
                    <span className="text-[0.68rem] font-medium uppercase tracking-[0.16em]">
                      Mis en avant
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Aide */}
            <div
              className="mt-4 p-4 text-[0.75rem] leading-[1.6]
                         text-[var(--color-espresso)]/55 bg-[var(--color-cafe-dark)]/40"
              style={{ border: "1px solid var(--color-border-line)" }}
            >
              <p className="font-medium text-[var(--color-espresso)]/75 mb-1">
                💡 Conseil
              </p>
              <p>
                Un bon nom court et une description en 1 phrase améliorent la
                présentation en ligne.
              </p>
            </div>
          </aside>
        </div>

        {/* ============================================
            BARRE D'ACTIONS MOBILE (sticky)
            ============================================ */}
        <div
          className="lg:hidden fixed bottom-0 left-0 right-0 z-40
                     flex items-center justify-between gap-3 px-4 py-3
                     bg-white"
          style={{
            borderTop: "1px solid var(--color-border-line)",
            paddingBottom: "calc(env(safe-area-inset-bottom) + 0.75rem)",
          }}
        >
          <Link
            href="/admin/produits"
            className="text-[0.75rem] font-medium uppercase tracking-[0.18em]
                       text-[var(--color-espresso)]/55
                       hover:text-[var(--color-espresso)] transition-colors"
          >
            Annuler
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2
                       bg-[var(--color-espresso)] text-[var(--color-cafe-light)]
                       px-5 py-2.5 text-[0.7rem] font-medium uppercase tracking-[0.2em]
                       hover:bg-[var(--color-bordeaux)]
                       disabled:opacity-50 transition-colors"
          >
            <Save size={13} strokeWidth={2} />
            {loading ? "…" : isEdit ? "Enregistrer" : "Créer"}
          </button>
        </div>
      </form>

      {/* Dialog de confirmation */}
      <ConfirmDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={confirmDelete}
        loading={deleting}
        title={`Supprimer "${initialData?.name}" ?`}
        description="Cette action est irréversible. Le produit sera définitivement supprimé de la base de données."
        confirmLabel="Supprimer"
        variant="danger"
      />
    </>
  );
}

// ============================================
// SOUS-COMPOSANTS
// ============================================

function Section({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: React.ElementType;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="p-5 lg:p-6 space-y-5"
      style={{ border: "1px solid var(--color-border-line)" }}
    >
      <header className="flex items-start gap-3">
        <span
          className="w-8 h-8 grid place-items-center shrink-0
                     bg-[var(--color-cafe-dark)] text-[var(--color-espresso)]/65"
        >
          <Icon size={15} strokeWidth={1.5} />
        </span>
        <div>
          <h3 className="text-[0.9rem] font-medium text-[var(--color-espresso)]">
            {title}
          </h3>
          {description && (
            <p className="text-[0.78rem] text-[var(--color-espresso)]/55 mt-0.5">
              {description}
            </p>
          )}
        </div>
      </header>
      {children}
    </section>
  );
}

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-[0.65rem] font-medium uppercase
                        tracking-[0.2em] text-[var(--color-espresso)]/55 mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}