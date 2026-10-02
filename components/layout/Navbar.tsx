"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { useCartStore } from "@/lib/store/cart";

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
        backgroundColor: "var(--color-cafe-light)",
        borderBottom: "1px solid var(--color-border-line)",
      }}
    >
      <nav className="container-kan flex items-center justify-between h-20 relative">

        {/* Logo + sous-titre */}
        <Link href="/" className="flex flex-col leading-none">
          <span className="text-[1.05rem] font-medium tracking-[0.16em] text-[var(--color-espresso)]">
            KAN HOUSE
          </span>
          <span className="hidden sm:block text-[0.52rem] font-medium tracking-[0.28em] text-[var(--color-espresso)]/50 mt-1">
            FURNITURE • INTERIORS • SOURCING
          </span>
        </Link>

        {/* Navigation centrée */}
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
                    "after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-[var(--color-espresso)] after:transition-all after:duration-300",
                    active
                      ? "text-[var(--color-espresso)] after:w-full"
                      : "text-[var(--color-espresso)]/55 hover:text-[var(--color-espresso)] after:w-0 hover:after:w-full"
                  )}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Icônes */}
        <div className="flex items-center gap-0.5">
          <button
            aria-label="Rechercher"
            className="p-2.5 text-[var(--color-espresso)]/70 hover:text-[var(--color-espresso)] transition-colors"
          >
            <Search size={17} strokeWidth={1.4} />
          </button>

          <Link
            href="/cart"
            aria-label="Panier"
            className="relative p-2.5 text-[var(--color-espresso)]/70 hover:text-[var(--color-espresso)] transition-colors"
          >
            <ShoppingBag size={17} strokeWidth={1.4} />
            <span
              className="absolute -top-0.5 -right-0.5
                         bg-[var(--color-espresso)] text-[var(--color-cafe-light)]
                         text-[9px] font-semibold
                         min-w-[15px] h-[15px] px-1
                         grid place-items-center tabular-nums"
            >
              {totalItems}
            </span>
          </Link>

          <button
            aria-label="Menu"
            aria-expanded={open}
            className="p-2.5 text-[var(--color-espresso)]/70 hover:text-[var(--color-espresso)] transition-colors"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Drawer mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden"
            style={{
              backgroundColor: "var(--color-cafe-light)",
              borderTop: "1px solid var(--color-border-line)",
            }}
          >
            <ul className="container-kan py-6 space-y-4">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block text-[1.05rem] uppercase tracking-[0.2em]
                               text-[var(--color-espresso)]
                               hover:text-[var(--color-bordeaux)] transition-colors"
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