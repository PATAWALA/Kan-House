"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, Plus, Check } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/lib/data";
import { useCartStore } from "@/lib/store/cart";

interface ProductCardProps {
  product: Product;
  index?: number;
  onQuickView?: (p: Product) => void;
}

export default function ProductCard({
  product,
  index = 0,
  onQuickView,
}: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    addItem(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay: (index % 3) * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group flex flex-col overflow-hidden rounded-lg
                 bg-[var(--color-cream)]
                 border border-[var(--color-espresso)]/10
                 transition-all duration-500
                 hover:border-[var(--color-bordeaux)]/30
                 hover:shadow-[0_20px_50px_-20px_rgba(74,29,30,0.15)]"
    >
      {/* IMAGE — ratio 4:3 compact */}
      <Link
        href={`/collection/${product.id}`}
        className="relative block overflow-hidden bg-[var(--color-cream-dark)]"
      >
        <div className="aspect-[4/3] relative">
          <Image
            src={product.image}
            alt={product.name}
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
                "linear-gradient(to top, rgba(26,26,26,0.4) 0%, transparent 100%)",
            }}
          />
        </div>

        <span
          className="absolute top-3 left-3 rounded-full px-3 py-1
                     text-[0.6rem] font-semibold uppercase tracking-[0.14em]
                     bg-[var(--color-cream)]/95 backdrop-blur-sm
                     text-[var(--color-espresso)]
                     border border-[var(--color-espresso)]/8"
        >
          {product.category}
        </span>

        {onQuickView && (
          <button
            onClick={(e) => {
              e.preventDefault();
              onQuickView(product);
            }}
            aria-label="Vue rapide"
            className="absolute top-3 right-3 inline-flex items-center gap-1.5
                       rounded-full px-3 py-1.5
                       text-[0.6rem] font-semibold uppercase tracking-[0.14em]
                       bg-[var(--color-espresso)]/90 backdrop-blur-sm
                       text-[var(--color-cream)]
                       border border-[var(--color-cream)]/20
                       opacity-0 group-hover:opacity-100
                       transition-opacity duration-300
                       hover:bg-[var(--color-espresso)]"
          >
            <Eye size={12} />
            <span className="hidden sm:inline">Aperçu</span>
          </button>
        )}
      </Link>

      {/* CONTENU */}
      <div className="flex flex-1 flex-col p-4 md:p-5">
        <Link href={`/collection/${product.id}`}>
          <h3
            className="text-[0.98rem] md:text-[1.02rem] font-medium leading-[1.35]
                       text-[var(--color-espresso)] mb-2
                       group-hover:text-[var(--color-bordeaux)]
                       transition-colors duration-300"
          >
            {product.name}
          </h3>
        </Link>

        <p className="text-[0.78rem] leading-[1.5] text-[var(--color-espresso)]/50
                      line-clamp-2 mb-4">
          {product.description}
        </p>

        {/* Prix + Bouton */}
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

          {/* Bouton Ajouter — feedback animé */}
          <button
            onClick={handleAdd}
            disabled={justAdded}
            className="group/btn inline-flex items-center gap-1.5
                       px-4 py-2.5 rounded-full
                       text-[0.66rem] font-semibold uppercase tracking-[0.18em]
                       text-[var(--color-cream)]
                       transition-all duration-300
                       hover:shadow-[0_10px_30px_-10px_rgba(74,29,30,0.6)]
                       active:scale-[0.97]
                       disabled:opacity-90"
            style={{
              backgroundImage: justAdded
                ? "linear-gradient(135deg, #14532D 0%, #166534 50%, #14532D 100%)"
                : "linear-gradient(135deg, #3B1415 0%, #5E2324 50%, #4A1D1E 100%)",
            }}
          >
            {justAdded ? (
              <>
                <Check size={13} strokeWidth={2.4} />
                Ajouté
              </>
            ) : (
              <>
                <Plus size={13} strokeWidth={2.4} />
                Ajouter
              </>
            )}
          </button>
        </div>
      </div>
    </motion.article>
  );
}