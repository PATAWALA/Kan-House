"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

function getUserName(user: User | null): string {
  if (!user) return "";
  const meta = user.user_metadata || {};
  return (
    meta.full_name ||
    meta.name ||
    meta.display_name ||
    user.email?.split("@")[0] ||
    ""
  );
}

function getFirstName(user: User | null): string {
  const full = getUserName(user);
  if (!full) return "";
  return full.split(" ")[0];
}

function getGreeting(hour: number): string {
  if (hour < 5) return "Bonne nuit";
  if (hour < 12) return "Bonjour";
  if (hour < 18) return "Bon après-midi";
  if (hour < 22) return "Bonsoir";
  return "Bonne nuit";
}

export default function DashboardGreeting() {
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  // Évite le mismatch SSR/CSR
  if (!mounted) {
    return (
      <div className="mb-8">
        <p className="text-[0.62rem] font-medium uppercase tracking-[0.24em]
                      text-[var(--color-espresso)]/45 mb-2">
          Tableau de bord
        </p>
        <h1 className="text-[1.5rem] lg:text-[1.75rem] font-normal
                       text-[var(--color-espresso)]">
          &nbsp;
        </h1>
        <p className="text-[0.88rem] text-[var(--color-espresso)]/55 mt-1">
          &nbsp;
        </p>
      </div>
    );
  }

  const now = new Date();
  const hour = now.getHours();
  const greeting = getGreeting(hour);
  const firstName = getFirstName(user);

  const dateLabel = new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(now);

  // Capitalise la première lettre
  const formattedDate = dateLabel.charAt(0).toUpperCase() + dateLabel.slice(1);

  return (
    <div className="mb-8">
      <p className="text-[0.62rem] font-medium uppercase tracking-[0.24em]
                    text-[var(--color-espresso)]/45 mb-2">
        Tableau de bord
      </p>
      <h1 className="text-[1.5rem] lg:text-[1.75rem] font-normal
                     text-[var(--color-espresso)]">
        {greeting}
        {firstName ? `, ${firstName}` : ""} 👋
      </h1>
      <p className="text-[0.88rem] text-[var(--color-espresso)]/55 mt-1">
        {formattedDate}
      </p>
    </div>
  );
}