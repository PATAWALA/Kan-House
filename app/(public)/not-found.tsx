import Link from "next/link";
import { ArrowRight, Compass, ShoppingBag, Sparkles } from "lucide-react";

export const metadata = {
  title: "Page introuvable — Kan House",
  description:
    "Cette page n'existe pas ou a été déplacée. Explorez la collection ou démarrez un projet.",
};

export default function NotFound() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-32 pb-24 overflow-hidden">
      {/* Filigrane décoratif */}
      <div
        aria-hidden
        className="pointer-events-none select-none absolute -top-32 -right-16 font-serif text-[28rem] leading-none text-[var(--color-espresso)]/[0.04] hidden lg:block"
      >
        404
      </div>

      <div className="container-kan relative">
        <div className="max-w-3xl">
          <p className="eyebrow mb-6">Erreur · 404</p>

          <h1 className="font-serif text-[clamp(3rem,7vw,6rem)] leading-[0.98] mb-8">
            Cette page s'est
            <br />
            <em className="not-italic text-[var(--color-bordeaux)]">
              égarée en chemin.
            </em>
          </h1>

          <p className="lead max-w-xl mb-12">
            Le lien que vous avez suivi n'existe pas — ou a été déplacé.
            Retrouvez votre chemin parmi nos collections ou démarrez
            directement un projet avec notre équipe.
          </p>

          {/* Raccourcis */}
          <div className="grid sm:grid-cols-3 gap-4 mb-14">
            <Link
              href="/collection"
              className="group border border-[var(--color-espresso)]/12 rounded-sm p-6 hover:border-[var(--color-bordeaux)]/50 transition-colors"
            >
              <ShoppingBag
                size={20}
                strokeWidth={1.5}
                className="mb-4 text-[var(--color-espresso)]/50 group-hover:text-[var(--color-bordeaux)] transition-colors"
              />
              <p className="font-serif text-xl mb-1">Collection</p>
              <p className="text-xs text-[var(--color-espresso)]/60">
                Mobilier & luminaires
              </p>
            </Link>

            <Link
              href="/hospitality"
              className="group border border-[var(--color-espresso)]/12 rounded-sm p-6 hover:border-[var(--color-bordeaux)]/50 transition-colors"
            >
              <Compass
                size={20}
                strokeWidth={1.5}
                className="mb-4 text-[var(--color-espresso)]/50 group-hover:text-[var(--color-bordeaux)] transition-colors"
              />
              <p className="font-serif text-xl mb-1">Hospitality</p>
              <p className="text-xs text-[var(--color-espresso)]/60">
                Projets FF&E B2B
              </p>
            </Link>

            <Link
              href="/start-project"
              className="group border border-[var(--color-bordeaux)] bg-[var(--color-bordeaux)]/5 rounded-sm p-6 hover:bg-[var(--color-bordeaux)]/10 transition-colors"
            >
              <Sparkles
                size={20}
                strokeWidth={1.5}
                className="mb-4 text-[var(--color-bordeaux)]"
              />
              <p className="font-serif text-xl mb-1">Start a Project</p>
              <p className="text-xs text-[var(--color-espresso)]/60">
                Devis sous 48h
              </p>
            </Link>
          </div>

          {/* Retour accueil */}
          <Link
            href="/"
            className="group inline-flex items-center gap-3 text-[0.75rem] uppercase tracking-[0.2em] text-[var(--color-espresso)] hover:text-[var(--color-bordeaux)] transition-colors"
          >
            Retour à l'accueil
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}