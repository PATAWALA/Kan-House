"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
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
        duration: 0.6,
        delay: (index % 4) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group"
    >
      <Link href={`/collection/${product.id}`} className="block">

        {/* ============================================
            IMAGE — ratio 4:5, sobre, sans artifice
            ============================================ */}
        <div className="ratio-portrait w-full overflow-hidden bg-[var(--color-cream-dark)]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
          />
        </div>

        {/* ============================================
            META — catégorie, nom, prix
            ============================================ */}
        <div className="mt-5">
          {/* Catégorie — petit label discret */}
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-espresso)]/45 mb-2">
            {product.category}
          </p>

          {/* Nom + Prix sur la même ligne */}
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-[1.05rem] md:text-[1.1rem] font-medium leading-snug text-[var(--color-espresso)] transition-colors group-hover:text-[var(--color-bordeaux)]">
              {product.name}
            </h3>
            <p className="text-sm font-medium text-[var(--color-bordeaux)] whitespace-nowrap">
              {product.price}
            </p>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}