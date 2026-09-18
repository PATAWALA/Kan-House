"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import DigitalProductCard from "@/components/digital/DigitalProductCard";
import Section from "@/components/ui/Section";
import {
  DIGITAL_PRODUCTS,
  DIGITAL_CATEGORIES,
  type DigitalCategory,
} from "@/lib/data";
import { cn } from "@/lib/cn";

type CategoryFilter = DigitalCategory | "Tout";

const CATEGORIES: CategoryFilter[] = ["Tout", ...DIGITAL_CATEGORIES];

export default function RessourcesPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("Tout");

  const filtered = useMemo(
    () =>
      activeCategory === "Tout"
        ? DIGITAL_PRODUCTS
        : DIGITAL_PRODUCTS.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  const counts = useMemo(() => {
    const map: Record<string, number> = { Tout: DIGITAL_PRODUCTS.length };
    DIGITAL_CATEGORIES.forEach((cat) => {
      map[cat] = DIGITAL_PRODUCTS.filter((p) => p.category === cat).length;
    });
    return map;
  }, []);

  return (
    <>
      {/* En-tête */}
      <Section size="md" className="pt-12 md:pt-16 lg:pt-20 pb-0">
        <div className="max-w-3xl">
          <p className="eyebrow-accent mb-5">Ressources</p>
          <h1 className="text-[clamp(1.9rem,4vw,3.25rem)] leading-[1.06] font-medium tracking-[-0.025em] text-[var(--color-espresso)] mb-5">
            Outils & accompagnement
            <br />
            pour votre sourcing.
          </h1>
          <p className="text-[clamp(0.95rem,1.1vw,1.05rem)] leading-[1.7] text-[var(--color-espresso)]/65 max-w-xl">
            Listes de fournisseurs vérifiées, annuaires logistiques et
            accompagnement individuel — conçus pour les entrepreneurs et
            professionnels du sourcing.
          </p>
        </div>
      </Section>

      {/* Filtres */}
      <Section size="sm" className="pt-10 md:pt-14">
        <div className="flex flex-col gap-6 pb-6 border-b border-[var(--color-espresso)]/10">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              const count = counts[cat] ?? 0;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "inline-flex items-center gap-2 px-4 py-2.5 rounded-full",
                    "text-[0.7rem] font-semibold uppercase tracking-[0.16em]",
                    "transition-all duration-200",
                    isActive
                      ? "bg-[var(--color-bordeaux)] text-[var(--color-cream)]"
                      : "text-[var(--color-espresso)]/65 hover:text-[var(--color-espresso)] border border-[var(--color-espresso)]/15 hover:border-[var(--color-espresso)]/40"
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

          <p className="text-[0.78rem] text-[var(--color-espresso)]/55">
            <span className="font-semibold text-[var(--color-espresso)]">
              {filtered.length}
            </span>{" "}
            {filtered.length > 1 ? "ressources" : "ressource"}
          </p>
        </div>
      </Section>

      {/* Grille */}
      <Section size="md" className="pt-12 md:pt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-7">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
              >
                <DigitalProductCard
                  product={p}
                  index={i}
                  onBuy={(prod) => {
                    // TODO: brancher Stripe Checkout
                    console.log("Acheter:", prod);
                  }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </Section>

      {/* CTA finale */}
      <section className="relative mt-16 md:mt-24 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #2A0E0F 0%, #5E2324 50%, #8B3536 100%)",
          }}
        />
        <div className="relative container-kan py-16 md:py-20 lg:py-24">
          <div className="flex flex-col md:flex-row items-start md:items-center
                          justify-between gap-8 md:gap-12">
            <div className="max-w-xl">
              <p className="eyebrow-invert mb-4">Besoin d'un accompagnement ?</p>
              <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] leading-tight
                             font-medium text-[var(--color-cream)] mb-3">
                Un projet complexe ?
              </h2>
              <p className="text-[0.92rem] leading-relaxed text-[var(--color-cream)]/70">
                Nous proposons des sessions de coaching individuel pour vous
                guider dans votre stratégie de sourcing.
              </p>
            </div>
            <a
              href="/start-project"
              className="group inline-flex items-center gap-3 shrink-0
                         bg-[var(--color-cream)] text-[var(--color-bordeaux)]
                         px-7 py-4 rounded-full
                         text-[0.72rem] font-semibold uppercase tracking-[0.22em]
                         hover:bg-[var(--color-sand)]
                         transition-colors"
            >
              Nous contacter
              <span className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}