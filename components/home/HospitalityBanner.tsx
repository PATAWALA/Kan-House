"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const STATS = [
  { value: "120+", label: "Projets livrés" },
  { value: "18", label: "Pays couverts" },
  { value: "6 wk", label: "Délai moyen" },
];

export default function HospitalityBanner() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-bordeaux-deep)] text-[var(--color-cream)]">
      {/* ============================================
          IMAGE DE FOND — hôtel / lounge
          ============================================ */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=2400&q=85"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-25"
        />
        {/* Voile dégradé pour lisibilité */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(59,20,21,0.95) 0%, rgba(74,29,30,0.85) 50%, rgba(59,20,21,0.98) 100%)",
          }}
        />
      </div>

      {/* ============================================
          CONTENU
          ============================================ */}
      <div className="relative container-kan py-20 md:py-28 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* ---------- TEXTE — 7 colonnes ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <p className="eyebrow-invert mb-6">Hospitality · B2B</p>

            <h2 className="text-[clamp(1.75rem,3.5vw,3rem)] leading-[1.1] font-medium tracking-[-0.02em] text-[var(--color-cream)] mb-6">
              Hôtels, restaurants
              <br />
              <span className="italic font-light text-[var(--color-taupe)]">
                & résidences privées.
              </span>
            </h2>

            <p className="text-[clamp(0.95rem,1.1vw,1.05rem)] leading-[1.7] text-[var(--color-cream)]/70 max-w-lg mb-10">
              De la conception à l'installation, nous orchestrons le sourcing
              complet de vos aménagements — mobilier sur-mesure, matériaux
              nobles, contrôle qualité à la source et logistique internationale.
            </p>

            {/* CTA — bouton style navbar */}
            <Link
              href="/start-project"
              className="group inline-flex items-center gap-3
                         bg-[var(--color-cream)] text-[var(--color-bordeaux)]
                         px-7 py-4 rounded-full
                         text-[0.72rem] font-semibold uppercase tracking-[0.22em]
                         hover:bg-[var(--color-sand)]
                         transition-colors"
            >
              Start a Project
              <ArrowUpRight
                size={15}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </motion.div>

          {/* ---------- STATS — 5 colonnes ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="lg:col-span-5 grid grid-cols-3 gap-6 lg:gap-8
                       lg:border-l lg:border-[var(--color-cream)]/15 lg:pl-12"
          >
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="text-[clamp(1.5rem,2.5vw,2.25rem)] font-medium text-[var(--color-cream)] mb-2 leading-none">
                  {stat.value}
                </p>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--color-cream)]/55">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

