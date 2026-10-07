"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Trash2,
  ArrowUpDown,
  X,
  ShoppingBag,
  Download,
  Package,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { useToast } from "@/lib/store/toast";
import { deleteOrder } from "@/app/admin/actions";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import type { OrderRow, OrderStatus } from "@/lib/supabase/types";

const ITEMS_PER_PAGE = 10;

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "En attente",
  paid: "Payée",
  shipped: "Expédiée",
  delivered: "Livrée",
  cancelled: "Annulée",
};

const STATUS_STYLES: Record<OrderStatus, { bg: string; text: string }> = {
  pending:   { bg: "rgba(245, 158, 11, 0.12)", text: "#92400E" },
  paid:      { bg: "rgba(20, 83, 45, 0.12)",   text: "#14532D" },
  shipped:   { bg: "rgba(74, 29, 30, 0.12)",   text: "var(--color-bordeaux)" },
  delivered: { bg: "rgba(26, 26, 26, 0.08)",   text: "var(--color-espresso)" },
  cancelled: { bg: "rgba(26, 26, 26, 0.05)",   text: "rgba(26,26,26,0.5)" },
};

type SortKey = "created_at" | "customer_name" | "total" | "status";
type SortDir = "asc" | "desc";
type StatusFilter = OrderStatus | "all";

function countItems(items: any): number {
  if (!Array.isArray(items)) return 0;
  return items.reduce((sum: number, i: any) => sum + (i.quantity ?? 1), 0);
}

function parseTotal(value: any): number {
  if (typeof value === "number") return value;
  if (typeof value === "string") return Number(value.replace(/[^\d.]/g, "")) || 0;
  return 0;
}

export default function OrdersTable({ orders: initialOrders }: { orders: OrderRow[] }) {
  const router = useRouter();
  const toast = useToast();

  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortKey, setSortKey] = useState<SortKey>("created_at");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [statusOpen, setStatusOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    id?: string;
    name?: string;
    bulk?: boolean;
  }>({ open: false });
  const [deleting, setDeleting] = useState(false);

  // ============================================
  // FILTRAGE + TRI
  // ============================================
  const filtered = useMemo(() => {
    let list = [...orders];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (o) =>
          o.reference.toLowerCase().includes(q) ||
          o.customer_name?.toLowerCase().includes(q) ||
          o.customer_email?.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== "all") {
      list = list.filter((o) => o.status === statusFilter);
    }

    list.sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case "customer_name":
          cmp = (a.customer_name ?? "").localeCompare(b.customer_name ?? "");
          break;
        case "total":
          cmp = parseTotal(a.total) - parseTotal(b.total);
          break;
        case "status":
          cmp = a.status.localeCompare(b.status);
          break;
        case "created_at":
        default:
          cmp =
            new Date(a.created_at).getTime() -
            new Date(b.created_at).getTime();
      }
      return sortDir === "asc" ? cmp : -cmp;
    });

    return list;
  }, [orders, search, statusFilter, sortKey, sortDir]);

  // ============================================
  // PAGINATION
  // ============================================
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  );

  const resetToFirstPage = () => setPage(1);

  // ============================================
  // SÉLECTION
  // ============================================
  const toggleOne = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const toggleAll = () => {
    if (selected.size === paginated.length) setSelected(new Set());
    else setSelected(new Set(paginated.map((o) => o.id)));
  };

  const clearSelection = () => setSelected(new Set());
  const allSelected = paginated.length > 0 && selected.size === paginated.length;

  // ============================================
  // TRI
  // ============================================
  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  // ============================================
  // SUPPRESSION
  // ============================================
  const handleDeleteClick = (id: string, name: string) => {
    setDeleteDialog({ open: true, id, name });
  };

  const handleBulkDeleteClick = () => {
    setDeleteDialog({ open: true, bulk: true });
  };

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      if (deleteDialog.bulk) {
        const ids = Array.from(selected);
        for (const id of ids) {
          const result = await deleteOrder(id);
          if (!result.success) throw new Error(result.error);
        }
        setOrders((prev) => prev.filter((o) => !selected.has(o.id)));
        toast.success(
          `${ids.length} commande${ids.length > 1 ? "s" : ""} supprimée${
            ids.length > 1 ? "s" : ""
          }`
        );
        clearSelection();
      } else if (deleteDialog.id) {
        const result = await deleteOrder(deleteDialog.id);
        if (!result.success) throw new Error(result.error);
        setOrders((prev) => prev.filter((o) => o.id !== deleteDialog.id));
        toast.success("Commande supprimée");
      }
      setDeleteDialog({ open: false });
      router.refresh();
    } catch {
      toast.error("Erreur lors de la suppression");
    } finally {
      setDeleting(false);
    }
  };

  // ============================================
  // EXPORT CSV
  // ============================================
  const handleExportCSV = () => {
    const headers = [
      "Référence",
      "Client",
      "Email",
      "Articles",
      "Total",
      "Statut",
      "Date",
    ];
    const rows = filtered.map((o) => [
      o.reference,
      o.customer_name ?? "",
      o.customer_email ?? "",
      countItems(o.items),
      `€ ${parseTotal(o.total).toLocaleString("fr-FR")}`,
      STATUS_LABELS[o.status] ?? o.status,
      new Date(o.created_at).toLocaleDateString("fr-FR"),
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");

    const blob = new Blob([`\uFEFF${csv}`], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `kan-house-commandes-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Export CSV téléchargé");
  };

  // ============================================
  // RENDER
  // ============================================
  return (
    <>
      {/* Barre d'outils */}
      <div
        className="flex flex-col lg:flex-row lg:items-center gap-3 p-4"
        style={{
          borderTop: "1px solid var(--color-border-line)",
          borderLeft: "1px solid var(--color-border-line)",
          borderRight: "1px solid var(--color-border-line)",
        }}
      >
        <div className="relative flex-1 min-w-[200px]">
          <Search
            size={15}
            strokeWidth={1.5}
            className="absolute left-3 top-1/2 -translate-y-1/2
                       text-[var(--color-espresso)]/40 pointer-events-none"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              resetToFirstPage();
            }}
            placeholder="Rechercher une commande…"
            className="w-full pl-9 pr-9 py-2.5 bg-transparent text-[0.85rem]
                       outline-none focus:border-[var(--color-espresso)]/50
                       transition-colors"
            style={{ border: "1px solid var(--color-border-line)" }}
          />
          {search && (
            <button
              onClick={() => {
                setSearch("");
                resetToFirstPage();
              }}
              aria-label="Effacer"
              className="absolute right-3 top-1/2 -translate-y-1/2
                         text-[var(--color-espresso)]/40
                         hover:text-[var(--color-espresso)] transition-colors"
            >
              <X size={13} />
            </button>
          )}
        </div>

        <div className="relative shrink-0">
          <button
            onClick={() => setStatusOpen((v) => !v)}
            className="inline-flex items-center gap-2 px-3.5 py-2.5
                       text-[0.82rem] text-[var(--color-espresso)]/70
                       hover:text-[var(--color-espresso)] transition-colors"
            style={{ border: "1px solid var(--color-border-line)" }}
          >
            <Filter size={14} strokeWidth={1.5} />
            <span>
              {statusFilter === "all" ? "Tous les statuts" : STATUS_LABELS[statusFilter]}
            </span>
            <ChevronDown
              size={13}
              className={cn("transition-transform", statusOpen && "rotate-180")}
            />
          </button>

          {statusOpen && (
            <>
              <div className="fixed inset-0 z-20" onClick={() => setStatusOpen(false)} />
              <div
                className="absolute right-0 top-full mt-1 w-52 py-1
                           bg-white shadow-xl z-30"
                style={{ border: "1px solid var(--color-border-line)" }}
              >
                <button
                  onClick={() => {
                    setStatusFilter("all");
                    setStatusOpen(false);
                    resetToFirstPage();
                  }}
                  className={cn(
                    "w-full text-left px-3 py-2 text-[0.82rem] transition-colors",
                    statusFilter === "all"
                      ? "bg-[var(--color-cafe-light)] font-medium"
                      : "hover:bg-[var(--color-cafe-dark)]/50"
                  )}
                >
                  Tous les statuts
                </button>
                {(Object.keys(STATUS_LABELS) as OrderStatus[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setStatusFilter(s);
                      setStatusOpen(false);
                      resetToFirstPage();
                    }}
                    className={cn(
                      "w-full text-left px-3 py-2 text-[0.82rem] transition-colors",
                      statusFilter === s
                        ? "bg-[var(--color-cafe-light)] font-medium"
                        : "hover:bg-[var(--color-cafe-dark)]/50"
                    )}
                  >
                    {STATUS_LABELS[s]}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-2 px-3.5 py-2.5 shrink-0
                     text-[0.82rem] text-[var(--color-espresso)]/70
                     hover:text-[var(--color-espresso)] transition-colors"
          style={{ border: "1px solid var(--color-border-line)" }}
        >
          <Download size={14} strokeWidth={1.5} />
          <span className="hidden md:inline">Export CSV</span>
        </button>
      </div>

      {/* Tableau */}
      {paginated.length === 0 ? (
        <div
          className="py-20 text-center"
          style={{
            border: "1px solid var(--color-border-line)",
            borderTop: "none",
          }}
        >
          <ShoppingBag
            size={36}
            strokeWidth={1.2}
            className="mx-auto mb-4 text-[var(--color-espresso)]/25"
          />
          <p className="text-[0.9rem] text-[var(--color-espresso)]/45 italic mb-6">
            {search || statusFilter !== "all"
              ? "Aucun résultat pour ces critères."
              : "Aucune commande pour le moment."}
          </p>
          {(search || statusFilter !== "all") && (
            <button
              onClick={() => {
                setSearch("");
                setStatusFilter("all");
              }}
              className="text-[0.75rem] font-medium uppercase tracking-[0.18em]
                         text-[var(--color-espresso)]/60 underline underline-offset-[5px]
                         hover:text-[var(--color-espresso)] transition-colors"
            >
              Réinitialiser les filtres
            </button>
          )}
        </div>
      ) : (
        <>
          <div
            className="overflow-x-auto"
            style={{
              border: "1px solid var(--color-border-line)",
              borderTop: "none",
            }}
          >
            <table className="w-full min-w-[900px]">
              <thead>
                <tr style={{ backgroundColor: "var(--color-cafe-dark)" }}>
                  <th className="w-12 px-4 py-3">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={toggleAll}
                      className="w-4 h-4 accent-[var(--color-bordeaux)] cursor-pointer"
                    />
                  </th>

                  <th className="text-left text-[0.65rem] uppercase tracking-[0.2em]
                                 text-[var(--color-espresso)]/55 font-medium px-4 py-3">
                    Référence
                  </th>

                  <SortHeader
                    label="Client"
                    active={sortKey === "customer_name"}
                    dir={sortDir}
                    onClick={() => handleSort("customer_name")}
                    className="text-left"
                  />

                  <th className="text-left text-[0.65rem] uppercase tracking-[0.2em]
                                 text-[var(--color-espresso)]/55 font-medium px-4 py-3">
                    Articles
                  </th>

                  <SortHeader
                    label="Total"
                    active={sortKey === "total"}
                    dir={sortDir}
                    onClick={() => handleSort("total")}
                    className="text-right"
                  />

                  <SortHeader
                    label="Statut"
                    active={sortKey === "status"}
                    dir={sortDir}
                    onClick={() => handleSort("status")}
                    className="text-left"
                  />

                  <th className="text-left text-[0.65rem] uppercase tracking-[0.2em]
                                 text-[var(--color-espresso)]/55 font-medium px-4 py-3">
                    Date
                  </th>

                  <th className="text-right text-[0.65rem] uppercase tracking-[0.2em]
                                 text-[var(--color-espresso)]/55 font-medium px-4 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((o) => {
                  const isSelected = selected.has(o.id);
                  const statusStyle = STATUS_STYLES[o.status];
                  const total = parseTotal(o.total);
                  const items = countItems(o.items);

                  return (
                    <tr
                      key={o.id}
                      className={cn(
                        "transition-colors",
                        isSelected
                          ? "bg-[var(--color-cafe-light)]"
                          : "hover:bg-[var(--color-cafe-dark)]/30"
                      )}
                      style={{ borderTop: "1px solid var(--color-border-line)" }}
                    >
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleOne(o.id)}
                          className="w-4 h-4 accent-[var(--color-bordeaux)] cursor-pointer"
                        />
                      </td>

                      <td className="px-4 py-3">
                        <Link
                          href={`/admin/commandes/${o.id}`}
                          className="text-[0.8rem] font-mono
                                     text-[var(--color-espresso)]
                                     hover:text-[var(--color-bordeaux)]
                                     transition-colors tabular-nums"
                        >
                          {o.reference}
                        </Link>
                      </td>

                      <td className="px-4 py-3">
                        <Link
                          href={`/admin/commandes/${o.id}`}
                          className="block group"
                        >
                          <p className="text-[0.85rem] font-medium truncate
                                        text-[var(--color-espresso)]
                                        group-hover:text-[var(--color-bordeaux)]
                                        transition-colors">
                            {o.customer_name || "Client anonyme"}
                          </p>
                          {o.customer_email && (
                            <p className="text-[0.72rem] text-[var(--color-espresso)]/50 truncate">
                              {o.customer_email}
                            </p>
                          )}
                        </Link>
                      </td>

                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1.5
                                         text-[0.78rem] text-[var(--color-espresso)]/70">
                          <Package size={12} strokeWidth={1.5} />
                          {items}
                        </span>
                      </td>

                      <td className="px-4 py-3 text-right text-[0.85rem]
                                     text-[var(--color-espresso)] font-medium
                                     tabular-nums whitespace-nowrap">
                        € {total.toLocaleString("fr-FR")}
                      </td>

                      <td className="px-4 py-3">
                        <span
                          className="inline-block px-2 py-1 text-[0.6rem]
                                     font-medium uppercase tracking-[0.14em]
                                     whitespace-nowrap"
                          style={{
                            backgroundColor: statusStyle.bg,
                            color: statusStyle.text,
                          }}
                        >
                          {STATUS_LABELS[o.status] ?? o.status}
                        </span>
                      </td>

                      <td className="px-4 py-3 text-[0.78rem]
                                     text-[var(--color-espresso)]/55 whitespace-nowrap">
                        {new Date(o.created_at).toLocaleDateString("fr-FR", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            href={`/admin/commandes/${o.id}`}
                            aria-label="Voir"
                            className="p-2 text-[var(--color-espresso)]/45
                                       hover:text-[var(--color-espresso)]
                                       hover:bg-[var(--color-cafe-dark)]
                                       transition-colors"
                          >
                            <Eye size={14} strokeWidth={1.5} />
                          </Link>
                          <button
                            onClick={() => handleDeleteClick(o.id, o.reference)}
                            aria-label="Supprimer"
                            className="p-2 text-[var(--color-espresso)]/45
                                       hover:text-red-600 hover:bg-red-500/10
                                       transition-colors"
                          >
                            <Trash2 size={14} strokeWidth={1.5} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div
            className="flex flex-col sm:flex-row sm:items-center justify-between
                       gap-3 px-4 py-3"
            style={{ border: "1px solid var(--color-border-line)" }}
          >
            <p className="text-[0.78rem] text-[var(--color-espresso)]/55">
              {filtered.length} commande{filtered.length > 1 ? "s" : ""} ·{" "}
              page {safePage} sur {totalPages}
            </p>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={safePage === 1}
                aria-label="Précédent"
                className="p-2 text-[var(--color-espresso)]/55
                           hover:text-[var(--color-espresso)]
                           hover:bg-[var(--color-cafe-dark)]
                           disabled:opacity-25 disabled:cursor-not-allowed
                           transition-colors"
              >
                <ChevronLeft size={15} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={cn(
                    "min-w-[32px] h-8 px-2 text-[0.78rem] tabular-nums transition-colors",
                    p === safePage
                      ? "bg-[var(--color-espresso)] text-[var(--color-cafe-light)]"
                      : "text-[var(--color-espresso)]/55 hover:bg-[var(--color-cafe-dark)]"
                  )}
                >
                  {p}
                </button>
              ))}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
                aria-label="Suivant"
                className="p-2 text-[var(--color-espresso)]/55
                           hover:text-[var(--color-espresso)]
                           hover:bg-[var(--color-cafe-dark)]
                           disabled:opacity-25 disabled:cursor-not-allowed
                           transition-colors"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </>
      )}

      {/* Barre d'actions groupées */}
      {selected.size > 0 && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40
                     flex items-center gap-3 px-5 py-3
                     bg-[var(--color-espresso)] text-[var(--color-cafe-light)]
                     shadow-2xl"
        >
          <span className="text-[0.82rem] font-medium">
            {selected.size} sélectionnée{selected.size > 1 ? "s" : ""}
          </span>

          <span className="w-px h-5 bg-[var(--color-cafe-light)]/20" />

          <button
            onClick={handleBulkDeleteClick}
            className="inline-flex items-center gap-2 px-3 py-1.5
                       text-[0.78rem] font-medium
                       hover:bg-red-500/20 transition-colors"
          >
            <Trash2 size={13} strokeWidth={2} />
            Supprimer
          </button>

          <button
            onClick={clearSelection}
            aria-label="Annuler"
            className="p-1.5 hover:bg-[var(--color-cafe-light)]/10 transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      )}

      <ConfirmDialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false })}
        onConfirm={confirmDelete}
        loading={deleting}
        title={
          deleteDialog.bulk
            ? `Supprimer ${selected.size} commande${selected.size > 1 ? "s" : ""} ?`
            : `Supprimer ${deleteDialog.name} ?`
        }
        description={
          deleteDialog.bulk
            ? "Cette action supprimera définitivement les commandes sélectionnées. Elle est irréversible."
            : "Cette action est irréversible. La commande sera définitivement supprimée."
        }
        confirmLabel="Supprimer"
        variant="danger"
      />
    </>
  );
}

// ============================================
// SOUS-COMPOSANT
// ============================================
function SortHeader({
  label,
  active,
  dir,
  onClick,
  className,
}: {
  label: string;
  active: boolean;
  dir: "asc" | "desc";
  onClick: () => void;
  className?: string;
}) {
  return (
    <th className={cn("px-4 py-3", className)}>
      <button
        onClick={onClick}
        className={cn(
          "inline-flex items-center gap-1.5 text-[0.65rem] uppercase",
          "tracking-[0.2em] font-medium transition-colors",
          active
            ? "text-[var(--color-espresso)]"
            : "text-[var(--color-espresso)]/55 hover:text-[var(--color-espresso)]/80"
        )}
      >
        {label}
        <ArrowUpDown
          size={11}
          strokeWidth={2}
          className={cn("transition-opacity", active ? "opacity-100" : "opacity-30")}
        />
      </button>
    </th>
  );
}