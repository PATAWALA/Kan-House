import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import { getOrderById } from "@/lib/supabase/orders";
import OrderStatusSelect from "@/components/admin/OrderStatusSelect";

export default async function AdminCommandeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await getOrderById(id);

  if (!order) notFound();

  const items = Array.isArray(order.items) ? order.items : [];
  const address = order.address as any;

  return (
    <div className="max-w-4xl">
      <Link
        href="/admin/commandes"
        className="inline-flex items-center gap-2 mb-8 text-[0.7rem] uppercase tracking-[0.2em] text-[var(--color-espresso)]/55 hover:text-[var(--color-espresso)] transition-colors"
      >
        <ArrowLeft size={13} />
        Retour aux commandes
      </Link>

      <div className="mb-10">
        <p className="eyebrow mb-3">Commande B2C</p>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-[1.5rem] lg:text-[1.75rem] font-normal text-[var(--color-espresso)] mb-2">
              {order.reference}
            </h1>
            <p className="text-[0.85rem] text-[var(--color-espresso)]/55">
              Reçue le{" "}
              {new Date(order.created_at).toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
        <section className="lg:col-span-7 p-6" style={{ border: "1px solid var(--color-border-line)" }}>
          <p className="text-[0.65rem] uppercase tracking-[0.22em] text-[var(--color-espresso)]/55 mb-5">
            Articles commandés
          </p>

          <ul className="space-y-4">
            {items.map((item: any) => (
              <li
                key={item.id}
                className="flex items-center gap-4 pb-4"
                style={{ borderBottom: "1px solid var(--color-border-line)" }}
              >
                {item.image && (
                  <div
                    className="relative w-14 h-16 shrink-0 bg-[var(--color-cafe-dark)] overflow-hidden"
                    style={{ border: "1px solid var(--color-border-line)" }}
                  >
                    <Image src={item.image} alt={item.name} fill sizes="56px" className="object-cover" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-[0.88rem] text-[var(--color-espresso)] truncate">{item.name}</p>
                  <p className="text-[0.75rem] text-[var(--color-espresso)]/50">Quantité : {item.quantity}</p>
                </div>
                <p className="text-[0.85rem] text-[var(--color-espresso)] tabular-nums whitespace-nowrap">
                  {item.price}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-6 pt-5 space-y-3" style={{ borderTop: "1px solid var(--color-border-line)" }}>
            <div className="flex items-center justify-between text-[0.85rem] text-[var(--color-espresso)]/60">
              <span>Sous-total</span>
              <span className="tabular-nums">
                € {Number(order.subtotal ?? order.total).toLocaleString("fr-FR")}
              </span>
            </div>
            <div className="flex items-baseline justify-between pt-3" style={{ borderTop: "1px solid var(--color-border-line)" }}>
              <span className="text-[0.68rem] uppercase tracking-[0.22em] text-[var(--color-espresso)]/55">
                Total
              </span>
              <span className="text-[1.15rem] text-[var(--color-espresso)] tabular-nums">
                € {Number(order.total).toLocaleString("fr-FR")}
              </span>
            </div>
          </div>
        </section>

        <div className="lg:col-span-5 space-y-5 lg:space-y-6">
          <section className="p-6" style={{ border: "1px solid var(--color-border-line)" }}>
            <p className="text-[0.65rem] uppercase tracking-[0.22em] text-[var(--color-espresso)]/55 mb-5">
              Client
            </p>
            <ul className="space-y-4">
              {order.customer_name && (
                <li>
                  <p className="text-[0.62rem] uppercase tracking-[0.2em] text-[var(--color-espresso)]/45 mb-1">Nom</p>
                  <p className="text-[0.88rem] text-[var(--color-espresso)]">{order.customer_name}</p>
                </li>
              )}
              {order.customer_email && (
                <li className="flex items-start gap-3">
                  <Mail size={14} strokeWidth={1.4} className="text-[var(--color-espresso)]/45 shrink-0 mt-1" />
                  <div>
                    <p className="text-[0.62rem] uppercase tracking-[0.2em] text-[var(--color-espresso)]/45 mb-1">Email</p>
                    <a href={`mailto:${order.customer_email}`} className="text-[0.88rem] text-[var(--color-espresso)] underline underline-offset-[5px]">
                      {order.customer_email}
                    </a>
                  </div>
                </li>
              )}
              {order.customer_phone && (
                <li className="flex items-start gap-3">
                  <Phone size={14} strokeWidth={1.4} className="text-[var(--color-espresso)]/45 shrink-0 mt-1" />
                  <div>
                    <p className="text-[0.62rem] uppercase tracking-[0.2em] text-[var(--color-espresso)]/45 mb-1">Téléphone</p>
                    <a href={`tel:${order.customer_phone}`} className="text-[0.88rem] text-[var(--color-espresso)] underline underline-offset-[5px]">
                      {order.customer_phone}
                    </a>
                  </div>
                </li>
              )}
            </ul>
          </section>

          {address && (
            <section className="p-6" style={{ border: "1px solid var(--color-border-line)" }}>
              <p className="text-[0.65rem] uppercase tracking-[0.22em] text-[var(--color-espresso)]/55 mb-5">
                Adresse de livraison
              </p>
              <ul className="space-y-1 text-[0.88rem] text-[var(--color-espresso)]/75">
                <li>{address.line1}</li>
                {address.line2 && <li>{address.line2}</li>}
                <li>{address.postalCode} {address.city}</li>
                <li className="text-[var(--color-espresso)]/55">{address.country}</li>
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}