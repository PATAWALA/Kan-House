"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const STATS = [
  { k: "120+", v: "Projets livrés" },
  { k: "18", v: "Pays couverts" },
  { k: "6 wk", v: "Délai moyen" },
  { k: "100%", v: "Contrôle qualité" },
];

export default function HospitalityBanner() {
  return (
    <section className="relative bg-[var(--color-bordeaux)] text-[var(--color-cream)] overflow-hidden">
      {/* Image de fond + voile */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=2000&q=85"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-bordeaux-deep)]/95 via-[var(--color-bordeaux)]/90 to-[var(--color-bordeaux-deep)]/95" />
      </div>

      {/* Contenu */}
      <div className="relative section-y-lg">
        <div className="container-kan grid-kan items-center">
          {/* Texte — 6 col */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-12 lg:col-span-6"
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="block w-10 h-px bg-[var(--color-cream)]/40" />
              <span className="eyebrow-invert">Hospitality · B2B</span>
            </div>

            <h2 className="font-serif text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.05] tracking-[-0.02em] text-[var(--color-cream)] mb-8">
              Hôtels, restaurants
              <br />
              <em className="not-italic text-[var(--color-taupe)]">
                & résidences privées.
              </em>
            </h2>

            <p className="text-base md:text-lg text-[var(--color-cream)]/70 leading-relaxed max-w-lg mb-10">
              De la conception à l'installation, nous orchestrons le sourcing
              complet de vos aménagements — mobilier sur-mesure, matériaux
              nobles, contrôle qualité en Chine et logistique internationale.
            </p>

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
          </motion.div>

          {/* Stats — 5 col, décalées à droite */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-12 lg:col-span-5 lg:col-start-8 mt-14 lg:mt-0 grid grid-cols-2 gap-4"
          >
            {STATS.map((s) => (
              <div
                key={s.v}
                className="border border-[var(--color-cream)]/15 rounded-sm p-6 lg:p-7 bg-[var(--color-cream)]/[0.03] backdrop-blur-sm"
              >
                <p className="font-serif text-3xl md:text-4xl text-[var(--color-cream)] mb-2 leading-none">
                  {s.k}
                </p>
                <p className="eyebrow-invert">{s.v}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}