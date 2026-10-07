import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

async function assertAuth() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  return supabase;
}

// ============================================
// POST — Créer ou mettre à jour un produit
// ============================================
export async function POST(request: Request) {
  try {
    const supabase = await assertAuth();
    const body = await request.json();

    // Validation basique
    if (!body.name || !body.slug || !body.category || !body.price) {
      return NextResponse.json(
        { error: "Champs obligatoires manquants" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("products")
      .upsert(body, { onConflict: "id" })
      .select()
      .single();

    if (error) {
      console.error("upsert error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

// ============================================
// DELETE — Supprimer un produit
// ============================================
export async function DELETE(request: Request) {
  try {
    const supabase = await assertAuth();
    const id = new URL(request.url).searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}