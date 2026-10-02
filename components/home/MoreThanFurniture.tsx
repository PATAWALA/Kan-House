import Image from "next/image";
import Link from "next/link";

const KEYWORDS = ["Timeless Design", "Global Sourcing", "Real Spaces"];

export default function MoreThanFurniture() {
  return (
    <section className="bg-[var(--color-cafe-light)]">
      <div className="container-kan py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* Texte */}
          <div className="lg:col-span-5">
            <p className="eyebrow mb-6">Kan House</p>

            <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15]
                           tracking-[-0.02em] font-normal
                           text-[var(--color-espresso)] mb-6">
              More than furniture,
              <br />
              a way of living.
            </h2>

            <p className="text-[0.92rem] leading-[1.75]
                          text-[var(--color-espresso)]/65 mb-8 max-w-md">
              KAN HOUSE is a furniture and sourcing house, connecting
              exceptional design with reliable manufacturing. We create
              spaces that are functional, elegant and deeply personal.
            </p>

            <Link href="/about" className="link-text">
              Our Story →
            </Link>
          </div>

          {/* Composition 2 images */}
          <div className="lg:col-span-7 grid grid-cols-12 gap-4 md:gap-6">

            <div className="col-span-7 relative aspect-[4/5] overflow-hidden bg-[var(--color-cafe-dark)]">
              <Image
                src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=1200&q=85"
                alt="Catalogue KAN HOUSE"
                fill
                sizes="(max-width: 1024px) 50vw, 35vw"
                className="object-cover"
              />
            </div>

            <div className="col-span-5 relative aspect-[3/5] overflow-hidden bg-[var(--color-cafe-dark)] self-end">
              <Image
                src="https://images.unsplash.com/photo-1567016432779-094069958ea5?w=1200&q=85"
                alt="Vase et composition florale"
                fill
                sizes="(max-width: 1024px) 30vw, 25vw"
                className="object-cover"
              />

              <div className="absolute top-6 right-6 flex flex-col items-end gap-2.5">
                {KEYWORDS.map((k) => (
                  <span
                    key={k}
                    className="text-[0.58rem] font-medium uppercase tracking-[0.22em]
                               text-[var(--color-cafe-light)] text-right
                               drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
                  >
                    {k}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}