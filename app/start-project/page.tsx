import ProjectWizard from "@/components/quote/ProjectWizard";

export const metadata = {
  title: "Start a Project — Kan House",
  description:
    "Demande de devis Hospitality : hôtels, restaurants, villas et lounges. Sourcing FF&E complet.",
};

export default function StartProjectPage() {
  return (
    <section className="bg-[var(--color-cafe-light)]">
      <div className="container-kan pt-16 md:pt-20 lg:pt-24 pb-20 md:pb-28">

        {/* En-tête */}
        <div className="max-w-2xl mb-14 md:mb-20">
          <p className="eyebrow mb-5">Hospitality Sourcing</p>
          <h1 className="text-[clamp(1.75rem,4vw,3rem)] leading-[1.08]
                         tracking-[-0.02em] font-normal
                         text-[var(--color-espresso)] mb-6">
            Démarrons votre projet.
          </h1>
          <p className="text-[0.95rem] leading-[1.75]
                        text-[var(--color-espresso)]/65 max-w-lg">
            Quelques minutes suffisent pour nous transmettre les grandes lignes
            de votre projet. Nous revenons vers vous sous 48h avec une
            proposition structurée.
          </p>
        </div>

        {/* Wizard */}
        <ProjectWizard />
      </div>
    </section>
  );
}