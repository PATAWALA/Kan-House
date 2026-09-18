import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import Section from "@/components/ui/Section";
import { PRODUCTS } from "@/lib/data";

export default function CollectionGrid() {
  return (
    <Section size="lg">
      {/* En-tête */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-12 mb-14 md:mb-20">
        <div className="max-w-xl">
          <p className="eyebrow-accent mb-5">La Collection</p>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] font-medium tracking-[-0.02em] text-[var(--color-espresso)]">
            Des pièces choisies,
            <br />
            pensées pour durer.
          </h2>
        </div>

        <Link
          href="/collection"
          className="group inline-flex items-center gap-2 self-start md:self-end
                     text-[0.72rem] font-semibold uppercase tracking-[0.22em]
                     text-[var(--color-espresso)] hover:text-[var(--color-bordeaux)] transition-colors"
        >
          Voir tout
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* ============================================
          GRILLE — 1 mobile / 2 tablette / 3 desktop
          ============================================ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-7">
        {PRODUCTS.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </Section>
  );
}