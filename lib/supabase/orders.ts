import { createClient } from "@/lib/supabase/server";
import type { OrderRow, OrderInsert, OrderStatus } from "./types";

// ============================================
// LECTURE (admin)
// ============================================

export async function getOrders(): Promise<OrderRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getOrders:", error);
    return [];
  }
  return (data ?? []) as OrderRow[];
}

export async function getOrderById(id: string): Promise<OrderRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data as OrderRow;
}

// ============================================
// ÉCRITURE PUBLIQUE (depuis le checkout)
// ============================================

export async function createOrder(
  order: Omit<OrderInsert, "reference">
): Promise<OrderRow | null> {
  const supabase = await createClient();

  const year = new Date().getFullYear();
  const random = Math.floor(10000 + Math.random() * 90000);
  const reference = `KH-O-${year}-${random}`;

  const { data, error } = await supabase
    .from("orders")
    .insert({ ...order, reference })
    .select()
    .single();

  if (error) {
    console.error("createOrder:", error);
    return null;
  }
  return data as OrderRow;
}

// ============================================
// MISE À JOUR STATUT (admin)
// ============================================

export async function updateOrderStatus(
  id: string,
  status: OrderStatus
): Promise<boolean> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", id);

  if (error) {
    console.error("updateOrderStatus:", error);
    return false;
  }
  return true;
}