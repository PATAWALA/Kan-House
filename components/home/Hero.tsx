"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-[var(--color-cream)] pt-navbar overflow-hidden">
      {/* Filet décoratif à gauche — signature éditoriale */}
      <span
        aria-hidden
        className="hidden lg:block absolute left-[4vw] top-0 bottom-0 w-px bg-[var(--color-espresso)]/[0.06]"
      />

      <div className="container-kan">
        <div className="grid-kan items-center min-h-[calc(100vh-14rem)] py-14 lg:py-20">

          {/* ============================================
              COLONNE GAUCHE — 5 col : texte éditorial
              ============================================ */}
          <div className="col-span-12 lg:col-span-5 xl:col-span-5 relative z-10">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-4 mb-10"
            >
              <span className="block w-10 h-px bg-[var(--color-bordeaux)]" />
              <span className="eyebrow-accent">FF&E · Hospitality</span>
            </motion.div>

            {/* Titre — 3 lignes, italique maîtrisée */}
            <h1 className="font-serif text-[clamp(2.75rem,5.5vw,5.25rem)] leading-[0.95] tracking-[-0.025em] mb-8">
              <motion.span
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="block text-[var(--color-espresso)]"
              >
                Le mobilier
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="block italic font-light text-[var(--color-bordeaux)]"
              >
                d'exception,
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.44, ease: [0.22, 1, 0.36, 1] }}
                className="block text-[var(--color-espresso)]"
              >
                entre deux mondes.
              </motion.span>
            </h1>

            {/* Sous-titre */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="text-[1.02rem] md:text-[1.1rem] leading-[1.7] text-[var(--color-espresso)]/65 max-w-[28rem] mb-12"
            >
              Une sélection curatée de pièces FF&E et de matériaux d'exception
              — pour les particuliers exigeants comme pour les projets
              hôteliers à l'international.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.75 }}
              className="flex flex-wrap items-center gap-6"
            >
              <Link
                href="/start-project"
                className="group inline-flex items-center gap-3 bg-[var(--color-bordeaux)] text-[var(--color-cream)] px-7 py-4 rounded-full text-[0.72rem] font-semibold uppercase tracking-[0.22em] hover:bg-[var(--color-bordeaux-deep)] transition-colors"
              >
                Start a Project
                <ArrowUpRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>

              <Link
                href="/collection"
                className="group inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-espresso)]/70 hover:text-[var(--color-bordeaux)] transition-colors"
              >
                Discover Collection
                <span className="w-6 h-px bg-current transition-all group-hover:w-10" />
              </Link>
            </motion.div>

            {/* Ancrage bas de colonne */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="hidden lg:flex items-center gap-8 mt-16 pt-8 border-t border-[var(--color-espresso)]/10"
            >
              <div>
                <p className="font-serif text-2xl text-[var(--color-bordeaux)] leading-none">120+</p>
                <p className="eyebrow mt-2">Projets livrés</p>
              </div>
              <span className="w-px h-10 bg-[var(--color-espresso)]/10" />
              <div>
                <p className="font-serif text-2xl text-[var(--color-bordeaux)] leading-none">18</p>
                <p className="eyebrow mt-2">Pays couverts</p>
              </div>
              <span className="w-px h-10 bg-[var(--color-espresso)]/10" />
              <div>
                <p className="font-serif text-2xl text-[var(--color-bordeaux)] leading-none">6&nbsp;wk</p>
                <p className="eyebrow mt-2">Délai moyen</p>
              </div>
            </motion.div>
          </div>

          {/* ============================================
              COLONNE DROITE — 7 col : composition 2 images
              ============================================ */}
          <div className="col-span-12 lg:col-span-7 xl:col-span-7 relative mt-16 lg:mt-0">

            {/* Image principale — ratio portrait 4:5, alignée droite */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative ml-auto w-full lg:w-[88%] xl:w-[85%]"
            >
              <div className="ratio-portrait overflow-hidden rounded-sm bg-[var(--color-cream-dark)]">
                <Image
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=90"
                  alt="Intérieur signature Kan House"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                />

                {/* Badge éditorial */}
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
                  <div className="bg-[var(--color-cream)]/95 backdrop-blur-sm px-4 py-3 rounded-sm">
                    <p className="eyebrow mb-1">Collection Automne 2026</p>
                    <p className="font-serif text-base md:text-lg text-[var(--color-espresso)] leading-tight">
                      Atelier signature
                    </p>
                  </div>
                  <span className="hidden md:inline-flex w-12 h-12 rounded-full bg-[var(--color-bordeaux)] text-[var(--color-cream)] place-items-center shrink-0">
                    <ArrowUpRight size={18} />
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Image secondaire — superposée en bas-gauche, décalage éditorial */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:block absolute left-0 bottom-[-3rem] xl:bottom-[-4rem] w-[38%] xl:w-[34%] z-20"
            >
              <div className="ratio-square overflow-hidden rounded-sm bg-[var(--color-cream-dark)] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.35)]">
                <Image
                  src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=900&q=85"
                  alt="Détail d'une pièce signature"
                  fill
                  sizes="(max-width: 1024px) 40vw, 20vw"
                  className="object-cover"
                />
              </div>
            </motion.div>

            {/* Petit label flottant — signature de marque */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="hidden xl:block absolute top-6 right-0"
            >
              <span className="eyebrow rotate-90 inline-block origin-top-right whitespace-nowrap">
                Est. Paris · Shanghai
              </span>
            </motion.div>
          </div>
        </div>

        {/* ============================================
            BANDE INFÉRIEURE — ancrage
            ============================================ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="hidden md:flex items-center justify-between gap-6 py-8 border-t border-[var(--color-espresso)]/10 text-[0.68rem] uppercase tracking-[0.22em] text-[var(--color-espresso)]/40"
        >
          <span>Paris · Shanghai</span>
          <span className="hidden lg:flex items-center gap-3">
            <span>Scroll</span>
            <span className="w-10 h-px bg-[var(--color-espresso)]/25" />
            <ArrowDown size={13} className="animate-bounce-slow" />
          </span>
          <span>Est. 2019</span>
        </motion.div>
      </div>
    </section>
  );
}