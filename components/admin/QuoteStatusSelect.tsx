"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateQuoteStatus } from "@/app/admin/actions";
import type { QuoteStatus } from "@/lib/supabase/types";

const STATUSES: { value: QuoteStatus; label: string }[] = [
  { value: "new",       label: "Nouveau" },
  { value: "contacted", label: "Contacté" },
  { value: "quoted",    label: "Devis envoyé" },
  { value: "won",       label: "Gagné" },
  { value: "lost",      label: "Perdu" },
];

export default function QuoteStatusSelect({
  quoteId,
  currentStatus,
}: {
  quoteId: string;
  currentStatus: QuoteStatus;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<QuoteStatus>(currentStatus);
  const [isPending, startTransition] = useTransition();

  const handleChange = (newStatus: QuoteStatus) => {
    setStatus(newStatus);

    startTransition(async () => {
      const result = await updateQuoteStatus(quoteId, newStatus);
      if (!result.success) {
        setStatus(currentStatus);
        alert(result.error || "Erreur lors du changement de statut.");
      } else {
        router.refresh();
      }
    });
  };

  return (
    <div className="flex items-center gap-3">
      <label className="text-[0.65rem] uppercase tracking-[0.22em]
                        text-[var(--color-espresso)]/55">
        Statut
      </label>
      <select
        value={status}
        disabled={isPending}
        onChange={(e) => handleChange(e.target.value as QuoteStatus)}
        className="px-4 py-2.5 bg-transparent text-[0.85rem]
                   text-[var(--color-espresso)] outline-none cursor-pointer
                   disabled:opacity-50"
        style={{ border: "1px solid var(--color-border-line)" }}
      >
        {STATUSES.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
      {isPending && (
        <span className="text-[0.7rem] text-[var(--color-espresso)]/45">
          Enregistrement…
        </span>
      )}
    </div>
  );
}