"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, ArrowUpRight } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import Section from "@/components/ui/Section";
import { PRODUCTS, PRODUCT_CATEGORIES, type ProductCategory } from "@/lib/data";
import { cn } from "@/lib/cn";

type CategoryFilter = ProductCategory | "Tout";
type SortOption = "price-asc" | "price-desc" | "name-asc" | "newest";

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
    // 1. Filtrer par catégorie
    const list =
      activeCategory === "Tout"
        ? [...PRODUCTS]
        : PRODUCTS.filter((p) => p.category === activeCategory);

    // 2. Trier
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

  // Comptes par catégorie pour afficher dans les filtres
  const counts = useMemo(() => {
    const map: Record<string, number> = { Tout: PRODUCTS.length };
    PRODUCT_CATEGORIES.forEach((cat) => {
      map[cat] = PRODUCTS.filter((p) => p.category === cat).length;
    });
    return map;
  }, []);

  return (
    <>
      {/* ============================================
          EN-TÊTE DE PAGE
          ============================================ */}
      <Section size="md" className="pt-[clamp(3rem,8vh,5rem)] pb-0">
        <div className="max-w-3xl">
          <p className="eyebrow-accent mb-5">La Collection</p>
          <h1 className="text-[clamp(1.9rem,4vw,3.25rem)] leading-[1.06] font-medium tracking-[-0.025em] text-[var(--color-espresso)] mb-5">
            Pièces sélectionnées,
            <br />
            sourcées avec intention.
          </h1>
          <p className="text-[clamp(0.95rem,1.1vw,1.05rem)] leading-[1.7] text-[var(--color-espresso)]/65 max-w-xl">
            Mobilier, luminaires et objets façonnés entre ateliers européens
            et manufactures d'exception. Chaque pièce est contrôlée,
            documentée, livrée.
          </p>
        </div>
      </Section>

      {/* ============================================
          FILTRES + TRI
          ============================================ */}
      <Section size="sm" className="pt-10 md:pt-14">
        <div className="flex flex-col gap-6 pb-6 border-b border-[var(--color-espresso)]/10">

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
                    "inline-flex items-center gap-2 px-4 py-2.5 rounded-full",
                    "text-[0.7rem] font-semibold uppercase tracking-[0.16em]",
                    "transition-all duration-200",
                    isActive
                      ? "bg-[var(--color-bordeaux)] text-[var(--color-cream)]"
                      : "text-[var(--color-espresso)]/65 hover:text-[var(--color-espresso)] border border-[var(--color-espresso)]/15 hover:border-[var(--color-espresso)]/40",
                    count === 0 && cat !== "Tout" && "opacity-30 cursor-not-allowed"
                  )}
                >
                  {cat}
                  <span
                    className={cn(
                      "text-[0.62rem] font-medium tracking-normal tabular-nums",
                      isActive
                        ? "text-[var(--color-cream)]/60"
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
              <span className="font-semibold text-[var(--color-espresso)]">
                {filtered.length}
              </span>{" "}
              {filtered.length > 1 ? "pièces" : "pièce"}
              {activeCategory !== "Tout" && (
                <> · {activeCategory.toLowerCase()}</>
              )}
            </p>

            <label className="inline-flex items-center gap-3">
              <SlidersHorizontal
                size={14}
                className="text-[var(--color-espresso)]/50"
              />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="bg-transparent border-none outline-none
                           text-[0.72rem] font-semibold uppercase tracking-[0.16em]
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
      </Section>

      {/* ============================================
          GRILLE PRODUITS — 3 colonnes desktop
          ============================================ */}
      <Section size="md" className="pt-12 md:pt-16">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-7">
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
                    delay: (i % 3) * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <ProductCard product={p} index={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          /* État vide */
          <div className="py-24 text-center max-w-md mx-auto">
            <p className="text-[clamp(1.25rem,2vw,1.5rem)] font-medium text-[var(--color-espresso)] mb-3">
              Aucune pièce dans cette catégorie.
            </p>
            <p className="text-sm text-[var(--color-espresso)]/55 leading-relaxed mb-8">
              Revenez bientôt — de nouvelles pièces arrivent régulièrement.
            </p>
            <button
              onClick={() => setActiveCategory("Tout")}
              className="inline-flex items-center gap-2
                         bg-[var(--color-bordeaux)] text-[var(--color-cream)]
                         px-6 py-3 rounded-full
                         text-[0.7rem] font-semibold uppercase tracking-[0.2em]
                         hover:bg-[var(--color-bordeaux-deep)]
                         transition-colors"
            >
              Voir toute la collection
            </button>
          </div>
        )}
      </Section>

      {/* ============================================
    BANDE CTA — fin de page
    ============================================ */}
<section className="relative mt-20 md:mt-28 overflow-hidden">
  {/* Dégradé subtil mais visible — du crème vers un rosé chaud */}
  <div
    aria-hidden
    className="absolute inset-0"
    style={{
      background:
        "linear-gradient(180deg, #FBF9F5 0%, #FBF9F5 30%, #F7EFE9 60%, #EFDFD6 100%)",
    }}
  />

  <div className="relative container-kan py-16 md:py-20 lg:py-24">
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-12">

      {/* Texte */}
      <div className="max-w-xl">
        <p className="eyebrow-accent mb-4">Un projet sur-mesure ?</p>
        <h2 className="text-[clamp(1.5rem,2.5vw,2rem)] leading-tight font-medium text-[var(--color-espresso)] mb-3">
          Vous ne trouvez pas la pièce qu'il vous faut ?
        </h2>
        <p className="text-[0.92rem] leading-relaxed text-[var(--color-espresso)]/60">
          Nous développons chaque pièce sur-mesure, dans le respect de vos
          volumes, vos matières et vos délais.
        </p>
      </div>

      {/* Bouton pro avec vraie icône */}
      <a
        href="/start-project"
        className="group inline-flex items-center gap-3 shrink-0
                   bg-[var(--color-bordeaux)] text-[var(--color-cream)]
                   pl-7 pr-3 py-2.5 rounded-full
                   text-[0.72rem] font-semibold uppercase tracking-[0.22em]
                   hover:bg-[var(--color-bordeaux-deep)]
                   shadow-[0_8px_30px_-10px_rgba(74,29,30,0.5)]
                   hover:shadow-[0_12px_40px_-10px_rgba(74,29,30,0.6)]
                   transition-all duration-300"
      >
        <span>Start a Project</span>
        <span
          className="inline-flex items-center justify-center
                     w-9 h-9 rounded-full
                     bg-[var(--color-cream)] text-[var(--color-bordeaux)]
                     transition-transform duration-300
                     group-hover:translate-x-0.5"
        >
          <ArrowUpRight size={15} strokeWidth={2} />
        </span>
      </a>
    </div>
  </div>
</section>
    </>
  );
}