"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import {
  PRODUCTS,
  PRODUCT_CATEGORIES,
  type ProductCategory,
} from "@/lib/data";
import { cn } from "@/lib/cn";

type CategoryFilter = ProductCategory | "Tout";
type SortOption = "newest" | "price-asc" | "price-desc" | "name-asc";

const CATEGORIES: CategoryFilter[] = ["Tout", ...PRODUCT_CATEGORIES];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Nouveautés" },
  { value: "price-asc", label: "Prix croissant" },
  { value: "price-desc", label: "Prix décroissant" },
  { value: "name-asc", label: "Nom (A–Z)" },
];

export default function CollectionPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("Tout");
  const [sort, setSort] = useState<SortOption>("newest");

  const filtered = useMemo(() => {
    const list =
      activeCategory === "Tout"
        ? [...PRODUCTS]
        : PRODUCTS.filter((p) => p.category === activeCategory);

    const getPrice = (p: (typeof PRODUCTS)[number]) =>
      Number(p.price.replace(/[^\d]/g, ""));

    switch (sort) {
      case "price-asc":
        return list.sort((a, b) => getPrice(a) - getPrice(b));
      case "price-desc":
        return list.sort((a, b) => getPrice(b) - getPrice(a));
      case "name-asc":
        return list.sort((a, b) => a.name.localeCompare(b.name));
      case "newest":
      default:
        return list;
    }
  }, [activeCategory, sort]);

  const counts = useMemo(() => {
    const map: Record<string, number> = { Tout: PRODUCTS.length };
    PRODUCT_CATEGORIES.forEach((cat) => {
      map[cat] = PRODUCTS.filter((p) => p.category === cat).length;
    });
    return map;
  }, []);

  return (
    <section className="bg-[var(--color-cafe-light)]">
      <div className="container-kan pt-16 md:pt-20 lg:pt-24 pb-20 md:pb-28">

        {/* ============================================
            EN-TÊTE
            ============================================ */}
        <div className="max-w-3xl mb-14 md:mb-20">
          <p className="eyebrow mb-5">La Collection</p>
          <h1 className="text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.15]
                         tracking-[-0.02em] font-normal
                         text-[var(--color-espresso)] mb-5">
            Pièces sélectionnées,
            <br />
            sourcées avec intention.
          </h1>
          <p className="text-[0.95rem] leading-[1.75]
                        text-[var(--color-espresso)]/65 max-w-xl">
            Mobilier, luminaires et objets façonnés entre ateliers européens
            et manufactures d'exception. Chaque pièce est contrôlée,
            documentée, livrée.
          </p>
        </div>

        {/* ============================================
            FILTRES + TRI
            ============================================ */}
        <div
          className="flex flex-col gap-6 pb-6 mb-12 md:mb-16"
          style={{ borderBottom: "1px solid var(--color-border-line)" }}
        >
          {/* Catégories */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              const count = counts[cat] ?? 0;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  disabled={count === 0 && cat !== "Tout"}
                  className={cn(
                    "inline-flex items-center gap-2 px-4 py-2.5",
                    "text-[0.68rem] font-medium uppercase tracking-[0.18em]",
                    "transition-colors duration-200",
                    isActive
                      ? "bg-[var(--color-espresso)] text-[var(--color-cafe-light)]"
                      : "text-[var(--color-espresso)]/60 hover:text-[var(--color-espresso)]",
                    !isActive && "border border-[var(--color-border-line)] hover:border-[var(--color-espresso)]/30",
                    count === 0 && cat !== "Tout" && "opacity-30 cursor-not-allowed"
                  )}
                >
                  {cat}
                  <span
                    className={cn(
                      "text-[0.6rem] tabular-nums",
                      isActive
                        ? "text-[var(--color-cafe-light)]/60"
                        : "text-[var(--color-espresso)]/40"
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Tri + compteur */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-[0.78rem] text-[var(--color-espresso)]/55">
              <span className="font-medium text-[var(--color-espresso)]">
                {filtered.length}
              </span>{" "}
              {filtered.length > 1 ? "pièces" : "pièce"}
              {activeCategory !== "Tout" && (
                <> · {activeCategory.toLowerCase()}</>
              )}
            </p>

            <label className="inline-flex items-center gap-3">
              <SlidersHorizontal
                size={13}
                className="text-[var(--color-espresso)]/45"
              />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="bg-transparent border-none outline-none
                           text-[0.68rem] font-medium uppercase tracking-[0.18em]
                           text-[var(--color-espresso)]/70 hover:text-[var(--color-espresso)]
                           cursor-pointer appearance-none pr-6
                           bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2210%22 height=%2210%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22currentColor%22 stroke-width=%222%22><path d=%22M6 9l6 6 6-6%22/></svg>')]
                           bg-no-repeat bg-[right_center]"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {/* ============================================
            GRILLE PRODUITS — 4 colonnes
            ============================================ */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-12 lg:gap-x-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{
                    duration: 0.4,
                    delay: (i % 4) * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <ProductCard product={p} index={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="py-24 text-center max-w-md mx-auto">
            <p className="text-[1.15rem] font-normal text-[var(--color-espresso)] mb-3">
              Aucune pièce dans cette catégorie.
            </p>
            <p className="text-sm text-[var(--color-espresso)]/55 leading-relaxed mb-8">
              Revenez bientôt — de nouvelles pièces arrivent régulièrement.
            </p>
            <button
              onClick={() => setActiveCategory("Tout")}
              className="link-text"
            >
              Voir toute la collection →
            </button>
          </div>
        )}

        {/* ============================================
            CTA FINALE — Bloc texte + lien
            ============================================ */}
        <div
          className="mt-24 md:mt-32 pt-14 md:pt-20 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start"
          style={{ borderTop: "1px solid var(--color-border-line)" }}
        >
          {/* Texte */}
          <div className="md:col-span-7">
            <p className="eyebrow mb-5">Un projet sur-mesure ?</p>
            <h2 className="text-[clamp(1.5rem,2.5vw,2rem)] leading-[1.2]
                           tracking-[-0.02em] font-normal
                           text-[var(--color-espresso)] mb-6">
              Vous ne trouvez pas
              <br />
              la pièce qu'il vous faut ?
            </h2>
            <p className="text-[0.92rem] leading-[1.75]
                          text-[var(--color-espresso)]/65 max-w-lg">
              Nous développons chaque pièce sur-mesure, dans le respect de
              vos volumes, vos matières et vos délais.
            </p>
          </div>

          {/* Lien CTA */}
          <div className="md:col-span-5 flex md:justify-end md:pt-8">
            <a href="/start-project" className="link-text">
              Start a Project →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}