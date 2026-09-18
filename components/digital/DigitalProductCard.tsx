"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, FileText, Video, List, Sparkles } from "lucide-react";
import type { DigitalProduct } from "@/lib/data";

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  Fournisseurs: List,
  Logistique: FileText,
  Coaching: Video,
  Guides: FileText,
};

export default function DigitalProductCard({
  product,
  index = 0,
  onBuy,
}: {
  product: DigitalProduct;
  index?: number;
  onBuy?: (p: DigitalProduct) => void;
}) {
  const Icon = CATEGORY_ICONS[product.category] ?? FileText;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay: (index % 3) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group flex flex-col overflow-hidden rounded-lg
                 bg-[var(--color-cream)]
                 border border-[var(--color-espresso)]/10
                 transition-all duration-500
                 hover:border-[var(--color-bordeaux)]/30
                 hover:shadow-[0_20px_50px_-20px_rgba(74,29,30,0.15)]"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-cream-dark)]">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out
                     group-hover:scale-[1.04]"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(26,26,26,0.5) 0%, transparent 100%)",
          }}
        />

        {/* Badge catégorie avec icône */}
        <span
          className="absolute top-3 left-3 inline-flex items-center gap-1.5
                     rounded-full px-3 py-1
                     text-[0.6rem] font-semibold uppercase tracking-[0.14em]
                     bg-[var(--color-cream)]/95 backdrop-blur-sm
                     text-[var(--color-espresso)]
                     border border-[var(--color-espresso)]/8"
        >
          <Icon size={11} />
          {product.category}
        </span>

        {/* Badge promotionnel (Bestseller, Premium…) */}
        {product.badge && (
          <span
            className="absolute top-3 right-3 inline-flex items-center gap-1
                       rounded-full px-3 py-1
                       text-[0.6rem] font-semibold uppercase tracking-[0.14em]
                       bg-[var(--color-bordeaux)] text-[var(--color-cream)]"
          >
            <Sparkles size={10} />
            {product.badge}
          </span>
        )}
      </div>

      {/* Contenu */}
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="text-[1.05rem] md:text-[1.1rem] font-medium leading-[1.3]
                       text-[var(--color-espresso)] mb-2
                       group-hover:text-[var(--color-bordeaux)]
                       transition-colors duration-300">
          {product.title}
        </h3>

        <p className="text-[0.82rem] leading-[1.6] text-[var(--color-espresso)]/55 mb-4">
          {product.description}
        </p>

        {/* Format */}
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em]
                      text-[var(--color-espresso)]/40 mb-4">
          {product.format}
        </p>

        {/* Prix + bouton */}
        <div className="mt-auto flex items-end justify-between gap-3
                        pt-4 border-t border-[var(--color-espresso)]/8">
          <div>
            <p className="text-[0.6rem] uppercase tracking-[0.18em] text-[var(--color-espresso)]/40 mb-0.5">
              Prix
            </p>
            <p className="text-[1.05rem] font-semibold text-[var(--color-bordeaux)]">
              {product.price}
            </p>
          </div>

          <button
            onClick={() => onBuy?.(product)}
            className="group/btn inline-flex items-center gap-1.5
                       px-4 py-2.5 rounded-full
                       text-[0.66rem] font-semibold uppercase tracking-[0.18em]
                       text-[var(--color-cream)]
                       transition-all duration-300
                       hover:shadow-[0_10px_30px_-10px_rgba(74,29,30,0.6)]
                       active:scale-[0.97]"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #3B1415 0%, #5E2324 50%, #4A1D1E 100%)",
            }}
          >
            Acheter
            <ArrowUpRight size={12} strokeWidth={2.4} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}