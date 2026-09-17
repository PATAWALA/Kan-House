import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

const PROJECTS = [
  { id: "p1", title: "Maison Rouge", location: "Bordeaux, France", year: "2024", category: "Hôtel boutique", surface: "1 200 m²", image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1400&q=85" },
  { id: "p2", title: "Atelier Nord", location: "Copenhagen, Danemark", year: "2024", category: "Restaurant", surface: "320 m²", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1400&q=85" },
  { id: "p3", title: "Villa Solène", location: "Saint-Tropez, France", year: "2023", category: "Résidence privée", surface: "480 m²", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=85" },
  { id: "p4", title: "The Jade Lounge", location: "Shanghai, Chine", year: "2023", category: "Lounge / Bar", surface: "260 m²", image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1400&q=85" },
  { id: "p5", title: "Hôtel Sillage", location: "Lisbonne, Portugal", year: "2022", category: "Hôtel 5★", surface: "2 100 m²", image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1400&q=85" },
  { id: "p6", title: "Casa Murano", location: "Milan, Italie", year: "2022", category: "Restaurant gastronomique", surface: "180 m²", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=85" },
];

export const metadata = {
  title: "Projects — Kan House",
  description: "Sélection de projets d'aménagement FF&E réalisés pour hôtels, restaurants, villas et lounges.",
};

export default function ProjectsPage() {
  return (
    <>
      <div className="pt-navbar">
        <Section size="md" className="pb-0">
          <SectionHeading
            eyebrow="Projects"
            title={
              <>
                Des lieux pensés
                <br />
                <em className="not-italic text-[var(--color-bordeaux)]">
                  jusqu'au détail.
                </em>
              </>
            }
            description="Une sélection de projets d'aménagement réalisés entre l'Europe et l'Asie — hôtels, restaurants, résidences et espaces de nuit."
          />
        </Section>
      </div>

      <Section size="md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 lg:gap-x-10 gap-y-14 lg:gap-y-20">
          {PROJECTS.map((p) => (
            <article key={p.id} className="group cursor-pointer">
              <div className="ratio-landscape w-full overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-block bg-[var(--color-cream)]/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-[0.62rem] font-semibold uppercase tracking-[0.18em]">
                    {p.category}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex items-start justify-between gap-6">
                <div>
                  <h3 className="font-serif text-2xl md:text-3xl leading-tight mb-2">
                    {p.title}
                  </h3>
                  <p className="text-sm text-[var(--color-espresso)]/60">{p.location}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="eyebrow mb-1">{p.year}</p>
                  <p className="text-xs text-[var(--color-espresso)]/50">{p.surface}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section size="md" className="border-t border-[var(--color-espresso)]/10 text-center">
        <p className="eyebrow-accent mb-5">Votre projet, le prochain ?</p>
        <h2 className="font-serif text-[clamp(2rem,4vw,3.25rem)] leading-tight mb-8 max-w-2xl mx-auto">
          Parlons de votre lieu.
        </h2>
        <Link
          href="/start-project"
          className="group inline-flex items-center gap-3 bg-[var(--color-bordeaux)] text-[var(--color-cream)] px-7 py-4 rounded-full text-[0.72rem] font-semibold uppercase tracking-[0.22em] hover:bg-[var(--color-bordeaux-deep)] transition-colors"
        >
          Start a Project
          <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </Section>
    </>
  );
}