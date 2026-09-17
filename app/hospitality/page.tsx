import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";

export const metadata = {
  title: "Hospitality — Kan House",
  description:
    "Aménagement FF&E pour hôtels, restaurants, villas et lounges. Sourcing international, contrôle qualité, logistique clé en main.",
};

const PROCESS = [
  {
    n: "01",
    t: "Brief & cadrage",
    d: "Analyse de votre projet, de la volumétrie et des contraintes budgétaires. Définition d'une direction esthétique.",
  },
  {
    n: "02",
    t: "Sourcing & curation",
    d: "Sélection de pièces existantes ou développement sur-mesure auprès de nos ateliers partenaires en Chine et en Europe.",
  },
  {
    n: "03",
    t: "Prototypage & validation",
    d: "Échantillons, mockups, plans techniques. Validation esthétique et fonctionnelle avant production.",
  },
  {
    n: "04",
    t: "Production & QC",
    d: "Fabrication encadrée, contrôle qualité à la source, documentation photo et rapports d'inspection.",
  },
  {
    n: "05",
    t: "Logistique & installation",
    d: "Consolidation, fret international, dédouanement, livraison sur site et supervision de l'installation.",
  },
];

const SEGMENTS = [
  { t: "Hôtels", d: "Chambres, suites, lobby, spa, restaurants internes." },
  { t: "Restaurants", d: "Salle, bar, terrasses, mobilier sur-mesure." },
  { t: "Villas & Résidences", d: "Privées, locatives ou d'exception." },
  { t: "Lounges & Bars", d: "Espaces nuit, rooftops, clubs privés." },
];

export default function HospitalityPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-end pb-24 pt-40 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=2000&q=90"
            alt="Hôtel de luxe"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-espresso)]/70 via-[var(--color-espresso)]/50 to-[var(--color-espresso)]/85" />
        </div>

        <div className="container-kan text-[var(--color-cream)]">
          <p className="eyebrow text-[var(--color-cream)]/60 mb-6">
            Hospitality · FF&E Sourcing
          </p>
          <h1 className="font-serif text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.98] max-w-5xl mb-8">
            L'aménagement
            <br />
            <em className="not-italic text-[var(--color-taupe)]">clé en main</em> de vos lieux.
          </h1>
          <p className="max-w-xl text-[var(--color-cream)]/75 leading-relaxed mb-10">
            De la direction artistique à l'installation finale, nous orchestrons
            chaque étape du sourcing FF&E pour les projets hôteliers exigeants,
            entre la Chine, la France et l'international.
          </p>
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

      {/* SEGMENTS */}
      <section className="container-kan py-32">
        <div className="max-w-2xl mb-16">
          <p className="eyebrow mb-4">Segments couverts</p>
          <h2 className="font-serif text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.05]">
            Chaque lieu mérite
            <br /> sa propre écriture.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SEGMENTS.map((s, i) => (
            <div
              key={s.t}
              className="border border-[var(--color-espresso)]/12 rounded-sm p-8 hover:border-[var(--color-bordeaux)]/40 transition-colors group"
            >
              <p className="font-serif text-3xl mb-4 group-hover:text-[var(--color-bordeaux)] transition-colors">
                0{i + 1}
              </p>
              <p className="font-serif text-xl mb-3">{s.t}</p>
              <p className="text-sm text-[var(--color-espresso)]/60 leading-relaxed">
                {s.d}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-[var(--color-cream-dark)] py-32">
        <div className="container-kan">
          <div className="max-w-2xl mb-16">
            <p className="eyebrow mb-4">Notre process</p>
            <h2 className="font-serif text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.05]">
              Cinq étapes,
              <br /> zéro approximation.
            </h2>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            {PROCESS.map((p) => (
              <div key={p.n} className="relative">
                <div className="w-10 h-10 rounded-full border border-[var(--color-bordeaux)] grid place-items-center mb-6">
                  <span className="text-xs font-medium text-[var(--color-bordeaux)]">
                    {p.n}
                  </span>
                </div>
                <h3 className="font-serif text-xl mb-3">{p.t}</h3>
                <p className="text-sm text-[var(--color-espresso)]/65 leading-relaxed">
                  {p.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ENGAGEMENTS + CTA */}
      <section className="container-kan py-32 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="eyebrow mb-4">Nos engagements</p>
          <h2 className="font-serif text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] mb-8">
            Une exigence
            <br /> sans compromis.
          </h2>
          <ul className="space-y-4">
            {[
              "Contrôle qualité à la source, en atelier",
              "Documentation photo & rapports d'inspection",
              "Prix directs fabricants, transparence totale",
              "Logistique internationale clé en main",
              "Accompagnement design & direction artistique",
              "Respect des délais contractuels",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[var(--color-bordeaux)]/10 grid place-items-center shrink-0 mt-0.5">
                  <Check size={12} className="text-[var(--color-bordeaux)]" />
                </span>
                <span className="text-sm text-[var(--color-espresso)]/75 leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-[var(--color-bordeaux)] text-[var(--color-cream)] rounded-sm p-10 md:p-14">
          <p className="eyebrow text-[var(--color-cream)]/60 mb-5">
            Prêt à démarrer ?
          </p>
          <h3 className="font-serif text-3xl md:text-4xl leading-tight mb-6">
            Recevez un devis structuré sous 48h.
          </h3>
          <p className="text-[var(--color-cream)]/70 text-sm leading-relaxed mb-8">
            Quelques minutes suffisent pour nous transmettre les grandes lignes
            de votre projet. Notre équipe revient vers vous avec une proposition
            curatée et chiffrée.
          </p>
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