"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Trash2,
  Send,
  ExternalLink,
  Package,
  Receipt,
  CheckCircle2,
  Truck,
  Home,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { useToast } from "@/lib/store/toast";
import { deleteOrder } from "@/app/admin/actions";
import OrderStatusSelect from "@/components/admin/OrderStatusSelect";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import type { OrderRow } from "@/lib/supabase/types";

function parseTotal(value: any): number {
  if (typeof value === "number") return value;
  if (typeof value === "string") return Number(value.replace(/[^\d.]/g, "")) || 0;
  return 0;
}

export default function OrderDetail({ order }: { order: OrderRow }) {
  const router = useRouter();
  const toast = useToast();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const items = Array.isArray(order.items) ? order.items : [];
  const address = (order.address ?? null) as any;
  const total = parseTotal(order.total);
  const subtotal = order.subtotal ? parseTotal(order.subtotal) : total;
  const shipping = order.shipping ? parseTotal(order.shipping) : 0;

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const result = await deleteOrder(order.id);
      if (!result.success) throw new Error(result.error);
      toast.success("Commande supprimée", order.reference);
      router.push("/admin/commandes");
      router.refresh();
    } catch {
      toast.error("Erreur lors de la suppression");
      setDeleting(false);
      setDeleteOpen(false);
    }
  };

  const emailSubject = encodeURIComponent(
    `Votre commande ${order.reference} — Kan House`
  );
  const emailBody = encodeURIComponent(
    `Bonjour ${order.customer_name || ""},\n\nMerci pour votre commande ${order.reference}.\n\nNous revenons vers vous très prochainement pour la suite.\n\nCordialement,\nL'équipe Kan House`
  );

  return (
    <>
      <div className="max-w-[1200px]">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between
                        gap-4 mb-6">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/commandes"
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
                Commande
              </p>
              <h1 className="text-[1.35rem] lg:text-[1.5rem] font-normal
                             text-[var(--color-espresso)] tabular-nums">
                {order.reference}
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
            Reçue le{" "}
            {new Date(order.created_at).toLocaleDateString("fr-FR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
          <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

          {/* Colonne gauche — Articles */}
          <div className="lg:col-span-7 space-y-5">
            <section
              className="p-5 lg:p-6"
              style={{ border: "1px solid var(--color-border-line)" }}
            >
              <header className="flex items-center gap-3 mb-5">
                <span className="w-8 h-8 grid place-items-center
                                 bg-[var(--color-cafe-dark)] text-[var(--color-espresso)]/65">
                  <Package size={15} strokeWidth={1.5} />
                </span>
                <h2 className="text-[0.9rem] font-medium text-[var(--color-espresso)]">
                  Articles commandés
                </h2>
                <span className="ml-auto text-[0.72rem] text-[var(--color-espresso)]/45 tabular-nums">
                  {items.length} article{items.length > 1 ? "s" : ""}
                </span>
              </header>

              <ul className="space-y-4">
                {items.map((item: any, i: number) => (
                  <li
                    key={item.id || i}
                    className="flex items-center gap-4 pb-4"
                    style={{
                      borderBottom:
                        i < items.length - 1
                          ? "1px solid var(--color-border-line)"
                          : "none",
                    }}
                  >
                    {item.image && (
                      <div
                        className="relative w-14 h-16 shrink-0
                                   bg-[var(--color-cafe-dark)] overflow-hidden"
                        style={{ border: "1px solid var(--color-border-line)" }}
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <p className="text-[0.88rem] font-medium
                                    text-[var(--color-espresso)] truncate">
                        {item.name}
                      </p>
                      <p className="text-[0.72rem] text-[var(--color-espresso)]/50 mt-0.5">
                        Quantité : {item.quantity}
                      </p>
                    </div>

                    <p className="text-[0.88rem] text-[var(--color-espresso)]
                                  tabular-nums whitespace-nowrap">
                      {item.price}
                    </p>
                  </li>
                ))}
              </ul>

              {/* Totaux */}
              <div
                className="mt-6 pt-5 space-y-2.5"
                style={{ borderTop: "1px solid var(--color-border-line)" }}
              >
                <Row label="Sous-total" value={`€ ${subtotal.toLocaleString("fr-FR")}`} />
                {shipping > 0 && (
                  <Row
                    label="Livraison"
                    value={`€ ${shipping.toLocaleString("fr-FR")}`}
                  />
                )}
                <div
                  className="flex items-baseline justify-between pt-3 mt-1"
                  style={{ borderTop: "1px solid var(--color-border-line)" }}
                >
                  <span className="text-[0.68rem] font-medium uppercase
                                   tracking-[0.22em] text-[var(--color-espresso)]/55">
                    Total
                  </span>
                  <span className="text-[1.15rem] font-medium
                                   text-[var(--color-espresso)] tabular-nums">
                    € {total.toLocaleString("fr-FR")}
                  </span>
                </div>
              </div>
            </section>
          </div>

          {/* Colonne droite — Client + Actions */}
          <aside className="lg:col-span-5 space-y-5">

            {/* Client */}
            <section
              className="p-5 lg:p-6"
              style={{ border: "1px solid var(--color-border-line)" }}
            >
              <h2 className="text-[0.62rem] font-medium uppercase tracking-[0.24em]
                             text-[var(--color-espresso)]/45 mb-5">
                Client
              </h2>

              <ul className="space-y-4">
                {order.customer_name && (
                  <Item label="Nom" value={order.customer_name} />
                )}
                {order.customer_email && (
                  <Item
                    icon={Mail}
                    label="Email"
                    value={order.customer_email}
                    link={`mailto:${order.customer_email}`}
                  />
                )}
                {order.customer_phone && (
                  <Item
                    icon={Phone}
                    label="Téléphone"
                    value={order.customer_phone}
                    link={`tel:${order.customer_phone}`}
                  />
                )}
              </ul>
            </section>

            {/* Adresse */}
            {address && (
              <section
                className="p-5 lg:p-6"
                style={{ border: "1px solid var(--color-border-line)" }}
              >
                <header className="flex items-center gap-3 mb-4">
                  <span className="w-7 h-7 grid place-items-center
                                   bg-[var(--color-cafe-dark)] text-[var(--color-espresso)]/55">
                    <MapPin size={13} strokeWidth={1.5} />
                  </span>
                  <h2 className="text-[0.62rem] font-medium uppercase
                                 tracking-[0.24em] text-[var(--color-espresso)]/45">
                    Livraison
                  </h2>
                </header>

                <address className="not-italic text-[0.88rem] leading-[1.7]
                                    text-[var(--color-espresso)]/75">
                  {address.line1 && <div>{address.line1}</div>}
                  {address.line2 && <div>{address.line2}</div>}
                  <div>
                    {address.postalCode} {address.city}
                  </div>
                  <div className="text-[var(--color-espresso)]/50 mt-1">
                    {address.country}
                  </div>
                </address>
              </section>
            )}

            {/* Actions */}
            <section
              className="p-5 lg:p-6 space-y-3"
              style={{ border: "1px solid var(--color-border-line)" }}
            >
              <h2 className="text-[0.62rem] font-medium uppercase tracking-[0.24em]
                             text-[var(--color-espresso)]/45 mb-1">
                Actions
              </h2>

              {order.customer_email && (
                <a
                  href={`mailto:${order.customer_email}?subject=${emailSubject}&body=${emailBody}`}
                  className="flex items-center justify-between gap-3 w-full
                             px-4 py-3 text-[0.82rem] font-medium
                             bg-[var(--color-espresso)] text-[var(--color-cafe-light)]
                             hover:bg-[var(--color-bordeaux)] transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <Send size={14} strokeWidth={1.5} />
                    Contacter le client
                  </span>
                  <ExternalLink size={12} />
                </a>
              )}

              {order.payment_id && (
                <div
                  className="flex items-center gap-3 px-4 py-3
                             text-[0.82rem] text-[var(--color-espresso)]/70"
                  style={{ border: "1px solid var(--color-border-line)" }}
                >
                  <Receipt size={14} strokeWidth={1.5} />
                  <span className="flex-1">Paiement Stripe</span>
                  <span className="font-mono text-[0.72rem] text-[var(--color-espresso)]/45">
                    {order.payment_id.slice(0, 12)}…
                  </span>
                </div>
              )}
            </section>

            {/* Progression */}
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
                  { key: "pending", label: "En attente", desc: "Commande reçue", icon: Receipt },
                  { key: "paid", label: "Payée", desc: "Paiement confirmé", icon: CheckCircle2 },
                  { key: "shipped", label: "Expédiée", desc: "En cours de livraison", icon: Truck },
                  { key: "delivered", label: "Livrée", desc: "Réception confirmée", icon: Home },
                ].map((step, i) => {
                  const statuses = ["pending", "paid", "shipped", "delivered"];
                  const currentIdx = statuses.indexOf(order.status);
                  const stepIdx = statuses.indexOf(step.key);
                  const isDone = stepIdx < currentIdx;
                  const isCurrent = stepIdx === currentIdx;
                  const isCancelled = order.status === "cancelled";

                  const Icon = step.icon;

                  return (
                    <li key={step.key} className="flex items-start gap-3">
                      <span
                        className={cn(
                          "w-7 h-7 grid place-items-center shrink-0",
                          isDone && "bg-emerald-500/15 text-emerald-700",
                          isCurrent && !isCancelled &&
                            "bg-[var(--color-bordeaux)] text-[var(--color-cafe-light)]",
                          !isDone && !isCurrent &&
                            "bg-[var(--color-cafe-dark)] text-[var(--color-espresso)]/35",
                          isCancelled &&
                            "bg-[var(--color-cafe-dark)] text-[var(--color-espresso)]/25"
                        )}
                      >
                        <Icon size={13} strokeWidth={2} />
                      </span>
                      <div className="flex-1 min-w-0 pt-0.5">
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

                {order.status === "cancelled" && (
                  <li
                    className="flex items-start gap-3 pt-3"
                    style={{ borderTop: "1px solid var(--color-border-line)" }}
                  >
                    <span className="w-7 h-7 grid place-items-center shrink-0
                                     bg-red-500/15 text-red-700">
                      <XCircle size={13} strokeWidth={2} />
                    </span>
                    <div>
                      <p className="text-[0.82rem] font-medium text-red-700">
                        Annulée
                      </p>
                      <p className="text-[0.72rem] text-[var(--color-espresso)]/40 mt-0.5">
                        Commande fermée
                      </p>
                    </div>
                  </li>
                )}
              </ol>
            </section>
          </aside>
        </div>
      </div>

      <ConfirmDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
        loading={deleting}
        title={`Supprimer ${order.reference} ?`}
        description="Cette action est irréversible. La commande sera définitivement supprimée."
        confirmLabel="Supprimer"
        variant="danger"
      />
    </>
  );
}

// ============================================
// SOUS-COMPOSANTS
// ============================================
function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-[0.85rem]
                    text-[var(--color-espresso)]/60">
      <span>{label}</span>
      <span className="tabular-nums">{value}</span>
    </div>
  );
}

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
    <li className="flex items-start gap-3">
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
    </li>
  );
}