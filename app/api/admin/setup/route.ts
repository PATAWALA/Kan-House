import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );

  const email = "chinawitha@hotmail.com";
  const password = "KanHouse2026!";

  // 1. Récupérer l'utilisateur existant
  const { data: list } = await supabase.auth.admin.listUsers();
  const existing = list?.users.find((u) => u.email === email);

  if (existing) {
    // 2a. Mettre à jour le mot de passe
    const { data, error } = await supabase.auth.admin.updateUserById(
      existing.id,
      {
        password,
        email_confirm: true,
      }
    );

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      ok: true,
      action: "updated",
      message: `Mot de passe mis à jour pour ${email}`,
      user_id: data.user.id,
    });
  }

  // 2b. Créer un nouvel utilisateur
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    action: "created",
    message: `Compte créé pour ${email}`,
    user_id: data.user.id,
  });
}