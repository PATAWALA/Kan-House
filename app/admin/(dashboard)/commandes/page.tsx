import { getOrders } from "@/lib/supabase/orders";
import OrdersTable from "@/components/admin/OrdersTable";

export const metadata = {
  title: "Commandes — Admin Kan House",
};

function parseTotal(value: any): number {
  if (typeof value === "number") return value;
  if (typeof value === "string") return Number(value.replace(/[^\d.]/g, "")) || 0;
  return 0;
}

export default async function AdminCommandesPage() {
  const orders = await getOrders();

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    paid: orders.filter((o) => o.status === "paid").length,
    revenue: orders
      .filter((o) => o.status === "paid" || o.status === "delivered")
      .reduce((sum, o) => sum + parseTotal(o.total), 0),
  };

  return (
    <div className="max-w-[1400px]">
      {/* En-tête */}
      <div className="mb-6">
        <p className="text-[0.62rem] font-medium uppercase tracking-[0.24em]
                      text-[var(--color-espresso)]/45 mb-1">
          Ventes
        </p>
        <h1 className="text-[1.35rem] lg:text-[1.5rem] font-normal
                       text-[var(--color-espresso)]">
          Commandes
        </h1>
      </div>

      {/* Mini-stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total", value: stats.total, accent: false },
          { label: "En attente", value: stats.pending, accent: true },
          { label: "Payées", value: stats.paid, accent: false },
          {
            label: "Chiffre d'affaires",
            value: `€ ${stats.revenue.toLocaleString("fr-FR")}`,
            accent: false,
            small: true,
          },
        ].map((s) => (
          <div
            key={s.label}
            className="p-4 flex flex-col justify-between min-h-[80px]"
            style={{
              border: "1px solid var(--color-border-line)",
              backgroundColor: s.accent ? "var(--color-bordeaux)" : "transparent",
            }}
          >
            <p
              className={`font-normal tabular-nums leading-none mb-1.5 ${
                s.small ? "text-[1rem] lg:text-[1.15rem]" : "text-[1.35rem]"
              }`}
              style={{
                color: s.accent
                  ? "var(--color-cafe-light)"
                  : "var(--color-espresso)",
              }}
            >
              {s.value}
            </p>
            <p
              className="text-[0.6rem] font-medium uppercase tracking-[0.2em]"
              style={{
                color: s.accent
                  ? "rgba(239, 236, 230, 0.6)"
                  : "rgba(26, 26, 26, 0.5)",
              }}
            >
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Table */}
      <OrdersTable orders={orders} />
    </div>
  );
}