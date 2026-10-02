import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Section from "@/components/ui/Section";

const CATEGORIES = [
  {
    label: "Sofas",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=85",
  },
  {
    label: "Coffee Tables",
    image:
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=1200&q=85",
  },
  {
    label: "Armchairs",
    image:
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1200&q=85",
  },
  {
    label: "Lighting",
    image:
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1200&q=85",
  },
];

export default function OurCollection() {
  return (
    <Section size="lg">
      {/* ---------- En-tête ---------- */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14 md:mb-20">
        <div className="max-w-xl">
          <p className="text-[0.62rem] font-medium uppercase tracking-[0.28em] text-[var(--color-espresso)]/50 mb-5">
            Our Collection
          </p>
          <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] tracking-[-0.02em] font-normal text-[var(--color-espresso)]">
            Iconic pieces for modern living.
          </h2>
        </div>

        <Link
          href="/collection"
          className="group inline-flex items-center gap-2 self-start md:self-end
                     text-[0.7rem] font-medium uppercase tracking-[0.22em]
                     underline underline-offset-[6px] decoration-[1px]
                     text-[var(--color-espresso)]
                     hover:text-[var(--color-bordeaux)]
                     transition-colors"
        >
          View All Products
          <ArrowRight
            size={13}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>

      {/* ---------- Grille 4 colonnes strictes ---------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 lg:gap-x-8">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.label}
            href="/collection"
            className="group block"
          >
            <div className="ratio-portrait w-full bg-[var(--color-cream-dark)]">
              <Image
                src={cat.image}
                alt={cat.label}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
              />
            </div>

            <div className="mt-5">
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-[var(--color-espresso)] mb-2">
                {cat.label}
              </p>
              <span className="inline-flex items-center gap-1.5
                               text-[0.72rem] font-normal tracking-[0.05em]
                               underline underline-offset-[5px] decoration-[1px]
                               text-[var(--color-espresso)]/60
                               group-hover:text-[var(--color-espresso)]
                               transition-colors">
                Explore
                <ArrowRight
                  size={11}
                  className="transition-transform group-hover:translate-x-1"
                />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}