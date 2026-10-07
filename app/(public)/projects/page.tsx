"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
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
    <section className="bg-[var(--color-cafe-light)]">
      <div className="container-kan pt-16 md:pt-20 lg:pt-24 pb-20 md:pb-28">

        {/* ============================================
            EN-TÊTE
            ============================================ */}
        <div className="max-w-3xl mb-14 md:mb-20">
          <p className="eyebrow mb-5">Projects</p>
          <h1 className="text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.15]
                         tracking-[-0.02em] font-normal
                         text-[var(--color-espresso)] mb-5">
            Des lieux pensés
            <br />
            jusqu'au détail.
          </h1>
          <p className="text-[0.95rem] leading-[1.75]
                        text-[var(--color-espresso)]/65 max-w-xl">
            Une sélection de projets d'aménagement réalisés entre l'Europe
            et l'Asie — hôtels, restaurants, résidences et espaces de nuit.
          </p>
        </div>

        {/* ============================================
            FILTRES + COMPTEUR
            ============================================ */}
        <div
          className="flex flex-col gap-6 pb-6 mb-12 md:mb-16"
          style={{ borderBottom: "1px solid var(--color-border-line)" }}
        >
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
                    !isActive &&
                      "border border-[var(--color-border-line)] hover:border-[var(--color-espresso)]/30",
                    count === 0 &&
                      cat !== "Tout" &&
                      "opacity-30 cursor-not-allowed"
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

          <p className="text-[0.78rem] text-[var(--color-espresso)]/55">
            <span className="font-medium text-[var(--color-espresso)]">
              {filtered.length}
            </span>{" "}
            {filtered.length > 1 ? "projets" : "projet"}
            {activeCategory !== "Tout" && (
              <> · {activeCategory.toLowerCase()}</>
            )}
          </p>
        </div>

        {/* ============================================
            GRILLE PROJETS — 2 colonnes desktop
            ============================================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-14 lg:gap-x-8 lg:gap-y-16">
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
                className="group"
              >
                <Link href={`/projects/${p.id}`} className="block">
                  {/* Image */}
                  <div
                    className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--color-cafe-dark)]"
                    style={{ border: "1px solid var(--color-border-line)" }}
                  >
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-[1.4s] ease-out
                                 group-hover:scale-[1.04]"
                    />
                  </div>

                  {/* Meta */}
                  <div className="mt-5">
                    {/* Catégorie */}
                    <p className="text-[0.6rem] font-medium uppercase tracking-[0.24em]
                                  text-[var(--color-espresso)]/45 mb-2">
                      {p.category}
                    </p>

                    {/* Titre */}
                    <h3 className="text-[1.15rem] md:text-[1.35rem] font-normal
                                   leading-[1.25] tracking-[-0.01em]
                                   text-[var(--color-espresso)]
                                   group-hover:text-[var(--color-bordeaux)]
                                   transition-colors duration-300 mb-2">
                      {p.title}
                    </h3>

                    {/* Lieu + Année + Surface sur la même ligne */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1
                                    text-[0.8rem] text-[var(--color-espresso)]/55">
                      <span>{p.location}</span>
                      <span className="opacity-40">·</span>
                      <span>{p.year}</span>
                      <span className="opacity-40">·</span>
                      <span>{p.surface}</span>
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
            <p className="text-[1.15rem] font-normal
                          text-[var(--color-espresso)] mb-3">
              Aucun projet dans cette catégorie.
            </p>
            <p className="text-sm text-[var(--color-espresso)]/55 leading-relaxed mb-8">
              D'autres réalisations arrivent régulièrement.
            </p>
            <button
              onClick={() => setActiveCategory("Tout")}
              className="link-text"
            >
              Voir tous les projets →
            </button>
          </div>
        )}
      </div>

      {/* ============================================
          CTA FINALE — Bloc bordeaux
          ============================================ */}
      <div className="bg-[var(--color-bordeaux)] text-[var(--color-cafe-light)]">
        <div className="container-kan py-16 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <p className="eyebrow-invert mb-5">Votre projet, le prochain ?</p>
              <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15]
                             font-normal tracking-[-0.02em]
                             text-[var(--color-cafe-light)] mb-5">
                Parlons de votre lieu.
              </h2>
              <p className="text-[0.92rem] leading-[1.75]
                            text-[var(--color-cafe-light)]/70 max-w-lg">
                Nous développons chaque projet sur-mesure, du sourcing à
                l'installation finale.
              </p>
            </div>

            <div className="lg:col-span-5 flex lg:justify-end">
              <Link
                href="/start-project"
                className="group inline-flex items-center gap-3
                           border border-[var(--color-cafe-light)]/70
                           text-[var(--color-cafe-light)]
                           px-6 py-3.5
                           text-[0.68rem] font-medium uppercase tracking-[0.22em]
                           hover:bg-[var(--color-cafe-light)] hover:text-[var(--color-bordeaux)]
                           transition-colors duration-300"
              >
                Start a Project
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}