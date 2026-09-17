"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { PRODUCTS, type Product } from "@/lib/data";
import { cn } from "@/lib/cn";

type Category = Product["category"] | "Tout";
const CATEGORIES: Category[] = ["Tout", "Canapés", "Tables", "Fauteuils", "Luminaires"];

export default function CollectionPage() {
  const [active, setActive] = useState<Category>("Tout");
  const [sortAsc, setSortAsc] = useState(true);

  const filtered = useMemo(() => {
    const list =
      active === "Tout" ? [...PRODUCTS] : PRODUCTS.filter((p) => p.category === active);
    return list.sort((a, b) => {
      const pa = Number(a.price.replace(/[^\d]/g, ""));
      const pb = Number(b.price.replace(/[^\d]/g, ""));
      return sortAsc ? pa - pb : pb - pa;
    });
  }, [active, sortAsc]);

  return (
    <>
      {/* Header de page */}
      <div className="pt-navbar">
        <Section size="md" className="pb-0">
          <SectionHeading
            eyebrow="La Collection"
            title={
              <>
                Pièces sélectionnées,
                <br />
                <em className="not-italic text-[var(--color-bordeaux)]">
                  sourcées avec intention.
                </em>
              </>
            }
            description="Mobilier, luminaires et objets façonnés entre ateliers européens et manufactures chinoises d'exception. Chaque pièce est contrôlée, documentée, livrée."
            maxWidth="md"
          />
        </Section>
      </div>

      {/* Filtres */}
      <Section size="sm" className="pt-10">
        <div className="flex flex-wrap items-center justify-between gap-6 pb-6 border-b border-[var(--color-espresso)]/10">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={cn(
                  "px-4 py-2 rounded-full text-[0.7rem] font-semibold uppercase tracking-[0.18em] transition-all",
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
            className="inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-espresso)]/60 hover:text-[var(--color-bordeaux)] transition-colors"
          >
            <SlidersHorizontal size={14} />
            Prix {sortAsc ? "croissant" : "décroissant"}
          </button>
        </div>

        {/* Grille */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-10 md:gap-y-14 mt-12 lg:mt-16">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
              >
                <ProductCard product={p} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24">
            <p className="font-serif text-2xl mb-3">Aucune pièce dans cette catégorie.</p>
            <p className="text-[var(--color-espresso)]/60 text-sm">
              Revenez bientôt — de nouvelles pièces arrivent régulièrement.
            </p>
          </div>
        )}
      </Section>
    </>
  );
}