import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// ⚠️ Route publique — utilise la clé anon (pas service_role)
// La policy RLS "Public insert quotes" autorise l'insertion

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validation minimale
    if (!body.email || !body.contact_name) {
      return NextResponse.json(
        { error: "Email et nom requis" },
        { status: 400 }
      );
    }

    // Client Supabase avec la clé anon (respecte RLS)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // Génère une référence
    const year = new Date().getFullYear();
    const random = Math.floor(1000 + Math.random() * 9000);
    const reference = `KH-Q-${year}-${random}`;

    const { data, error } = await supabase
      .from("quotes")
      .insert({
        reference,
        venue_type: body.venue_type ?? null,
        surface: body.surface ?? null,
        rooms: body.rooms ?? null,
        collections: body.collections ?? [],
        company: body.company ?? null,
        contact_name: body.contact_name,
        email: body.email,
        phone: body.phone ?? null,
        notes: body.notes ?? null,
      })
      .select()
      .single();

    if (error) {
      console.error("insert quote error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ ok: true, reference, quote: data });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}