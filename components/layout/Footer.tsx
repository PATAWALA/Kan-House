import Link from "next/link";
import { FaInstagram, FaPinterestP, FaTiktok, FaYoutube } from "react-icons/fa";

const SECTIONS = [
  { label: "Contact", href: "/start-project" },
  { label: "FAQ", href: "#" },
  { label: "Shipping", href: "#" },
  { label: "Returns", href: "#" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="text-[var(--color-cafe-light)]"
      style={{ backgroundColor: "var(--color-espresso)" }}
    >
      {/* Ligne principale */}
      <div className="container-kan py-10 md:py-12
                      flex flex-col md:flex-row items-center justify-between gap-8">

        {/* Logo — SOURCING mène à l'admin */}
        <div className="flex flex-col leading-none shrink-0">
          <Link
            href="/"
            className="text-[1rem] font-medium tracking-[0.16em]
                       hover:opacity-90 transition-opacity"
          >
            KAN HOUSE
          </Link>

          <span className="hidden sm:flex items-center gap-1.5 text-[0.5rem] font-medium tracking-[0.28em] opacity-50 mt-1">
            <span>FURNITURE</span>
            <span>•</span>
            <span>INTERIORS</span>
            <span>•</span>
            {/* Lien caché vers l'admin — discret, pas de visuel distinct */}
            <Link
              href="/admin/login"
              aria-label="Accès administration"
              className="hover:opacity-80 transition-opacity cursor-default"
            >
              SOURCING
            </Link>
          </span>
        </div>

        {/* Liens du centre */}
        <ul className="flex flex-wrap items-center justify-center gap-8 text-[0.68rem] font-medium uppercase tracking-[0.22em]">
          {SECTIONS.map((s) => (
            <li key={s.label}>
              <Link
                href={s.href}
                className="text-[var(--color-cafe-light)]/70 hover:text-[var(--color-cafe-light)] transition-colors"
              >
                {s.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Réseaux + tagline */}
        <div className="flex items-center gap-6 shrink-0">
          <div className="flex items-center gap-3">
            {[
              { icon: FaInstagram, href: "#", label: "Instagram" },
              { icon: FaPinterestP, href: "#", label: "Pinterest" },
              { icon: FaTiktok, href: "#", label: "TikTok" },
              { icon: FaYoutube, href: "#", label: "YouTube" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-[var(--color-cafe-light)]/75 hover:text-[var(--color-cafe-light)] transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>

          <p className="hidden lg:block text-[0.62rem] font-medium uppercase tracking-[0.22em]
                        text-[var(--color-cafe-light)]/55 leading-[1.6] text-right">
            A more beautiful tomorrow,
            <br />
            in every space.
          </p>
        </div>
      </div>
    </footer>
  );
}