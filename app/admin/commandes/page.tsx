import Link from "next/link";
import { Eye, ShoppingBag } from "lucide-react";
import { getOrders } from "@/lib/supabase/orders";

const STATUS_LABELS: Record<string, string> = {
  pending:   "En attente",
  paid:      "Payée",
  shipped:   "Expédiée",
  delivered: "Livrée",
  cancelled: "Annulée",
};

const STATUS_STYLES: Record<string, { bg: string; text: string }> = {
  pending:   { bg: "rgba(245, 158, 11, 0.15)", text: "#92400E" },
  paid:      { bg: "rgba(20, 83, 45, 0.12)",   text: "#14532D" },
  shipped:   { bg: "rgba(74, 29, 30, 0.15)",   text: "var(--color-bordeaux)" },
  delivered: { bg: "rgba(26, 26, 26, 0.08)",   text: "var(--color-espresso)" },
  cancelled: { bg: "rgba(26, 26, 26, 0.05)",   text: "rgba(26,26,26,0.5)" },
};

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default async function AdminCommandesPage() {
  const orders = await getOrders();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <p className="text-[0.85rem] text-[var(--color-espresso)]/55">
          {orders.length} commande{orders.length > 1 ? "s" : ""}
        </p>
      </div>

      {orders.length === 0 ? (
        <div
          className="py-20 text-center"
          style={{ border: "1px solid var(--color-border-line)" }}
        >
          <ShoppingBag
            size={32}
            strokeWidth={1.2}
            className="mx-auto mb-4 text-[var(--color-espresso)]/25"
          />
          <p className="text-[0.9rem] text-[var(--color-espresso)]/45 italic">
            Aucune commande pour l'instant.
          </p>
        </div>
      ) : (
        <div
          className="overflow-x-auto"
          style={{ border: "1px solid var(--color-border-line)" }}
        >
          <table className="w-full min-w-[800px]">
            <thead>
              <tr style={{ backgroundColor: "var(--color-cafe-dark)" }}>
                <th className="text-left text-[0.65rem] uppercase tracking-[0.2em] text-[var(--color-espresso)]/55 font-medium px-4 py-3">Référence</th>
                <th className="text-left text-[0.65rem] uppercase tracking-[0.2em] text-[var(--color-espresso)]/55 font-medium px-4 py-3">Client</th>
                <th className="text-left text-[0.65rem] uppercase tracking-[0.2em] text-[var(--color-espresso)]/55 font-medium px-4 py-3">Date</th>
                <th className="text-right text-[0.65rem] uppercase tracking-[0.2em] text-[var(--color-espresso)]/55 font-medium px-4 py-3">Total</th>
                <th className="text-left text-[0.65rem] uppercase tracking-[0.2em] text-[var(--color-espresso)]/55 font-medium px-4 py-3">Statut</th>
                <th className="text-right text-[0.65rem] uppercase tracking-[0.2em] text-[var(--color-espresso)]/55 font-medium px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => {
                const style = STATUS_STYLES[o.status] ?? STATUS_STYLES.pending;
                const label = STATUS_LABELS[o.status] ?? o.status;
                return (
                  <tr key={o.id} style={{ borderTop: "1px solid var(--color-border-line)" }}>
                    <td className="px-4 py-3 text-[0.82rem] text-[var(--color-espresso)] tabular-nums">{o.reference}</td>
                    <td className="px-4 py-3">
                      <p className="text-[0.85rem] text-[var(--color-espresso)] truncate">{o.customer_name || "—"}</p>
                      <p className="text-[0.72rem] text-[var(--color-espresso)]/50 truncate">{o.customer_email}</p>
                    </td>
                    <td className="px-4 py-3 text-[0.82rem] text-[var(--color-espresso)]/60 whitespace-nowrap">{formatDate(o.created_at)}</td>
                    <td className="px-4 py-3 text-right text-[0.85rem] text-[var(--color-espresso)] tabular-nums">
                      € {Number(o.total).toLocaleString("fr-FR")}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="inline-block px-3 py-1 text-[0.6rem] font-medium uppercase tracking-[0.16em] whitespace-nowrap"
                        style={{ backgroundColor: style.bg, color: style.text }}
                      >
                        {label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/admin/commandes/${o.id}`}
                        className="inline-flex items-center gap-1.5 text-[0.7rem] uppercase tracking-[0.16em] text-[var(--color-espresso)]/60 hover:text-[var(--color-espresso)] transition-colors"
                      >
                        <Eye size={12} />
                        Voir
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}