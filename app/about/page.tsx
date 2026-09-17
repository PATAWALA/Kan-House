import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "About — Kan House",
  description:
    "Kan House — studio de sourcing FF&E entre la Chine, la France et l'international. Notre histoire, notre approche, nos engagements.",
};

const VALUES = [
  {
    n: "01",
    t: "Transparence",
    d: "Prix directs fabricants, documentation complète, aucun intermédiaire caché.",
  },
  {
    n: "02",
    t: "Exigence",
    d: "Chaque pièce est contrôlée à la source, en atelier, avant expédition.",
  },
  {
    n: "03",
    t: "Curation",
    d: "Nous ne vendons pas de catalogue — nous composons des sélections.",
  },
  {
    n: "04",
    t: "Ancrage",
    d: "Deux cultures, deux marchés, un pont entre l'Orient et l'Europe.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="container-kan pt-40 pb-24">
        <div className="max-w-3xl">
          <p className="eyebrow mb-5">About</p>
          <h1 className="font-serif text-[clamp(3rem,6.5vw,6rem)] leading-[0.98] mb-8">
            Un pont
            <br />
            <em className="not-italic text-[var(--color-bordeaux)]">
              entre deux mondes.
            </em>
          </h1>
          <p className="lead max-w-2xl">
            Kan House est né d'une conviction simple : l'excellence du design
            n'a pas de frontière. Nous orchestrons le sourcing FF&E entre la
            Chine, la France et l'international pour des projets d'exception —
            mobilier, matériaux, luminaires et pièces sur-mesure.
          </p>
        </div>
      </section>

      {/* IMAGE + TEXTE */}
      <section className="container-kan grid lg:grid-cols-12 gap-12 items-center py-20">
        <div className="lg:col-span-6 relative aspect-[4/5] rounded-sm overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1600&q=85"
            alt="Atelier Kan House"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="lg:col-span-6 lg:pl-8">
          <p className="eyebrow mb-5">Notre histoire</p>
          <h2 className="font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] mb-8">
            Née de la rencontre
            <br /> de deux cultures.
          </h2>
          <div className="space-y-5 text-[var(--color-espresso)]/75 leading-relaxed">
            <p>
              Basée entre Paris et Shanghai, Kan House accompagne particuliers
              exigeants et professionnels de l'hospitality dans la sélection
              et la fabrication de leurs pièces d'aménagement.
            </p>
            <p>
              Nous travaillons main dans la main avec des ateliers partenaires
              sélectionnés en Chine et en Europe, en privilégiant les savoir-faire
              durables et les matériaux nobles.
            </p>
            <p>
              Notre approche : une curation rigoureuse, une transparence totale
              sur les coûts, et un contrôle qualité à la source pour chaque
              commande.
            </p>
          </div>
        </div>
      </section>

      {/* CHIFFRES */}
      <section className="bg-[var(--color-cream-dark)] py-24 my-20">
        <div className="container-kan grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {[
            { k: "120+", v: "Projets livrés" },
            { k: "18", v: "Pays couverts" },
            { k: "6 wk", v: "Délai moyen de production" },
            { k: "100%", v: "Contrôle qualité à la source" },
          ].map((s) => (
            <div key={s.v}>
              <p className="font-serif text-5xl md:text-6xl text-[var(--color-bordeaux)] mb-3">
                {s.k}
              </p>
              <p className="eyebrow">{s.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* VALEURS */}
      <section className="container-kan py-24">
        <div className="max-w-2xl mb-16">
          <p className="eyebrow mb-4">Nos valeurs</p>
          <h2 className="font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.05]">
            Ce qui guide
            <br /> chaque décision.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-x-12 gap-y-12">
          {VALUES.map((v) => (
            <div key={v.n} className="border-t border-[var(--color-espresso)]/15 pt-6">
              <p className="eyebrow mb-4">{v.n}</p>
              <h3 className="font-serif text-2xl mb-3">{v.t}</h3>
              <p className="text-sm text-[var(--color-espresso)]/65 leading-relaxed">
                {v.d}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-kan pb-32">
        <div className="bg-[var(--color-bordeaux)] text-[var(--color-cream)] rounded-sm p-12 md:p-20 text-center">
          <p className="eyebrow text-[var(--color-cream)]/60 mb-5">
            Travaillons ensemble
          </p>
          <h2 className="font-serif text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.05] mb-8 max-w-3xl mx-auto">
            Un projet, une pièce,
            <br /> une collection ?
          </h2>
          <Link
            href="/start-project"
            className="group inline-flex items-center gap-3 bg-[var(--color-cream)] text-[var(--color-bordeaux)] px-7 py-4 rounded-full text-[0.75rem] uppercase tracking-[0.2em] hover:bg-[var(--color-sand)] transition-colors"
          >
            Start a Project
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </section>
    </>
  );
}