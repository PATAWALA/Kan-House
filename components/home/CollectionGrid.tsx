import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { PRODUCTS } from "@/lib/data";

export default function CollectionGrid() {
  return (
    <section className="container-kan py-32">
      <div className="flex flex-wrap items-end justify-between gap-6 mb-16">
        <div>
          <p className="eyebrow mb-3">La Collection</p>
          <h2 className="font-serif text-[clamp(2rem,4.5vw,3.75rem)] max-w-2xl leading-[1.02]">
            Des pièces choisies,
            <br /> pensées pour durer.
          </h2>
        </div>
        <Link
          href="/collection"
          className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-[var(--color-espresso)] hover:text-[var(--color-bordeaux)] transition-colors"
        >
          Voir tout
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-14">
        {PRODUCTS.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}