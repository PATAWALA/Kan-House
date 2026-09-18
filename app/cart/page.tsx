"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ArrowLeft } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";
import Section from "@/components/ui/Section";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const increment = useCartStore((s) => s.increment);
  const decrement = useCartStore((s) => s.decrement);
  const removeItem = useCartStore((s) => s.removeItem);
  const clear = useCartStore((s) => s.clear);
  const totalPrice = useCartStore((s) => s.totalPrice());

  if (items.length === 0) {
    return (
      <Section size="lg" className="pt-[clamp(4rem,10vh,6rem)]">
        <div className="max-w-lg mx-auto text-center">
          <p className="eyebrow-accent mb-5">Votre panier</p>
          <h1 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-medium mb-4">
            Votre panier est vide.
          </h1>
          <p className="text-[var(--color-espresso)]/60 leading-relaxed mb-8">
            Découvrez notre collection et ajoutez vos pièces préférées.
          </p>
          <Link
            href="/collection"
            className="inline-flex items-center gap-3
                       bg-[var(--color-bordeaux)] text-[var(--color-cream)]
                       px-6 py-3.5 rounded-full
                       text-[0.72rem] font-semibold uppercase tracking-[0.22em]
                       hover:bg-[var(--color-bordeaux-deep)]
                       transition-colors"
          >
            <ArrowLeft size={14} />
            Voir la collection
          </Link>
        </div>
      </Section>
    );
  }

  return (
    <Section size="lg" className="pt-[clamp(3rem,8vh,5rem)]">
      <div className="max-w-3xl mx-auto">
        <p className="eyebrow-accent mb-5">Votre panier</p>
        <h1 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-medium mb-10">
          {items.length} {items.length > 1 ? "pièces" : "pièce"} sélectionnée{items.length > 1 ? "s" : ""}
        </h1>

        <ul className="space-y-6 mb-10">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex gap-4 pb-6 border-b border-[var(--color-espresso)]/10"
            >
              <div className="relative w-24 h-24 shrink-0 rounded-md overflow-hidden bg-[var(--color-cream-dark)]">
                <Image src={item.image} alt={item.name} fill sizes="96px" className="object-cover" />
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-medium text-[var(--color-espresso)] mb-1">
                    {item.name}
                  </h3>
                  <p className="text-sm text-[var(--color-bordeaux)] font-medium">
                    {item.price}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <div className="inline-flex items-center border border-[var(--color-espresso)]/15 rounded-full">
                    <button
                      onClick={() => decrement(item.id)}
                      className="w-8 h-8 grid place-items-center text-[var(--color-espresso)]/60 hover:text-[var(--color-espresso)]"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-8 text-center text-sm font-medium tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => increment(item.id)}
                      className="w-8 h-8 grid place-items-center text-[var(--color-espresso)]/60 hover:text-[var(--color-espresso)]"
                    >
                      <Plus size={12} />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    aria-label="Retirer"
                    className="text-[var(--color-espresso)]/40 hover:text-[var(--color-bordeaux)] transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between pt-6 border-t border-[var(--color-espresso)]/15">
          <div>
            <p className="eyebrow-accent mb-1">Total</p>
            <p className="text-2xl font-semibold text-[var(--color-bordeaux)]">
              € {totalPrice.toLocaleString("fr-FR")}
            </p>
          </div>

          <button
            onClick={clear}
            className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-espresso)]/50 hover:text-[var(--color-bordeaux)] transition-colors"
          >
            Vider le panier
          </button>
        </div>

        <button
          className="w-full mt-8 inline-flex items-center justify-center gap-3
                     bg-[var(--color-bordeaux)] text-[var(--color-cream)]
                     px-7 py-4 rounded-full
                     text-[0.72rem] font-semibold uppercase tracking-[0.22em]
                     hover:bg-[var(--color-bordeaux-deep)]
                     transition-colors"
        >
          Passer commande
        </button>
      </div>
    </Section>
  );
}