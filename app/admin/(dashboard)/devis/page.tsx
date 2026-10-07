import { getQuotes } from "@/lib/supabase/quotes";
import QuotesTable from "@/components/admin/QuotesTable";

export const metadata = {
  title: "Devis B2B — Admin Kan House",
};

export default async function AdminDevisPage() {
  const quotes = await getQuotes();

  const stats = {
    total: quotes.length,
    new: quotes.filter((q) => q.status === "new").length,
    won: quotes.filter((q) => q.status === "won").length,
    lost: quotes.filter((q) => q.status === "lost").length,
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
          Devis B2B
        </h1>
      </div>

      {/* Mini-stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total", value: stats.total, accent: false },
          { label: "Nouveaux", value: stats.new, accent: true },
          { label: "Gagnés", value: stats.won, accent: false },
          { label: "Perdus", value: stats.lost, accent: false },
        ].map((s) => (
          <div
            key={s.label}
            className="p-4 flex flex-col"
            style={{
              border: "1px solid var(--color-border-line)",
              backgroundColor: s.accent
                ? "var(--color-bordeaux)"
                : "transparent",
            }}
          >
            <p
              className="text-[1.35rem] font-normal tabular-nums leading-none mb-1.5"
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
      <QuotesTable quotes={quotes} />
    </div>
  );
}