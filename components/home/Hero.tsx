"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden">

      {/* ============================================
          IMAGE DE FOND — salon avec fauteuils visibles
          ============================================ */}
      <Image
        src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=2400&q=90"
        alt="Salon signature avec fauteuils — Kan House"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* ============================================
          DÉGRADÉ VERTICAL
          Transparent en haut → sombre en bas
          Garantit la lisibilité du texte placé en bas à gauche
          ============================================ */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-[var(--color-espresso)]/20 via-[var(--color-espresso)]/45 to-[var(--color-espresso)]/90"
      />

      {/* ============================================
          CONTENU — en bas à gauche, aligné
          ============================================ */}
      <div className="relative z-10 h-full flex flex-col justify-end">
        <div className="container-kan pb-16 md:pb-24 lg:pb-28">
          <div className="max-w-2xl">

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
              className="text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.05] tracking-[-0.025em] font-medium text-[var(--color-cream)] mb-7"
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
              className="text-base md:text-lg leading-relaxed text-[var(--color-cream)]/80 max-w-lg mb-10"
            >
              Une sélection curatée de pièces FF&E et de matériaux d'exception,
              pour les particuliers exigeants comme pour les projets hôteliers
              à l'international.
            </motion.p>

            {/* Boutons — fond bordeaux-deep, plus foncés */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-4"
            >
              {/* CTA principal — bordeaux-deep */}
              <Link
                href="/start-project"
                className="group inline-flex items-center gap-3 bg-[var(--color-bordeaux-deep)] text-[var(--color-cream)] px-7 py-4 rounded-full text-[0.72rem] font-semibold uppercase tracking-[0.22em] hover:bg-[var(--color-bordeaux)] transition-colors shadow-lg"
              >
                Start a Project
                <ArrowUpRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>

              {/* CTA secondaire — contour crème */}
              <Link
                href="/collection"
                className="inline-flex items-center gap-3 border border-[var(--color-cream)]/50 text-[var(--color-cream)] px-7 py-4 rounded-full text-[0.72rem] font-semibold uppercase tracking-[0.22em] hover:bg-[var(--color-cream)]/10 hover:border-[var(--color-cream)] transition-colors"
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