"use client";

import Image from "next/image";
import Link from "next/link";
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay: (index % 3) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group flex flex-col"
    >
      {/* ============================================
          IMAGE — ratio 4:5
          ============================================ */}
      <Link
        href={`/collection/${product.id}`}
        className="block relative overflow-hidden rounded-sm bg-[var(--color-cream-dark)]"
      >
        <div className="ratio-portrait w-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-[1.4s] ease-out
                       group-hover:scale-[1.03]"
          />
        </div>
      </Link>

      {/* ============================================
          META — structure verticale sobre
          ============================================ */}
      <div className="flex flex-col flex-1 pt-5">

        {/* Catégorie */}
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em]
                      text-[var(--color-espresso)]/40 mb-2.5">
          {product.category}
        </p>

        {/* Nom */}
        <Link href={`/collection/${product.id}`}>
          <h3 className="text-[1.02rem] md:text-[1.08rem] font-medium leading-[1.35]
                         text-[var(--color-espresso)] mb-1.5
                         group-hover:text-[var(--color-bordeaux)]
                         transition-colors duration-300">
            {product.name}
          </h3>
        </Link>

        {/* Prix */}
        <p className="text-[0.92rem] font-medium text-[var(--color-bordeaux)]">
          {product.price}
        </p>

        {/* Bouton — discret, aligné à gauche, poussé en bas */}
        <Link
          href={`/collection/${product.id}`}
          className="self-start mt-6 group/btn inline-flex items-center gap-2.5
                     text-[0.65rem] font-semibold uppercase tracking-[0.22em]
                     text-[var(--color-espresso)]/70
                     hover:text-[var(--color-bordeaux)]
                     transition-colors duration-300"
        >
          <span>Voir la pièce</span>
          <ArrowUpRight
            size={13}
            strokeWidth={2}
            className="transition-transform duration-300
                       group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
          />
        </Link>
      </div>
    </motion.article>
  );
}