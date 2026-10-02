import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";

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
    <section className="bg-[var(--color-cafe-light)]">

      {/* ============================================
          HERO — Image + texte
          ============================================ */}
      <div className="relative w-full h-[60vh] min-h-[480px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=2400&q=90"
          alt="Hôtel de luxe — Kan House"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* Voile dégradé horizontal — dense à droite pour le texte */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(26,26,26,0.10) 0%, rgba(26,26,26,0.25) 40%, rgba(26,26,26,0.65) 75%, rgba(26,26,26,0.85) 100%)",
          }}
        />

        <div className="relative z-10 h-full flex items-center">
          <div className="container-kan w-full">
            <div className="ml-auto max-w-xl">
              <p
                className="text-[0.62rem] font-medium uppercase tracking-[0.28em]
                           text-[var(--color-cafe-light)] mb-5"
                style={{ textShadow: "0 2px 10px rgba(0,0,0,0.55)" }}
              >
                Hospitality · FF&E Sourcing
              </p>

              <h1
                className="text-[clamp(1.9rem,4vw,3rem)] leading-[1.12]
                           tracking-[-0.02em] font-normal
                           text-[var(--color-cafe-light)] mb-6"
                style={{
                  textShadow: "0 4px 24px rgba(0,0,0,0.5), 0 2px 6px rgba(0,0,0,0.35)",
                }}
              >
                L'aménagement clé en main
                <br />
                <span className="italic font-light text-[var(--color-taupe)]">
                  de vos lieux.
                </span>
              </h1>

              <p
                className="text-[0.95rem] leading-[1.7]
                           text-[var(--color-cafe-light)]/80 max-w-lg mb-8"
                style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
              >
                De la direction artistique à l'installation finale, nous
                orchestrons chaque étape du sourcing FF&E pour les projets
                hôteliers exigeants.
              </p>

              <Link
                href="/start-project"
                className="group inline-flex items-center gap-3
                           border border-[var(--color-cafe-light)]/80
                           text-[var(--color-cafe-light)]
                           px-5 py-3
                           text-[0.65rem] font-medium uppercase tracking-[0.22em]
                           hover:bg-[var(--color-cafe-light)] hover:text-[var(--color-espresso)]
                           transition-colors duration-300
                           backdrop-blur-[2px]"
              >
                Start a Project
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================
          SEGMENTS COUVERTS
          ============================================ */}
      <div className="container-kan py-20 md:py-28">
        <div className="max-w-2xl mb-14 md:mb-20">
          <p className="eyebrow mb-5">Segments couverts</p>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.15]
                         tracking-[-0.02em] font-normal
                         text-[var(--color-espresso)]">
            Chaque lieu mérite
            <br />
            sa propre écriture.
          </h2>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          style={{
            borderTop: "1px solid var(--color-border-line)",
            borderBottom: "1px solid var(--color-border-line)",
          }}
        >
          {SEGMENTS.map((s, i) => (
            <div
              key={s.title}
              className="p-6 md:p-7"
              style={{
                borderRight:
                  i === SEGMENTS.length - 1
                    ? "none"
                    : "1px solid var(--color-border-line)",
              }}
            >
              <p className="text-[1.5rem] font-normal
                            text-[var(--color-espresso)]/25 mb-5 leading-none">
                0{i + 1}
              </p>
              <h3 className="text-[1.05rem] font-medium leading-tight
                             text-[var(--color-espresso)] mb-2">
                {s.title}
              </h3>
              <p className="text-[0.82rem] leading-[1.65]
                            text-[var(--color-espresso)]/55">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================
          PROCESS — 5 étapes
          ============================================ */}
      <div
        className="bg-[var(--color-cafe-dark)]"
        style={{
          borderTop: "1px solid var(--color-border-line)",
          borderBottom: "1px solid var(--color-border-line)",
        }}
      >
        <div className="container-kan py-20 md:py-28">
          <div className="max-w-2xl mb-14 md:mb-20">
            <p className="eyebrow mb-5">Notre process</p>
            <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.15]
                           tracking-[-0.02em] font-normal
                           text-[var(--color-espresso)]">
              Cinq étapes,
              <br />
              zéro approximation.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
            {PROCESS.map((p) => (
              <div key={p.n} className="relative">
                {/* Numéro */}
                <p className="text-[1.4rem] font-normal
                              text-[var(--color-espresso)]/25 mb-5 leading-none">
                  {p.n}
                </p>

                <h3 className="text-[1.02rem] font-medium leading-tight
                               text-[var(--color-espresso)] mb-3">
                  {p.title}
                </h3>
                <p className="text-[0.8rem] leading-[1.65]
                              text-[var(--color-espresso)]/55">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ============================================
          ENGAGEMENTS + CTA — 2 colonnes
          ============================================ */}
      <div className="container-kan py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Engagements — 6 colonnes */}
          <div className="lg:col-span-6">
            <p className="eyebrow mb-5">Nos engagements</p>
            <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.15]
                           tracking-[-0.02em] font-normal
                           text-[var(--color-espresso)] mb-10">
              Une exigence
              <br />
              sans compromis.
            </h2>

            <ul className="space-y-4">
              {COMMITMENTS.map((c) => (
                <li key={c} className="flex items-start gap-3">
                  <span
                    className="mt-1.5 shrink-0 w-3.5 h-3.5 grid place-items-center"
                    style={{ border: "1px solid var(--color-espresso)" }}
                  >
                    <Check
                      size={9}
                      strokeWidth={2.5}
                      className="text-[var(--color-espresso)]"
                    />
                  </span>
                  <span className="text-[0.9rem] leading-[1.65]
                                   text-[var(--color-espresso)]/75">
                    {c}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Encart CTA — 6 colonnes, décalé à droite */}
          <div className="lg:col-span-6 lg:pl-8">
            <div
              className="p-8 md:p-10"
              style={{
                backgroundColor: "var(--color-bordeaux)",
                color: "var(--color-cafe-light)",
              }}
            >
              <p className="eyebrow-invert mb-5">Prêt à démarrer ?</p>

              <h3 className="text-[clamp(1.25rem,2.2vw,1.6rem)] leading-[1.2]
                             font-normal text-[var(--color-cafe-light)] mb-5">
                Recevez un devis structuré sous 48h.
              </h3>

              <p className="text-[0.88rem] leading-[1.75]
                            text-[var(--color-cafe-light)]/70 mb-8">
                Quelques minutes suffisent pour nous transmettre les grandes
                lignes de votre projet. Notre équipe revient vers vous avec
                une proposition curatée et chiffrée.
              </p>

              <Link
                href="/start-project"
                className="group inline-flex items-center gap-3
                           border border-[var(--color-cafe-light)]/70
                           text-[var(--color-cafe-light)]
                           px-6 py-3.5
                           text-[0.68rem] font-medium uppercase tracking-[0.22em]
                           hover:bg-[var(--color-cafe-light)] hover:text-[var(--color-bordeaux)]
                           transition-colors duration-300"
              >
                Start a Project
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}