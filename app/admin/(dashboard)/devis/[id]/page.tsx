import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  Phone,
  Building2,
  MapPin,
  Calendar,
  Ruler,
  DoorOpen,
  Layers,
} from "lucide-react";
import { getQuoteById } from "@/lib/supabase/quotes";
import QuoteStatusSelect from "@/components/admin/QuoteStatusSelect";

const VENUE_LABELS: Record<string, string> = {
  hotel: "Hôtel",
  restaurant: "Restaurant",
  villa: "Villa / Résidence",
  lounge: "Lounge / Bar",
};

export default async function AdminDevisDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const quote = await getQuoteById(id);

  if (!quote) notFound();

  return (
    <div className="max-w-4xl">

      {/* Retour */}
      <Link
        href="/admin/devis"
        className="inline-flex items-center gap-2 mb-8
                   text-[0.7rem] uppercase tracking-[0.2em]
                   text-[var(--color-espresso)]/55
                   hover:text-[var(--color-espresso)] transition-colors"
      >
        <ArrowLeft size={13} />
        Retour aux devis
      </Link>

      {/* En-tête */}
      <div className="mb-10">
        <p className="eyebrow mb-3">Devis B2B</p>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-[1.5rem] lg:text-[1.75rem] font-normal
                           text-[var(--color-espresso)] mb-2">
              {quote.reference}
            </h1>
            <p className="text-[0.85rem] text-[var(--color-espresso)]/55">
              Reçu le{" "}
              {new Date(quote.created_at).toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          <QuoteStatusSelect quoteId={quote.id} currentStatus={quote.status} />
        </div>
      </div>

      {/* Grille d'infos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">

        {/* Projet */}
        <section
          className="p-6"
          style={{ border: "1px solid var(--color-border-line)" }}
        >
          <p className="text-[0.65rem] uppercase tracking-[0.22em]
                        text-[var(--color-espresso)]/55 mb-5">
            Projet
          </p>

          <ul className="space-y-4">
            <InfoRow
              icon={Building2}
              label="Type d'établissement"
              value={quote.venue_type ? VENUE_LABELS[quote.venue_type] ?? quote.venue_type : "—"}
            />
            <InfoRow
              icon={Ruler}
              label="Superficie"
              value={quote.surface ? `${quote.surface} m²` : "—"}
            />
            <InfoRow
              icon={DoorOpen}
              label="Chambres / pièces"
              value={quote.rooms || "—"}
            />
            <InfoRow
              icon={Layers}
              label="Collections"
              value={quote.collections.length > 0 ? quote.collections.join(", ") : "—"}
            />
          </ul>
        </section>

        {/* Contact */}
        <section
          className="p-6"
          style={{ border: "1px solid var(--color-border-line)" }}
        >
          <p className="text-[0.65rem] uppercase tracking-[0.22em]
                        text-[var(--color-espresso)]/55 mb-5">
            Contact
          </p>

          <ul className="space-y-4">
            <InfoRow
              icon={Building2}
              label="Société"
              value={quote.company || "—"}
            />
            <InfoRow
              icon={Mail}
              label="Nom du contact"
              value={quote.contact_name || "—"}
            />
            <InfoRow
              icon={Mail}
              label="Email"
              value={quote.email || "—"}
              link={quote.email ? `mailto:${quote.email}` : undefined}
            />
            <InfoRow
              icon={Phone}
              label="Téléphone"
              value={quote.phone || "—"}
              link={quote.phone ? `tel:${quote.phone}` : undefined}
            />
          </ul>
        </section>
      </div>

      {/* Notes */}
      {quote.notes && (
        <section
          className="p-6 mt-5 lg:mt-6"
          style={{ border: "1px solid var(--color-border-line)" }}
        >
          <p className="text-[0.65rem] uppercase tracking-[0.22em]
                        text-[var(--color-espresso)]/55 mb-4">
            Notes du client
          </p>
          <p className="text-[0.9rem] leading-[1.75] text-[var(--color-espresso)]/75 whitespace-pre-wrap">
            {quote.notes}
          </p>
        </section>
      )}

      {/* Actions */}
      <div className="mt-10 pt-8 flex flex-wrap items-center gap-4"
           style={{ borderTop: "1px solid var(--color-border-line)" }}>
        {quote.email && (
          <a
            href={`mailto:${quote.email}?subject=Réponse à votre demande ${quote.reference}`}
            className="inline-flex items-center gap-2
                       bg-[var(--color-espresso)] text-[var(--color-cafe-light)]
                       px-6 py-3 text-[0.68rem] font-medium uppercase tracking-[0.22em]
                       hover:bg-[var(--color-bordeaux)] transition-colors"
          >
            <Mail size={14} />
            Répondre par email
          </a>
        )}

        {quote.phone && (
          <a
            href={`tel:${quote.phone}`}
            className="inline-flex items-center gap-2
                       border border-[var(--color-espresso)]/30
                       text-[var(--color-espresso)]
                       px-6 py-3 text-[0.68rem] font-medium uppercase tracking-[0.22em]
                       hover:bg-[var(--color-espresso)] hover:text-[var(--color-cafe-light)]
                       hover:border-[var(--color-espresso)]
                       transition-colors"
          >
            <Phone size={14} />
            Appeler
          </a>
        )}
      </div>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
  link,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  link?: string;
}) {
  const content = (
    <span
      className={link
        ? "text-[0.9rem] text-[var(--color-espresso)] underline underline-offset-[5px] decoration-[1px]"
        : "text-[0.9rem] text-[var(--color-espresso)]"}
    >
      {value}
    </span>
  );

  return (
    <li className="flex items-start gap-4">
      <Icon
        size={15}
        strokeWidth={1.4}
        className="text-[var(--color-espresso)]/45 shrink-0 mt-0.5"
      />
      <div className="min-w-0 flex-1">
        <p className="text-[0.62rem] uppercase tracking-[0.2em]
                      text-[var(--color-espresso)]/45 mb-1">
          {label}
        </p>
        {link ? (
          <a href={link} className="block">
            {content}
          </a>
        ) : (
          content
        )}
      </div>
    </li>
  );
}