"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-[var(--color-cream)] pt-navbar pb-16 lg:pb-24 overflow-hidden">
      <div className="container-kan grid-kan items-center">
        {/* ================= TEXTE — 5 colonnes desktop ================= */}
        <div className="col-span-12 lg:col-span-5 xl:col-span-5">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-4 mb-8 lg:mb-10"
          >
            <span className="block w-10 h-px bg-[var(--color-bordeaux)]" />
            <span className="eyebrow-accent">FF&E · Hospitality Sourcing</span>
          </motion.div>

          {/* Titre */}
          <h1 className="font-serif text-[clamp(2.5rem,5.5vw,5rem)] leading-[0.98] tracking-[-0.02em] text-[var(--color-espresso)] mb-8">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              Le mobilier
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              d'exception,
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="block italic font-light text-[var(--color-bordeaux)]"
            >
              sourcé entre
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="block italic font-light text-[var(--color-bordeaux)]"
            >
              deux mondes.
            </motion.span>
          </h1>

          {/* Sous-titre */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="text-base md:text-lg leading-relaxed text-[var(--color-espresso)]/70 max-w-md mb-10"
          >
            Une sélection curatée de pièces FF&E et de matériaux d'exception —
            pour les particuliers exigeants comme pour les projets hôteliers
            à l'international.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
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
        </div>

        {/* ================= IMAGE — 7 colonnes desktop ================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="col-span-12 lg:col-span-7 xl:col-span-7 mt-14 lg:mt-0"
        >
          <div className="ratio-portrait lg:ratio-portrait-tall w-full">
            <Image
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=90"
              alt="Intérieur signature — mobilier d'exception Kan House"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover"
            />

            {/* Badge overlay */}
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
              <div className="bg-[var(--color-cream)]/95 backdrop-blur-sm px-4 py-3 rounded-sm max-w-[80%]">
                <p
                  className="eyebrow mb-1"
                  style={{ color: "color-mix(in srgb, var(--color-espresso) 60%, transparent)" }}
                >
                  Collection Automne 2026
                </p>
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
      </div>

      {/* ================= BANDE INFÉRIEURE ================= */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
        className="container-kan mt-16 lg:mt-20 pt-8 border-t border-[var(--color-espresso)]/10 hidden md:flex items-center justify-between text-[0.68rem] uppercase tracking-[0.22em] text-[var(--color-espresso)]/45"
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