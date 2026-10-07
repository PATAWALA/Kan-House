"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Search,
  Bell,
  ChevronDown,
  LogOut,
  ExternalLink,
  X,
  Settings,
  User,
} from "lucide-react";
import type { User as SupabaseUser } from "@supabase/supabase-js";
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
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const crumbs = getBreadcrumbs(pathname);

  // Récupère l'utilisateur connecté
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  // Ferme le menu au clic extérieur
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Raccourci Cmd+K pour la recherche
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setUserMenuOpen(false);
      }
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

  const userInitial = user?.email?.[0]?.toUpperCase() ?? "A";
  const userEmail = user?.email ?? "Chargement…";

  return (
    <>
      <header
        className="sticky top-0 z-30 bg-[var(--color-cafe-light)]/95 backdrop-blur-md"
        style={{ borderBottom: "1px solid var(--color-border-line)" }}
      >
        <div className="flex items-center justify-between gap-3 h-16 px-4 lg:px-8">

          {/* ============================================
              Fil d'Ariane
              ============================================ */}
          <nav className="flex items-center gap-2 min-w-0 shrink-0">
            {crumbs.map((c, i) => (
              <div key={c.href} className="flex items-center gap-2 min-w-0">
                {i > 0 && (
                  <span className="text-[var(--color-espresso)]/25 shrink-0 hidden sm:inline">
                    /
                  </span>
                )}
                <Link
                  href={c.href}
                  className={cn(
                    "text-[0.8rem] truncate transition-colors",
                    i === crumbs.length - 1
                      ? "text-[var(--color-espresso)] font-medium"
                      : "text-[var(--color-espresso)]/55 hover:text-[var(--color-espresso)]",
                    i < crumbs.length - 1 && "hidden sm:inline"
                  )}
                >
                  {c.label}
                </Link>
              </div>
            ))}
          </nav>

          {/* ============================================
              Actions
              ============================================ */}
          <div className="flex items-center gap-1.5 ml-auto">

            {/* Recherche — large sur desktop */}
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden md:inline-flex items-center gap-3
                         px-4 py-2.5 w-56 lg:w-72
                         text-[0.82rem] text-[var(--color-espresso)]/55
                         hover:text-[var(--color-espresso)]
                         hover:bg-[var(--color-cafe-dark)]
                         transition-colors"
              style={{ border: "1px solid var(--color-border-line)" }}
              aria-label="Ouvrir la recherche"
            >
              <Search size={16} strokeWidth={1.5} className="shrink-0" />
              <span className="flex-1 text-left">Rechercher…</span>
              <kbd className="text-[0.62rem] font-mono px-1.5 py-0.5
                              bg-[var(--color-cafe-dark)] text-[var(--color-espresso)]/45">
                ⌘K
              </kbd>
            </button>

            {/* Recherche — icône seule sur mobile */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Rechercher"
              className="md:hidden p-2.5
                         text-[var(--color-espresso)]/65
                         hover:text-[var(--color-espresso)]
                         hover:bg-[var(--color-cafe-dark)]
                         transition-colors"
            >
              <Search size={18} strokeWidth={1.5} />
            </button>

            {/* Notifications */}
            <button
              aria-label="Notifications"
              className="relative p-2.5
                         text-[var(--color-espresso)]/65
                         hover:text-[var(--color-espresso)]
                         hover:bg-[var(--color-cafe-dark)]
                         transition-colors"
            >
              <Bell size={18} strokeWidth={1.5} />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full
                               bg-[var(--color-bordeaux)]" />
            </button>

            {/* ============================================
                Menu profil — Paramètres + Déconnexion
                ============================================ */}
            <div ref={menuRef} className="relative">
              <button
                onClick={() => setUserMenuOpen((v) => !v)}
                aria-label="Menu utilisateur"
                aria-expanded={userMenuOpen}
                className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full
                           hover:bg-[var(--color-cafe-dark)] transition-colors"
              >
                <span
                  className="w-8 h-8 grid place-items-center rounded-full
                             bg-[var(--color-bordeaux)] text-[var(--color-cafe-light)]
                             text-[0.72rem] font-medium uppercase"
                >
                  {userInitial}
                </span>
                <ChevronDown
                  size={14}
                  strokeWidth={1.5}
                  className={cn(
                    "text-[var(--color-espresso)]/45 hidden md:block transition-transform",
                    userMenuOpen && "rotate-180"
                  )}
                />
              </button>

              {userMenuOpen && (
                <div
                  className="absolute right-0 top-full mt-2 w-64 py-1
                             bg-white shadow-xl z-50"
                  style={{ border: "1px solid var(--color-border-line)" }}
                >
                  {/* En-tête profil */}
                  <div
                    className="px-4 py-3"
                    style={{ borderBottom: "1px solid var(--color-border-line)" }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="w-9 h-9 grid place-items-center rounded-full
                                   bg-[var(--color-bordeaux)] text-[var(--color-cafe-light)]
                                   text-[0.78rem] font-medium uppercase shrink-0"
                      >
                        {userInitial}
                      </span>
                      <div className="min-w-0">
                        <p className="text-[0.72rem] text-[var(--color-espresso)]/45">
                          Connecté en tant que
                        </p>
                        <p className="text-[0.82rem] text-[var(--color-espresso)]
                                      font-medium truncate">
                          {userEmail}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <Link
                    href="/admin/parametres"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-[0.84rem]
                               text-[var(--color-espresso)]/80
                               hover:bg-[var(--color-cafe-dark)]
                               hover:text-[var(--color-espresso)]
                               transition-colors"
                  >
                    <Settings size={15} strokeWidth={1.5} />
                    Paramètres
                  </Link>

                  <Link
                    href="/"
                    target="_blank"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-[0.84rem]
                               text-[var(--color-espresso)]/80
                               hover:bg-[var(--color-cafe-dark)]
                               hover:text-[var(--color-espresso)]
                               transition-colors"
                  >
                    <ExternalLink size={15} strokeWidth={1.5} />
                    Voir le site
                    <span className="ml-auto text-[0.6rem] uppercase tracking-[0.14em]
                                     text-[var(--color-espresso)]/35">
                      ↗
                    </span>
                  </Link>

                  <div style={{ borderTop: "1px solid var(--color-border-line)" }}>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3
                                 text-[0.84rem] text-[var(--color-bordeaux)]
                                 hover:bg-[var(--color-bordeaux)]/6
                                 transition-colors text-left"
                    >
                      <LogOut size={15} strokeWidth={1.5} />
                      Déconnexion
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ============================================
          Modal de recherche globale
          ============================================ */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center
                     pt-[12vh] px-4 bg-black/40 backdrop-blur-sm"
          onClick={() => setSearchOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-[var(--color-cafe-light)] shadow-2xl"
          >
            {/* Barre de recherche */}
            <div
              className="flex items-center gap-3 px-5 py-4"
              style={{ borderBottom: "1px solid var(--color-border-line)" }}
            >
              <Search size={18} strokeWidth={1.5}
                      className="text-[var(--color-espresso)]/45 shrink-0" />
              <input
                autoFocus
                type="text"
                placeholder="Rechercher produits, devis, projets…"
                className="flex-1 bg-transparent text-[0.95rem] outline-none
                           placeholder:text-[var(--color-espresso)]/35"
              />
              <button
                onClick={() => setSearchOpen(false)}
                aria-label="Fermer"
                className="p-1 text-[var(--color-espresso)]/45
                           hover:text-[var(--color-espresso)] transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* État vide */}
            <div className="px-5 py-12 text-center">
              <p className="text-[0.85rem] text-[var(--color-espresso)]/45 italic">
                Tapez pour rechercher dans produits, devis et projets.
              </p>
              <p className="text-[0.72rem] text-[var(--color-espresso)]/35 mt-3">
                La recherche globale sera disponible prochainement.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}