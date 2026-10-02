"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const SLIDES = ["01", "02", "03"];

export default function Hero() {
  return (
    <section className="relative w-full h-[calc(100vh-5rem)] min-h-[620px] overflow-hidden">

      {/* IMAGE DE FOND */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=2400&q=90"
          alt="Intérieur signature — KAN HOUSE"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Voile diagonal : plus dense à droite et en haut pour lisibilité */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(120deg, rgba(26,26,26,0.15) 0%, rgba(26,26,26,0.35) 55%, rgba(26,26,26,0.75) 100%)",
          }}
        />
        {/* Voile vertical secondaire pour le bas */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/3"
          style={{
            background:
              "linear-gradient(to top, rgba(26,26,26,0.55) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* TAGLINE — HAUT GAUCHE */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="absolute top-10 md:top-14 left-0 right-0 z-10"
      >
        <div className="container-kan">
          <p
            className="max-w-[12rem] text-[0.75rem] font-normal leading-[1.6]
                       tracking-[0.02em] text-[var(--color-cafe-light)]"
            style={{
              textShadow: "0 2px 12px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.4)",
            }}
          >
            Spaces
            <br />
            that feel like you.
          </p>
        </div>
      </motion.div>

      {/* BLOC PRINCIPAL — HAUT DROITE */}
      <div className="relative z-10 h-full">
        <div className="container-kan h-full flex items-start pt-10 md:pt-14">
          <div className="ml-auto max-w-xl text-left pt-6 md:pt-8">

            {/* Sur-titre */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-[0.6rem] font-medium uppercase tracking-[0.28em]
                         text-[var(--color-cafe-light)] mb-5"
              style={{
                textShadow: "0 2px 10px rgba(0,0,0,0.55)",
              }}
            >
              Modern Living. Timeless Spaces.
            </motion.p>

            {/* Titre */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(1.9rem,4vw,3.25rem)] leading-[1.12]
                         tracking-[-0.02em] font-normal
                         text-[var(--color-cafe-light)] mb-8"
              style={{
                textShadow: "0 4px 24px rgba(0,0,0,0.55), 0 2px 6px rgba(0,0,0,0.4)",
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
                style={{
                  textShadow: "0 1px 4px rgba(0,0,0,0.3)",
                }}
              >
                Discover the Collection
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* INDICATEUR LATÉRAL DROIT */}
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