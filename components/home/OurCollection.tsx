import Image from "next/image";
import Link from "next/link";
import Section from "@/components/ui/Section";

const ITEMS = [
  {
    title: "Sofas",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=85",
  },
  {
    title: "Coffee Tables",
    image:
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=1200&q=85",
  },
  {
    title: "Armchairs",
    image:
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1200&q=85",
  },
  {
    title: "Lighting",
    image:
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1200&q=85",
  },
];

export default function OurCollection() {
  return (
    <Section size="lg">
      {/* En-tête */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14 md:mb-20">
        <div className="max-w-xl">
          <p className="eyebrow mb-5">Our Collection</p>
          <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] tracking-[-0.02em] font-normal text-[var(--color-espresso)]">
            Iconic pieces for modern living.
          </h2>
        </div>

        <Link href="/collection" className="link-text self-start md:self-end">
          View All Products →
        </Link>
      </div>

      {/* Grille monobloc — 4 colonnes, séparations fines */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        style={{
          borderTop: "1px solid var(--color-border-line)",
          borderBottom: "1px solid var(--color-border-line)",
        }}
      >
        {ITEMS.map((item, index) => (
          <Link
            key={item.title}
            href="/collection"
            className="group flex flex-col p-4"
            style={{
              borderRight:
                index === ITEMS.length - 1
                  ? "none"
                  : "1px solid var(--color-border-line)",
            }}
          >
            {/* Image — ratio 4:5, zéro arrondi */}
            <div className="ratio-portrait w-full bg-[var(--color-cafe-dark)]">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
              />
            </div>

            {/* Titre + Explore */}
            <div className="flex flex-col gap-2 pt-5">
              <span className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-[var(--color-espresso)]">
                {item.title}
              </span>
              <span className="text-[0.72rem] text-[var(--color-espresso)]/60
                               underline underline-offset-[5px] decoration-[1px]
                               group-hover:text-[var(--color-espresso)]
                               transition-colors">
                Explore →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}