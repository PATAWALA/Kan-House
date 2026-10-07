"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
} from "lucide-react";
import { cn } from "@/lib/cn";
import { createClient } from "@/lib/supabase/client";

const NAV = [
  { label: "Vue d'ensemble", href: "/admin",              icon: LayoutDashboard },
  { label: "Produits",       href: "/admin/produits",     icon: Package },
  { label: "Catégories",     href: "/admin/categories",   icon: Tag },
  { label: "Commandes",      href: "/admin/commandes",    icon: ShoppingBag },
  { label: "Devis B2B",      href: "/admin/devis",        icon: FileText },
  { label: "Projets",        href: "/admin/projets",      icon: Briefcase },
  { label: "Paramètres",     href: "/admin/parametres",   icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside
      className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 flex-col z-40"
      style={{
        backgroundColor: "var(--color-bordeaux)",
        color: "var(--color-cafe-light)",
      }}
    >
      {/* Logo */}
      <div
        className="px-6 py-6"
        style={{ borderBottom: "1px solid rgba(239, 236, 230, 0.10)" }}
      >
        <Link href="/admin" className="flex flex-col leading-none">
          <span className="text-[0.95rem] font-medium tracking-[0.14em]">
            KAN HOUSE
          </span>
          <span className="text-[0.5rem] font-medium tracking-[0.28em] opacity-55 mt-1">
            ADMINISTRATION
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-0.5 px-3">
          {NAV.map(({ label, href, icon: Icon }) => {
            const active =
              href === "/admin"
                ? pathname === "/admin"
                : pathname === href || pathname.startsWith(href + "/");

            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5",
                    "text-[0.8rem] font-normal",
                    "transition-colors",
                    active
                      ? "bg-[var(--color-cafe-light)]/12 text-[var(--color-cafe-light)]"
                      : "text-[var(--color-cafe-light)]/65 hover:text-[var(--color-cafe-light)] hover:bg-[var(--color-cafe-light)]/6"
                  )}
                >
                  <Icon size={15} strokeWidth={1.5} />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bas */}
      <div
        className="p-3 space-y-1"
        style={{ borderTop: "1px solid rgba(239, 236, 230, 0.10)" }}
      >
        <Link
          href="/"
          target="_blank"
          className="w-full flex items-center gap-3 px-3 py-2.5
                     text-[0.78rem] text-[var(--color-cafe-light)]/55
                     hover:text-[var(--color-cafe-light)] hover:bg-[var(--color-cafe-light)]/6
                     transition-colors"
        >
          <ExternalLink size={15} strokeWidth={1.5} />
          Voir le site
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5
                     text-[0.78rem] text-[var(--color-cafe-light)]/55
                     hover:text-[var(--color-cafe-light)] hover:bg-[var(--color-cafe-light)]/6
                     transition-colors text-left"
        >
          <LogOut size={15} strokeWidth={1.5} />
          Déconnexion
        </button>
      </div>
    </aside>
  );
}