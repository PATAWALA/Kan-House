"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { useCartStore } from "@/lib/store/cart";

const NAV_LINKS = [
  { label: "Collection", href: "/collection" },
  { label: "Projects", href: "/projects" },
  { label: "Hospitality", href: "/hospitality" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // ✅ Compteur panier connecté au store — se met à jour automatiquement
  const totalItems = useCartStore((s) =>
    s.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-bordeaux)] text-[var(--color-cream)]">
      <nav className="container-kan flex items-center justify-between h-20">
        {/* Brand */}
        <Link
          href="/"
          className="text-2xl leading-none tracking-tight font-medium"
        >
          Kan<span className="text-[var(--color-taupe)]">.</span>House
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-9">
          {NAV_LINKS.map((l) => {
            const active =
              pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={cn(
                    "relative text-[0.72rem] font-medium uppercase tracking-[0.22em] transition-colors",
                    "after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-[var(--color-cream)] after:transition-all after:duration-300",
                    active
                      ? "text-[var(--color-cream)] after:w-full"
                      : "text-[var(--color-cream)]/75 hover:text-[var(--color-cream)] after:w-0 hover:after:w-full"
                  )}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Panier — lien + badge dynamique */}
          <Link
            href="/cart"
            aria-label="Panier"
            className="relative p-2.5 rounded-full text-[var(--color-cream)]/85 hover:text-[var(--color-cream)] hover:bg-[var(--color-cream)]/10 transition-colors"
          >
            <ShoppingBag size={18} strokeWidth={1.6} />

            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 22 }}
                  className="absolute -top-0.5 -right-0.5
                             bg-[var(--color-cream)] text-[var(--color-bordeaux)]
                             text-[10px] font-semibold
                             min-w-[18px] h-[18px] px-1
                             rounded-full grid place-items-center"
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          {/* CTA Start a Project */}
          <Link
            href="/start-project"
            className="hidden md:inline-flex items-center gap-2 bg-[var(--color-cream)] text-[var(--color-bordeaux)] px-5 py-3 rounded-full text-[0.7rem] font-semibold uppercase tracking-[0.22em] hover:bg-[var(--color-sand)] transition-colors group"
          >
            Start a Project
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>

          {/* Toggle mobile */}
          <button
            aria-label="Menu"
            aria-expanded={open}
            className="lg:hidden p-2.5 rounded-full text-[var(--color-cream)]/85 hover:text-[var(--color-cream)] hover:bg-[var(--color-cream)]/10 transition-colors"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
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
            className="lg:hidden overflow-hidden bg-[var(--color-bordeaux-deep)] border-t border-[var(--color-cream)]/10"
          >
            <ul className="container-kan py-6 space-y-4">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block text-2xl text-[var(--color-cream)]/90 hover:text-[var(--color-cream)] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="pt-3">
                <Link
                  href="/start-project"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-2 bg-[var(--color-cream)] text-[var(--color-bordeaux)] px-6 py-3.5 rounded-full text-[0.7rem] font-semibold uppercase tracking-[0.22em]"
                >
                  Start a Project
                  <ArrowUpRight size={14} />
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}