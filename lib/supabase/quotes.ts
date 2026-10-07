import { createClient } from "@/lib/supabase/server";
import type { QuoteRow, QuoteInsert, QuoteStatus } from "./types";

// ============================================
// LECTURE (admin)
// ============================================

export async function getQuotes(): Promise<QuoteRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("quotes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getQuotes:", error);
    return [];
  }
  return (data ?? []) as QuoteRow[];
}

export async function getQuoteById(id: string): Promise<QuoteRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("quotes")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data as QuoteRow;
}

// ============================================
// ÉCRITURE PUBLIQUE (depuis le wizard)
// ============================================

export async function createQuote(
  quote: Omit<QuoteInsert, "reference">
): Promise<QuoteRow | null> {
  const supabase = await createClient();

  const year = new Date().getFullYear();
  const random = Math.floor(1000 + Math.random() * 9000);
  const reference = `KH-Q-${year}-${random}`;

  const { data, error } = await supabase
    .from("quotes")
    .insert({ ...quote, reference })
    .select()
    .single();

  if (error) {
    console.error("createQuote:", error);
    return null;
  }
  return data as QuoteRow;
}

// ============================================
// MISE À JOUR STATUT (admin)
// ============================================

export async function updateQuoteStatus(
  id: string,
  status: QuoteStatus
): Promise<boolean> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("quotes")
    .update({ status })
    .eq("id", id);

  if (error) {
    console.error("updateQuoteStatus:", error);
    return false;
  }
  return true;
}