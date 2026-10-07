"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  FileText,
  ShoppingBag,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { useAdminUIStore } from "@/lib/store/admin-ui";

const TABS = [
  { label: "Accueil",   href: "/admin",              icon: LayoutDashboard },
  { label: "Produits",  href: "/admin/produits",     icon: Package },
  { label: "Devis",     href: "/admin/devis",        icon: FileText },
  { label: "Commandes", href: "/admin/commandes",    icon: ShoppingBag },
];

export default function MobileTabBar() {
  const pathname = usePathname();
  const openMenu = useAdminUIStore((s) => s.openMenu);

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white"
      style={{
        borderTop: "1px solid var(--color-border-line)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <ul className="grid grid-cols-5 h-16">
        {TABS.map(({ label, href, icon: Icon }) => {
          const active =
            href === "/admin"
              ? pathname === "/admin"
              : pathname === href || pathname.startsWith(href + "/");

          return (
            <li key={href} className="relative">
              <Link
                href={href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 h-full",
                  "text-[0.55rem] font-medium uppercase tracking-[0.1em]",
                  "transition-colors",
                  active
                    ? "text-[var(--color-espresso)]"
                    : "text-[var(--color-espresso)]/45 hover:text-[var(--color-espresso)]/75"
                )}
              >
                {active && (
                  <span
                    className="absolute top-0 left-1/2 -translate-x-1/2
                               w-6 h-[2px] bg-[var(--color-bordeaux)]"
                  />
                )}
                <Icon size={18} strokeWidth={active ? 1.8 : 1.4} />
                <span>{label}</span>
              </Link>
            </li>
          );
        })}

        <li className="relative">
          <button
            onClick={openMenu}
            className="flex flex-col items-center justify-center gap-1 h-full w-full
                       text-[0.55rem] font-medium uppercase tracking-[0.1em]
                       text-[var(--color-espresso)]/45
                       hover:text-[var(--color-espresso)]/75
                       transition-colors"
          >
            <Menu size={18} strokeWidth={1.4} />
            <span>Plus</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}