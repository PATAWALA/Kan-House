"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <section
      className="relative w-full overflow-hidden
                 h-[calc(100vh-5rem)] min-h-[560px] max-h-[880px]
                 supports-[height:100dvh]:h-[calc(100dvh-5rem)]"
    >
      <Image
        src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=2400&q=90"
        alt="Salon signature avec fauteuils — Kan House"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Dégradé vertical */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-[var(--color-espresso)]/25 via-[var(--color-espresso)]/50 to-[var(--color-espresso)]/92"
      />

      {/* ============================================
          CONTENU — centré puis poussé vers le bas
          ============================================ */}
      <div className="relative z-10 h-full flex flex-col justify-center pt-[12vh] pb-[6vh]">
        <div className="container-kan w-full">
          <div className="max-w-[42rem] lg:max-w-[46rem]">

            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="eyebrow-invert mb-5 md:mb-6"
            >
              FF&E Sourcing — Paris · Shanghai
            </motion.p>

            {/* Titre */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="font-medium text-[var(--color-cream)] mb-6 md:mb-7
                         text-[clamp(1.9rem,4.5vw,4rem)]
                         leading-[1.06] tracking-[-0.025em]"
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
              className="text-[clamp(0.95rem,1.1vw,1.1rem)]
                         leading-[1.65]
                         text-[var(--color-cream)]/80
                         max-w-[36rem]
                         mb-8 md:mb-10"
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
              className="flex flex-wrap items-center gap-3 md:gap-4"
            >
              <Link
                href="/start-project"
                className="group inline-flex items-center gap-3
                           bg-[var(--color-bordeaux-deep)] text-[var(--color-cream)]
                           px-6 md:px-7 py-3.5 md:py-4
                           rounded-full
                           text-[0.7rem] md:text-[0.72rem]
                           font-semibold uppercase tracking-[0.22em]
                           hover:bg-[var(--color-bordeaux)]
                           transition-colors shadow-lg"
              >
                Start a Project
                <ArrowUpRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>

              <Link
                href="/collection"
                className="inline-flex items-center gap-3
                           border border-[var(--color-cream)]/50
                           text-[var(--color-cream)]
                           px-6 md:px-7 py-3.5 md:py-4
                           rounded-full
                           text-[0.7rem] md:text-[0.72rem]
                           font-semibold uppercase tracking-[0.22em]
                           hover:bg-[var(--color-cream)]/10 hover:border-[var(--color-cream)]
                           transition-colors"
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

