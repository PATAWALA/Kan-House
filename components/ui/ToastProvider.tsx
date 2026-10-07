"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, X, AlertCircle, Info } from "lucide-react";
import { useToastStore, type ToastType } from "@/lib/store/toast";

const STYLES: Record<
  ToastType,
  { bg: string; color: string; border: string; icon: typeof Check }
> = {
  success: {
    bg: "rgba(16, 185, 129, 0.1)",
    color: "#047857",
    border: "rgba(16, 185, 129, 0.2)",
    icon: Check,
  },
  error: {
    bg: "rgba(239, 68, 68, 0.1)",
    color: "#B91C1C",
    border: "rgba(239, 68, 68, 0.2)",
    icon: AlertCircle,
  },
  info: {
    bg: "rgba(74, 29, 30, 0.08)",
    color: "var(--color-bordeaux)",
    border: "rgba(74, 29, 30, 0.15)",
    icon: Info,
  },
};

export default function ToastProvider() {
  const toasts = useToastStore((s) => s.toasts);
  const remove = useToastStore((s) => s.remove);

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          const style = STYLES[toast.type];
          const Icon = style.icon;
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto flex items-start gap-3 px-4 py-3
                         bg-white shadow-lg min-w-[320px] max-w-md"
              style={{ border: `1px solid ${style.border}` }}
            >
              <span
                className="w-6 h-6 grid place-items-center shrink-0 mt-0.5"
                style={{ backgroundColor: style.bg, color: style.color }}
              >
                <Icon size={13} strokeWidth={2.4} />
              </span>

              <div className="flex-1 min-w-0">
                <p className="text-[0.85rem] font-medium text-[var(--color-espresso)]">
                  {toast.title}
                </p>
                {toast.description && (
                  <p className="text-[0.78rem] text-[var(--color-espresso)]/60 mt-0.5">
                    {toast.description}
                  </p>
                )}
              </div>

              <button
                onClick={() => remove(toast.id)}
                aria-label="Fermer"
                className="shrink-0 p-1 text-[var(--color-espresso)]/35
                           hover:text-[var(--color-espresso)] transition-colors"
              >
                <X size={13} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}