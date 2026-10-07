"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const increment = useCartStore((s) => s.increment);
  const decrement = useCartStore((s) => s.decrement);
  const removeItem = useCartStore((s) => s.removeItem);
  const clear = useCartStore((s) => s.clear);
  const totalPrice = useCartStore((s) => s.totalPrice());

  // ============================================
  // PANIER VIDE
  // ============================================
  if (items.length === 0) {
    return (
      <section className="bg-[var(--color-cafe-light)]">
        <div className="container-kan py-32 md:py-40">
          <div className="max-w-lg mx-auto text-center">
            <p className="eyebrow mb-5">Votre panier</p>
            <h1 className="text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15]
                           font-normal tracking-[-0.02em]
                           text-[var(--color-espresso)] mb-4">
              Votre panier est vide.
            </h1>
            <p className="text-[0.92rem] leading-[1.75]
                          text-[var(--color-espresso)]/60 mb-10">
              Découvrez notre collection et ajoutez vos pièces préférées.
            </p>
            <Link href="/collection" className="link-text">
              Voir la collection →
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // ============================================
  // PANIER REMPLI
  // ============================================
  return (
    <section className="bg-[var(--color-cafe-light)]">
      <div className="container-kan pt-16 md:pt-20 lg:pt-24 pb-20 md:pb-28">

        {/* En-tête */}
        <div className="max-w-4xl mb-12 md:mb-16">
          <p className="eyebrow mb-5">Votre panier</p>
          <h1 className="text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15]
                         font-normal tracking-[-0.02em]
                         text-[var(--color-espresso)]">
            {items.length} {items.length > 1 ? "pièces" : "pièce"} sélectionnée
            {items.length > 1 ? "s" : ""}
          </h1>
        </div>

        <div className="max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* ============================================
              LISTE DES ARTICLES — 7 colonnes
              ============================================ */}
          <ul className="lg:col-span-7">
            {items.map((item, index) => (
              <li
                key={item.id}
                className="flex gap-5 py-6"
                style={{
                  borderTop:
                    index === 0 ? "1px solid var(--color-border-line)" : "none",
                  borderBottom: "1px solid var(--color-border-line)",
                }}
              >
                {/* Image */}
                <Link
                  href={`/collection/${item.id}`}
                  className="relative w-24 h-28 shrink-0
                             bg-[var(--color-cafe-dark)]"
                  style={{ border: "1px solid var(--color-border-line)" }}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </Link>

                {/* Contenu */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <Link href={`/collection/${item.id}`}>
                        <h3 className="text-[0.98rem] font-medium leading-tight
                                       text-[var(--color-espresso)]
                                       hover:text-[var(--color-bordeaux)]
                                       transition-colors mb-1">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-[0.85rem] text-[var(--color-espresso)]/55">
                        {item.price}
                      </p>
                    </div>

                    {/* Retirer */}
                    <button
                      onClick={() => removeItem(item.id)}
                      aria-label="Retirer du panier"
                      className="text-[var(--color-espresso)]/40
                                 hover:text-[var(--color-espresso)]
                                 transition-colors shrink-0 p-1"
                    >
                      <X size={16} strokeWidth={1.4} />
                    </button>
                  </div>

                  {/* Quantité + Sous-total */}
                  <div className="flex items-end justify-between gap-4 mt-4">
                    {/* Sélecteur quantité carré */}
                    <div
                      className="inline-flex items-center"
                      style={{ border: "1px solid var(--color-border-line)" }}
                    >
                      <button
                        onClick={() => decrement(item.id)}
                        aria-label="Diminuer"
                        className="w-9 h-9 grid place-items-center
                                   text-[var(--color-espresso)]/60
                                   hover:text-[var(--color-espresso)] transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-10 text-center text-[0.82rem] tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increment(item.id)}
                        aria-label="Augmenter"
                        className="w-9 h-9 grid place-items-center
                                   text-[var(--color-espresso)]/60
                                   hover:text-[var(--color-espresso)] transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Sous-total ligne */}
                    <p className="text-[0.88rem] font-medium
                                  text-[var(--color-espresso)] tabular-nums">
                      €{" "}
                      {(
                        Number(item.price.replace(/[^\d]/g, "")) * item.quantity
                      ).toLocaleString("fr-FR")}
                    </p>
                  </div>
                </div>
              </li>
            ))}

            {/* Lien vider panier */}
            <div className="flex justify-end pt-6">
              <button
                onClick={clear}
                className="text-[0.68rem] font-medium uppercase tracking-[0.2em]
                           text-[var(--color-espresso)]/45
                           underline underline-offset-[5px] decoration-[1px]
                           hover:text-[var(--color-espresso)]
                           transition-colors"
              >
                Vider le panier
              </button>
            </div>
          </ul>

          {/* ============================================
              RÉCAPITULATIF — 5 colonnes, sticky
              ============================================ */}
          <aside className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            <div
              className="p-7 md:p-8"
              style={{
                border: "1px solid var(--color-border-line)",
                backgroundColor: "var(--color-cafe-dark)",
              }}
            >
              <p className="eyebrow mb-6">Récapitulatif</p>

              {/* Lignes de détail */}
              <ul className="space-y-3 mb-6">
                <li className="flex items-center justify-between
                               text-[0.88rem] text-[var(--color-espresso)]/70">
                  <span>Sous-total</span>
                  <span className="tabular-nums">
                    € {totalPrice.toLocaleString("fr-FR")}
                  </span>
                </li>
                <li className="flex items-center justify-between
                               text-[0.88rem] text-[var(--color-espresso)]/70">
                  <span>Livraison</span>
                  <span className="text-[0.8rem] italic">
                    Calculée à l'étape suivante
                  </span>
                </li>
              </ul>

              {/* Total */}
              <div
                className="flex items-baseline justify-between pt-5 mb-8"
                style={{ borderTop: "1px solid var(--color-border-line)" }}
              >
                <span className="text-[0.68rem] font-medium uppercase
                                 tracking-[0.22em]
                                 text-[var(--color-espresso)]/55">
                  Total
                </span>
                <span className="text-[1.25rem] font-normal
                                 text-[var(--color-espresso)] tabular-nums">
                  € {totalPrice.toLocaleString("fr-FR")}
                </span>
              </div>

              {/* CTA Checkout */}
              <button
                className="group w-full inline-flex items-center justify-center gap-3
                           bg-[var(--color-espresso)] text-[var(--color-cafe-light)]
                           px-7 py-4
                           text-[0.7rem] font-medium uppercase tracking-[0.22em]
                           hover:bg-[var(--color-bordeaux)]
                           transition-colors"
              >
                Passer commande
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>

              {/* Lien continuer achats */}
              <div className="text-center mt-5">
                <Link
                  href="/collection"
                  className="text-[0.68rem] font-medium uppercase tracking-[0.2em]
                             text-[var(--color-espresso)]/55
                             underline underline-offset-[5px] decoration-[1px]
                             hover:text-[var(--color-espresso)]
                             transition-colors"
                >
                  Continuer mes achats
                </Link>
              </div>
            </div>

            {/* Mention rassurance */}
            <p className="text-[0.72rem] leading-[1.7]
                          text-[var(--color-espresso)]/50 mt-6 text-center">
              Paiement sécurisé · Livraison internationale<br />
              Contrôle qualité à la source sur chaque pièce
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}