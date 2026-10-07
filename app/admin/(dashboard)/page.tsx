import Link from "next/link";
import {
  Package,
  ShoppingBag,
  FileText,
  Briefcase,
  ArrowUpRight,
  Plus,
  TrendingUp,
  Clock,
  Eye,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import KpiCard from "@/components/admin/KpiCard";
import DashboardGreeting from "@/components/admin/DashboardGreeting";

const STATUS_LABELS: Record<string, string> = {
  new: "Nouveau",
  contacted: "Contacté",
  quoted: "Devis envoyé",
  won: "Gagné",
  lost: "Perdu",
  pending: "En attente",
  paid: "Payée",
  shipped: "Expédiée",
  delivered: "Livrée",
  cancelled: "Annulée",
};

async function getStats() {
  const supabase = await createClient();
  const [products, orders, quotes, projects] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("orders").select("*", { count: "exact", head: true }),
    supabase
      .from("quotes")
      .select("*", { count: "exact", head: true })
      .eq("status", "new"),
    supabase.from("projects").select("*", { count: "exact", head: true }),
  ]);
  return {
    products: products?.count ?? 0,
    orders: orders?.count ?? 0,
    quotesNew: quotes?.count ?? 0,
    projects: projects?.count ?? 0,
  };
}

async function getRecentQuotes() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("quotes")
    .select("id, reference, contact_name, email, venue_type, status, created_at")
    .order("created_at", { ascending: false })
    .limit(4);
  return data ?? [];
}

async function getRecentOrders() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("orders")
    .select("id, reference, customer_name, customer_email, total, status, created_at")
    .order("created_at", { ascending: false })
    .limit(4);
  return data ?? [];
}

function timeAgo(date: string): string {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 1) return "à l'instant";
  if (mins < 60) return `il y a ${mins} min`;
  if (hours < 24) return `il y a ${hours} h`;
  return `il y a ${days} j`;
}

export default async function AdminHomePage() {
  const stats = await getStats();
  const recentQuotes = await getRecentQuotes();
  const recentOrders = await getRecentOrders();

  return (
    <div className="max-w-[1400px]">

      {/* En-tête personnalisé */}
      <DashboardGreeting />

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <KpiCard
          label="Devis en attente"
          value={stats.quotesNew}
          iconName="file-text"
          href="/admin/devis"
          variant="bordeaux"
          trend={{ value: 24, direction: "up", label: "vs semaine dernière" }}
        />
        <KpiCard
          label="Commandes"
          value={stats.orders}
          iconName="shopping-bag"
          href="/admin/commandes"
          variant="sand"
          trend={{ value: 8, direction: "up", label: "vs mois dernier" }}
        />
        <KpiCard
          label="Produits"
          value={stats.products}
          iconName="package"
          href="/admin/produits"
          variant="default"
        />
        <KpiCard
          label="Projets"
          value={stats.projects}
          iconName="briefcase"
          href="/admin/projets"
          variant="espresso"
        />
      </div>

      {/* Actions rapides */}
      <div className="mb-8">
        <p className="text-[0.62rem] font-medium uppercase tracking-[0.24em]
                      text-[var(--color-espresso)]/45 mb-4">
          Actions rapides
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: "Nouveau produit", href: "/admin/produits/nouveau", icon: Plus },
            { label: "Nouveau projet", href: "/admin/projets/nouveau", icon: Plus },
            { label: "Voir les devis", href: "/admin/devis", icon: Eye },
            { label: "Voir le site", href: "/", icon: ArrowUpRight, external: true },
          ].map(({ label, href, icon: Icon, external }) => (
            <Link
              key={label}
              href={href}
              target={external ? "_blank" : undefined}
              className="group flex items-center gap-3 px-4 py-3 text-[0.78rem]
                         text-[var(--color-espresso)]/75 hover:text-[var(--color-espresso)]
                         hover:bg-[var(--color-cafe-dark)]/50 transition-colors"
              style={{ border: "1px solid var(--color-border-line)" }}
            >
              <span className="w-7 h-7 grid place-items-center
                               bg-[var(--color-cafe-dark)] text-[var(--color-espresso)]/65
                               group-hover:bg-[var(--color-espresso)] group-hover:text-[var(--color-cafe-light)]
                               transition-colors">
                <Icon size={13} strokeWidth={1.8} />
              </span>
              <span className="truncate">{label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Activité récente */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Devis récents */}
        <section style={{ border: "1px solid var(--color-border-line)" }}>
          <header
            className="flex items-center justify-between px-5 py-4"
            style={{ borderBottom: "1px solid var(--color-border-line)" }}
          >
            <div className="flex items-center gap-2.5">
              <TrendingUp size={14} strokeWidth={1.5}
                          className="text-[var(--color-bordeaux)]" />
              <p className="text-[0.72rem] font-medium uppercase tracking-[0.2em]
                            text-[var(--color-espresso)]/75">
                Devis récents
              </p>
            </div>
            <Link
              href="/admin/devis"
              className="inline-flex items-center gap-1 text-[0.68rem] font-medium
                         uppercase tracking-[0.18em] text-[var(--color-espresso)]/55
                         hover:text-[var(--color-espresso)] transition-colors"
            >
              Voir tout
              <ArrowUpRight size={11} />
            </Link>
          </header>

          {recentQuotes.length === 0 ? (
            <div className="px-5 py-10 text-center">
              <p className="text-[0.82rem] text-[var(--color-espresso)]/40 italic">
                Aucun devis pour le moment.
              </p>
            </div>
          ) : (
            <ul>
              {recentQuotes.map((q: any) => (
                <li
                  key={q.id}
                  className="flex items-center justify-between gap-4 px-5 py-3.5
                             hover:bg-[var(--color-cafe-dark)]/30 transition-colors"
                  style={{ borderBottom: "1px solid var(--color-border-line)" }}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-[0.85rem] text-[var(--color-espresso)] truncate">
                        {q.contact_name || "Sans nom"}
                      </p>
                      <span className="shrink-0 text-[0.55rem] font-medium uppercase
                                       tracking-[0.16em] px-1.5 py-0.5
                                       bg-[var(--color-bordeaux)] text-[var(--color-cafe-light)]">
                        {STATUS_LABELS[q.status] || q.status}
                      </span>
                    </div>
                    <p className="text-[0.72rem] text-[var(--color-espresso)]/50 truncate">
                      {q.email} · {q.venue_type || "Type non précisé"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Clock size={11} className="text-[var(--color-espresso)]/35" />
                    <span className="text-[0.68rem] text-[var(--color-espresso)]/45 whitespace-nowrap">
                      {timeAgo(q.created_at)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Commandes récentes */}
        <section style={{ border: "1px solid var(--color-border-line)" }}>
          <header
            className="flex items-center justify-between px-5 py-4"
            style={{ borderBottom: "1px solid var(--color-border-line)" }}
          >
            <div className="flex items-center gap-2.5">
              <ShoppingBag size={14} strokeWidth={1.5}
                           className="text-[var(--color-bordeaux)]" />
              <p className="text-[0.72rem] font-medium uppercase tracking-[0.2em]
                            text-[var(--color-espresso)]/75">
                Commandes récentes
              </p>
            </div>
            <Link
              href="/admin/commandes"
              className="inline-flex items-center gap-1 text-[0.68rem] font-medium
                         uppercase tracking-[0.18em] text-[var(--color-espresso)]/55
                         hover:text-[var(--color-espresso)] transition-colors"
            >
              Voir tout
              <ArrowUpRight size={11} />
            </Link>
          </header>

          {recentOrders.length === 0 ? (
            <div className="px-5 py-10 text-center">
              <p className="text-[0.82rem] text-[var(--color-espresso)]/40 italic">
                Aucune commande pour le moment.
              </p>
            </div>
          ) : (
            <ul>
              {recentOrders.map((o: any) => (
                <li
                  key={o.id}
                  className="flex items-center justify-between gap-4 px-5 py-3.5
                             hover:bg-[var(--color-cafe-dark)]/30 transition-colors"
                  style={{ borderBottom: "1px solid var(--color-border-line)" }}
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-[0.85rem] text-[var(--color-espresso)] truncate mb-0.5">
                      {o.customer_name || o.reference}
                    </p>
                    <p className="text-[0.72rem] text-[var(--color-espresso)]/50 truncate">
                      {o.customer_email}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[0.85rem] text-[var(--color-espresso)] tabular-nums">
                      € {Number(o.total).toLocaleString("fr-FR")}
                    </p>
                    <p className="text-[0.68rem] text-[var(--color-espresso)]/45">
                      {timeAgo(o.created_at)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}