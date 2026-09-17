"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
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
      transition={{ duration: 0.6, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group cursor-pointer flex flex-col"
    >
      {/* Image — ratio fixe 4:5 partout */}
      <div className="ratio-portrait w-full overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
        />

        {/* Badge catégorie */}
        <div className="absolute top-4 left-4">
          <span className="inline-block bg-[var(--color-cream)]/95 backdrop-blur-sm text-[var(--color-espresso)] px-3 py-1.5 rounded-full text-[0.62rem] font-semibold uppercase tracking-[0.18em]">
            {product.category}
          </span>
        </div>

        {/* Bouton hover */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="w-10 h-10 rounded-full bg-[var(--color-cream)] grid place-items-center shadow-sm">
            <ArrowUpRight size={16} className="text-[var(--color-espresso)]" />
          </span>
        </div>
      </div>

      {/* Meta — hauteur contrôlée, texte bien aligné */}
      <div className="mt-5 flex items-start justify-between gap-4">
        <h3 className="font-serif text-lg md:text-xl leading-tight text-[var(--color-espresso)] pr-2">
          {product.name}
        </h3>
        <p className="text-sm font-medium text-[var(--color-bordeaux)] shrink-0 pt-1">
          {product.price}
        </p>
      </div>
    </motion.article>
  );
}