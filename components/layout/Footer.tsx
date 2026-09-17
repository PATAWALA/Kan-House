import Link from "next/link";
import { ArrowUpRight,Mail } from "lucide-react";
import {
  FaInstagram,
  FaLinkedinIn,
  FaFacebookF,
  FaPinterestP,
  FaYoutube,
  FaWhatsapp,
  FaWeixin,      // WeChat (Chine)
} from "react-icons/fa";

const SECTIONS = [
  {
    title: "Explorer",
    links: [
      { label: "Collection", href: "/collection" },
      { label: "Projects", href: "/projects" },
      { label: "Hospitality", href: "/hospitality" },
      { label: "About", href: "/about" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "FF&E Sourcing", href: "/hospitality" },
      { label: "Sur-mesure", href: "/start-project" },
      { label: "Contrôle qualité", href: "/hospitality" },
      { label: "Logistique", href: "/hospitality" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "hello@kanhouse.com", href: "mailto:hello@kanhouse.com" },
      { label: "Paris · France", href: "#" },
      { label: "Shanghai · Chine", href: "#" },
      { label: "Start a Project →", href: "/start-project" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-bordeaux-deep)] text-[var(--color-cream)] mt-32">
      {/* ---------- Bloc principal ---------- */}
      <div className="container-kan py-20 md:py-24 grid gap-14 lg:grid-cols-12">
        {/* Brand */}
        <div className="lg:col-span-5">
          <Link
            href="/"
            className="font-serif text-3xl md:text-4xl inline-block mb-6 hover:opacity-90 transition-opacity"
          >
            Kan<span className="text-[var(--color-taupe)]">.</span>House
          </Link>
          <p className="text-sm text-[var(--color-cream)]/65 max-w-sm leading-relaxed mb-8">
            Sourcing FF&E et mobilier d'exception entre la Chine, la France
            et l'international. Pour les projets hôteliers, restaurants,
            résidences privées et clients exigeants.
          </p>

          {/* Réseaux */}
          <div className="flex items-center gap-3">
            {[
              { icon: FaInstagram, label: "Instagram", href: "#" },
              { icon: FaLinkedinIn, label: "LinkedIn", href: "#" },
              { icon: Mail, label: "Email", href: "mailto:hello@kanhouse.com" },
            ].map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-10 h-10 rounded-full border border-[var(--color-cream)]/20 grid place-items-center text-[var(--color-cream)]/75 hover:text-[var(--color-cream)] hover:border-[var(--color-cream)]/50 transition-all"
              >
                <Icon size={16} strokeWidth={1.6} />
              </a>
            ))}
          </div>
        </div>

        {/* Colonnes */}
        {SECTIONS.map((s) => (
          <div key={s.title} className="lg:col-span-2">
            <p className="eyebrow text-[var(--color-cream)]/45 mb-5">{s.title}</p>
            <ul className="space-y-3">
              {s.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-[var(--color-cream)]/75 hover:text-[var(--color-cream)] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* CTA encart */}
        <div className="lg:col-span-3 lg:col-start-10">
          <p className="eyebrow text-[var(--color-cream)]/45 mb-5">
            Prêt à démarrer ?
          </p>
          <p className="text-sm text-[var(--color-cream)]/70 leading-relaxed mb-6">
            Recevez un devis structuré sous 48h pour votre projet Hospitality.
          </p>
          <Link
            href="/start-project"
            className="group inline-flex items-center gap-2 bg-[var(--color-cream)] text-[var(--color-bordeaux)] px-5 py-3 rounded-full text-[0.7rem] font-semibold uppercase tracking-[0.22em] hover:bg-[var(--color-sand)] transition-colors"
          >
            Start a Project
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>

      {/* ---------- Barre inférieure ---------- */}
      <div className="border-t border-[var(--color-cream)]/10">
        <div className="container-kan py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-[var(--color-cream)]/45">
          <span>© {year} Kan House. Tous droits réservés.</span>
          <span className="font-serif italic text-[var(--color-cream)]/55">
            Sourcé entre deux mondes — Paris · Shanghai
          </span>
          <div className="flex gap-5">
            <Link href="#" className="hover:text-[var(--color-cream)] transition-colors">
              Mentions légales
            </Link>
            <Link href="#" className="hover:text-[var(--color-cream)] transition-colors">
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}