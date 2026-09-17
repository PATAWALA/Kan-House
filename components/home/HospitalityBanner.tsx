"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function HospitalityBanner() {
  return (
    <section className="relative bg-[var(--color-bordeaux)] text-[var(--color-cream)] overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <Image
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=2000&q=80"
          alt="Hôtel de luxe"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[var(--color-bordeaux)]/70" />
      </div>

      <div className="relative container-kan py-32 md:py-40 grid lg:grid-cols-12 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7"
        >
          <p className="eyebrow text-[var(--color-cream)]/60 mb-6">
            Hospitality · B2B
          </p>
          <h2 className="font-serif text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.02] mb-8">
            Hôtels, restaurants
            <br />
            <em className="not-italic text-[var(--color-taupe)]">& résidences privées.</em>
          </h2>
          <p className="max-w-xl text-[var(--color-cream)]/70 leading-relaxed mb-10">
            De la conception à l'installation, nous orchestrons le sourcing
            complet de vos aménagements — mobilier sur-mesure, matériaux nobles,
            contrôle qualité en Chine et logistique internationale.
          </p>
          <Link
            href="/start-project"
            className="group inline-flex items-center gap-3 bg-[var(--color-cream)] text-[var(--color-bordeaux)] px-7 py-4 rounded-full text-[0.75rem] uppercase tracking-[0.2em] hover:bg-[var(--color-sand)] transition-colors"
          >
            Start a Project
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 grid grid-cols-2 gap-4"
        >
          {[
            { k: "120+", v: "Projets livrés" },
            { k: "18", v: "Pays couverts" },
            { k: "6 wk", v: "Délai moyen" },
            { k: "100%", v: "Contrôle qualité" },
          ].map((s) => (
            <div
              key={s.v}
              className="border border-[var(--color-cream)]/15 rounded-sm p-6 backdrop-blur-sm bg-[var(--color-cream)]/5"
            >
              <p className="font-serif text-4xl mb-2">{s.k}</p>
              <p className="eyebrow text-[var(--color-cream)]/60">{s.v}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}