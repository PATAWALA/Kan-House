import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, Award, Users } from "lucide-react";
import Section from "@/components/ui/Section";

export const metadata = {
  title: "About — Kan House",
  description:
    "Rencontrez Amandine, fondatrice de Kan House. Un pont entre la France et la Chine pour le sourcing FF&E d'exception.",
};

const JOURNEY = [
  {
    year: "2013",
    title: "Formation en design",
    description:
      "Diplômée de l'École Boulle à Paris, Amandine se spécialise dans le design d'espace et le mobilier contemporain.",
  },
  {
    year: "2016",
    title: "Premier séjour en Chine",
    description:
      "Une immersion de deux ans à Shanghai, au cœur des ateliers et manufactures du Zhejiang et du Guangdong.",
  },
  {
    year: "2019",
    title: "Fondation de Kan House",
    description:
      "Le projet voit le jour : un studio de sourcing qui relie ateliers chinois et clients européens exigeants.",
  },
  {
    year: "2024",
    title: "120+ projets livrés",
    description:
      "Hôtels, restaurants, résidences privées — Kan House s'impose comme un partenaire de confiance pour l'hospitality.",
  },
];

const VALUES = [
  {
    title: "Transparence",
    description:
      "Prix directs fabricants, documentation complète, aucun intermédiaire caché.",
  },
  {
    title: "Exigence",
    description:
      "Chaque pièce est contrôlée à la source, en atelier, avant expédition.",
  },
  {
    title: "Curation",
    description:
      "Nous ne vendons pas de catalogue — nous composons des sélections.",
  },
  {
    title: "Ancrage",
    description:
      "Deux cultures, deux marchés, un pont entre l'Orient et l'Europe.",
  },
];

const STATS = [
  { value: "120+", label: "Projets livrés" },
  { value: "18", label: "Pays couverts" },
  { value: "6 wk", label: "Délai moyen de production" },
  { value: "100%", label: "Contrôle qualité à la source" },
];

export default function AboutPage() {
  return (
    <>
      {/* ============================================
          HERO — Texte + Portrait
          ============================================ */}
      <Section size="lg" className="pt-12 md:pt-16 lg:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* Texte — 6 colonnes */}
          <div className="lg:col-span-6">
            <p className="eyebrow-accent mb-5">About</p>

            <h1 className="text-[clamp(1.9rem,4.5vw,3.5rem)] leading-[1.05] font-medium tracking-[-0.025em] text-[var(--color-espresso)] mb-8">
              Un pont
              <br />
              <span className="italic font-light text-[var(--color-bordeaux)]">
                entre deux mondes.
              </span>
            </h1>

            <p className="text-[clamp(1rem,1.2vw,1.15rem)] leading-[1.7] text-[var(--color-espresso)]/70 mb-8">
              Derrière Kan House, il y a <strong className="font-medium text-[var(--color-espresso)]">Amandine</strong> —
              une passionnée de design qui, depuis dix ans, fait dialoguer
              l'artisanat chinois et l'exigence européenne.
            </p>

            {/* Infos rapides */}
            <div className="flex flex-wrap gap-6 pt-6 border-t border-[var(--color-espresso)]/10">
              <div className="flex items-center gap-2.5">
                <MapPin size={15} className="text-[var(--color-bordeaux)]" />
                <span className="text-[0.82rem] text-[var(--color-espresso)]/70">
                  Paris · Shanghai
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Award size={15} className="text-[var(--color-bordeaux)]" />
                <span className="text-[0.82rem] text-[var(--color-espresso)]/70">
                  École Boulle · Promotion 2013
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Users size={15} className="text-[var(--color-bordeaux)]" />
                <span className="text-[0.82rem] text-[var(--color-espresso)]/70">
                  +120 clients accompagnés
                </span>
              </div>
            </div>
          </div>

          {/* Portrait — 6 colonnes */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:ml-auto lg:mr-0
                            overflow-hidden rounded-md bg-[var(--color-cream-dark)]">
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&q=90"
                alt="Amandine — Fondatrice de Kan House"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />

              {/* Badge nom en bas */}
              <div className="absolute bottom-5 left-5 right-5
                              bg-[var(--color-cream)]/95 backdrop-blur-sm
                              px-5 py-4 rounded-sm">
                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.22em]
                              text-[var(--color-bordeaux)] mb-1">
                  Fondatrice
                </p>
                <p className="text-[1.1rem] font-medium text-[var(--color-espresso)] leading-tight">
                  Amandine Laurès
                </p>
              </div>
            </div>

            {/* Filet bordeaux décoratif */}
            <span
              aria-hidden
              className="hidden lg:block absolute -top-6 -left-6 w-px h-24 bg-[var(--color-bordeaux)]/30"
            />
          </div>
        </div>
      </Section>

      {/* ============================================
          CITATION — Manifeste personnel
          ============================================ */}
      <section className="bg-[var(--color-cream-dark)]">
        <div className="container-kan py-20 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[clamp(1.2rem,2vw,1.6rem)] leading-[1.55]
                          italic font-light text-[var(--color-espresso)]/85
                          mb-8">
              « Je crois qu'une pièce bien choisie traverse les années.
              Mon métier, c'est d'aller la chercher — au bon endroit,
              au bon prix, avec la bonne exigence. »
            </p>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em]
                          text-[var(--color-espresso)]/50">
              — Amandine Laurès, Fondatrice
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          HISTOIRE — Bio d'Amandine
          ============================================ */}
      <Section size="lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* Seconde image — portrait en situation */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] w-full
                            overflow-hidden rounded-md bg-[var(--color-cream-dark)]">
              <Image
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=1200&q=90"
                alt="Amandine en atelier — Kan House"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>

            {/* Petite étiquette flottante */}
            <div className="hidden lg:flex absolute -bottom-4 -right-4
                            bg-[var(--color-bordeaux)] text-[var(--color-cream)]
                            px-5 py-3 rounded-sm items-center gap-3">
              <span className="text-[1.4rem] font-medium leading-none">10+</span>
              <span className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] leading-tight">
                Années<br />d'expérience
              </span>
            </div>
          </div>

          {/* Texte — bio */}
          <div className="lg:col-span-7 lg:pl-8 order-1 lg:order-2">
            <p className="eyebrow-accent mb-5">Son histoire</p>
            <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.1]
                           font-medium tracking-[-0.02em]
                           text-[var(--color-espresso)] mb-8">
              De l'École Boulle
              <br />
              aux ateliers de Shanghai.
            </h2>

            <div className="space-y-5 text-[0.95rem] md:text-[1rem] leading-[1.75]
                            text-[var(--color-espresso)]/70">
              <p>
                Amandine Laurès a passé son enfance entre les ateliers de
                menuiserie de son grand-père en Dordogne et les marchés aux
                puces parisiens. Très tôt, elle développe un œil pour la
                matière, la ligne, et l'objet bien fait.
              </p>
              <p>
                Diplômée de l'École Boulle en 2013, elle travaille d'abord
                pour plusieurs studios de design d'espace à Paris, avant de
                partir deux ans à Shanghai pour se plonger dans les
                manufactures du Zhejiang et du Guangdong.
              </p>
              <p>
                De cette double culture naît Kan House en 2019 : un studio
                qui relie les meilleurs ateliers chinois et européens aux
                projets d'exception. Aujourd'hui, Amandine accompagne
                hôteliers, architectes et particuliers exigeants dans la
                sélection et la fabrication de leurs pièces.
              </p>
              <p className="text-[var(--color-espresso)]/85 italic">
                « Mon rôle, c'est de faire le tri, de vérifier, de négocier,
                et de garantir une qualité irréprochable du premier croquis
                à la livraison finale. »
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ============================================
          PARCOURS — Timeline
          ============================================ */}
      <Section size="lg">
        <div className="max-w-2xl mb-14 md:mb-20">
          <p className="eyebrow-accent mb-5">Parcours</p>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.1]
                         font-medium tracking-[-0.02em]
                         text-[var(--color-espresso)]">
            Dix ans à bâtir
            <br />
            un pont solide.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {JOURNEY.map((j) => (
            <div key={j.year} className="relative border-t border-[var(--color-espresso)]/12 pt-6">
              <p className="text-[1.5rem] font-medium text-[var(--color-bordeaux)] mb-4 leading-none">
                {j.year}
              </p>
              <h3 className="text-[1.05rem] font-medium leading-tight
                             text-[var(--color-espresso)] mb-3">
                {j.title}
              </h3>
              <p className="text-[0.85rem] leading-[1.65] text-[var(--color-espresso)]/60">
                {j.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ============================================
          CHIFFRES — Fond bordeaux
          ============================================ */}
      <section className="bg-[var(--color-bordeaux)] text-[var(--color-cream)]">
        <div className="container-kan py-16 md:py-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="text-[clamp(2rem,4vw,3rem)] font-medium
                              text-[var(--color-cream)] mb-3 leading-none">
                  {stat.value}
                </p>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em]
                              text-[var(--color-cream)]/60">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          VALEURS — 4 piliers
          ============================================ */}
      <Section size="lg">
        <div className="max-w-2xl mb-14 md:mb-20">
          <p className="eyebrow-accent mb-5">Nos valeurs</p>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.1]
                         font-medium tracking-[-0.02em]
                         text-[var(--color-espresso)]">
            Ce qui guide
            <br />
            chaque décision.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-10 lg:gap-y-14">
          {VALUES.map((v, i) => (
            <div key={v.title}
                 className="border-t border-[var(--color-espresso)]/12 pt-6">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em]
                            text-[var(--color-bordeaux)] mb-4">
                0{i + 1}
              </p>
              <h3 className="text-[1.15rem] md:text-[1.25rem] font-medium
                             leading-tight text-[var(--color-espresso)] mb-3">
                {v.title}
              </h3>
              <p className="text-[0.9rem] leading-[1.65] text-[var(--color-espresso)]/60">
                {v.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ============================================
          CTA FINALE
          ============================================ */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #2A0E0F 0%, #5E2324 50%, #8B3536 100%)",
          }}
        />

        <div className="relative container-kan py-16 md:py-20 lg:py-24">
          <div className="flex flex-col md:flex-row items-start md:items-center
                          justify-between gap-8 md:gap-12">
            <div className="max-w-xl">
              <p className="eyebrow-invert mb-4">Travaillons ensemble</p>
              <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] leading-tight
                             font-medium text-[var(--color-cream)] mb-3">
                Un projet, une pièce,
                <br />
                une collection ?
              </h2>
              <p className="text-[0.92rem] leading-relaxed text-[var(--color-cream)]/70">
                Amandine vous répond personnellement sous 48h.
              </p>
            </div>

            <Link
              href="/start-project"
              className="group inline-flex items-center gap-3 shrink-0
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
    </>
  );
}