"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError("Identifiants incorrects.");
      setLoading(false);
      return;
    }

    router.push(redirectTo);
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[var(--color-cafe-light)] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">

        {/* En-tête */}
        <div className="text-center mb-10">
          <p className="text-[0.55rem] font-medium uppercase tracking-[0.28em]
                        text-[var(--color-espresso)]/40 mb-3">
            Kan House
          </p>
          <h1 className="text-[1.25rem] font-normal text-[var(--color-espresso)]">
            Espace administration
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            required
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-3 bg-transparent
                       text-[0.95rem] text-[var(--color-espresso)]
                       placeholder:text-[var(--color-espresso)]/35
                       outline-none focus:border-[var(--color-espresso)]/60
                       transition-colors"
            style={{ border: "1px solid var(--color-border-line)" }}
          />

          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            className="w-full px-4 py-3 bg-transparent
                       text-[0.95rem] text-[var(--color-espresso)]
                       placeholder:text-[var(--color-espresso)]/35
                       outline-none focus:border-[var(--color-espresso)]/60
                       transition-colors"
            style={{ border: "1px solid var(--color-border-line)" }}
          />

          {error && (
            <p className="text-[0.82rem] text-[var(--color-bordeaux)]">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--color-espresso)] text-[var(--color-cafe-light)]
                       py-3.5 text-[0.7rem] font-medium uppercase tracking-[0.22em]
                       hover:bg-[var(--color-bordeaux)]
                       transition-colors disabled:opacity-50"
          >
            {loading ? "Connexion…" : "Se connecter"}
          </button>
        </form>

        <div className="text-center mt-10">
          <a
            href="/"
            className="text-[0.65rem] uppercase tracking-[0.2em]
                       text-[var(--color-espresso)]/45
                       underline underline-offset-[5px]
                       hover:text-[var(--color-espresso)] transition-colors"
          >
            ← Retour au site
          </a>
        </div>
      </div>
    </div>
  );
}