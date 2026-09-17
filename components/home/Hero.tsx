"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-[var(--color-cream)] overflow-hidden pt-32 lg:pt-40">
      <div className="container-kan grid lg:grid-cols-12 gap-10 lg:gap-16 items-center min-h-[calc(100vh-10rem)] py-12 lg:py-16">

        {/* ============================================
            COLONNE GAUCHE — Contenu éditorial
            ============================================ */}
        <div className="lg:col-span-6 xl:col-span-5 relative z-10">

          {/* Eyebrow avec filet */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex items-center gap-4 mb-8"
          >
            <span className="block w-10 h-px bg-[var(--color-bordeaux)]" />
            <span className="eyebrow-accent">
              FF&E · Hospitality Sourcing
            </span>
          </motion.div>

          {/* Titre principal — ligne par ligne */}
          <h1 className="font-serif text-[clamp(2.75rem,6.5vw,5.75rem)] leading-[0.96] tracking-[-0.02em] text-[var(--color-espresso)] mb-8">
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              Le mobilier
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              d'exception,
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.44, ease: [0.22, 1, 0.36, 1] }}
              className="block italic font-light text-[var(--color-bordeaux)]"
            >
              sourcé entre
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.56, ease: [0.22, 1, 0.36, 1] }}
              className="block italic font-light text-[var(--color-bordeaux)]"
            >
              deux mondes.
            </motion.span>
          </h1>

          {/* Sous-titre */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="lead max-w-md mb-10"
          >
            Une sélection curatée de pièces FF&E et de matériaux d'exception —
            pour les particuliers exigeants comme pour les projets hôteliers
            à l'international.
          </motion.p>

          {/* CTAs — hiérarchie claire */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.82 }}
            className="flex flex-wrap items-center gap-6"
          >
            {/* CTA principal */}
            <Link
              href="/start-project"
              className="group inline-flex items-center gap-3 bg-[var(--color-bordeaux)] text-[var(--color-cream)] px-7 py-4 rounded-full text-[0.72rem] font-semibold uppercase tracking-[0.22em] hover:bg-[var(--color-bordeaux-deep)] transition-colors shadow-sm"
            >
              Start a Project
              <ArrowUpRight
                size={15}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>

            {/* CTA secondaire — texte + flèche, discret */}
            <Link
              href="/collection"
              className="group inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-espresso)]/70 hover:text-[var(--color-bordeaux)] transition-colors"
            >
              Discover Collection
              <span className="w-6 h-px bg-current transition-all group-hover:w-10" />
            </Link>
          </motion.div>

          {/* Preuve / ancrage — bas de colonne */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="hidden lg:flex items-center gap-8 mt-16 pt-8 border-t border-[var(--color-espresso)]/10"
          >
            <div>
              <p className="font-serif text-2xl text-[var(--color-bordeaux)]">120+</p>
              <p className="eyebrow mt-1">Projets livrés</p>
            </div>
            <span className="w-px h-10 bg-[var(--color-espresso)]/10" />
            <div>
              <p className="font-serif text-2xl text-[var(--color-bordeaux)]">18</p>
              <p className="eyebrow mt-1">Pays couverts</p>
            </div>
            <span className="w-px h-10 bg-[var(--color-espresso)]/10" />
            <div>
              <p className="font-serif text-2xl text-[var(--color-bordeaux)]">6 wk</p>
              <p className="eyebrow mt-1">Délai moyen</p>
            </div>
          </motion.div>
        </div>

        {/* ============================================
            COLONNE DROITE — Visuel immersif
            ============================================ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-6 xl:col-span-7 relative"
        >
          <div className="relative aspect-[4/5] lg:aspect-[5/6] xl:aspect-[4/5] overflow-hidden rounded-sm bg-[var(--color-cream-dark)]">
            <Image
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1600&q=90"
              alt="Intérieur signature — mobilier d'exception Kan House"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />

            {/* Badge overlay — localisation */}
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
              <div className="bg-[var(--color-cream)]/95 backdrop-blur-sm px-4 py-3 rounded-sm">
                <p className="eyebrow-invert text-[var(--color-espresso)]/70 mb-0.5"
                   style={{ color: "color-mix(in srgb, var(--color-espresso) 60%, transparent)" }}>
                  Atelier signature
                </p>
                <p className="font-serif text-lg text-[var(--color-espresso)]">
                  Collection Automne 2026
                </p>
              </div>
              <span className="hidden md:inline-flex w-12 h-12 rounded-full bg-[var(--color-bordeaux)] text-[var(--color-cream)] place-items-center shrink-0">
                <ArrowUpRight size={18} />
              </span>
            </div>
          </div>

          {/* Décor : filet bordeaux vertical en arrière-plan */}
          <span
            aria-hidden
            className="hidden lg:block absolute -top-8 -left-8 w-px h-32 bg-[var(--color-bordeaux)]/30"
          />
        </motion.div>
      </div>

      {/* ============================================
          BANDE INFÉRIEURE — Ancrage marque
          ============================================ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.3 }}
        className="container-kan pb-10 hidden md:flex items-center justify-between text-[0.68rem] uppercase tracking-[0.22em] text-[var(--color-espresso)]/45"
      >
        <span>Paris · Shanghai</span>
        <span className="flex items-center gap-3">
          <span className="hidden lg:inline">Scroll</span>
          <span className="w-8 h-px bg-[var(--color-espresso)]/30" />
          <ArrowDown size={13} className="animate-bounce-slow" />
        </span>
        <span>Est. 2019</span>
      </motion.div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(4px); }
        }
        :global(.animate-bounce-slow) {
          animation: bounce-slow 2.4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}