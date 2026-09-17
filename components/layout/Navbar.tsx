"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

const NAV_LINKS = [
  { label: "Collection", href: "/collection" },
  { label: "Projects", href: "/projects" },
  { label: "Hospitality", href: "/hospitality" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [cartCount] = useState(0); // remplacer par un store (Zustand/Context)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-[var(--color-cream)]/80 backdrop-blur-xl border-b border-[var(--color-espresso)]/8 py-3"
          : "bg-transparent py-5"
      )}
    >
      <nav className="container-kan flex items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          className="font-serif text-2xl tracking-tight text-[var(--color-espresso)]"
        >
          Kan<span className="text-[var(--color-bordeaux)]">.</span>House
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="relative text-[0.78rem] uppercase tracking-[0.2em] text-[var(--color-espresso)]/80 hover:text-[var(--color-bordeaux)] transition-colors
                           after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-[var(--color-bordeaux)] after:transition-all hover:after:w-full"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            aria-label="Cart"
            className="relative p-2.5 rounded-full hover:bg-[var(--color-espresso)]/6 transition-colors"
          >
            <ShoppingBag size={18} strokeWidth={1.5} />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-0.5 -right-0.5 bg-[var(--color-bordeaux)] text-[var(--color-cream)] text-[10px] font-medium w-4 h-4 rounded-full grid place-items-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <Link
            href="/start-project"
            className="hidden md:inline-flex items-center gap-2 bg-[var(--color-bordeaux)] text-[var(--color-cream)] px-5 py-3 rounded-full text-[0.72rem] uppercase tracking-[0.2em] hover:bg-[var(--color-bordeaux-deep)] transition-colors group"
          >
            Start a Project
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>

          {/* Mobile toggle */}
          <button
            aria-label="Menu"
            className="lg:hidden p-2.5"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden bg-[var(--color-cream)] border-t border-[var(--color-espresso)]/8"
          >
            <ul className="container-kan py-6 space-y-4">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block font-serif text-3xl text-[var(--color-espresso)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/start-project"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-2 mt-4 bg-[var(--color-bordeaux)] text-[var(--color-cream)] px-5 py-3 rounded-full text-[0.72rem] uppercase tracking-[0.2em]"
                >
                  Start a Project <ArrowUpRight size={14} />
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}