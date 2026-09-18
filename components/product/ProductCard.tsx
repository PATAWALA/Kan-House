"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Eye } from "lucide-react";
import type { Product } from "@/lib/data";

export default function ProductCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: (index % 3) * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group flex flex-col bg-[var(--color-cream)] border border-[var(--color-espresso)]/8 rounded-md overflow-hidden
                 hover:border-[var(--color-espresso)]/15 hover:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.12)]
                 transition-all duration-500"
    >
      {/* ============================================
          IMAGE — ratio 4:5, sobre
          ============================================ */}
      <Link href={`/collection/${product.id}`} className="block relative">
        <div className="ratio-portrait w-full overflow-hidden bg-[var(--color-cream-dark)]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
          />
        </div>

        {/* Catégorie — en haut à gauche */}
        <span className="absolute top-4 left-4 inline-block
                         bg-[var(--color-cream)]/95 backdrop-blur-sm
                         text-[var(--color-espresso)]/70
                         px-3 py-1.5 rounded-full
                         text-[0.62rem] font-semibold uppercase tracking-[0.18em]">
          {product.category}
        </span>
      </Link>

      {/* ============================================
          CONTENU — nom, description, prix, actions
          ============================================ */}
      <div className="flex flex-col flex-1 p-5 md:p-6">

        {/* Nom */}
        <h3 className="text-[1.1rem] md:text-[1.15rem] font-medium leading-tight
                       text-[var(--color-espresso)] mb-2">
          {product.name}
        </h3>

        {/* Description brève */}
        <p className="text-[0.82rem] leading-relaxed text-[var(--color-espresso)]/55 mb-5">
          {product.description}
        </p>

        {/* Prix — séparateur fin au-dessus */}
        <div className="mt-auto pt-4 border-t border-[var(--color-espresso)]/8 mb-4">
          <p className="text-[1.1rem] font-semibold text-[var(--color-bordeaux)]">
            {product.price}
          </p>
        </div>

        {/* Actions — 2 boutons côte à côte */}
        <div className="grid grid-cols-[1fr_auto] gap-2">
          {/* CTA principal — bordeaux */}
          <Link
            href="/start-project"
            className="group/btn inline-flex items-center justify-center gap-2
                       bg-[var(--color-bordeaux)] text-[var(--color-cream)]
                       px-4 py-3 rounded-full
                       text-[0.68rem] font-semibold uppercase tracking-[0.18em]
                       hover:bg-[var(--color-bordeaux-deep)]
                       transition-colors"
          >
            Start a Project
            <ArrowRight
              size={13}
              className="transition-transform group-hover/btn:translate-x-0.5"
            />
          </Link>

          {/* Détails — bouton secondaire */}
          <Link
            href={`/collection/${product.id}`}
            aria-label={`Voir les détails de ${product.name}`}
            className="inline-flex items-center justify-center
                       w-11 h-11 rounded-full
                       border border-[var(--color-espresso)]/20
                       text-[var(--color-espresso)]/70
                       hover:bg-[var(--color-espresso)] hover:text-[var(--color-cream)] hover:border-[var(--color-espresso)]
                       transition-colors"
          >
            <Eye size={15} strokeWidth={1.8} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}