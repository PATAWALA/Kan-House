"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { PRODUCTS, type Product } from "@/lib/data";
import { cn } from "@/lib/cn";

type Category = Product["category"] | "Tout";

const CATEGORIES: Category[] = ["Tout", "Canapés", "Tables", "Fauteuils", "Luminaires"];

export default function CollectionPage() {
  const [active, setActive] = useState<Category>("Tout");
  const [sortAsc, setSortAsc] = useState(true);

  const filtered = useMemo(() => {
    const list =
      active === "Tout"
        ? [...PRODUCTS]
        : PRODUCTS.filter((p) => p.category === active);

    // Tri simple par prix (parse "€ 4 200" → 4200)
    return list.sort((a, b) => {
      const pa = Number(a.price.replace(/[^\d]/g, ""));
      const pb = Number(b.price.replace(/[^\d]/g, ""));
      return sortAsc ? pa - pb : pb - pa;
    });
  }, [active, sortAsc]);

  return (
    <section className="container-kan pt-40 pb-32">
      {/* Header */}
      <div className="max-w-3xl mb-16">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="eyebrow mb-5"
        >
          La Collection
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-[clamp(2.5rem,5.5vw,4.75rem)] leading-[1.02] mb-6"
        >
          Pièces sélectionnées,
          <br />
          <em className="not-italic text-[var(--color-bordeaux)]">sourcées</em> avec intention.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-[var(--color-espresso)]/70 leading-relaxed"
        >
          Mobilier, luminaires et objets façonnés entre ateliers européens et
          manufactures chinoises d'exception. Chaque pièce est contrôlée,
          documentée, livrée.
        </motion.p>
      </div>

      {/* Barre filtres */}
      <div className="flex flex-wrap items-center justify-between gap-6 mb-12 pb-6 border-b border-[var(--color-espresso)]/10">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={cn(
                "px-4 py-2 rounded-full text-[0.72rem] uppercase tracking-[0.18em] transition-all",
                active === cat
                  ? "bg-[var(--color-bordeaux)] text-[var(--color-cream)]"
                  : "text-[var(--color-espresso)]/60 hover:text-[var(--color-espresso)] border border-[var(--color-espresso)]/15"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <button
          onClick={() => setSortAsc((v) => !v)}
          className="inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.18em] text-[var(--color-espresso)]/60 hover:text-[var(--color-bordeaux)] transition-colors"
        >
          <SlidersHorizontal size={14} />
          Prix {sortAsc ? "croissant" : "décroissant"}
        </button>
      </div>

      {/* Grille */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-14">
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <ProductCard product={p} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* État vide */}
      {filtered.length === 0 && (
        <div className="text-center py-24">
          <p className="font-serif text-2xl mb-3">Aucune pièce dans cette catégorie.</p>
          <p className="text-[var(--color-espresso)]/60 text-sm">
            Revenez bientôt — de nouvelles pièces arrivent régulièrement.
          </p>
        </div>
      )}
    </section>
  );
}