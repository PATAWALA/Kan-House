"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const SLIDES = ["01", "02", "03"];

export default function Hero() {
  return (
    <section className="relative w-full h-[calc(100vh-5rem)] min-h-[600px] overflow-hidden bg-[var(--color-cream)]">

      {/* ---------- IMAGE DE FOND ---------- */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=2400&q=90"
          alt="Intérieur signature — KAN HOUSE"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(26,26,26,0.15) 0%, rgba(26,26,26,0.35) 60%, rgba(26,26,26,0.55) 100%)",
          }}
        />
      </div>

      {/* ---------- TEXTE HAUT GAUCHE ---------- */}
      <motion.p
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="absolute top-8 left-0 right-0 z-10"
      >
        <span className="container-kan block text-[0.72rem] font-medium tracking-[0.22em] uppercase text-[var(--color-cream)]/85">
          Spaces that feel like you.
        </span>
      </motion.p>

      {/* ---------- BLOC PRINCIPAL HAUT DROITE ---------- */}
      <div className="relative z-10 h-full">
        <div className="container-kan h-full flex items-start pt-24 md:pt-32">
          <div className="ml-auto max-w-lg text-left">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-[0.62rem] font-medium uppercase tracking-[0.28em] text-[var(--color-cream)]/70 mb-5"
            >
              Modern Living. Timeless Spaces.
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.15] tracking-[-0.02em] font-normal text-[var(--color-cream)] mb-8"
            >
              Furniture, curated
              <br />
              for distinctive spaces.
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65 }}
            >
              <Link
                href="/collection"
                className="group inline-flex items-center gap-3
                           border border-[var(--color-cream)]/60
                           text-[var(--color-cream)]
                           px-6 py-3.5
                           text-[0.68rem] font-medium uppercase tracking-[0.22em]
                           hover:bg-[var(--color-cream)] hover:text-[var(--color-espresso)]
                           transition-colors duration-300"
              >
                Discover the Collection
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ---------- INDICATEUR LATÉRAL DROIT ---------- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="hidden md:flex absolute right-6 lg:right-10 top-1/2 -translate-y-1/2 z-10 flex-col items-end gap-4"
      >
        {SLIDES.map((s, i) => (
          <button
            key={s}
            className="group flex items-center gap-3 text-[0.7rem] tabular-nums tracking-[0.2em]"
          >
            <span
              className={
                i === 0
                  ? "text-[var(--color-cream)] font-medium"
                  : "text-[var(--color-cream)]/40 hover:text-[var(--color-cream)]/70 transition-colors"
              }
            >
              {s}
            </span>
            <span
              className={
                i === 0
                  ? "block w-6 h-px bg-[var(--color-cream)]"
                  : "block w-3 h-px bg-[var(--color-cream)]/30 group-hover:w-6 transition-all"
              }
            />
          </button>
        ))}
      </motion.div>
    </section>
  );
}