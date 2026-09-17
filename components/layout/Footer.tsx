import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-espresso)] text-[var(--color-cream)] mt-32">
      <div className="container-kan py-20 grid md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <p className="font-serif text-3xl mb-4">
            Kan<span className="text-[var(--color-bordeaux)]">.</span>House
          </p>
          <p className="text-sm text-[var(--color-cream)]/60 max-w-sm leading-relaxed">
            Sourcing d'exception entre la Chine, la France et l'international.
            Mobilier, matériaux et aménagement sur-mesure pour l'hôtellerie de luxe.
          </p>
        </div>
        <div>
          <p className="eyebrow text-[var(--color-cream)]/40 mb-4">Explore</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/collection" className="hover:text-[var(--color-bordeaux)] transition-colors">Collection</Link></li>
            <li><Link href="/projects" className="hover:text-[var(--color-bordeaux)] transition-colors">Projects</Link></li>
            <li><Link href="/hospitality" className="hover:text-[var(--color-bordeaux)] transition-colors">Hospitality</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow text-[var(--color-cream)]/40 mb-4">Contact</p>
          <ul className="space-y-2 text-sm">
            <li>Paris · Shanghai</li>
            <li>hello@kanhouse.com</li>
            <li><Link href="/start-project" className="text-[var(--color-bordeaux)] hover:underline">Start a Project →</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--color-cream)]/10">
        <div className="container-kan py-6 text-xs text-[var(--color-cream)]/40 flex flex-wrap justify-between gap-2">
          <span>© {new Date().getFullYear()} Kan House. All rights reserved.</span>
          <span>Crafted with intent — Paris · Shanghai</span>
        </div>
      </div>
    </footer>
  );
}