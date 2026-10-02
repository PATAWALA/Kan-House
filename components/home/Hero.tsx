"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const SLIDES = ["01", "02", "03"];

export default function Hero() {
  return (
    <section className="relative w-full h-[calc(100vh-5rem)] min-h-[620px] overflow-hidden">

      {/* ============================================
          IMAGE DE FOND
          ============================================ */}
      <div className="absolute inset-0">
        <Image
          src="/hero.png"
          alt="Intérieur signature — KAN HOUSE"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* Voile desktop — dégradé horizontal */}
        <div
          aria-hidden
          className="hidden md:block absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(26,26,26,0.10) 0%, rgba(26,26,26,0.20) 40%, rgba(26,26,26,0.55) 70%, rgba(26,26,26,0.80) 100%)",
          }}
        />

        {/* Voile mobile — dégradé vertical uniforme */}
        <div
          aria-hidden
          className="md:hidden absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(26,26,26,0.65) 0%, rgba(26,26,26,0.45) 50%, rgba(26,26,26,0.80) 100%)",
          }}
        />
      </div>

      {/* ============================================
          CONTENU
          ============================================ */}
      <div className="relative z-10 h-full">
        <div className="container-kan h-full">

          {/* ---------- DESKTOP : grille alignée verticalement ---------- */}
          <div className="hidden md:grid grid-cols-2 gap-12 items-center h-full pt-14">

            {/* Tagline — alignée verticalement avec le titre */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="self-start pt-20"
            >
              <p
                className="max-w-[14rem] text-[0.8rem] font-normal leading-[1.6]
                           tracking-[0.02em] text-[var(--color-cafe-light)]"
                style={{
                  textShadow:
                    "0 2px 12px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.4)",
                }}
              >
                Spaces
                <br />
                that feel like you.
              </p>
            </motion.div>

            {/* Bloc principal — aligné à gauche de sa colonne */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="self-start pt-20 max-w-xl"
            >
              {/* Sur-titre */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="text-[0.6rem] font-medium uppercase tracking-[0.28em]
                           text-[var(--color-cafe-light)] mb-5"
                style={{ textShadow: "0 2px 10px rgba(0,0,0,0.55)" }}
              >
                Modern Living. Timeless Spaces.
              </motion.p>

              {/* Titre */}
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-[clamp(1.9rem,3.5vw,3rem)] leading-[1.12]
                           tracking-[-0.02em] font-normal
                           text-[var(--color-cafe-light)] mb-8"
                style={{
                  textShadow:
                    "0 4px 24px rgba(0,0,0,0.5), 0 2px 6px rgba(0,0,0,0.35)",
                }}
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
                             border border-[var(--color-cafe-light)]/80
                             text-[var(--color-cafe-light)]
                             px-5 py-3
                             text-[0.65rem] font-medium uppercase tracking-[0.22em]
                             hover:bg-[var(--color-cafe-light)] hover:text-[var(--color-espresso)]
                             transition-colors duration-300
                             backdrop-blur-[2px]"
                >
                  Discover the Collection
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* ---------- MOBILE : empilement propre ---------- */}
          <div className="md:hidden h-full flex flex-col justify-center gap-10 pt-6 pb-16">

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="max-w-[14rem] text-[0.85rem] font-normal leading-[1.55]
                         tracking-[0.02em] text-[var(--color-cafe-light)]"
              style={{
                textShadow:
                  "0 2px 12px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.4)",
              }}
            >
              Spaces
              <br />
              that feel like you.
            </motion.p>

            {/* Bloc principal */}
            <div>
              {/* Sur-titre */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35 }}
                className="text-[0.62rem] font-medium uppercase tracking-[0.28em]
                           text-[var(--color-cafe-light)] mb-5"
                style={{ textShadow: "0 2px 10px rgba(0,0,0,0.55)" }}
              >
                Modern Living. Timeless Spaces.
              </motion.p>

              {/* Titre */}
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-[clamp(1.75rem,7vw,2.5rem)] leading-[1.15]
                           tracking-[-0.02em] font-normal
                           text-[var(--color-cafe-light)] mb-8"
                style={{
                  textShadow:
                    "0 4px 24px rgba(0,0,0,0.5), 0 2px 6px rgba(0,0,0,0.35)",
                }}
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
                             border border-[var(--color-cafe-light)]/80
                             text-[var(--color-cafe-light)]
                             px-5 py-3
                             text-[0.65rem] font-medium uppercase tracking-[0.22em]
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
      </div>

      {/* ============================================
          INDICATEUR — 01 / 02 / 03 (desktop uniquement)
          ============================================ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="hidden md:flex absolute right-8 lg:right-12 top-1/2 -translate-y-1/2 z-10
                   flex-col items-end gap-5"
      >
        {SLIDES.map((s, i) => (
          <button
            key={s}
            className="group flex items-center gap-3 text-[0.65rem] tabular-nums tracking-[0.22em]"
          >
            <span
              className={
                i === 0
                  ? "text-[var(--color-cafe-light)] font-medium"
                  : "text-[var(--color-cafe-light)]/45 hover:text-[var(--color-cafe-light)]/80 transition-colors"
              }
              style={{ textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}
            >
              {s}
            </span>
            <span
              className={
                i === 0
                  ? "block w-7 h-px bg-[var(--color-cafe-light)]"
                  : "block w-3 h-px bg-[var(--color-cafe-light)]/35 group-hover:w-7 transition-all duration-300"
              }
            />
          </button>
        ))}
      </motion.div>
    </section>
  );
}