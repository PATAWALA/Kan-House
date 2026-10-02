"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Check } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/lib/data";
import { useCartStore } from "@/lib/store/cart";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay: (index % 3) * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group flex flex-col"
    >
      {/* IMAGE — zéro cadre */}
      <Link href={`/collection/${product.id}`} className="block">
        <div className="ratio-portrait w-full bg-[var(--color-cafe-dark)]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-[1.4s] ease-out
                       group-hover:scale-[1.04]"
          />
        </div>
      </Link>

      {/* META — juste nom + prix */}
      <div className="pt-4">
        <Link href={`/collection/${product.id}`}>
          <h3 className="text-[0.92rem] md:text-[0.98rem] font-medium leading-[1.35]
                         text-[var(--color-espresso)]
                         group-hover:text-[var(--color-bordeaux)]
                         transition-colors duration-300">
            {product.name}
          </h3>
        </Link>

        <p className="text-[0.85rem] text-[var(--color-espresso)]/55 mt-1">
          {product.price}
        </p>

        {/* Bouton Ajouter — discret, texte souligné */}
        <button
          onClick={handleAdd}
          disabled={justAdded}
          className="mt-3 inline-flex items-center gap-1.5
                     text-[0.65rem] font-medium uppercase tracking-[0.2em]
                     text-[var(--color-espresso)]/70
                     underline underline-offset-[5px] decoration-[1px]
                     hover:text-[var(--color-bordeaux)]
                     transition-colors disabled:opacity-60"
        >
          {justAdded ? (
            <>
              <Check size={11} strokeWidth={2.2} />
              Ajouté
            </>
          ) : (
            <>
              <Plus size={11} strokeWidth={2.2} />
              Ajouter
            </>
          )}
        </button>
      </div>
    </motion.article>
  );
}