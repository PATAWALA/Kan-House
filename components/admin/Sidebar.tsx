"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  Tag,
  ShoppingBag,
  FileText,
  Briefcase,
  Settings,
  LogOut,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { createClient } from "@/lib/supabase/client";

const SECTIONS = [
  {
    label: "Pilotage",
    items: [
      { label: "Vue d'ensemble", href: "/admin", icon: LayoutDashboard },
    ],
  },
  {
    label: "Catalogue",
    items: [
      { label: "Produits", href: "/admin/produits", icon: Package },
      { label: "Catégories", href: "/admin/categories", icon: Tag },
    ],
  },
  {
    label: "Ventes",
    items: [
      { label: "Devis B2B", href: "/admin/devis", icon: FileText },
      { label: "Commandes", href: "/admin/commandes", icon: ShoppingBag },
    ],
  },
  {
    label: "Contenu",
    items: [{ label: "Projets", href: "/admin/projets", icon: Briefcase }],
  },
  {
    label: "Système",
    items: [{ label: "Paramètres", href: "/admin/parametres", icon: Settings }],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside
      className={cn(
        "hidden lg:flex fixed left-0 top-0 bottom-0 z-40 flex-col",
        "transition-all duration-300",
        collapsed ? "w-[72px]" : "w-64"
      )}
      style={{
        backgroundColor: "var(--color-espresso)",
        color: "var(--color-cafe-light)",
      }}
    >
      {/* ============================================
          HEADER — Logo + toggle
          ============================================ */}
      <div
        className="flex items-center justify-between h-16 px-5 shrink-0"
        style={{ borderBottom: "1px solid rgba(239, 236, 230, 0.08)" }}
      >
        {!collapsed && (
          <Link href="/admin" className="flex flex-col leading-none">
            <span className="text-[0.9rem] font-medium tracking-[0.14em]
                             text-[var(--color-cafe-light)]">
              KAN HOUSE
            </span>
            <span className="text-[0.48rem] tracking-[0.28em]
                             text-[var(--color-cafe-light)]/40 mt-1">
              ADMINISTRATION
            </span>
          </Link>
        )}
        <button
          onClick={() => setCollapsed((v) => !v)}
          aria-label={collapsed ? "Ouvrir" : "Réduire"}
          className={cn(
            "p-1.5 text-[var(--color-cafe-light)]/45",
            "hover:text-[var(--color-cafe-light)] hover:bg-[var(--color-cafe-light)]/8",
            "transition-colors",
            collapsed && "mx-auto"
          )}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* ============================================
          NAVIGATION
          ============================================ */}
      <nav className="flex-1 overflow-y-auto py-5 px-3">
        {SECTIONS.map((section, sIdx) => (
          <div key={section.label} className={cn(sIdx > 0 && "mt-6")}>
            {!collapsed && (
              <p className="px-3 mb-2 text-[0.56rem] font-medium uppercase
                            tracking-[0.26em] text-[var(--color-cafe-light)]/30">
                {section.label}
              </p>
            )}

            <ul className="space-y-1">
              {section.items.map(({ label, href, icon: Icon }) => {
                const active =
                  href === "/admin"
                    ? pathname === "/admin"
                    : pathname === href || pathname.startsWith(href + "/");

                return (
                  <li key={href}>
                    <Link
                      href={href}
                      title={collapsed ? label : undefined}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 text-[0.82rem] transition-colors",
                        collapsed && "justify-center",
                        active
                          ? "bg-[var(--color-cafe-light)] text-[var(--color-espresso)] font-medium"
                          : "text-[var(--color-cafe-light)]/65 hover:text-[var(--color-cafe-light)] hover:bg-[var(--color-cafe-light)]/8"
                      )}
                    >
                      <Icon
                        size={16}
                        strokeWidth={active ? 1.8 : 1.5}
                        className="shrink-0"
                      />
                      {!collapsed && <span>{label}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* ============================================
          FOOTER — Voir site + Déconnexion
          ============================================ */}
      <div
        className="p-3 space-y-1 shrink-0"
        style={{ borderTop: "1px solid rgba(239, 236, 230, 0.08)" }}
      >
        <Link
          href="/"
          target="_blank"
          title={collapsed ? "Voir le site" : undefined}
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 text-[0.78rem]",
            "text-[var(--color-cafe-light)]/50",
            "hover:text-[var(--color-cafe-light)] hover:bg-[var(--color-cafe-light)]/8",
            "transition-colors",
            collapsed && "justify-center"
          )}
        >
          <ExternalLink size={15} strokeWidth={1.5} className="shrink-0" />
          {!collapsed && <span>Voir le site</span>}
        </Link>

        <button
          onClick={handleLogout}
          title={collapsed ? "Déconnexion" : undefined}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 text-[0.78rem]",
            "text-[var(--color-cafe-light)]/50",
            "hover:text-[var(--color-cafe-light)] hover:bg-[var(--color-cafe-light)]/8",
            "transition-colors text-left",
            collapsed && "justify-center"
          )}
        >
          <LogOut size={15} strokeWidth={1.5} className="shrink-0" />
          {!collapsed && <span>Déconnexion</span>}
        </button>
      </div>
    </aside>
  );
}