"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, Eye, EyeOff, Key, User as UserIcon, Mail } from "lucide-react";
import { cn } from "@/lib/cn";
import { useToast } from "@/lib/store/toast";
import {
  createAdminUser,
  updateAdminUser,
  type AdminUser,
} from "@/app/admin/actions";

interface UserModalProps {
  open: boolean;
  onClose: () => void;
  initialData?: AdminUser | null;
}

export default function UserModal({
  open,
  onClose,
  initialData,
}: UserModalProps) {
  const router = useRouter();
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const isEdit = !!initialData;

  useEffect(() => {
    if (open) {
      setForm({
        name: initialData?.name ?? "",
        email: initialData?.email ?? "",
        password: "",
      });
      setError("");
      setShowPassword(false);
    }
  }, [open, initialData]);

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

    if (!isEdit) {
      if (!form.email.trim() || !form.email.includes("@")) {
        setError("Email invalide.");
        return;
      }
      if (!form.password || form.password.length < 8) {
        setError("Le mot de passe doit contenir au moins 8 caractères.");
        return;
      }
    } else {
      if (form.password && form.password.length > 0 && form.password.length < 8) {
        setError("Le mot de passe doit contenir au moins 8 caractères.");
        return;
      }
    }

    setLoading(true);

    try {
      const formData = new FormData();
      if (initialData?.id) formData.append("id", initialData.id);
      formData.append("name", form.name.trim());
      formData.append("email", form.email.trim().toLowerCase());
      if (form.password) formData.append("password", form.password);

      const result = isEdit
        ? await updateAdminUser(formData)
        : await createAdminUser(formData);

      if (!result.success) {
        throw new Error(result.error || "Erreur");
      }

      toast.success(
        isEdit ? "Utilisateur mis à jour" : "Utilisateur créé",
        form.name
      );

      onClose();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur serveur");
    } finally {
      setLoading(false);
    }
  };

  const generatePassword = () => {
    const chars =
      "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789!@#$%";
    let pwd = "";
    for (let i = 0; i < 14; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setForm({ ...form, password: pwd });
    setShowPassword(true);
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
                  {isEdit ? "Éditer" : "Nouvel"}
                </p>
                <h2 className="text-[1.05rem] font-medium text-[var(--color-espresso)]">
                  {isEdit ? initialData?.name : "Utilisateur admin"}
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

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="p-6 space-y-5">

                {/* Nom */}
                <div>
                  <label className="block text-[0.65rem] font-medium uppercase
                                    tracking-[0.2em] text-[var(--color-espresso)]/55 mb-2">
                    Nom complet *
                  </label>
                  <div className="relative">
                    <UserIcon
                      size={14}
                      strokeWidth={1.5}
                      className="absolute left-3 top-1/2 -translate-y-1/2
                                 text-[var(--color-espresso)]/40 pointer-events-none"
                    />
                    <input
                      type="text"
                      required
                      autoFocus
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Amandine Laurès"
                      className="input-kan pl-9"
                    />
                  </div>
                </div>

                {/* Email — désactivé en édition */}
                <div>
                  <label className="block text-[0.65rem] font-medium uppercase
                                    tracking-[0.2em] text-[var(--color-espresso)]/55 mb-2">
                    Email {!isEdit && "*"}
                  </label>
                  <div className="relative">
                    <Mail
                      size={14}
                      strokeWidth={1.5}
                      className="absolute left-3 top-1/2 -translate-y-1/2
                                 text-[var(--color-espresso)]/40 pointer-events-none"
                    />
                    <input
                      type="email"
                      required={!isEdit}
                      disabled={isEdit}
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      placeholder="amandine@kanhouse.com"
                      className={cn(
                        "input-kan pl-9",
                        isEdit && "opacity-60 cursor-not-allowed"
                      )}
                    />
                  </div>
                  {isEdit && (
                    <p className="text-[0.72rem] text-[var(--color-espresso)]/45 mt-1.5">
                      L'email ne peut pas être modifié.
                    </p>
                  )}
                </div>

                {/* Mot de passe */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-[0.65rem] font-medium uppercase
                                      tracking-[0.2em] text-[var(--color-espresso)]/55">
                      Mot de passe {!isEdit && "*"}
                    </label>
                    <button
                      type="button"
                      onClick={generatePassword}
                      className="inline-flex items-center gap-1.5 text-[0.7rem]
                                 font-medium uppercase tracking-[0.16em]
                                 text-[var(--color-bordeaux)]
                                 hover:opacity-75 transition-opacity"
                    >
                      <Key size={11} strokeWidth={2} />
                      Générer
                    </button>
                  </div>

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required={!isEdit}
                      value={form.password}
                      onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                      }
                      placeholder={
                        isEdit
                          ? "Laisser vide pour ne pas changer"
                          : "Minimum 8 caractères"
                      }
                      className="input-kan pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={showPassword ? "Masquer" : "Afficher"}
                      className="absolute right-3 top-1/2 -translate-y-1/2
                                 text-[var(--color-espresso)]/40
                                 hover:text-[var(--color-espresso)]
                                 transition-colors"
                    >
                      {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>

                  {isEdit && (
                    <p className="text-[0.72rem] text-[var(--color-espresso)]/45 mt-1.5">
                      Remplir uniquement pour changer le mot de passe.
                    </p>
                  )}
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
                    : isEdit
                    ? "Enregistrer"
                    : "Créer l'utilisateur"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}