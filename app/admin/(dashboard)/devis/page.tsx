import Link from "next/link";
import { Eye, Inbox } from "lucide-react";
import { getQuotes } from "@/lib/supabase/quotes";

const STATUS_LABELS: Record<string, string> = {
  new: "Nouveau",
  contacted: "Contacté",
  quoted: "Devis envoyé",
  won: "Gagné",
  lost: "Perdu",
};

const STATUS_STYLES: Record<string, { bg: string; text: string }> = {
  new:       { bg: "var(--color-bordeaux)",                text: "var(--color-cafe-light)" },
  contacted: { bg: "rgba(74, 29, 30, 0.15)",               text: "var(--color-bordeaux)" },
  quoted:    { bg: "rgba(26, 26, 26, 0.08)",               text: "var(--color-espresso)" },
  won:       { bg: "rgba(20, 83, 45, 0.12)",               text: "#14532D" },
  lost:      { bg: "rgba(26, 26, 26, 0.05)",               text: "rgba(26,26,26,0.5)" },
};

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default async function AdminDevisPage() {
  const quotes = await getQuotes();

  return (
    <div>
      {/* En-tête */}
      <div className="flex items-center justify-between mb-8">
        <p className="text-[0.85rem] text-[var(--color-espresso)]/55">
          {quotes.length} demande{quotes.length > 1 ? "s" : ""}
        </p>
      </div>

      {/* Liste vide */}
      {quotes.length === 0 ? (
        <div
          className="py-20 text-center"
          style={{ border: "1px solid var(--color-border-line)" }}
        >
          <Inbox
            size={32}
            strokeWidth={1.2}
            className="mx-auto mb-4 text-[var(--color-espresso)]/25"
          />
          <p className="text-[0.9rem] text-[var(--color-espresso)]/45 italic">
            Aucune demande pour l'instant.
          </p>
          <p className="text-[0.75rem] text-[var(--color-espresso)]/35 mt-2">
            Les demandes du wizard /start-project apparaîtront ici.
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
                <th className="text-left text-[0.65rem] uppercase tracking-[0.2em]
                               text-[var(--color-espresso)]/55 font-medium
                               px-4 py-3">
                  Référence
                </th>
                <th className="text-left text-[0.65rem] uppercase tracking-[0.2em]
                               text-[var(--color-espresso)]/55 font-medium
                               px-4 py-3">
                  Contact
                </th>
                <th className="text-left text-[0.65rem] uppercase tracking-[0.2em]
                               text-[var(--color-espresso)]/55 font-medium
                               px-4 py-3">
                  Type
                </th>
                <th className="text-left text-[0.65rem] uppercase tracking-[0.2em]
                               text-[var(--color-espresso)]/55 font-medium
                               px-4 py-3">
                  Date
                </th>
                <th className="text-left text-[0.65rem] uppercase tracking-[0.2em]
                               text-[var(--color-espresso)]/55 font-medium
                               px-4 py-3">
                  Statut
                </th>
                <th className="text-right text-[0.65rem] uppercase tracking-[0.2em]
                               text-[var(--color-espresso)]/55 font-medium
                               px-4 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((q) => {
                const style = STATUS_STYLES[q.status] ?? STATUS_STYLES.new;
                const label = STATUS_LABELS[q.status] ?? q.status;
                return (
                  <tr
                    key={q.id}
                    style={{ borderTop: "1px solid var(--color-border-line)" }}
                  >
                    <td className="px-4 py-3 text-[0.82rem]
                                   text-[var(--color-espresso)] tabular-nums">
                      {q.reference}
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-[0.85rem] text-[var(--color-espresso)] truncate">
                        {q.contact_name || "—"}
                      </p>
                      <p className="text-[0.72rem] text-[var(--color-espresso)]/50 truncate">
                        {q.email}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-[0.82rem]
                                   text-[var(--color-espresso)]/60 capitalize">
                      {q.venue_type || "—"}
                    </td>
                    <td className="px-4 py-3 text-[0.82rem]
                                   text-[var(--color-espresso)]/60 whitespace-nowrap">
                      {formatDate(q.created_at)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="inline-block px-3 py-1
                                   text-[0.6rem] font-medium uppercase tracking-[0.16em]
                                   whitespace-nowrap"
                        style={{
                          backgroundColor: style.bg,
                          color: style.text,
                        }}
                      >
                        {label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/admin/devis/${q.id}`}
                        className="inline-flex items-center gap-1.5
                                   text-[0.7rem] uppercase tracking-[0.16em]
                                   text-[var(--color-espresso)]/60
                                   hover:text-[var(--color-espresso)]
                                   transition-colors"
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