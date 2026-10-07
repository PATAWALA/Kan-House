"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Pré-remplir l'email si déjà saisi précédemment
  useEffect(() => {
    const saved = localStorage.getItem("kan-admin-last-email");
    if (saved) setEmail(saved);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    if (signInError) {
      // Message plus clair selon l'erreur
      if (signInError.message.includes("Invalid login")) {
        setError("Email ou mot de passe incorrect.");
      } else if (signInError.message.includes("Email not confirmed")) {
        setError("Votre email n'a pas été confirmé.");
      } else {
        setError(signInError.message);
      }
      setLoading(false);
      return;
    }

    // Sauvegarde l'email pour la prochaine fois
    localStorage.setItem("kan-admin-last-email", email.trim().toLowerCase());

    router.push(redirectTo);
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[var(--color-cafe-light)] flex flex-col">

      {/* Header minimal avec retour */}
      <header className="flex items-center justify-between p-5 lg:p-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2
                     text-[0.72rem] font-medium uppercase tracking-[0.2em]
                     text-[var(--color-espresso)]/55
                     hover:text-[var(--color-espresso)]
                     transition-colors group"
        >
          <ArrowLeft
            size={14}
            className="transition-transform group-hover:-translate-x-0.5"
          />
          Retour au site
        </Link>

        <div className="flex flex-col items-end leading-none">
          <span className="text-[0.85rem] font-medium tracking-[0.14em]
                           text-[var(--color-espresso)]">
            KAN HOUSE
          </span>
          <span className="text-[0.45rem] tracking-[0.28em]
                           text-[var(--color-espresso)]/40 mt-1">
            ADMINISTRATION
          </span>
        </div>
      </header>

      {/* Formulaire centré */}
      <div className="flex-1 flex items-center justify-center px-5 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md"
        >
          {/* Titre */}
          <div className="mb-8">
            <p className="text-[0.62rem] font-medium uppercase tracking-[0.24em]
                          text-[var(--color-espresso)]/45 mb-3">
              Espace administration
            </p>
            <h1 className="text-[1.65rem] lg:text-[1.85rem] font-normal
                           leading-[1.15] tracking-[-0.02em]
                           text-[var(--color-espresso)]">
              Connexion
            </h1>
            <p className="text-[0.88rem] text-[var(--color-espresso)]/55 mt-2">
              Accédez au tableau de bord Kan House.
            </p>
          </div>

          {/* Carte formulaire */}
          <div
            className="bg-white p-6 lg:p-7"
            style={{ border: "1px solid var(--color-border-line)" }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email */}
              <div>
                <label className="block text-[0.65rem] font-medium uppercase
                                  tracking-[0.2em] text-[var(--color-espresso)]/55 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail
                    size={15}
                    strokeWidth={1.5}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2
                               text-[var(--color-espresso)]/40 pointer-events-none"
                  />
                  <input
                    type="email"
                    required
                    autoFocus
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vous@kanhouse.com"
                    className="w-full pl-10 pr-4 py-3 bg-transparent
                               text-[0.92rem] text-[var(--color-espresso)]
                               placeholder:text-[var(--color-espresso)]/35
                               outline-none transition-colors
                               focus:border-[var(--color-espresso)]"
                    style={{ border: "1px solid var(--color-border-line)" }}
                  />
                </div>
              </div>

              {/* Mot de passe */}
              <div>
                <label className="block text-[0.65rem] font-medium uppercase
                                  tracking-[0.2em] text-[var(--color-espresso)]/55 mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock
                    size={15}
                    strokeWidth={1.5}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2
                               text-[var(--color-espresso)]/40 pointer-events-none"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-11 py-3 bg-transparent
                               text-[0.92rem] text-[var(--color-espresso)]
                               placeholder:text-[var(--color-espresso)]/35
                               outline-none transition-colors
                               focus:border-[var(--color-espresso)]"
                    style={{ border: "1px solid var(--color-border-line)" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Masquer" : "Afficher"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1
                               text-[var(--color-espresso)]/40
                               hover:text-[var(--color-espresso)]
                               transition-colors"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {/* Erreur */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-2.5 px-3.5 py-3
                             bg-red-50 text-red-800"
                  style={{ border: "1px solid rgba(239, 68, 68, 0.2)" }}
                >
                  <AlertCircle
                    size={14}
                    strokeWidth={2}
                    className="shrink-0 mt-0.5"
                  />
                  <p className="text-[0.82rem] leading-[1.5]">{error}</p>
                </motion.div>
              )}

              {/* Bouton */}
              <button
                type="submit"
                disabled={loading}
                className="group w-full inline-flex items-center justify-center gap-2
                           bg-[var(--color-espresso)] text-[var(--color-cafe-light)]
                           px-5 py-3.5
                           text-[0.72rem] font-medium uppercase tracking-[0.22em]
                           hover:bg-[var(--color-bordeaux)]
                           disabled:opacity-50 disabled:cursor-not-allowed
                           transition-colors"
              >
                {loading ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-current
                                     border-t-transparent rounded-full animate-spin" />
                    Connexion…
                  </>
                ) : (
                  <>
                    Se connecter
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Aide */}
          <p className="text-[0.78rem] text-[var(--color-espresso)]/45
                        mt-6 text-center leading-[1.6]">
            Mot de passe oublié ? Contactez un administrateur
            <br />
            pour le réinitialiser.
          </p>
        </motion.div>
      </div>

      {/* Footer discret */}
      <footer className="py-5 text-center">
        <p className="text-[0.68rem] uppercase tracking-[0.24em]
                      text-[var(--color-espresso)]/30">
          Paris · Shanghai — Est. 2019
        </p>
      </footer>
    </div>
  );
}