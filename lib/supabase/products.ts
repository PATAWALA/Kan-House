import { createClient } from "@/lib/supabase/server";
import type { ProductRow, ProductInsert } from "./types";

// ============================================
// LECTURE
// ============================================

export async function getProducts(): Promise<ProductRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getProducts:", error);
    return [];
  }
  return (data ?? []) as ProductRow[];
}

export async function getProductById(id: string): Promise<ProductRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data as ProductRow;
}

export async function getProductBySlug(slug: string): Promise<ProductRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data as ProductRow;
}

// ============================================
// ÉCRITURE
// ============================================

export async function createProduct(
  product: ProductInsert
): Promise<ProductRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .insert(product)
    .select()
    .single();

  if (error) {
    console.error("createProduct:", error);
    return null;
  }
  return data as ProductRow;
}

export async function updateProduct(
  id: string,
  updates: Partial<ProductInsert>
): Promise<ProductRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("updateProduct:", error);
    return null;
  }
  return data as ProductRow;
}

export async function deleteProduct(id: string): Promise<boolean> {
  const supabase = await createClient();
  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    console.error("deleteProduct:", error);
    return false;
  }
  return true;
}

// ============================================
// HELPERS
// ============================================

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}