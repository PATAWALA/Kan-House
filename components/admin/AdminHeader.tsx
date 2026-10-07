"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink } from "lucide-react";

const TITLES: Record<string, string> = {
  "/admin":              "Vue d'ensemble",
  "/admin/produits":     "Produits",
  "/admin/categories":   "Catégories",
  "/admin/commandes":    "Commandes",
  "/admin/devis":        "Devis B2B",
  "/admin/projets":      "Projets",
  "/admin/parametres":   "Paramètres",
};

export default function AdminHeader() {
  const pathname = usePathname();

  const title =
    Object.entries(TITLES).find(([p]) => pathname.startsWith(p))?.[1] ?? "Admin";

  return (
    <header
      className="sticky top-0 z-30 bg-[var(--color-cafe-light)]"
      style={{ borderBottom: "1px solid var(--color-border-line)" }}
    >
      <div className="flex items-center justify-between h-14 lg:h-16 px-5 lg:px-10">
        <h1 className="text-[0.9rem] lg:text-[0.95rem] font-medium text-[var(--color-espresso)]">
          {title}
        </h1>

        <Link
          href="/"
          target="_blank"
          className="hidden lg:inline-flex items-center gap-2
                     text-[0.7rem] uppercase tracking-[0.2em]
                     text-[var(--color-espresso)]/60
                     hover:text-[var(--color-espresso)] transition-colors"
        >
          Voir le site
          <ExternalLink size={12} />
        </Link>
      </div>
    </header>
  );
}