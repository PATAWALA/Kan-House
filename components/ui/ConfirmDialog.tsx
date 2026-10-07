"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";
import { cn } from "@/lib/cn";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "default";
  loading?: boolean;
}

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirmer",
  cancelLabel = "Annuler",
  variant = "danger",
  loading = false,
}: ConfirmDialogProps) {
  // Ferme avec Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape" && !loading) onClose();
    }
    if (open) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose, loading]);

  // Empêche le scroll du body
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
          {/* Fond sombre */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !loading && onClose()}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md bg-white shadow-2xl"
            style={{ border: "1px solid var(--color-border-line)" }}
          >
            {/* Header */}
            <div className="flex items-start gap-4 p-6 pb-5">
              <span
                className={cn(
                  "w-10 h-10 grid place-items-center shrink-0",
                  variant === "danger"
                    ? "bg-red-500/10 text-red-700"
                    : "bg-[var(--color-cafe-dark)] text-[var(--color-espresso)]/65"
                )}
              >
                <AlertTriangle size={18} strokeWidth={1.8} />
              </span>

              <div className="flex-1 min-w-0">
                <h3 className="text-[1rem] font-medium text-[var(--color-espresso)] mb-1">
                  {title}
                </h3>
                {description && (
                  <p className="text-[0.85rem] leading-[1.6] text-[var(--color-espresso)]/60">
                    {description}
                  </p>
                )}
              </div>

              <button
                onClick={() => !loading && onClose()}
                aria-label="Fermer"
                className="shrink-0 p-1 text-[var(--color-espresso)]/35
                           hover:text-[var(--color-espresso)] transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Actions */}
            <div
              className="flex items-center justify-end gap-3 px-6 py-4"
              style={{ borderTop: "1px solid var(--color-border-line)" }}
            >
              <button
                onClick={onClose}
                disabled={loading}
                className="px-4 py-2.5 text-[0.78rem] font-medium
                           text-[var(--color-espresso)]/70
                           hover:text-[var(--color-espresso)]
                           transition-colors disabled:opacity-50"
              >
                {cancelLabel}
              </button>

              <button
                onClick={onConfirm}
                disabled={loading}
                className={cn(
                  "px-5 py-2.5 text-[0.78rem] font-medium text-white",
                  "transition-colors disabled:opacity-50",
                  variant === "danger"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-[var(--color-espresso)] hover:bg-[var(--color-bordeaux)]"
                )}
              >
                {loading ? "…" : confirmLabel}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}