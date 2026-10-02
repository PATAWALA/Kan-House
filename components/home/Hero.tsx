"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const SLIDES = ["01", "02", "03"];

export default function Hero() {
  return (
    <section className="relative w-full h-[calc(100vh-5rem)] min-h-[600px] overflow-hidden">

      {/* ============================================
          IMAGE DE FOND
          ============================================ */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=2400&q=90"
          alt="Intérieur signature — KAN HOUSE"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Voile pour lisibilité */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(26,26,26,0.20) 0%, rgba(26,26,26,0.30) 50%, rgba(26,26,26,0.60) 100%)",
          }}
        />
      </div>

      {/* ============================================
          TEXTE HAUT GAUCHE — tagline
          ============================================ */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="absolute top-8 left-0 right-0 z-10"
      >
        <div className="container-kan">
          <p className="text-[0.68rem] font-medium tracking-[0.24em] uppercase
                        text-[var(--color-cafe-light)]/85">
            Spaces that feel like you.
          </p>
        </div>
      </motion.div>

      {/* ============================================
          BLOC PRINCIPAL — HAUT DROITE
          ============================================ */}
      <div className="relative z-10 h-full">
        <div className="container-kan h-full flex items-start pt-24 md:pt-32">
          <div className="ml-auto max-w-lg text-left">

            {/* Sur-titre */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-[0.62rem] font-medium uppercase tracking-[0.28em]
                         text-[var(--color-cafe-light)]/70 mb-5"
            >
              Modern Living. Timeless Spaces.
            </motion.p>

            {/* Titre */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.15]
                         tracking-[-0.02em] font-normal
                         text-[var(--color-cafe-light)] mb-8"
            >
              Furniture, curated
              <br />
              for distinctive spaces.
            </motion.h1>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65 }}
            >
              <Link
                href="/collection"
                className="group inline-flex items-center gap-3
                           border border-[var(--color-cafe-light)]/60
                           text-[var(--color-cafe-light)]
                           px-6 py-3.5
                           text-[0.68rem] font-medium uppercase tracking-[0.22em]
                           hover:bg-[var(--color-cafe-light)] hover:text-[var(--color-espresso)]
                           transition-colors duration-300"
              >
                Discover the Collection
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ============================================
          INDICATEUR LATÉRAL DROIT — 01 / 02 / 03
          ============================================ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="hidden md:flex absolute right-6 lg:right-10 top-1/2 -translate-y-1/2 z-10
                   flex-col items-end gap-4"
      >
        {SLIDES.map((s, i) => (
          <button
            key={s}
            className="group flex items-center gap-3 text-[0.7rem] tabular-nums tracking-[0.2em]"
          >
            <span
              className={
                i === 0
                  ? "text-[var(--color-cafe-light)] font-medium"
                  : "text-[var(--color-cafe-light)]/40 hover:text-[var(--color-cafe-light)]/70 transition-colors"
              }
            >
              {s}
            </span>
            <span
              className={
                i === 0
                  ? "block w-6 h-px bg-[var(--color-cafe-light)]"
                  : "block w-3 h-px bg-[var(--color-cafe-light)]/30 group-hover:w-6 transition-all"
              }
            />
          </button>
        ))}
      </motion.div>
    </section>
  );
}