"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-end pb-24 pt-40 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=2000&q=90"
          alt="Intérieur de luxe"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-cream)]/70 via-[var(--color-cream)]/40 to-[var(--color-cream)]" />
      </div>

      <div className="container-kan">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="eyebrow mb-6"
        >
          FF&E · Hospitality Sourcing · Paris — Shanghai
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.98] max-w-5xl text-[var(--color-espresso)]"
        >
          Le mobilier d'exception,
          <br />
          <em className="text-[var(--color-bordeaux)] not-italic">sourcé</em> entre deux mondes.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 max-w-xl text-base md:text-lg text-[var(--color-espresso)]/70 leading-relaxed"
        >
          Une sélection curatée de pièces FF&E et de matériaux d'exception,
          pour les particuliers exigeants comme pour les projets hôteliers
          à l'international.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Link
            href="/collection"
            className="inline-flex items-center gap-3 bg-[var(--color-espresso)] text-[var(--color-cream)] px-7 py-4 rounded-full text-[0.75rem] uppercase tracking-[0.2em] hover:bg-[var(--color-bordeaux)] transition-colors group"
          >
            Discover Collection
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/start-project"
            className="inline-flex items-center gap-3 border border-[var(--color-espresso)] text-[var(--color-espresso)] px-7 py-4 rounded-full text-[0.75rem] uppercase tracking-[0.2em] hover:bg-[var(--color-espresso)] hover:text-[var(--color-cream)] transition-colors group"
          >
            Start a Project
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}