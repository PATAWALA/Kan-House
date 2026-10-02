"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Truck,
  ShieldCheck,
  Package,
  Minus,
  Plus,
} from "lucide-react";
import { PRODUCTS, getProductDetails } from "@/lib/data";
import ProductCard from "@/components/product/ProductCard";
import { cn } from "@/lib/cn";

export default function ProductPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";

  const product = PRODUCTS.find((p) => p.id === id);
  const details = getProductDetails(id);

  const gallery = details?.gallery ?? (product ? [product.image] : []);
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"description" | "specs" | "delivery">(
    "description"
  );

  // ---------- 404 ----------
  if (!product) {
    return (
      <section className="bg-[var(--color-cafe-light)]">
        <div className="container-kan py-32 text-center">
          <p className="eyebrow mb-5">Erreur · 404</p>
          <h1 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-normal mb-4 text-[var(--color-espresso)]">
            Cette pièce n'existe pas.
          </h1>
          <p className="text-[var(--color-espresso)]/60 leading-relaxed mb-8 max-w-lg mx-auto">
            Elle a peut-être été retirée ou renommée. Retrouvez toute notre
            collection en quelques clics.
          </p>
          <Link
            href="/collection"
            className="link-text"
          >
            <ArrowLeft size={13} />
            Retour à la collection
          </Link>
        </div>
      </section>
    );
  }

  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <section className="bg-[var(--color-cafe-light)]">

      {/* ============================================
          FIL D'ARIANE
          ============================================ */}
      <div className="container-kan pt-10 pb-6">
        <nav className="flex flex-wrap items-center gap-2 text-[0.68rem] uppercase tracking-[0.2em] text-[var(--color-espresso)]/45">
          <Link
            href="/collection"
            className="hover:text-[var(--color-espresso)] transition-colors"
          >
            Collection
          </Link>
          <span className="opacity-50">/</span>
          <span>{product.category}</span>
          <span className="opacity-50">/</span>
          <span className="text-[var(--color-espresso)]">{product.name}</span>
        </nav>
      </div>

      {/* ============================================
          BLOC PRINCIPAL
          ============================================ */}
      <div className="container-kan pb-20 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

          {/* ---------- GALERIE — 7 colonnes ---------- */}
          <div className="lg:col-span-7">
            {/* Image principale */}
            <div
              className="ratio-portrait w-full bg-[var(--color-cafe-dark)] mb-4 relative"
              style={{ border: "1px solid var(--color-border-line)" }}
            >
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
                      "relative aspect-square overflow-hidden transition-opacity",
                      activeImage === i ? "opacity-100" : "opacity-60 hover:opacity-90"
                    )}
                    style={{
                      border:
                        activeImage === i
                          ? "1px solid var(--color-espresso)"
                          : "1px solid var(--color-border-line)",
                    }}
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

          {/* ---------- INFOS — 5 colonnes, sticky ---------- */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            {/* Catégorie */}
            <p className="eyebrow mb-4">{product.category}</p>

            {/* Nom */}
            <h1 className="text-[clamp(1.6rem,3vw,2.25rem)] leading-[1.15] font-normal
                           tracking-[-0.02em] text-[var(--color-espresso)] mb-4">
              {product.name}
            </h1>

            {/* Prix */}
            <p className="text-[1.15rem] text-[var(--color-espresso)]/80 mb-6">
              {product.price}
            </p>

            {/* Description courte */}
            <p className="text-[0.92rem] leading-[1.75]
                          text-[var(--color-espresso)]/60 mb-8">
              {product.description}
            </p>

            {/* Sélecteur quantité */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[0.68rem] font-medium uppercase tracking-[0.2em]
                               text-[var(--color-espresso)]/55">
                Quantité
              </span>
              <div
                className="inline-flex items-center"
                style={{ border: "1px solid var(--color-border-line)" }}
              >
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  aria-label="Diminuer"
                  className="w-10 h-10 grid place-items-center
                             text-[var(--color-espresso)]/60
                             hover:text-[var(--color-espresso)] transition-colors"
                >
                  <Minus size={13} />
                </button>
                <span className="w-10 text-center text-[0.88rem] tabular-nums">
                  {qty}
                </span>
                <button
                  onClick={() => setQty(qty + 1)}
                  aria-label="Augmenter"
                  className="w-10 h-10 grid place-items-center
                             text-[var(--color-espresso)]/60
                             hover:text-[var(--color-espresso)] transition-colors"
                >
                  <Plus size={13} />
                </button>
              </div>
            </div>

            {/* CTA principal — Ajouter au panier */}
            <button
              className="group w-full inline-flex items-center justify-center gap-3
                         bg-[var(--color-espresso)] text-[var(--color-cafe-light)]
                         px-7 py-4
                         text-[0.72rem] font-medium uppercase tracking-[0.22em]
                         hover:bg-[var(--color-bordeaux)]
                         transition-colors mb-3"
            >
              Ajouter au panier
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>

            {/* CTA secondaire — Demander un devis */}
            <Link
              href="/start-project"
              className="w-full inline-flex items-center justify-center gap-3
                         border border-[var(--color-espresso)]/30
                         text-[var(--color-espresso)]
                         px-7 py-3.5
                         text-[0.72rem] font-medium uppercase tracking-[0.22em]
                         hover:bg-[var(--color-espresso)] hover:text-[var(--color-cafe-light)]
                         hover:border-[var(--color-espresso)]
                         transition-colors mb-8"
            >
              Demander un devis B2B
            </Link>

            {/* Réassurance — 3 points */}
            <ul
              className="space-y-4 pt-6"
              style={{ borderTop: "1px solid var(--color-border-line)" }}
            >
              {[
                { icon: Truck, label: "Livraison internationale" },
                { icon: ShieldCheck, label: "Contrôle qualité à la source" },
                { icon: Package, label: "Emballage sécurisé sur-mesure" },
              ].map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-3 text-[0.82rem]
                             text-[var(--color-espresso)]/65"
                >
                  <Icon
                    size={15}
                    strokeWidth={1.4}
                    className="text-[var(--color-espresso)]/50 shrink-0"
                  />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ============================================
          ONGLETS — Description / Caractéristiques / Livraison
          ============================================ */}
      <div
        className="container-kan pb-20 md:pb-28"
        style={{ borderTop: "1px solid var(--color-border-line)" }}
      >
        <div className="pt-14 md:pt-20">
          {/* Barre d'onglets */}
          <div className="flex flex-wrap gap-6 mb-10">
            {[
              { key: "description", label: "Description" },
              { key: "specs", label: "Caractéristiques" },
              { key: "delivery", label: "Livraison & retours" },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setTab(key as typeof tab)}
                className={cn(
                  "pb-2 text-[0.68rem] font-medium uppercase tracking-[0.22em]",
                  "transition-colors duration-200 border-b",
                  tab === key
                    ? "text-[var(--color-espresso)] border-[var(--color-espresso)]"
                    : "text-[var(--color-espresso)]/45 border-transparent hover:text-[var(--color-espresso)]/70"
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
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-[0.98rem] leading-[1.85]
                           text-[var(--color-espresso)]/70"
              >
                {details?.longDescription ?? product.description}
              </motion.p>
            )}

            {tab === "specs" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5"
              >
                {details?.specs.map((s) => (
                  <div
                    key={s.label}
                    className="flex items-baseline justify-between gap-4 pb-3"
                    style={{ borderBottom: "1px solid var(--color-border-line)" }}
                  >
                    <span className="text-[0.68rem] font-medium uppercase tracking-[0.2em]
                                     text-[var(--color-espresso)]/45">
                      {s.label}
                    </span>
                    <span className="text-[0.88rem] text-[var(--color-espresso)] text-right">
                      {s.value}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}

            {tab === "delivery" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-5 text-[0.95rem] leading-[1.85]
                           text-[var(--color-espresso)]/70"
              >
                <p>
                  <strong className="text-[var(--color-espresso)] font-medium">
                    Livraison.
                  </strong>{" "}
                  Chaque pièce est emballée sur-mesure et expédiée depuis nos
                  ateliers. Délai indicatif : 4 à 8 semaines selon les pièces.
                  Livraison internationale possible.
                </p>
                <p>
                  <strong className="text-[var(--color-espresso)] font-medium">
                    Retours.
                  </strong>{" "}
                  Vous disposez de 14 jours après réception pour nous signaler
                  tout défaut. Les pièces sur-mesure ne sont pas éligibles au
                  retour.
                </p>
                <p>
                  <strong className="text-[var(--color-espresso)] font-medium">
                    Installation.
                  </strong>{" "}
                  Pour les projets Hospitality, nous proposons un service
                  d'installation clé en main. Contactez-nous pour un devis.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* ============================================
          VOUS AIMEREZ AUSSI
          ============================================ */}
      {related.length > 0 && (
        <div
          className="container-kan pb-20 md:pb-28"
          style={{ borderTop: "1px solid var(--color-border-line)" }}
        >
          <div className="pt-14 md:pt-20">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
              <div>
                <p className="eyebrow mb-4">Dans la même lignée</p>
                <h2 className="text-[clamp(1.5rem,2.5vw,2rem)] leading-[1.15]
                               font-normal tracking-[-0.02em]
                               text-[var(--color-espresso)]">
                  Vous aimerez aussi
                </h2>
              </div>

              <Link href="/collection" className="link-text self-start md:self-end">
                Voir tout →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-12 lg:gap-x-6">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================
          CTA FINALE — bloc bordeaux
          ============================================ */}
      <div className="bg-[var(--color-bordeaux)] text-[var(--color-cafe-light)]">
        <div className="container-kan py-16 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <p className="eyebrow-invert mb-5">Projet Hospitality ?</p>
              <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15]
                             font-normal tracking-[-0.02em]
                             text-[var(--color-cafe-light)] mb-5">
                Équipez vos espaces
                <br />
                avec notre expertise.
              </h2>
              <p className="text-[0.92rem] leading-[1.75]
                            text-[var(--color-cafe-light)]/70 max-w-lg">
                Hôtels, restaurants, villas — nous orchestrons le sourcing
                complet, du choix des pièces à l'installation finale.
              </p>
            </div>

            <div className="lg:col-span-5 flex lg:justify-end">
              <Link
                href="/start-project"
                className="group inline-flex items-center gap-3
                           border border-[var(--color-cafe-light)]/70
                           text-[var(--color-cafe-light)]
                           px-6 py-3.5
                           text-[0.68rem] font-medium uppercase tracking-[0.22em]
                           hover:bg-[var(--color-cafe-light)] hover:text-[var(--color-bordeaux)]
                           transition-colors duration-300"
              >
                Start a Project
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}