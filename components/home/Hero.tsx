"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden">
      {/* ============================================
          IMAGE DE FOND
          ============================================ */}
      <Image
        src="https://images.unsplash.com/photo-1567016432779-094069958ea5?w=2400&q=90"
        alt="Salon signature — Kan House"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* ============================================
          DÉGRADÉ HORIZONTAL
          Transparent à gauche → sombre à droite
          Le texte sera à droite, donc lisible
          ============================================ */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-espresso)]/40 to-[var(--color-espresso)]/85"
      />

      {/* ============================================
          CONTENU — aligné à droite, verticalement centré
          ============================================ */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container-kan w-full">
          <div className="ml-auto max-w-xl text-left">

            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="eyebrow-invert mb-6"
            >
              FF&E Sourcing — Paris · Shanghai
            </motion.p>

            {/* Titre */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.06] tracking-[-0.02em] text-[var(--color-cream)] mb-6"
            >
              Le mobilier d'exception,
              <br />
              sourcé entre deux mondes.
            </motion.h1>

            {/* Sous-titre */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="text-base md:text-lg leading-relaxed text-[var(--color-cream)]/80 mb-10 max-w-lg"
            >
              Une sélection curatée de pièces FF&E et de matériaux d'exception,
              pour les particuliers exigeants comme pour les projets hôteliers
              à l'international.
            </motion.p>

            {/* Boutons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-4"
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
                className="inline-flex items-center gap-3 border border-[var(--color-cream)]/40 text-[var(--color-cream)] px-7 py-4 rounded-full text-[0.72rem] font-semibold uppercase tracking-[0.22em] hover:bg-[var(--color-cream)]/10 hover:border-[var(--color-cream)]/70 transition-colors"
              >
                Discover Collection
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}