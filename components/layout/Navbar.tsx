"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { useCartStore } from "@/lib/store/cart";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Collection", href: "/collection" },
  { label: "Projects", href: "/projects" },
  { label: "Hospitality", href: "/hospitality" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const totalItems = useCartStore((s) =>
    s.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        backgroundColor: "var(--color-bordeaux)",
        borderBottom: "1px solid rgba(239, 236, 230, 0.12)",
      }}
    >
      <nav className="container-kan flex items-center justify-between h-16 lg:h-20 relative">

        {/* Logo + sous-titre */}
        <Link href="/" className="flex flex-col leading-none">
          <span className="text-[0.98rem] lg:text-[1.05rem] font-medium tracking-[0.16em] text-[var(--color-cafe-light)]">
            KAN HOUSE
          </span>
          <span className="hidden sm:block text-[0.5rem] lg:text-[0.52rem] font-medium tracking-[0.28em] text-[var(--color-cafe-light)]/55 mt-1">
            FURNITURE • INTERIORS • SOURCING
          </span>
        </Link>

        {/* Navigation centrée — DESKTOP uniquement */}
        <ul className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {NAV_LINKS.map((l) => {
            const active =
              l.href === "/"
                ? pathname === "/"
                : pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={cn(
                    "relative text-[0.68rem] font-medium uppercase tracking-[0.24em] transition-colors",
                    "after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-[var(--color-cafe-light)] after:transition-all after:duration-300",
                    active
                      ? "text-[var(--color-cafe-light)] after:w-full"
                      : "text-[var(--color-cafe-light)]/60 hover:text-[var(--color-cafe-light)] after:w-0 hover:after:w-full"
                  )}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Icônes — panier + recherche toujours visibles, burger desktop */}
        <div className="flex items-center gap-0.5">
          <button
            aria-label="Rechercher"
            className="p-2.5 text-[var(--color-cafe-light)]/75 hover:text-[var(--color-cafe-light)] transition-colors"
          >
            <Search size={17} strokeWidth={1.4} />
          </button>

          <Link
            href="/cart"
            aria-label="Panier"
            className="relative p-2.5 text-[var(--color-cafe-light)]/75 hover:text-[var(--color-cafe-light)] transition-colors"
          >
            <ShoppingBag size={17} strokeWidth={1.4} />
            {totalItems > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5
                           bg-[var(--color-cafe-light)] text-[var(--color-bordeaux)]
                           text-[9px] font-semibold
                           min-w-[15px] h-[15px] px-1
                           grid place-items-center tabular-nums"
              >
                {totalItems}
              </span>
            )}
          </Link>

          {/* Burger — DESKTOP uniquement */}
          <button
            aria-label="Menu"
            aria-expanded={open}
            className="hidden lg:block p-2.5 text-[var(--color-cafe-light)]/75 hover:text-[var(--color-cafe-light)] transition-colors"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Drawer desktop */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block overflow-hidden"
            style={{
              backgroundColor: "var(--color-bordeaux-deep)",
              borderTop: "1px solid rgba(239, 236, 230, 0.15)",
            }}
          >
            <ul className="container-kan py-8 space-y-4">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block text-[1.05rem] uppercase tracking-[0.2em]
                               text-[var(--color-cafe-light)]
                               hover:text-[var(--color-taupe)] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}