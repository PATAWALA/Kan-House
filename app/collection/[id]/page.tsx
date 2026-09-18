"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Truck,
  ShieldCheck,
  Package,
  Minus,
  Plus,
  Sparkles,
} from "lucide-react";
import {
  PRODUCTS,
  PRODUCT_DETAILS,
  getProductDetails,
} from "@/lib/data";
import ProductCard from "@/components/product/ProductCard";
import Section from "@/components/ui/Section";
import { cn } from "@/lib/cn";

export default function ProductPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";

  const product = PRODUCTS.find((p) => p.id === id);
  const details = getProductDetails(id);

  // Galerie — état de l'image active
  const gallery = details?.gallery ?? (product ? [product.image] : []);
  const [activeImage, setActiveImage] = useState(0);

  // Quantité
  const [qty, setQty] = useState(1);

  // Onglet de la fiche (Description / Caractéristiques / Livraison)
  const [tab, setTab] = useState<"description" | "specs" | "delivery">(
    "description"
  );

  // ============================================
  // PRODUIT INTROUVABLE
  // ============================================
  if (!product) {
    return (
      <Section size="lg" className="pt-[clamp(4rem,10vh,7rem)]">
        <div className="max-w-lg mx-auto text-center">
          <p className="eyebrow-accent mb-5">Erreur · 404</p>
          <h1 className="text-[clamp(1.75rem,3.5vw,2.5rem)] leading-tight font-medium mb-4">
            Cette pièce n'existe pas.
          </h1>
          <p className="text-[var(--color-espresso)]/60 leading-relaxed mb-8">
            Elle a peut-être été retirée ou renommée. Retrouvez toute notre
            collection en quelques clics.
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
            Retour à la collection
          </Link>
        </div>
      </Section>
    );
  }

  // Produits similaires (même catégorie, sans le produit actuel)
  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  return (
    <>
      {/* ============================================
          FIL D'ARIANE + RETOUR
          ============================================ */}
      <Section size="sm" className="pt-[clamp(2rem,5vh,3rem)] pb-0">
        <nav className="flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.16em] text-[var(--color-espresso)]/50">
          <Link
            href="/collection"
            className="hover:text-[var(--color-bordeaux)] transition-colors"
          >
            Collection
          </Link>
          <span>/</span>
          <span className="text-[var(--color-espresso)]/70">
            {product.category}
          </span>
          <span>/</span>
          <span className="text-[var(--color-espresso)]">
            {product.name}
          </span>
        </nav>
      </Section>

      {/* ============================================
          BLOC PRINCIPAL — galerie + infos
          ============================================ */}
      <Section size="md" className="pt-8 md:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

          {/* ---------- GALERIE — 7 colonnes ---------- */}
          <div className="lg:col-span-7">
            {/* Image principale */}
            <div className="ratio-portrait w-full overflow-hidden rounded-md bg-[var(--color-cream-dark)] mb-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={gallery[activeImage]}
                    alt={product.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Vignettes */}
            {gallery.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {gallery.map((src, i) => (
                  <button
                    key={src}
                    onClick={() => setActiveImage(i)}
                    className={cn(
                      "relative aspect-square rounded-sm overflow-hidden transition-all",
                      activeImage === i
                        ? "ring-2 ring-[var(--color-bordeaux)]"
                        : "opacity-70 hover:opacity-100"
                    )}
                  >
                    <Image
                      src={src}
                      alt={`${product.name} — vue ${i + 1}`}
                      fill
                      sizes="20vw"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ---------- INFOS — 5 colonnes ---------- */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            {/* Catégorie */}
            <p className="eyebrow-accent mb-4">{product.category}</p>

            {/* Nom */}
            <h1 className="text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.1] font-medium tracking-[-0.02em] text-[var(--color-espresso)] mb-4">
              {product.name}
            </h1>

            {/* Prix */}
            <p className="text-[1.5rem] font-semibold text-[var(--color-bordeaux)] mb-6">
              {product.price}
            </p>

            {/* Description courte */}
            <p className="text-[var(--color-espresso)]/65 leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Sélecteur quantité */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[var(--color-espresso)]/60">
                Quantité
              </span>
              <div className="inline-flex items-center border border-[var(--color-espresso)]/15 rounded-full">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  aria-label="Diminuer"
                  className="w-10 h-10 grid place-items-center text-[var(--color-espresso)]/60 hover:text-[var(--color-espresso)] transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="w-10 text-center text-[0.9rem] font-medium tabular-nums">
                  {qty}
                </span>
                <button
                  onClick={() => setQty(qty + 1)}
                  aria-label="Augmenter"
                  className="w-10 h-10 grid place-items-center text-[var(--color-espresso)]/60 hover:text-[var(--color-espresso)] transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* CTA principal — Ajouter au panier */}
            <button
              className="group w-full inline-flex items-center justify-between
                         bg-[var(--color-bordeaux)] text-[var(--color-cream)]
                         pl-7 pr-2 py-2
                         rounded-full
                         text-[0.72rem] font-semibold uppercase tracking-[0.22em]
                         hover:bg-[var(--color-bordeaux-deep)]
                         transition-colors mb-3"
            >
              <span>Ajouter au panier</span>
              <span className="inline-flex items-center justify-center
                               w-11 h-11 rounded-full
                               bg-[var(--color-cream)] text-[var(--color-bordeaux)]
                               transition-transform duration-300
                               group-hover:translate-x-0.5">
                <ArrowUpRight size={16} strokeWidth={2} />
              </span>
            </button>

            {/* CTA secondaire — Demander un devis */}
            <Link
              href="/start-project"
              className="w-full inline-flex items-center justify-center
                         border border-[var(--color-espresso)]/20 text-[var(--color-espresso)]
                         px-7 py-3.5 rounded-full
                         text-[0.72rem] font-semibold uppercase tracking-[0.22em]
                         hover:bg-[var(--color-espresso)] hover:text-[var(--color-cream)] hover:border-[var(--color-espresso)]
                         transition-colors mb-8"
            >
              Demander un devis B2B
            </Link>

            {/* Réassurance — 3 points */}
            <ul className="space-y-3 pt-6 border-t border-[var(--color-espresso)]/10">
              {[
                { icon: Truck, label: "Livraison internationale" },
                { icon: ShieldCheck, label: "Contrôle qualité à la source" },
                { icon: Package, label: "Emballage sécurisé sur-mesure" },
              ].map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-3 text-[0.82rem] text-[var(--color-espresso)]/65"
                >
                  <Icon
                    size={15}
                    className="text-[var(--color-bordeaux)] shrink-0"
                  />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ============================================
          ONGLETS — Description / Caractéristiques / Livraison
          ============================================ */}
      <Section size="md" className="pt-0">
        <div className="border-t border-[var(--color-espresso)]/10 pt-10 md:pt-14">
          {/* Barre d'onglets */}
          <div className="flex flex-wrap gap-2 mb-10">
            {[
              { key: "description", label: "Description" },
              { key: "specs", label: "Caractéristiques" },
              { key: "delivery", label: "Livraison & retours" },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setTab(key as typeof tab)}
                className={cn(
                  "px-5 py-2.5 rounded-full text-[0.7rem] font-semibold uppercase tracking-[0.16em] transition-colors",
                  tab === key
                    ? "bg-[var(--color-bordeaux)] text-[var(--color-cream)]"
                    : "text-[var(--color-espresso)]/60 hover:text-[var(--color-espresso)] border border-[var(--color-espresso)]/15"
                )}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Contenu */}
          <div className="max-w-3xl">
            {tab === "description" && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-[var(--color-espresso)]/70 leading-[1.8] text-[1.02rem]"
              >
                {details?.longDescription ??
                  product.description}
              </motion.p>
            )}

            {tab === "specs" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5"
              >
                {details?.specs.map((s) => (
                  <div
                    key={s.label}
                    className="flex items-baseline justify-between gap-4 pb-3 border-b border-[var(--color-espresso)]/8"
                  >
                    <span className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[var(--color-espresso)]/50">
                      {s.label}
                    </span>
                    <span className="text-[0.9rem] text-[var(--color-espresso)] text-right">
                      {s.value}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}

            {tab === "delivery" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-5 text-[var(--color-espresso)]/70 leading-[1.8]"
              >
                <p>
                  <strong className="text-[var(--color-espresso)]">
                    Livraison.
                  </strong>{" "}
                  Chaque pièce est emballée sur-mesure et expédiée depuis nos
                  ateliers. Délai indicatif : 4 à 8 semaines selon les pièces.
                  Livraison internationale possible.
                </p>
                <p>
                  <strong className="text-[var(--color-espresso)]">
                    Retours.
                  </strong>{" "}
                  Vous disposez de 14 jours après réception pour nous signaler
                  tout défaut. Les pièces sur-mesure ne sont pas éligibles au
                  retour.
                </p>
                <p>
                  <strong className="text-[var(--color-espresso)]">
                    Installation.
                  </strong>{" "}
                  Pour les projets Hospitality, nous proposons un service
                  d'installation clé en main. Contactez-nous pour un devis.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </Section>

      {/* ============================================
          VOUS AIMEREZ AUSSI
          ============================================ */}
      {related.length > 0 && (
        <Section size="md" className="pt-0">
          <div className="border-t border-[var(--color-espresso)]/10 pt-14 md:pt-20">
            <div className="flex items-end justify-between gap-6 mb-10 md:mb-14">
              <div>
                <p className="eyebrow-accent mb-4">Dans la même lignée</p>
                <h2 className="text-[clamp(1.5rem,2.5vw,2rem)] leading-tight font-medium tracking-[-0.02em] text-[var(--color-espresso)]">
                  Vous aimerez aussi
                </h2>
              </div>

              <Link
                href="/collection"
                className="group inline-flex items-center gap-2 self-end
                           text-[0.72rem] font-semibold uppercase tracking-[0.22em]
                           text-[var(--color-espresso)] hover:text-[var(--color-bordeaux)] transition-colors"
              >
                Voir tout
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-7">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* ============================================
          CTA FINALE — dégradé + flèche
          ============================================ */}
      <section className="relative mt-16 md:mt-24 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-[var(--color-bordeaux-deep)] via-[var(--color-bordeaux)] to-[var(--color-bordeaux-deep)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-15 mix-blend-overlay"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=60')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="relative">
          <div className="container-kan py-[clamp(4rem,10vh,7rem)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              <div className="lg:col-span-7">
                <p className="eyebrow-invert mb-5">Projet Hospitality ?</p>
                <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] font-medium tracking-[-0.02em] text-[var(--color-cream)] mb-6">
                  Équipez vos espaces
                  <br />
                  avec notre expertise.
                </h2>
                <p className="text-[clamp(0.95rem,1.1vw,1.05rem)] leading-[1.7] text-[var(--color-cream)]/75 max-w-lg">
                  Hôtels, restaurants, villas — nous orchestrons le sourcing
                  complet, du choix des pièces à l'installation finale.
                </p>
              </div>

              <div className="lg:col-span-5 flex lg:justify-end">
                <a
                  href="/start-project"
                  className="group inline-flex items-center gap-4
                             bg-[var(--color-cream)] text-[var(--color-bordeaux)]
                             pl-7 pr-2 py-2
                             rounded-full
                             text-[0.72rem] font-semibold uppercase tracking-[0.22em]
                             hover:bg-[var(--color-sand)]
                             transition-all duration-300"
                >
                  <span>Démarrer un projet</span>
                  <span className="relative inline-flex items-center justify-center
                                   w-11 h-11 rounded-full
                                   bg-[var(--color-bordeaux)] text-[var(--color-cream)]
                                   transition-transform duration-300
                                   group-hover:translate-x-0.5">
                    <ArrowUpRight size={16} strokeWidth={2} />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}