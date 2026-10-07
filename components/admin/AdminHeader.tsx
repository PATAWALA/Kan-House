"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Search, Bell, ChevronDown, LogOut, ExternalLink, X, Settings,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { createClient } from "@/lib/supabase/client";

const LABELS: Record<string, string> = {
  "/admin":            "Vue d'ensemble",
  "/admin/produits":   "Produits",
  "/admin/categories": "Catégories",
  "/admin/commandes":  "Commandes",
  "/admin/devis":      "Devis B2B",
  "/admin/projets":    "Projets",
  "/admin/parametres": "Paramètres",
};

function getBreadcrumbs(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  const crumbs: { label: string; href: string }[] = [
    { label: "Admin", href: "/admin" },
  ];

  if (parts.length >= 2) {
    const section = `/${parts.slice(0, 2).join("/")}`;
    crumbs.push({ label: LABELS[section] || parts[1], href: section });
  }

  if (parts.length >= 3) {
    crumbs.push({
      label: parts[2] === "nouveau" ? "Nouveau" : "Détail",
      href: pathname,
    });
  }

  return crumbs;
}

export default function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const crumbs = getBreadcrumbs(pathname);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") setSearchOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <>
      <header
        className="sticky top-0 z-30 bg-[var(--color-cafe-light)]/95 backdrop-blur-md"
        style={{ borderBottom: "1px solid var(--color-border-line)" }}
      >
        <div className="flex items-center justify-between h-16 px-5 lg:px-8 gap-4">
          {/* Fil d'Ariane */}
          <nav className="flex items-center gap-2 min-w-0">
            {crumbs.map((c, i) => (
              <div key={c.href} className="flex items-center gap-2 min-w-0">
                {i > 0 && (
                  <span className="text-[var(--color-espresso)]/25 shrink-0">/</span>
                )}
                <Link
                  href={c.href}
                  className={cn(
                    "text-[0.8rem] truncate transition-colors",
                    i === crumbs.length - 1
                      ? "text-[var(--color-espresso)] font-medium"
                      : "text-[var(--color-espresso)]/55 hover:text-[var(--color-espresso)]"
                  )}
                >
                  {c.label}
                </Link>
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden md:inline-flex items-center gap-3 px-3 py-2
                         text-[0.78rem] text-[var(--color-espresso)]/55
                         hover:text-[var(--color-espresso)] hover:bg-[var(--color-cafe-dark)]
                         transition-colors"
              style={{ border: "1px solid var(--color-border-line)" }}
            >
              <Search size={14} strokeWidth={1.5} />
              <span>Rechercher…</span>
              <kbd className="ml-4 text-[0.6rem] font-mono px-1.5 py-0.5
                              bg-[var(--color-cafe-dark)] text-[var(--color-espresso)]/45">
                ⌘K
              </kbd>
            </button>

            <button
              aria-label="Notifications"
              className="relative p-2.5 text-[var(--color-espresso)]/65
                         hover:text-[var(--color-espresso)] hover:bg-[var(--color-cafe-dark)]
                         transition-colors"
            >
              <Bell size={17} strokeWidth={1.5} />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full
                               bg-[var(--color-bordeaux)]" />
            </button>

            <div ref={menuRef} className="relative">
              <button
                onClick={() => setUserMenuOpen((v) => !v)}
                className="flex items-center gap-2 pl-1 pr-2 py-1
                           hover:bg-[var(--color-cafe-dark)] transition-colors"
              >
                <span className="w-8 h-8 grid place-items-center rounded-full
                                 bg-[var(--color-espresso)] text-[var(--color-cafe-light)]
                                 text-[0.7rem] font-medium">
                  A
                </span>
                <ChevronDown size={14} strokeWidth={1.5}
                             className="text-[var(--color-espresso)]/45 hidden md:block" />
              </button>

              {userMenuOpen && (
                <div
                  className="absolute right-0 top-full mt-2 w-56 py-1
                             bg-[var(--color-cafe-light)] shadow-lg"
                  style={{ border: "1px solid var(--color-border-line)" }}
                >
                  <div
                    className="px-4 py-3"
                    style={{ borderBottom: "1px solid var(--color-border-line)" }}
                  >
                    <p className="text-[0.72rem] text-[var(--color-espresso)]/45">
                      Connecté en tant que
                    </p>
                    <p className="text-[0.82rem] text-[var(--color-espresso)] truncate mt-0.5">
                      chinawitha@hotmail.com
                    </p>
                  </div>

                  <Link
                    href="/admin/parametres"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-[0.82rem]
                               text-[var(--color-espresso)]/75
                               hover:bg-[var(--color-cafe-dark)] transition-colors"
                  >
                    <Settings size={14} strokeWidth={1.5} />
                    Paramètres
                  </Link>

                  <Link
                    href="/"
                    target="_blank"
                    className="flex items-center gap-3 px-4 py-2.5 text-[0.82rem]
                               text-[var(--color-espresso)]/75
                               hover:bg-[var(--color-cafe-dark)] transition-colors"
                  >
                    <ExternalLink size={14} strokeWidth={1.5} />
                    Voir le site
                  </Link>

                  <div style={{ borderTop: "1px solid var(--color-border-line)" }}>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-[0.82rem]
                                 text-[var(--color-bordeaux)]
                                 hover:bg-[var(--color-cafe-dark)] transition-colors text-left"
                    >
                      <LogOut size={14} strokeWidth={1.5} />
                      Déconnexion
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Modal de recherche */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]
                     bg-black/40 backdrop-blur-sm"
          onClick={() => setSearchOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl bg-[var(--color-cafe-light)] shadow-2xl"
          >
            <div
              className="flex items-center gap-3 px-4 py-3.5"
              style={{ borderBottom: "1px solid var(--color-border-line)" }}
            >
              <Search size={16} strokeWidth={1.5}
                      className="text-[var(--color-espresso)]/45" />
              <input
                autoFocus
                type="text"
                placeholder="Rechercher produits, devis, projets…"
                className="flex-1 bg-transparent text-[0.9rem] outline-none
                           placeholder:text-[var(--color-espresso)]/35"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1 text-[var(--color-espresso)]/45
                           hover:text-[var(--color-espresso)]"
              >
                <X size={16} />
              </button>
            </div>
            <div className="p-6 text-center">
              <p className="text-[0.82rem] text-[var(--color-espresso)]/45 italic">
                La recherche globale arrive bientôt.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}