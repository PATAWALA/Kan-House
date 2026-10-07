import { createClient } from "@/lib/supabase/server";
import type { CategoryRow, CategoryInsert } from "./types";

// ============================================
// LECTURE
// ============================================

export async function getCategories(): Promise<CategoryRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("position", { ascending: true });

  if (error) {
    console.error("getCategories:", error);
    return [];
  }
  return (data ?? []) as CategoryRow[];
}

export async function getCategoryById(id: string): Promise<CategoryRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data as CategoryRow;
}

// ============================================
// ÉCRITURE
// ============================================

export async function createCategory(
  category: CategoryInsert
): Promise<CategoryRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .insert(category)
    .select()
    .single();

  if (error) {
    console.error("createCategory:", error);
    return null;
  }
  return data as CategoryRow;
}

export async function updateCategory(
  id: string,
  updates: Partial<CategoryInsert>
): Promise<CategoryRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("updateCategory:", error);
    return null;
  }
  return data as CategoryRow;
}

export async function deleteCategory(id: string): Promise<boolean> {
  const supabase = await createClient();
  const { error } = await supabase.from("categories").delete().eq("id", id);
  return !error;
}