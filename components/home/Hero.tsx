"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden">
      {/* ============================================
          IMAGE DE FOND — salon avec fauteuils
          ============================================ */}
      <Image
        src="https://images.unsplash.com/photo-1567016432779-094069958ea5?w=2400&q=90"
        alt="Salon signature Kan House — mobilier d'exception"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* ============================================
          VOILE DÉGRADÉ — lisibilité du texte
          Plus sombre en bas, transparent en haut
          ============================================ */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-[var(--color-espresso)]/40 via-[var(--color-espresso)]/30 to-[var(--color-espresso)]/75"
      />

      {/* ============================================
          CONTENU — aligné en bas à gauche
          ============================================ */}
      <div className="relative z-10 h-full flex flex-col justify-end">
        <div className="container-kan pb-16 md:pb-24 lg:pb-28">
          <div className="max-w-3xl">

            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="eyebrow-invert mb-6 md:mb-8"
            >
              FF&E · Hospitality Sourcing
            </motion.p>

            {/* Titre principal */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.02] tracking-[-0.02em] text-[var(--color-cream)] mb-6 md:mb-8"
            >
              Le mobilier d'exception,
              <br />
              <em className="italic font-light">sourcé entre deux mondes.</em>
            </motion.h1>

            {/* Sous-titre */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="text-base md:text-lg leading-relaxed text-[var(--color-cream)]/75 max-w-xl mb-10 md:mb-12"
            >
              Une sélection curatée de pièces FF&E et de matériaux d'exception
              — pour les particuliers exigeants comme pour les projets
              hôteliers à l'international.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-6 md:gap-8"
            >
              <Link
                href="/start-project"
                className="group inline-flex items-center gap-3 bg-[var(--color-cream)] text-[var(--color-bordeaux)] px-7 py-4 rounded-full text-[0.72rem] font-semibold uppercase tracking-[0.22em] hover:bg-[var(--color-sand)] transition-colors"
              >
                Start a Project
                <ArrowUpRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>

              <Link
                href="/collection"
                className="group inline-flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-cream)]/90 hover:text-[var(--color-cream)] transition-colors"
              >
                Discover Collection
                <span className="w-8 h-px bg-current transition-all group-hover:w-12" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* ============================================
            BANDE INFÉRIEURE — ancrage minimal
            ============================================ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="hidden md:block border-t border-[var(--color-cream)]/15"
        >
          <div className="container-kan py-5 flex items-center justify-between text-[0.65rem] uppercase tracking-[0.24em] text-[var(--color-cream)]/60">
            <span>Paris · Shanghai</span>
            <span className="hidden lg:block">Est. 2019 — FF&E Sourcing</span>
            <span>120+ Projets livrés</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}