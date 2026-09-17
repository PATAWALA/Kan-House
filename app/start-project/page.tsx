import ProjectWizard from "@/components/quote/ProjectWizard";

export const metadata = {
  title: "Start a Project — Kan House Hospitality",
  description:
    "Demande de devis Hospitality : hôtels, restaurants, villas et lounges. Sourcing FF&E complet.",
};

export default function StartProjectPage() {
  return (
    <section className="container-kan pt-40 pb-32">
      <div className="max-w-2xl mb-16">
        <p className="eyebrow mb-5">Hospitality Sourcing</p>
        <h1 className="font-serif text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.02] mb-6">
          Démarrons votre projet.
        </h1>
        <p className="text-[var(--color-espresso)]/70 leading-relaxed">
          Quelques minutes suffisent pour nous transmettre les grandes lignes
          de votre projet. Nous revenons vers vous sous 48h avec une proposition
          structurée.
        </p>
      </div>

      <ProjectWizard />
    </section>
  );
}