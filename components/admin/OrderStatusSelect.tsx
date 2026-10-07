"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateOrderStatus } from "@/app/admin/actions";
import type { OrderStatus } from "@/lib/supabase/types";

const STATUSES: { value: OrderStatus; label: string }[] = [
  { value: "pending",   label: "En attente" },
  { value: "paid",      label: "Payée" },
  { value: "shipped",   label: "Expédiée" },
  { value: "delivered", label: "Livrée" },
  { value: "cancelled", label: "Annulée" },
];

export default function OrderStatusSelect({
  orderId,
  currentStatus,
}: {
  orderId: string;
  currentStatus: OrderStatus;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<OrderStatus>(currentStatus);
  const [isPending, startTransition] = useTransition();

  const handleChange = (newStatus: OrderStatus) => {
    setStatus(newStatus);
    startTransition(async () => {
      const result = await updateOrderStatus(orderId, newStatus);
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
      <label className="text-[0.65rem] uppercase tracking-[0.22em] text-[var(--color-espresso)]/55">
        Statut
      </label>
      <select
        value={status}
        disabled={isPending}
        onChange={(e) => handleChange(e.target.value as OrderStatus)}
        className="px-4 py-2.5 bg-transparent text-[0.85rem] text-[var(--color-espresso)] outline-none cursor-pointer disabled:opacity-50"
        style={{ border: "1px solid var(--color-border-line)" }}
      >
        {STATUSES.map((s) => (
          <option key={s.value} value={s.value}>{s.label}</option>
        ))}
      </select>
      {isPending && (
        <span className="text-[0.7rem] text-[var(--color-espresso)]/45">Enregistrement…</span>
      )}
    </div>
  );
}