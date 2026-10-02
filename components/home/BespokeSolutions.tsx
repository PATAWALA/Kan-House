import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const SERVICES = [
  "Private Residences",
  "Hospitality",
  "Commercial Spaces",
];

export default function BespokeSolutions() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[560px]">

      {/* ---------- COLONNE GAUCHE — Bloc bordeaux ---------- */}
      <div className="bg-[var(--color-bordeaux)] text-[var(--color-cream)]
                      flex items-center
                      px-6 md:px-12 lg:px-20 py-16 md:py-20 lg:py-24">
        <div className="max-w-md w-full">
          <p className="text-[0.62rem] font-medium uppercase tracking-[0.28em]
                        text-[var(--color-cream)]/60 mb-6">
            Bespoke Solutions
          </p>

          <h2 className="text-[clamp(1.5rem,2.5vw,2.25rem)] leading-[1.2]
                         tracking-[-0.01em] font-normal
                         text-[var(--color-cream)] mb-8">
            Furniture sourcing for
            <br />
            distinctive spaces.
          </h2>

          <p className="text-[0.88rem] leading-[1.75]
                        text-[var(--color-cream)]/70 mb-10">
            From private residences to international hospitality projects,
            we curate, source and deliver furniture that responds to the
            architecture, the rhythm and the story of each space.
          </p>

          <Link
            href="/start-project"
            className="group inline-flex items-center gap-3
                       border border-[var(--color-cream)]/70
                       text-[var(--color-cream)]
                       px-6 py-3.5
                       text-[0.68rem] font-medium uppercase tracking-[0.22em]
                       hover:bg-[var(--color-cream)] hover:text-[var(--color-bordeaux)]
                       transition-colors duration-300"
          >
            Start a Project
            <ArrowRight
              size={13}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>

      {/* ---------- COLONNE DROITE — Image + liste services ---------- */}
      <div className="relative min-h-[420px] lg:min-h-full overflow-hidden bg-[var(--color-cream-dark)]">
        <Image
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1600&q=85"
          alt="Intérieur sur-mesure — KAN HOUSE"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />

        {/* Overlay pour lisibilité */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(26,26,26,0.35) 0%, transparent 40%)",
          }}
        />

        {/* Liste services en haut à droite */}
        <div className="absolute top-8 right-8 md:top-10 md:right-10
                        flex flex-col items-end gap-3">
          {SERVICES.map((s) => (
            <span
              key={s}
              className="text-[0.62rem] font-medium uppercase tracking-[0.24em]
                         text-[var(--color-cream)]
                         text-right"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}