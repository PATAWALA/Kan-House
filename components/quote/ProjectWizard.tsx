"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Hotel,
  UtensilsCrossed,
  Home,
  Wine,
  Check,
  Upload,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/cn";

/* -------------------- Types -------------------- */
type VenueType = "hotel" | "restaurant" | "villa" | "lounge";

type FormState = {
  venue: VenueType | null;
  surface: string;
  rooms: string;
  collections: string[];
  company: string;
  contactName: string;
  email: string;
  phone: string;
  notes: string;
};

const VENUES: { id: VenueType; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "hotel", label: "Hôtel", desc: "Chambres, suites, lobby", icon: Hotel },
  { id: "restaurant", label: "Restaurant", desc: "Salle, bar, terrasse", icon: UtensilsCrossed },
  { id: "villa", label: "Villa / Résidence", desc: "Privée ou locative", icon: Home },
  { id: "lounge", label: "Lounge / Bar", desc: "Espaces nuit & détente", icon: Wine },
];

const COLLECTIONS = [
  "Mobilier sur-mesure",
  "Assises & canapés",
  "Tables & surfaces",
  "Luminaires signature",
  "Textiles & tapis",
  "Matériaux (pierre, bois, métal)",
];

const STEPS = ["Projet", "Volumétrie", "Collections", "Coordonnées", "Récapitulatif"];

/* -------------------- Composant -------------------- */
export default function ProjectWizard() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormState>({
    venue: null,
    surface: "",
    rooms: "",
    collections: [],
    company: "",
    contactName: "",
    email: "",
    phone: "",
    notes: "",
  });

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggleCollection = (c: string) =>
    setForm((f) => ({
      ...f,
      collections: f.collections.includes(c)
        ? f.collections.filter((x) => x !== c)
        : [...f.collections, c],
    }));

  const canNext = () => {
    if (step === 0) return !!form.venue;
    if (step === 1) return form.surface !== "" || form.rooms !== "";
    if (step === 2) return form.collections.length > 0;
    if (step === 3) return form.contactName && form.email;
    return true;
  };

  const next = () => canNext() && setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const submit = () => {
    // TODO: brancher sur /api/quote (Resend / Nodemailer / Notion)
    console.log("Quote submitted:", form);
    setSubmitted(true);
  };

  /* ---------- Vue succès ---------- */
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl mx-auto text-center py-24"
      >
        <div className="w-16 h-16 mx-auto rounded-full bg-[var(--color-bordeaux)] grid place-items-center mb-8">
          <Check className="text-[var(--color-cream)]" size={28} />
        </div>
        <p className="eyebrow mb-4">Demande reçue</p>
        <h2 className="font-serif text-4xl md:text-5xl mb-6">
          Merci, {form.contactName.split(" ")[0] || "à vous"}.
        </h2>
        <p className="text-[var(--color-espresso)]/70 leading-relaxed mb-10">
          Votre demande de devis Hospitality a bien été transmise à notre équipe.
          Un récapitulatif détaillé vous sera adressé sous 48h à{" "}
          <span className="text-[var(--color-bordeaux)]">{form.email}</span>.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setStep(0);
          }}
          className="btn-ghost btn-ghost-hover"
        >
          Nouvelle demande
        </button>
      </motion.div>
    );
  }

  /* ---------- Wizard ---------- */
  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center gap-3">
              <span
                className={cn(
                  "w-8 h-8 rounded-full grid place-items-center text-xs transition-colors",
                  i < step && "bg-[var(--color-bordeaux)] text-[var(--color-cream)]",
                  i === step && "bg-[var(--color-espresso)] text-[var(--color-cream)]",
                  i > step && "bg-[var(--color-espresso)]/8 text-[var(--color-espresso)]/40"
                )}
              >
                {i < step ? <Check size={14} /> : i + 1}
              </span>
              <span
                className={cn(
                  "hidden md:block text-xs uppercase tracking-[0.18em]",
                  i === step ? "text-[var(--color-espresso)]" : "text-[var(--color-espresso)]/40"
                )}
              >
                {label}
              </span>
              {i < STEPS.length - 1 && (
                <span className="hidden md:block w-8 lg:w-16 h-px bg-[var(--color-espresso)]/15" />
              )}
            </div>
          ))}
        </div>
        <div className="h-px bg-[var(--color-espresso)]/10 relative overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-[var(--color-bordeaux)]"
            animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>

      {/* Steps */}
      <div className="min-h-[420px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* ÉTAPE 0 — Typologie */}
            {step === 0 && (
              <div>
                <StepTitle n="01" title="Quel type d'établissement ?" />
                <div className="grid sm:grid-cols-2 gap-4 mt-10">
                  {VENUES.map((v) => {
                    const Icon = v.icon;
                    const active = form.venue === v.id;
                    return (
                      <button
                        key={v.id}
                        onClick={() => update("venue", v.id)}
                        className={cn(
                          "text-left p-6 rounded-sm border transition-all group",
                          active
                            ? "border-[var(--color-bordeaux)] bg-[var(--color-bordeaux)]/5"
                            : "border-[var(--color-espresso)]/12 hover:border-[var(--color-espresso)]/40"
                        )}
                      >
                        <Icon
                          size={22}
                          strokeWidth={1.5}
                          className={cn(
                            "mb-5 transition-colors",
                            active ? "text-[var(--color-bordeaux)]" : "text-[var(--color-espresso)]/60"
                          )}
                        />
                        <p className="font-serif text-2xl mb-1">{v.label}</p>
                        <p className="text-sm text-[var(--color-espresso)]/60">{v.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ÉTAPE 1 — Volumétrie */}
            {step === 1 && (
              <div>
                <StepTitle n="02" title="Quelle est la volumétrie du projet ?" />
                <div className="grid sm:grid-cols-2 gap-8 mt-10">
                  <Field label="Superficie (m²)">
                    <input
                      type="number"
                      min={0}
                      value={form.surface}
                      onChange={(e) => update("surface", e.target.value)}
                      placeholder="ex. 1200"
                      className="input-kan"
                    />
                  </Field>
                  <Field label="Nombre de chambres / pièces">
                    <input
                      type="number"
                      min={0}
                      value={form.rooms}
                      onChange={(e) => update("rooms", e.target.value)}
                      placeholder="ex. 45"
                      className="input-kan"
                    />
                  </Field>
                </div>
                <Field label="Notes additionnelles (optionnel)" className="mt-8">
                  <textarea
                    rows={3}
                    value={form.notes}
                    onChange={(e) => update("notes", e.target.value)}
                    placeholder="Contraintes, délais, style recherché…"
                    className="input-kan resize-none"
                  />
                </Field>
              </div>
            )}

            {/* ÉTAPE 2 — Collections */}
            {step === 2 && (
              <div>
                <StepTitle n="03" title="Quelles collections vous intéressent ?" />
                <p className="text-sm text-[var(--color-espresso)]/60 mt-3">
                  Sélection multiple — choisissez tout ce qui s'applique.
                </p>
                <div className="grid sm:grid-cols-2 gap-3 mt-10">
                  {COLLECTIONS.map((c) => {
                    const active = form.collections.includes(c);
                    return (
                      <button
                        key={c}
                        onClick={() => toggleCollection(c)}
                        className={cn(
                          "flex items-center gap-3 p-4 rounded-sm border text-left transition-all",
                          active
                            ? "border-[var(--color-bordeaux)] bg-[var(--color-bordeaux)]/5"
                            : "border-[var(--color-espresso)]/12 hover:border-[var(--color-espresso)]/40"
                        )}
                      >
                        <span
                          className={cn(
                            "w-5 h-5 rounded-sm border grid place-items-center transition-colors",
                            active
                              ? "bg-[var(--color-bordeaux)] border-[var(--color-bordeaux)]"
                              : "border-[var(--color-espresso)]/30"
                          )}
                        >
                          {active && <Check size={12} className="text-[var(--color-cream)]" />}
                        </span>
                        <span className="text-sm">{c}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ÉTAPE 3 — Coordonnées */}
            {step === 3 && (
              <div>
                <StepTitle n="04" title="Vos coordonnées" />
                <div className="grid sm:grid-cols-2 gap-6 mt-10">
                  <Field label="Société (optionnel)">
                    <input
                      value={form.company}
                      onChange={(e) => update("company", e.target.value)}
                      className="input-kan"
                      placeholder="Nom de la société"
                    />
                  </Field>
                  <Field label="Nom & prénom *">
                    <input
                      value={form.contactName}
                      onChange={(e) => update("contactName", e.target.value)}
                      className="input-kan"
                      placeholder="Votre nom"
                    />
                  </Field>
                  <Field label="Email *">
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      className="input-kan"
                      placeholder="vous@entreprise.com"
                    />
                  </Field>
                  <Field label="Téléphone (optionnel)">
                    <input
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      className="input-kan"
                      placeholder="+33 6 …"
                    />
                  </Field>
                </div>

                <div className="mt-8 border border-dashed border-[var(--color-espresso)]/20 rounded-sm p-8 text-center hover:border-[var(--color-bordeaux)]/50 transition-colors cursor-pointer">
                  <Upload size={20} className="mx-auto mb-3 text-[var(--color-espresso)]/50" />
                  <p className="text-sm text-[var(--color-espresso)]/70">
                    Glissez un plan ou moodboard (PDF, JPG, PNG — 10 Mo max)
                  </p>
                </div>
              </div>
            )}

            {/* ÉTAPE 4 — Récapitulatif */}
            {step === 4 && (
              <div>
                <StepTitle n="05" title="Récapitulatif de votre demande" />
                <div className="mt-10 border border-[var(--color-espresso)]/12 rounded-sm divide-y divide-[var(--color-espresso)]/10">
                  <SummaryRow label="Type d'établissement" value={VENUES.find((v) => v.id === form.venue)?.label ?? "—"} />
                  <SummaryRow label="Superficie" value={form.surface ? `${form.surface} m²` : "—"} />
                  <SummaryRow label="Pièces / chambres" value={form.rooms || "—"} />
                  <SummaryRow label="Collections" value={form.collections.join(", ") || "—"} />
                  <SummaryRow label="Société" value={form.company || "—"} />
                  <SummaryRow label="Contact" value={form.contactName || "—"} />
                  <SummaryRow label="Email" value={form.email || "—"} />
                  <SummaryRow label="Téléphone" value={form.phone || "—"} />
                  {form.notes && <SummaryRow label="Notes" value={form.notes} />}
                </div>

                <div className="mt-8 flex items-start gap-3 p-5 bg-[var(--color-bordeaux)]/5 border border-[var(--color-bordeaux)]/15 rounded-sm">
                  <Sparkles size={18} className="text-[var(--color-bordeaux)] shrink-0 mt-0.5" />
                  <p className="text-sm text-[var(--color-espresso)]/80">
                    Après envoi, notre équipe vous adressera un devis structuré
                    détaillé sous 48h ouvrées, accompagné d'une proposition de
                    sélection curatée.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="mt-12 flex items-center justify-between gap-4">
        <button
          onClick={prev}
          disabled={step === 0}
          className={cn(
            "inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] transition-opacity",
            step === 0 ? "opacity-30 cursor-not-allowed" : "hover:text-[var(--color-bordeaux)]"
          )}
        >
          <ArrowLeft size={16} /> Retour
        </button>

        {step < STEPS.length - 1 ? (
          <button
            onClick={next}
            disabled={!canNext()}
            className={cn(
              "inline-flex items-center gap-3 px-7 py-4 rounded-full text-[0.75rem] uppercase tracking-[0.2em] transition-all",
              canNext()
                ? "bg-[var(--color-bordeaux)] text-[var(--color-cream)] hover:bg-[var(--color-bordeaux-deep)]"
                : "bg-[var(--color-espresso)]/10 text-[var(--color-espresso)]/40 cursor-not-allowed"
            )}
          >
            Continuer <ArrowRight size={16} />
          </button>
        ) : (
          <button
            onClick={submit}
            className="inline-flex items-center gap-3 px-7 py-4 rounded-full text-[0.75rem] uppercase tracking-[0.2em] bg-[var(--color-bordeaux)] text-[var(--color-cream)] hover:bg-[var(--color-bordeaux-deep)] transition-colors"
          >
            Envoyer la demande <ArrowRight size={16} />
          </button>
        )}
      </div>

      {/* Styles utilitaires inline (Tailwind v4 @utility peut être utilisé en alternative) */}
      <style jsx global>{`
        .input-kan {
          width: 100%;
          padding: 0.9rem 1rem;
          background: transparent;
          border: 1px solid rgba(26, 26, 26, 0.15);
          border-radius: 2px;
          font-size: 0.95rem;
          color: var(--color-espresso);
          transition: border-color 200ms ease;
        }
        .input-kan:focus {
          outline: none;
          border-color: var(--color-bordeaux);
        }
        .input-kan::placeholder {
          color: rgba(26, 26, 26, 0.35);
        }
      `}</style>
    </div>
  );
}

/* -------------------- Sous-composants -------------------- */
function StepTitle({ n, title }: { n: string; title: string }) {
  return (
    <div>
      <p className="eyebrow mb-3">Étape {n}</p>
      <h2 className="font-serif text-3xl md:text-4xl">{title}</h2>
    </div>
  );
}

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="eyebrow block mb-3">{label}</span>
      {children}
    </label>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-3 px-6 py-4">
      <span className="eyebrow">{label}</span>
      <span className="text-sm text-right text-[var(--color-espresso)]/80 max-w-[60%]">
        {value}
      </span>
    </div>
  );
}