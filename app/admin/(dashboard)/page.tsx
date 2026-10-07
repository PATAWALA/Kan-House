import Link from "next/link";
import {
  Package,
  ShoppingBag,
  FileText,
  Briefcase,
  ArrowUpRight,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";

async function getCounts() {
  const supabase = await createClient();

  const [products, orders, quotes, projects] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("orders").select("*", { count: "exact", head: true }),
    supabase.from("quotes").select("*", { count: "exact", head: true }),
    supabase.from("projects").select("*", { count: "exact", head: true }),
  ]);

  return {
    products: products.count ?? 0,
    orders: orders.count ?? 0,
    quotes: quotes.count ?? 0,
    projects: projects.count ?? 0,
  };
}

async function getRecentQuotes() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("quotes")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);
  return data ?? [];
}

async function getRecentOrders() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);
  return data ?? [];
}

export default async function AdminHomePage() {
  const counts = await getCounts();
  const recentQuotes = await getRecentQuotes();
  const recentOrders = await getRecentOrders();

  const STATS = [
    { label: "Produits",  value: counts.products, icon: Package,     href: "/admin/produits" },
    { label: "Commandes", value: counts.orders,   icon: ShoppingBag, href: "/admin/commandes" },
    { label: "Devis B2B", value: counts.quotes,   icon: FileText,    href: "/admin/devis" },
    { label: "Projets",   value: counts.projects, icon: Briefcase,   href: "/admin/projets" },
  ];

  return (
    <div>
      {/* ---------- Cartes stats ---------- */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-8 lg:mb-10">
        {STATS.map(({ label, value, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className="p-5 lg:p-6 block hover:bg-[var(--color-cafe-dark)]/40 transition-colors"
            style={{ border: "1px solid var(--color-border-line)" }}
          >
            <Icon
              size={18}
              strokeWidth={1.4}
              className="text-[var(--color-espresso)]/55 mb-5 lg:mb-6"
            />
            <p className="text-[1.5rem] lg:text-[1.75rem] font-normal
                          text-[var(--color-espresso)] mb-1 leading-none tabular-nums">
              {value}
            </p>
            <p className="text-[0.6rem] lg:text-[0.65rem] uppercase tracking-[0.22em]
                          text-[var(--color-espresso)]/50">
              {label}
            </p>
          </Link>
        ))}
      </div>

      {/* ---------- Sections récentes ---------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">

        {/* Devis récents */}
        <section
          className="p-5 lg:p-6"
          style={{ border: "1px solid var(--color-border-line)" }}
        >
          <header className="flex items-center justify-between mb-6">
            <p className="text-[0.7rem] uppercase tracking-[0.2em]
                          text-[var(--color-espresso)]/55">
              Devis B2B récents
            </p>
            <Link
              href="/admin/devis"
              className="inline-flex items-center gap-1
                         text-[0.65rem] uppercase tracking-[0.2em]
                         text-[var(--color-espresso)]/60
                         hover:text-[var(--color-espresso)]
                         transition-colors"
            >
              Voir tout
              <ArrowUpRight size={11} />
            </Link>
          </header>

          {recentQuotes.length === 0 ? (
            <p className="text-[0.85rem] text-[var(--color-espresso)]/40 italic py-4">
              Aucune demande pour le moment.
            </p>
          ) : (
            <ul className="space-y-3">
              {recentQuotes.map((q: any) => (
                <li
                  key={q.id}
                  className="flex items-center justify-between gap-3 pb-3"
                  style={{ borderBottom: "1px solid var(--color-border-line)" }}
                >
                  <div className="min-w-0">
                    <p className="text-[0.85rem] text-[var(--color-espresso)] truncate">
                      {q.company || q.contact_name || "Sans nom"}
                    </p>
                    <p className="text-[0.72rem] text-[var(--color-espresso)]/50 truncate">
                      {q.email}
                    </p>
                  </div>
                  <span className="text-[0.65rem] uppercase tracking-[0.16em]
                                   text-[var(--color-espresso)]/45 shrink-0">
                    {q.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Commandes récentes */}
        <section
          className="p-5 lg:p-6"
          style={{ border: "1px solid var(--color-border-line)" }}
        >
          <header className="flex items-center justify-between mb-6">
            <p className="text-[0.7rem] uppercase tracking-[0.2em]
                          text-[var(--color-espresso)]/55">
              Commandes récentes
            </p>
            <Link
              href="/admin/commandes"
              className="inline-flex items-center gap-1
                         text-[0.65rem] uppercase tracking-[0.2em]
                         text-[var(--color-espresso)]/60
                         hover:text-[var(--color-espresso)]
                         transition-colors"
            >
              Voir tout
              <ArrowUpRight size={11} />
            </Link>
          </header>

          {recentOrders.length === 0 ? (
            <p className="text-[0.85rem] text-[var(--color-espresso)]/40 italic py-4">
              Aucune commande pour le moment.
            </p>
          ) : (
            <ul className="space-y-3">
              {recentOrders.map((o: any) => (
                <li
                  key={o.id}
                  className="flex items-center justify-between gap-3 pb-3"
                  style={{ borderBottom: "1px solid var(--color-border-line)" }}
                >
                  <div className="min-w-0">
                    <p className="text-[0.85rem] text-[var(--color-espresso)] truncate">
                      {o.reference}
                    </p>
                    <p className="text-[0.72rem] text-[var(--color-espresso)]/50 truncate">
                      {o.customer_email}
                    </p>
                  </div>
                  <span className="text-[0.85rem] text-[var(--color-espresso)]
                                   shrink-0 tabular-nums">
                    € {Number(o.total).toLocaleString("fr-FR")}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}