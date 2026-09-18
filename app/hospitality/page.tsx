import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import Section from "@/components/ui/Section";

export const metadata = {
  title: "Hospitality — Kan House",
  description:
    "Aménagement FF&E pour hôtels, restaurants, villas et lounges. Sourcing international, contrôle qualité, logistique clé en main.",
};

const SEGMENTS = [
  {
    title: "Hôtels",
    description: "Chambres, suites, lobby, spa, restaurants internes.",
  },
  {
    title: "Restaurants",
    description: "Salle, bar, terrasses, mobilier sur-mesure.",
  },
  {
    title: "Villas & Résidences",
    description: "Privées, locatives ou d'exception.",
  },
  {
    title: "Lounges & Bars",
    description: "Espaces nuit, rooftops, clubs privés.",
  },
];

const PROCESS = [
  {
    n: "01",
    title: "Brief & cadrage",
    description:
      "Analyse de votre projet, de la volumétrie et des contraintes budgétaires. Définition d'une direction esthétique.",
  },
  {
    n: "02",
    title: "Sourcing & curation",
    description:
      "Sélection de pièces existantes ou développement sur-mesure auprès de nos ateliers partenaires en Chine et en Europe.",
  },
  {
    n: "03",
    title: "Prototypage & validation",
    description:
      "Échantillons, mockups, plans techniques. Validation esthétique et fonctionnelle avant production.",
  },
  {
    n: "04",
    title: "Production & contrôle qualité",
    description:
      "Fabrication encadrée, contrôle qualité à la source, documentation photo et rapports d'inspection.",
  },
  {
    n: "05",
    title: "Logistique & installation",
    description:
      "Consolidation, fret international, dédouanement, livraison sur site et supervision de l'installation.",
  },
];

const COMMITMENTS = [
  "Contrôle qualité à la source, en atelier",
  "Documentation photo & rapports d'inspection",
  "Prix directs fabricants, transparence totale",
  "Logistique internationale clé en main",
  "Accompagnement design & direction artistique",
  "Respect des délais contractuels",
];

export default function HospitalityPage() {
  return (
    <>
      {/* ============================================
          HERO — image plein écran, texte en bas à gauche
          ============================================ */}
      <section className="relative h-[70vh] min-h-[520px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=2400&q=90"
          alt="Hôtel de luxe — Kan House"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* Voile vertical */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-[var(--color-espresso)]/30 via-[var(--color-espresso)]/50 to-[var(--color-espresso)]/92"
        />

        {/* Contenu en bas */}
        <div className="relative z-10 h-full flex flex-col justify-end">
          <div className="container-kan pb-14 md:pb-20">
            <p className="eyebrow-invert mb-5">Hospitality · FF&E Sourcing</p>

            <h1 className="text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.05] tracking-[-0.02em] font-medium text-[var(--color-cream)] mb-6 max-w-3xl">
              L'aménagement clé en main
              <br />
              <span className="italic font-light text-[var(--color-taupe)]">
                de vos lieux.
              </span>
            </h1>

            <p className="text-[clamp(0.95rem,1.1vw,1.05rem)] leading-[1.7] text-[var(--color-cream)]/75 max-w-xl mb-8">
              De la direction artistique à l'installation finale, nous
              orchestrons chaque étape du sourcing FF&E pour les projets
              hôteliers exigeants.
            </p>

            <Link
              href="/start-project"
              className="group inline-flex items-center gap-3
                         bg-[var(--color-cream)] text-[var(--color-bordeaux)]
                         px-7 py-4 rounded-full
                         text-[0.72rem] font-semibold uppercase tracking-[0.22em]
                         hover:bg-[var(--color-sand)]
                         transition-colors"
            >
              Start a Project
              <ArrowUpRight
                size={15}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================
          SEGMENTS — 4 typologies
          ============================================ */}
      <Section size="lg">
        <div className="max-w-2xl mb-14 md:mb-20">
          <p className="eyebrow-accent mb-5">Segments couverts</p>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] font-medium tracking-[-0.02em] text-[var(--color-espresso)]">
            Chaque lieu mérite
            <br />
            sa propre écriture.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {SEGMENTS.map((s, i) => (
            <div
              key={s.title}
              className="group border border-[var(--color-espresso)]/10
                         rounded-md p-6 md:p-7
                         hover:border-[var(--color-bordeaux)]/40
                         transition-colors duration-300"
            >
              <p className="text-[1.5rem] md:text-[1.75rem] font-medium
                            text-[var(--color-espresso)]/25 mb-5
                            group-hover:text-[var(--color-bordeaux)]/50
                            transition-colors duration-300">
                0{i + 1}
              </p>
              <h3 className="text-[1.05rem] md:text-[1.1rem] font-medium
                             leading-tight text-[var(--color-espresso)] mb-2">
                {s.title}
              </h3>
              <p className="text-[0.85rem] leading-[1.6] text-[var(--color-espresso)]/55">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ============================================
          PROCESS — 5 étapes
          ============================================ */}
      <section className="bg-[var(--color-cream-dark)]">
        <div className="container-kan py-20 md:py-28">
          <div className="max-w-2xl mb-14 md:mb-20">
            <p className="eyebrow-accent mb-5">Notre process</p>
            <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] font-medium tracking-[-0.02em] text-[var(--color-espresso)]">
              Cinq étapes,
              <br />
              zéro approximation.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
            {PROCESS.map((p) => (
              <div key={p.n} className="relative">
                {/* Numéro dans un cercle */}
                <div className="w-10 h-10 rounded-full
                                border border-[var(--color-bordeaux)]/40
                                grid place-items-center mb-6">
                  <span className="text-[0.72rem] font-semibold text-[var(--color-bordeaux)]">
                    {p.n}
                  </span>
                </div>

                <h3 className="text-[1.05rem] font-medium leading-tight
                               text-[var(--color-espresso)] mb-3">
                  {p.title}
                </h3>
                <p className="text-[0.82rem] leading-[1.6] text-[var(--color-espresso)]/55">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          ENGAGEMENTS + CTA — 2 colonnes
          ============================================ */}
      <Section size="lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Engagements */}
          <div>
            <p className="eyebrow-accent mb-5">Nos engagements</p>
            <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.1] font-medium tracking-[-0.02em] text-[var(--color-espresso)] mb-10">
              Une exigence
              <br />
              sans compromis.
            </h2>

            <ul className="space-y-4">
              {COMMITMENTS.map((c) => (
                <li key={c} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[var(--color-bordeaux)]/10
                                   grid place-items-center shrink-0 mt-0.5">
                    <Check size={12} className="text-[var(--color-bordeaux)]" />
                  </span>
                  <span className="text-[0.9rem] leading-[1.6] text-[var(--color-espresso)]/75">
                    {c}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Encart CTA bordeaux */}
          <div className="rounded-md p-8 md:p-12
                          bg-[var(--color-bordeaux)] text-[var(--color-cream)]">
            <p className="eyebrow-invert mb-5">Prêt à démarrer ?</p>
            <h3 className="text-[clamp(1.35rem,2.5vw,1.75rem)] leading-[1.2]
               font-medium text-[var(--color-cream)] mb-5">
                Recevez un devis structuré sous 48h.
               </h3>
            <p className="text-[0.9rem] leading-[1.7] text-[var(--color-cream)]/70 mb-8">
              Quelques minutes suffisent pour nous transmettre les grandes
              lignes de votre projet. Notre équipe revient vers vous avec une
              proposition curatée et chiffrée.
            </p>

            <Link
              href="/start-project"
              className="group inline-flex items-center gap-3
                         bg-[var(--color-cream)] text-[var(--color-bordeaux)]
                         px-6 py-3.5 rounded-full
                         text-[0.72rem] font-semibold uppercase tracking-[0.22em]
                         hover:bg-[var(--color-sand)]
                         transition-colors"
            >
              Start a Project
              <ArrowUpRight
                size={15}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}