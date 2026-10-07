"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Save } from "lucide-react";
import { cn } from "@/lib/cn";
import { useToast } from "@/lib/store/toast";
import { createOrUpdateCategory } from "@/app/admin/actions";
import type { CategoryRow } from "@/lib/supabase/types";

interface CategoryModalProps {
  open: boolean;
  onClose: () => void;
  initialData?: CategoryRow | null;
}

export default function CategoryModal({
  open,
  onClose,
  initialData,
}: CategoryModalProps) {
  const router = useRouter();
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    description: "",
    position: 0,
  });

  // Reset à chaque ouverture
  useEffect(() => {
    if (open) {
      setForm({
        name: initialData?.name ?? "",
        description: initialData?.description ?? "",
        position: initialData?.position ?? 0,
      });
      setError("");
    }
  }, [open, initialData]);

  // Escape + blocage scroll
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape" && !loading) onClose();
    }
    if (open) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", handleKey);
        document.body.style.overflow = "";
      };
    }
  }, [open, onClose, loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim()) {
      setError("Le nom est obligatoire.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      if (initialData?.id) formData.append("id", initialData.id);
      formData.append("name", form.name.trim());
      formData.append("description", form.description.trim());
      formData.append("position", String(form.position));

      const result = await createOrUpdateCategory(formData);
      if (!result.success) throw new Error(result.error);

      toast.success(
        initialData ? "Catégorie mise à jour" : "Catégorie créée",
        form.name
      );

      onClose();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !loading && onClose()}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg bg-white shadow-2xl"
            style={{ border: "1px solid var(--color-border-line)" }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-4"
              style={{ borderBottom: "1px solid var(--color-border-line)" }}
            >
              <div>
                <p className="text-[0.62rem] font-medium uppercase tracking-[0.24em]
                              text-[var(--color-espresso)]/45 mb-0.5">
                  {initialData ? "Éditer" : "Nouvelle"}
                </p>
                <h2 className="text-[1.05rem] font-medium text-[var(--color-espresso)]">
                  {initialData
                    ? initialData.name
                    : "Catégorie"}
                </h2>
              </div>

              <button
                onClick={() => !loading && onClose()}
                aria-label="Fermer"
                className="p-2 text-[var(--color-espresso)]/45
                           hover:text-[var(--color-espresso)]
                           hover:bg-[var(--color-cafe-dark)]
                           transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <form onSubmit={handleSubmit}>
              <div className="p-6 space-y-5">

                <div>
                  <label className="block text-[0.65rem] font-medium uppercase
                                    tracking-[0.2em] text-[var(--color-espresso)]/55 mb-2">
                    Nom *
                  </label>
                  <input
                    type="text"
                    required
                    autoFocus
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    placeholder="Canapés"
                    className="input-kan"
                  />
                </div>

                <div>
                  <label className="block text-[0.65rem] font-medium uppercase
                                    tracking-[0.2em] text-[var(--color-espresso)]/55 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    placeholder="Catégorie regroupant les canapés et sofas"
                    className="input-kan resize-none"
                  />
                </div>

                <div>
                  <label className="block text-[0.65rem] font-medium uppercase
                                    tracking-[0.2em] text-[var(--color-espresso)]/55 mb-2">
                    Position
                  </label>
                  <input
                    type="number"
                    value={form.position}
                    onChange={(e) =>
                      setForm({ ...form, position: Number(e.target.value) })
                    }
                    className="input-kan tabular-nums"
                  />
                  <p className="text-[0.72rem] text-[var(--color-espresso)]/45 mt-1.5">
                    Plus le nombre est petit, plus la catégorie apparaît haut dans
                    les filtres.
                  </p>
                </div>

                {error && (
                  <p className="text-[0.82rem] text-[var(--color-bordeaux)]">
                    {error}
                  </p>
                )}
              </div>

              {/* Footer */}
              <div
                className="flex items-center justify-end gap-3 px-6 py-4"
                style={{ borderTop: "1px solid var(--color-border-line)" }}
              >
                <button
                  type="button"
                  onClick={onClose}
                  disabled={loading}
                  className="px-4 py-2.5 text-[0.78rem] font-medium
                             text-[var(--color-espresso)]/70
                             hover:text-[var(--color-espresso)]
                             transition-colors disabled:opacity-50"
                >
                  Annuler
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2
                             bg-[var(--color-espresso)] text-[var(--color-cafe-light)]
                             px-5 py-2.5 text-[0.72rem] font-medium uppercase tracking-[0.2em]
                             hover:bg-[var(--color-bordeaux)]
                             disabled:opacity-50 disabled:cursor-not-allowed
                             transition-colors"
                >
                  <Save size={13} strokeWidth={2} />
                  {loading
                    ? "Enregistrement…"
                    : initialData
                    ? "Enregistrer"
                    : "Créer"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}