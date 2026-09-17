import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { PRODUCTS } from "@/lib/data";

export default function CollectionGrid() {
  return (
    <Section size="lg">
      {/* En-tête */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 lg:mb-20">
        <SectionHeading
          eyebrow="La Collection"
          title={
            <>
              Des pièces choisies,
              <br />
              pensées pour durer.
            </>
          }
          maxWidth="sm"
          className="mb-0"
        />

        <Link
          href="/collection"
          className="group inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-espresso)] hover:text-[var(--color-bordeaux)] transition-colors shrink-0"
        >
          Voir tout
          <ArrowRight
            size={15}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>

      {/* Grille produits — responsive cohérente */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-10 md:gap-y-14">
        {PRODUCTS.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </Section>
  );
}