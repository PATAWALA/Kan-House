"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  Tag,
  ShoppingBag,
  FileText,
  Briefcase,
  Settings,
  LogOut,
  X,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { createClient } from "@/lib/supabase/client";
import { useAdminUIStore } from "@/lib/store/admin-ui";

const NAV = [
  { label: "Vue d'ensemble", href: "/admin",              icon: LayoutDashboard },
  { label: "Produits",       href: "/admin/produits",     icon: Package },
  { label: "Catégories",     href: "/admin/categories",   icon: Tag },
  { label: "Commandes",      href: "/admin/commandes",    icon: ShoppingBag },
  { label: "Devis B2B",      href: "/admin/devis",        icon: FileText },
  { label: "Projets",        href: "/admin/projets",      icon: Briefcase },
  { label: "Paramètres",     href: "/admin/parametres",   icon: Settings },
];

export default function MobileMenuDrawer() {
  const pathname = usePathname();
  const router = useRouter();
  const menuOpen = useAdminUIStore((s) => s.menuOpen);
  const closeMenu = useAdminUIStore((s) => s.closeMenu);

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <AnimatePresence>
      {menuOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMenu}
            className="lg:hidden fixed inset-0 z-50 bg-black/50"
          />

          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden fixed left-0 right-0 bottom-0 z-50
                       max-h-[85vh] overflow-y-auto"
            style={{
              backgroundColor: "var(--color-bordeaux)",
              paddingBottom: "env(safe-area-inset-bottom)",
            }}
          >
            <div
              className="sticky top-0 px-5 py-4 flex items-center justify-between"
              style={{
                backgroundColor: "var(--color-bordeaux)",
                borderBottom: "1px solid rgba(239, 236, 230, 0.10)",
              }}
            >
              <p className="text-[0.7rem] font-medium uppercase tracking-[0.2em]
                            text-[var(--color-cafe-light)]/55">
                Menu
              </p>
              <button
                onClick={closeMenu}
                aria-label="Fermer"
                className="p-1.5 text-[var(--color-cafe-light)]/65
                           hover:text-[var(--color-cafe-light)] transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="py-4">
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
                          "flex items-center gap-3 px-3 py-3.5",
                          "text-[0.9rem]",
                          "transition-colors",
                          active
                            ? "bg-[var(--color-cafe-light)]/12 text-[var(--color-cafe-light)]"
                            : "text-[var(--color-cafe-light)]/65 hover:text-[var(--color-cafe-light)] hover:bg-[var(--color-cafe-light)]/6"
                        )}
                      >
                        <Icon size={17} strokeWidth={1.5} />
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div
                className="mt-4 pt-4 px-3 space-y-0.5"
                style={{ borderTop: "1px solid rgba(239, 236, 230, 0.10)" }}
              >
                <Link
                  href="/"
                  target="_blank"
                  className="flex items-center gap-3 px-3 py-3.5
                             text-[0.9rem] text-[var(--color-cafe-light)]/65
                             hover:text-[var(--color-cafe-light)] hover:bg-[var(--color-cafe-light)]/6
                             transition-colors"
                >
                  <ExternalLink size={17} strokeWidth={1.5} />
                  Voir le site
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-3.5
                             text-[0.9rem] text-[var(--color-cafe-light)]/65
                             hover:text-[var(--color-cafe-light)] hover:bg-[var(--color-cafe-light)]/6
                             transition-colors text-left"
                >
                  <LogOut size={17} strokeWidth={1.5} />
                  Déconnexion
                </button>
              </div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}