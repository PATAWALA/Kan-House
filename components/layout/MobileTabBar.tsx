"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid3x3, Briefcase, Building2, User } from "lucide-react";
import { cn } from "@/lib/cn";

const TABS = [
  { label: "Home",         href: "/",            icon: Home },
  { label: "Collection",   href: "/collection",  icon: Grid3x3 },
  { label: "Projects",     href: "/projects",    icon: Briefcase },
  { label: "Hospitality",  href: "/hospitality", icon: Building2 },
  { label: "About",        href: "/about",       icon: User },
];

export default function MobileTabBar() {
  const pathname = usePathname();

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50"
      style={{
        backgroundColor: "var(--color-bordeaux)",
        borderTop: "1px solid rgba(239, 236, 230, 0.12)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <ul className="grid grid-cols-5 h-16">
        {TABS.map(({ label, href, icon: Icon }) => {
          const active =
            href === "/"
              ? pathname === "/"
              : pathname === href || pathname.startsWith(href + "/");

          return (
            <li key={href} className="relative">
              <Link
                href={href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 h-full",
                  "text-[0.58rem] font-medium uppercase tracking-[0.12em]",
                  "transition-colors",
                  active
                    ? "text-[var(--color-cafe-light)]"
                    : "text-[var(--color-cafe-light)]/55 hover:text-[var(--color-cafe-light)]/85"
                )}
              >
                {/* Indicateur actif en haut de l'onglet */}
                {active && (
                  <span
                    className="absolute top-0 left-1/2 -translate-x-1/2
                               w-6 h-px bg-[var(--color-cafe-light)]"
                  />
                )}

                <Icon size={18} strokeWidth={active ? 1.8 : 1.4} />
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}