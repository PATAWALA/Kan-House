"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, SlidersHorizontal } from "lucide-react";
import Section from "@/components/ui/Section";
import { cn } from "@/lib/cn";

type ProjectCategory = "Hôtel" | "Restaurant" | "Villa" | "Lounge";
type Filter = ProjectCategory | "Tout";

type Project = {
  id: string;
  title: string;
  location: string;
  year: string;
  category: ProjectCategory;
  surface: string;
  image: string;
};

const CATEGORIES: Filter[] = ["Tout", "Hôtel", "Restaurant", "Villa", "Lounge"];

const PROJECTS: Project[] = [
  {
    id: "maison-rouge",
    title: "Maison Rouge",
    location: "Bordeaux, France",
    year: "2024",
    category: "Hôtel",
    surface: "1 200 m²",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1600&q=85",
  },
  {
    id: "atelier-nord",
    title: "Atelier Nord",
    location: "Copenhagen, Danemark",
    year: "2024",
    category: "Restaurant",
    surface: "320 m²",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=85",
  },
  {
    id: "villa-solene",
    title: "Villa Solène",
    location: "Saint-Tropez, France",
    year: "2023",
    category: "Villa",
    surface: "480 m²",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=85",
  },
  {
    id: "jade-lounge",
    title: "The Jade Lounge",
    location: "Shanghai, Chine",
    year: "2023",
    category: "Lounge",
    surface: "260 m²",
    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1600&q=85",
  },
  {
    id: "hotel-sillage",
    title: "Hôtel Sillage",
    location: "Lisbonne, Portugal",
    year: "2022",
    category: "Hôtel",
    surface: "2 100 m²",
    image:
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1600&q=85",
  },
  {
    id: "casa-murano",
    title: "Casa Murano",
    location: "Milan, Italie",
    year: "2022",
    category: "Restaurant",
    surface: "180 m²",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=85",
  },
  {
    id: "villa-orphee",
    title: "Villa Orphée",
    location: "Ibiza, Espagne",
    year: "2023",
    category: "Villa",
    surface: "620 m²",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=85",
  },
  {
    id: "club-noir",
    title: "Club Noir",
    location: "Paris, France",
    year: "2022",
    category: "Lounge",
    surface: "400 m²",
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1600&q=85",
  },
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<Filter>("Tout");

  const filtered = useMemo(
    () =>
      activeCategory === "Tout"
        ? PROJECTS
        : PROJECTS.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  // Comptes par catégorie
  const counts = useMemo(() => {
    const map: Record<string, number> = { Tout: PROJECTS.length };
    (["Hôtel", "Restaurant", "Villa", "Lounge"] as ProjectCategory[]).forEach(
      (cat) => {
        map[cat] = PROJECTS.filter((p) => p.category === cat).length;
      }
    );
    return map;
  }, []);

  return (
    <>
      {/* ============================================
          EN-TÊTE DE PAGE
          ============================================ */}
      <Section size="md" className="pt-[clamp(3rem,8vh,5rem)] pb-0">
        <div className="max-w-3xl">
          <p className="eyebrow-accent mb-5">Projects</p>
          <h1 className="text-[clamp(1.9rem,4vw,3.25rem)] leading-[1.06] font-medium tracking-[-0.025em] text-[var(--color-espresso)] mb-5">
            Des lieux pensés
            <br />
            jusqu'au détail.
          </h1>
          <p className="text-[clamp(0.95rem,1.1vw,1.05rem)] leading-[1.7] text-[var(--color-espresso)]/65 max-w-xl">
            Une sélection de projets d'aménagement réalisés entre l'Europe
            et l'Asie — hôtels, restaurants, résidences et espaces de nuit.
          </p>
        </div>
      </Section>

      {/* ============================================
          FILTRES
          ============================================ */}
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
                  disabled={count === 0 && cat !== "Tout"}
                  className={cn(
                    "inline-flex items-center gap-2 px-4 py-2.5 rounded-full",
                    "text-[0.7rem] font-semibold uppercase tracking-[0.16em]",
                    "transition-all duration-200",
                    isActive
                      ? "bg-[var(--color-bordeaux)] text-[var(--color-cream)]"
                      : "text-[var(--color-espresso)]/65 hover:text-[var(--color-espresso)] border border-[var(--color-espresso)]/15 hover:border-[var(--color-espresso)]/40",
                    count === 0 &&
                      cat !== "Tout" &&
                      "opacity-30 cursor-not-allowed"
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
            {filtered.length > 1 ? "projets" : "projet"}
            {activeCategory !== "Tout" && (
              <> · {activeCategory.toLowerCase()}</>
            )}
          </p>
        </div>
      </Section>

      {/* ============================================
          GRILLE PROJETS
          ============================================ */}
      <Section size="md" className="pt-12 md:pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.article
                key={p.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  duration: 0.5,
                  delay: (i % 2) * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group cursor-pointer"
              >
                <Link href={`/projects/${p.id}`} className="block">
                  {/* Image */}
                  <div className="relative aspect-[4/3] w-full
                                  overflow-hidden rounded-md
                                  bg-[var(--color-cream-dark)]">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-[1.4s] ease-out
                                 group-hover:scale-[1.04]"
                    />

                    {/* Badge catégorie */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-block
                                       bg-[var(--color-cream)]/95 backdrop-blur-sm
                                       text-[var(--color-espresso)]
                                       px-3 py-1.5 rounded-full
                                       text-[0.62rem] font-semibold uppercase tracking-[0.16em]
                                       border border-[var(--color-espresso)]/5">
                        {p.category}
                      </span>
                    </div>

                    {/* Flèche hover */}
                    <div className="absolute bottom-4 right-4
                                    opacity-0 group-hover:opacity-100
                                    transition-opacity duration-300">
                      <span className="inline-flex items-center justify-center
                                       w-11 h-11 rounded-full
                                       bg-[var(--color-cream)] text-[var(--color-espresso)]">
                        <ArrowUpRight size={16} strokeWidth={2} />
                      </span>
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="mt-6 flex items-start justify-between gap-6">
                    <div>
                      <h3 className="text-[1.15rem] md:text-[1.35rem] font-medium
                                     leading-tight text-[var(--color-espresso)]
                                     group-hover:text-[var(--color-bordeaux)]
                                     transition-colors duration-300 mb-1.5">
                        {p.title}
                      </h3>
                      <p className="text-[0.85rem] text-[var(--color-espresso)]/55">
                        {p.location}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em]
                                    text-[var(--color-espresso)]/40 mb-1">
                        {p.year}
                      </p>
                      <p className="text-[0.78rem] text-[var(--color-espresso)]/55">
                        {p.surface}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* État vide */}
        {filtered.length === 0 && (
          <div className="py-24 text-center max-w-md mx-auto">
            <p className="text-[clamp(1.25rem,2vw,1.5rem)] font-medium text-[var(--color-espresso)] mb-3">
              Aucun projet dans cette catégorie.
            </p>
            <p className="text-sm text-[var(--color-espresso)]/55 leading-relaxed mb-8">
              D'autres réalisations arrivent régulièrement.
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
              Voir tous les projets
            </button>
          </div>
        )}
      </Section>

      {/* ============================================
          CTA FINALE
          ============================================ */}
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
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-12">
            <div className="max-w-xl">
              <p className="eyebrow-invert mb-4">Votre projet, le prochain ?</p>
              <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] leading-tight font-medium text-[var(--color-cream)] mb-3">
                Parlons de votre lieu.
              </h2>
              <p className="text-[0.92rem] leading-relaxed text-[var(--color-cream)]/70">
                Nous développons chaque projet sur-mesure, du sourcing à
                l'installation finale.
              </p>
            </div>

            <Link
              href="/start-project"
              className="group inline-flex items-center gap-3 shrink-0
                         bg-[var(--color-cream)] text-[var(--color-bordeaux)]
                         px-7 py-4 rounded-full
                         text-[0.72rem] font-semibold uppercase tracking-[0.22em]
                         hover:bg-[var(--color-sand)]
                         transition-colors"
            >
              Start a Project
              <ArrowUpRight
                size={15}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}