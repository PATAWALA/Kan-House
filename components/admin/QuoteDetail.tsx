"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Phone,
  Building2,
  Ruler,
  DoorOpen,
  Layers,
  Calendar,
  FileText,
  Trash2,
  CheckCircle2,
  XCircle,
  Send,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { useToast } from "@/lib/store/toast";
import { deleteQuote } from "@/app/admin/actions";
import QuoteStatusSelect from "@/components/admin/QuoteStatusSelect";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { useState } from "react";
import type { QuoteRow } from "@/lib/supabase/types";

const VENUE_LABELS: Record<string, string> = {
  hotel: "Hôtel",
  restaurant: "Restaurant",
  villa: "Villa / Résidence",
  lounge: "Lounge / Bar",
};

export default function QuoteDetail({ quote }: { quote: QuoteRow }) {
  const router = useRouter();
  const toast = useToast();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const result = await deleteQuote(quote.id);
      if (!result.success) throw new Error(result.error);
      toast.success("Devis supprimé", quote.reference);
      router.push("/admin/devis");
      router.refresh();
    } catch {
      toast.error("Erreur lors de la suppression");
      setDeleting(false);
      setDeleteOpen(false);
    }
  };

  const emailSubject = encodeURIComponent(
    `Réponse à votre demande ${quote.reference} — Kan House`
  );
  const emailBody = encodeURIComponent(
    `Bonjour ${quote.contact_name || ""},\n\nMerci pour votre demande concernant votre projet ${quote.venue_type ? `(${VENUE_LABELS[quote.venue_type]})` : ""}.\n\nNous revenons vers vous sous 48h avec une proposition structurée.\n\nCordialement,\nL'équipe Kan House`
  );

  return (
    <>
      <div className="max-w-[1200px]">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between
                        gap-4 mb-6">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/devis"
              aria-label="Retour"
              className="p-2 text-[var(--color-espresso)]/55
                         hover:text-[var(--color-espresso)]
                         hover:bg-[var(--color-cafe-dark)]
                         transition-colors"
            >
              <ArrowLeft size={18} strokeWidth={1.5} />
            </Link>
            <div>
              <p className="text-[0.62rem] font-medium uppercase tracking-[0.24em]
                            text-[var(--color-espresso)]/45 mb-1">
                Devis B2B
              </p>
              <h1 className="text-[1.35rem] lg:text-[1.5rem] font-normal
                             text-[var(--color-espresso)] tabular-nums">
                {quote.reference}
              </h1>
            </div>
          </div>

          <button
            onClick={() => setDeleteOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-3 self-start
                       text-[0.72rem] font-medium uppercase tracking-[0.2em]
                       text-red-700 border border-red-200
                       hover:bg-red-50 transition-colors"
          >
            <Trash2 size={13} strokeWidth={2} />
            Supprimer
          </button>
        </div>

        {/* Date + Statut */}
        <div
          className="flex flex-wrap items-center justify-between gap-4 p-5 mb-6"
          style={{ border: "1px solid var(--color-border-line)" }}
        >
          <div className="flex items-center gap-2 text-[0.82rem]
                          text-[var(--color-espresso)]/55">
            <Calendar size={14} strokeWidth={1.5} />
            Reçu le{" "}
            {new Date(quote.created_at).toLocaleDateString("fr-FR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
          <QuoteStatusSelect quoteId={quote.id} currentStatus={quote.status} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

          {/* Colonne gauche — Détails projet */}
          <div className="lg:col-span-7 space-y-5">

            {/* Projet */}
            <section
              className="p-5 lg:p-6"
              style={{ border: "1px solid var(--color-border-line)" }}
            >
              <header className="flex items-center gap-3 mb-5">
                <span className="w-8 h-8 grid place-items-center
                                 bg-[var(--color-cafe-dark)] text-[var(--color-espresso)]/65">
                  <FileText size={15} strokeWidth={1.5} />
                </span>
                <h2 className="text-[0.9rem] font-medium text-[var(--color-espresso)]">
                  Détails du projet
                </h2>
              </header>

              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Item
                  icon={Building2}
                  label="Type d'établissement"
                  value={
                    quote.venue_type
                      ? VENUE_LABELS[quote.venue_type] ?? quote.venue_type
                      : "—"
                  }
                />
                <Item
                  icon={Ruler}
                  label="Superficie"
                  value={quote.surface ? `${quote.surface} m²` : "—"}
                />
                <Item
                  icon={DoorOpen}
                  label="Chambres / pièces"
                  value={quote.rooms || "—"}
                />
                <Item
                  icon={Layers}
                  label="Collections"
                  value={
                    quote.collections && quote.collections.length > 0
                      ? quote.collections.join(", ")
                      : "—"
                  }
                />
              </dl>
            </section>

            {/* Contact */}
            <section
              className="p-5 lg:p-6"
              style={{ border: "1px solid var(--color-border-line)" }}
            >
              <header className="flex items-center gap-3 mb-5">
                <span className="w-8 h-8 grid place-items-center
                                 bg-[var(--color-cafe-dark)] text-[var(--color-espresso)]/65">
                  <Mail size={15} strokeWidth={1.5} />
                </span>
                <h2 className="text-[0.9rem] font-medium text-[var(--color-espresso)]">
                  Contact
                </h2>
              </header>

              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Item
                  label="Nom"
                  value={quote.contact_name || "—"}
                />
                <Item
                  label="Société"
                  value={quote.company || "—"}
                />
                <Item
                  icon={Mail}
                  label="Email"
                  value={quote.email || "—"}
                  link={quote.email ? `mailto:${quote.email}` : undefined}
                />
                <Item
                  icon={Phone}
                  label="Téléphone"
                  value={quote.phone || "—"}
                  link={quote.phone ? `tel:${quote.phone}` : undefined}
                />
              </dl>
            </section>

            {/* Notes */}
            {quote.notes && (
              <section
                className="p-5 lg:p-6"
                style={{ border: "1px solid var(--color-border-line)" }}
              >
                <h2 className="text-[0.9rem] font-medium text-[var(--color-espresso)] mb-4">
                  Notes du client
                </h2>
                <p className="text-[0.88rem] leading-[1.75]
                              text-[var(--color-espresso)]/75 whitespace-pre-wrap">
                  {quote.notes}
                </p>
              </section>
            )}
          </div>

          {/* Colonne droite — Actions */}
          <aside className="lg:col-span-5 space-y-5">

            {/* Actions rapides */}
            <section
              className="p-5 lg:p-6 space-y-3"
              style={{ border: "1px solid var(--color-border-line)" }}
            >
              <h2 className="text-[0.62rem] font-medium uppercase tracking-[0.24em]
                             text-[var(--color-espresso)]/45 mb-1">
                Actions rapides
              </h2>

              {quote.email && (
                <a
                  href={`mailto:${quote.email}?subject=${emailSubject}&body=${emailBody}`}
                  className="flex items-center justify-between gap-3 w-full
                             px-4 py-3 text-[0.82rem] font-medium
                             bg-[var(--color-espresso)] text-[var(--color-cafe-light)]
                             hover:bg-[var(--color-bordeaux)] transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <Send size={14} strokeWidth={1.5} />
                    Répondre par email
                  </span>
                  <ExternalLink size={12} />
                </a>
              )}

              {quote.phone && (
                <a
                  href={`tel:${quote.phone}`}
                  className="flex items-center gap-3 w-full
                             px-4 py-3 text-[0.82rem] font-medium
                             text-[var(--color-espresso)]
                             hover:bg-[var(--color-cafe-dark)]
                             transition-colors"
                  style={{ border: "1px solid var(--color-border-line)" }}
                >
                  <Phone size={14} strokeWidth={1.5} />
                  Appeler le client
                </a>
              )}
            </section>

            {/* Timeline statut */}
            <section
              className="p-5 lg:p-6"
              style={{ border: "1px solid var(--color-border-line)" }}
            >
              <h2 className="text-[0.62rem] font-medium uppercase tracking-[0.24em]
                             text-[var(--color-espresso)]/45 mb-4">
                Progression
              </h2>

              <ol className="space-y-4">
                {[
                  { key: "new", label: "Nouveau", desc: "Demande reçue" },
                  { key: "contacted", label: "Contacté", desc: "Premier échange" },
                  { key: "quoted", label: "Devis envoyé", desc: "Proposition transmise" },
                  { key: "won", label: "Gagné", desc: "Projet signé" },
                ].map((step, i) => {
                  const statuses = ["new", "contacted", "quoted", "won"];
                  const currentIdx = statuses.indexOf(quote.status);
                  const stepIdx = statuses.indexOf(step.key);
                  const isDone = stepIdx < currentIdx;
                  const isCurrent = stepIdx === currentIdx;
                  const isLost = quote.status === "lost";

                  return (
                    <li key={step.key} className="flex items-start gap-3">
                      <span
                        className={cn(
                          "w-6 h-6 grid place-items-center shrink-0 mt-0.5",
                          isDone && "bg-emerald-500/15 text-emerald-700",
                          isCurrent && !isLost && "bg-[var(--color-bordeaux)] text-[var(--color-cafe-light)]",
                          !isDone && !isCurrent && "bg-[var(--color-cafe-dark)] text-[var(--color-espresso)]/35",
                          isLost && "bg-[var(--color-cafe-dark)] text-[var(--color-espresso)]/25"
                        )}
                      >
                        {isDone ? (
                          <CheckCircle2 size={13} strokeWidth={2} />
                        ) : (
                          <span className="text-[0.65rem] font-medium tabular-nums">
                            {i + 1}
                          </span>
                        )}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p
                          className={cn(
                            "text-[0.82rem]",
                            isCurrent
                              ? "font-medium text-[var(--color-espresso)]"
                              : isDone
                              ? "text-[var(--color-espresso)]/65"
                              : "text-[var(--color-espresso)]/35"
                          )}
                        >
                          {step.label}
                        </p>
                        <p className="text-[0.72rem] text-[var(--color-espresso)]/40 mt-0.5">
                          {step.desc}
                        </p>
                      </div>
                    </li>
                  );
                })}

                {quote.status === "lost" && (
                  <li className="flex items-start gap-3 pt-2"
                      style={{ borderTop: "1px solid var(--color-border-line)" }}>
                    <span className="w-6 h-6 grid place-items-center shrink-0
                                     bg-red-500/15 text-red-700">
                      <XCircle size={13} strokeWidth={2} />
                    </span>
                    <div>
                      <p className="text-[0.82rem] font-medium text-red-700">
                        Perdu
                      </p>
                      <p className="text-[0.72rem] text-[var(--color-espresso)]/40 mt-0.5">
                        Opportunité fermée
                      </p>
                    </div>
                  </li>
                )}
              </ol>
            </section>
          </aside>
        </div>
      </div>

      {/* Dialog suppression */}
      <ConfirmDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
        loading={deleting}
        title={`Supprimer ${quote.reference} ?`}
        description="Cette action est irréversible. Le devis sera définitivement supprimé."
        confirmLabel="Supprimer"
        variant="danger"
      />
    </>
  );
}

// ============================================
// SOUS-COMPOSANT
// ============================================
function Item({
  icon: Icon,
  label,
  value,
  link,
}: {
  icon?: React.ElementType;
  label: string;
  value: string;
  link?: string;
}) {
  const content = (
    <span
      className={cn(
        "text-[0.85rem] text-[var(--color-espresso)]",
        link &&
          "underline underline-offset-[4px] decoration-[1px] hover:text-[var(--color-bordeaux)] transition-colors"
      )}
    >
      {value}
    </span>
  );

  return (
    <div className="flex items-start gap-3">
      {Icon && (
        <span className="w-7 h-7 grid place-items-center shrink-0
                         bg-[var(--color-cafe-dark)] text-[var(--color-espresso)]/55">
          <Icon size={13} strokeWidth={1.5} />
        </span>
      )}
      <div className="min-w-0 flex-1">
        <p className="text-[0.6rem] font-medium uppercase tracking-[0.2em]
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
    </div>
  );
}