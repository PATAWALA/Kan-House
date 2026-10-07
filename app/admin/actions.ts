"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { OrderStatus, QuoteStatus } from "@/lib/supabase/types";

// ============================================
// AUTH GUARD
// ============================================
async function assertAuth() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  return supabase;
}

// ============================================
// HELPERS
// ============================================
function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function generateReference(prefix: string): string {
  const year = new Date().getFullYear();
  const random = Math.floor(10000 + Math.random() * 90000);
  return `KH-${prefix}-${year}-${random}`;
}

// ============================================
// PRODUITS
// ============================================

export async function createOrUpdateProduct(formData: FormData) {
  try {
    const supabase = await assertAuth();

    const id = formData.get("id") as string | null;
    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const price = formData.get("price") as string;
    const description = (formData.get("description") as string) || null;
    const long_description =
      (formData.get("long_description") as string) || null;
    const image = (formData.get("image") as string) || null;
    const featured = formData.get("featured") === "on";

    if (!name || !category || !price) {
      return { success: false, error: "Champs obligatoires manquants." };
    }

    const payload = {
      name,
      slug: slugify(name),
      category,
      price,
      description,
      long_description,
      image,
      featured,
    };

    let error;
    if (id) {
      ({ error } = await supabase.from("products").update(payload).eq("id", id));
    } else {
      ({ error } = await supabase.from("products").insert(payload));
    }

    if (error) {
      console.error("createOrUpdateProduct:", error);
      return { success: false, error: error.message };
    }

    revalidatePath("/admin/produits");
    revalidatePath("/collection");
    revalidatePath("/");

    return { success: true };
  } catch (e) {
    console.error(e);
    return { success: false, error: "Erreur serveur." };
  }
}

export async function deleteProduct(id: string) {
  try {
    const supabase = await assertAuth();
    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/admin/produits");
    revalidatePath("/collection");
    revalidatePath("/");

    return { success: true };
  } catch {
    return { success: false, error: "Erreur serveur." };
  }
}

// ============================================
// DEVIS B2B
// ============================================

export async function updateQuoteStatus(id: string, status: QuoteStatus) {
  try {
    const supabase = await assertAuth();
    const { error } = await supabase
      .from("quotes")
      .update({ status })
      .eq("id", id);

    if (error) return { success: false, error: error.message };

    revalidatePath("/admin/devis");
    revalidatePath(`/admin/devis/${id}`);
    revalidatePath("/admin");
    return { success: true };
  } catch {
    return { success: false, error: "Erreur serveur." };
  }
}

export async function deleteQuote(id: string) {
  try {
    const supabase = await assertAuth();
    const { error } = await supabase.from("quotes").delete().eq("id", id);

    if (error) return { success: false, error: error.message };

    revalidatePath("/admin/devis");
    revalidatePath("/admin");
    return { success: true };
  } catch {
    return { success: false, error: "Erreur serveur." };
  }
}

// ============================================
// COMMANDES B2C
// ============================================

export async function updateOrderStatus(id: string, status: OrderStatus) {
  try {
    const supabase = await assertAuth();
    const { error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", id);

    if (error) return { success: false, error: error.message };

    revalidatePath("/admin/commandes");
    revalidatePath(`/admin/commandes/${id}`);
    revalidatePath("/admin");
    return { success: true };
  } catch {
    return { success: false, error: "Erreur serveur." };
  }
}

export async function deleteOrder(id: string) {
  try {
    const supabase = await assertAuth();
    const { error } = await supabase.from("orders").delete().eq("id", id);

    if (error) return { success: false, error: error.message };

    revalidatePath("/admin/commandes");
    revalidatePath("/admin");
    return { success: true };
  } catch {
    return { success: false, error: "Erreur serveur." };
  }
}

// ============================================
// PROJETS
// ============================================

export async function createOrUpdateProject(formData: FormData) {
  try {
    const supabase = await assertAuth();

    const id = formData.get("id") as string | null;
    const title = formData.get("title") as string;
    const category = (formData.get("category") as string) || null;
    const location = (formData.get("location") as string) || null;
    const year = (formData.get("year") as string) || null;
    const surface = (formData.get("surface") as string) || null;
    const description = (formData.get("description") as string) || null;
    const image = (formData.get("image") as string) || null;
    const featured = formData.get("featured") === "on";

    if (!title) {
      return { success: false, error: "Titre obligatoire." };
    }

    const payload = {
      title,
      slug: slugify(title),
      category,
      location,
      year,
      surface,
      description,
      image,
      featured,
    };

    let error;
    if (id) {
      ({ error } = await supabase.from("projects").update(payload).eq("id", id));
    } else {
      ({ error } = await supabase.from("projects").insert(payload));
    }

    if (error) return { success: false, error: error.message };

    revalidatePath("/admin/projets");
    revalidatePath("/projects");
    revalidatePath("/");
    return { success: true };
  } catch {
    return { success: false, error: "Erreur serveur." };
  }
}

export async function deleteProject(id: string) {
  try {
    const supabase = await assertAuth();
    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) return { success: false, error: error.message };

    revalidatePath("/admin/projets");
    revalidatePath("/projects");
    return { success: true };
  } catch {
    return { success: false, error: "Erreur serveur." };
  }
}

// ============================================
// RESSOURCES DIGITALES
// ============================================

export async function createOrUpdateResource(formData: FormData) {
  try {
    const supabase = await assertAuth();

    const id = formData.get("id") as string | null;
    const title = formData.get("title") as string;
    const category = (formData.get("category") as string) || null;
    const price = formData.get("price") as string;
    const description = (formData.get("description") as string) || null;
    const format = (formData.get("format") as string) || null;
    const badge = (formData.get("badge") as string) || null;
    const image = (formData.get("image") as string) || null;
    const file_url = (formData.get("file_url") as string) || null;

    if (!title || !price) {
      return { success: false, error: "Titre et prix obligatoires." };
    }

    const payload = {
      title,
      slug: slugify(title),
      category,
      price,
      description,
      format,
      badge,
      image,
      file_url,
    };

    let error;
    if (id) {
      ({ error } = await supabase
        .from("resources")
        .update(payload)
        .eq("id", id));
    } else {
      ({ error } = await supabase.from("resources").insert(payload));
    }

    if (error) return { success: false, error: error.message };

    revalidatePath("/admin/ressources");
    revalidatePath("/ressources");
    return { success: true };
  } catch {
    return { success: false, error: "Erreur serveur." };
  }
}

export async function deleteResource(id: string) {
  try {
    const supabase = await assertAuth();
    const { error } = await supabase.from("resources").delete().eq("id", id);

    if (error) return { success: false, error: error.message };

    revalidatePath("/admin/ressources");
    revalidatePath("/ressources");
    return { success: true };
  } catch {
    return { success: false, error: "Erreur serveur." };
  }
}

// ============================================
// PARAMÈTRES
// ============================================

export async function updateSettings(formData: FormData) {
  try {
    const supabase = await assertAuth();

    const key = formData.get("key") as string;
    const value = formData.get("value") as string;

    if (!key) return { success: false, error: "Clé manquante." };

    const { error } = await supabase
      .from("settings")
      .upsert({
        key,
        value: { text: value },
        updated_at: new Date().toISOString(),
      });

    if (error) return { success: false, error: error.message };

    revalidatePath("/admin/parametres");
    return { success: true };
  } catch {
    return { success: false, error: "Erreur serveur." };
  }
}

// ============================================
// AUTH — LOGOUT
// ============================================

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

// ============================================
// CATÉGORIES
// ============================================

export async function createOrUpdateCategory(formData: FormData) {
  try {
    const supabase = await assertAuth();

    const id = formData.get("id") as string | null;
    const name = (formData.get("name") as string)?.trim();
    const description = (formData.get("description") as string)?.trim() || null;
    const position = Number(formData.get("position") || 0);

    if (!name) {
      return { success: false, error: "Le nom est obligatoire." };
    }

    const payload = {
      name,
      slug: slugify(name),
      description,
      position,
    };

    let error;
    if (id) {
      ({ error } = await supabase
        .from("categories")
        .update(payload)
        .eq("id", id));
    } else {
      ({ error } = await supabase.from("categories").insert(payload));
    }

    if (error) {
      // Message plus clair si le slug existe déjà
      if (error.code === "23505") {
        return {
          success: false,
          error: "Une catégorie avec ce nom existe déjà.",
        };
      }
      return { success: false, error: error.message };
    }

    revalidatePath("/admin/categories");
    revalidatePath("/collection");
    return { success: true };
  } catch {
    return { success: false, error: "Erreur serveur." };
  }
}

export async function deleteCategory(id: string) {
  try {
    const supabase = await assertAuth();
    const { error } = await supabase.from("categories").delete().eq("id", id);

    if (error) {
      // Si la catégorie est utilisée par des produits
      if (error.code === "23503") {
        return {
          success: false,
          error: "Cette catégorie est utilisée par des produits.",
        };
      }
      return { success: false, error: error.message };
    }

    revalidatePath("/admin/categories");
    revalidatePath("/collection");
    return { success: true };
  } catch {
    return { success: false, error: "Erreur serveur." };
  }
}

// ============================================
// GESTION DES UTILISATEURS ADMIN
// ============================================

import { createAdminClient } from "@/lib/supabase/admin";

export type AdminUser = {
  id: string;
  email: string | null;
  name: string | null;
  created_at: string;
  last_sign_in_at: string | null;
};

/**
 * Liste tous les utilisateurs admin
 */
export async function getAdminUsers(): Promise<AdminUser[]> {
  try {
    await assertAuth(); // Vérifie que l'appelant est bien connecté

    const adminClient = createAdminClient();
    const { data, error } = await adminClient.auth.admin.listUsers({
      perPage: 1000,
    });

    if (error) {
      console.error("getAdminUsers:", error);
      return [];
    }

    return data.users.map((u) => ({
      id: u.id,
      email: u.email ?? null,
      name:
        u.user_metadata?.full_name ??
        u.user_metadata?.name ??
        u.email?.split("@")[0] ??
        null,
      created_at: u.created_at,
      last_sign_in_at: u.last_sign_in_at ?? null,
    }));
  } catch (e) {
    console.error("getAdminUsers error:", e);
    return [];
  }
}

/**
 * Crée un nouvel utilisateur admin
 */
export async function createAdminUser(formData: FormData) {
  try {
    await assertAuth();

    const email = (formData.get("email") as string)?.trim().toLowerCase();
    const password = formData.get("password") as string;
    const fullName = (formData.get("name") as string)?.trim();

    // Validation
    if (!email || !email.includes("@")) {
      return { success: false, error: "Email invalide." };
    }
    if (!password || password.length < 8) {
      return {
        success: false,
        error: "Le mot de passe doit contenir au moins 8 caractères.",
      };
    }
    if (!fullName) {
      return { success: false, error: "Le nom est obligatoire." };
    }

    const adminClient = createAdminClient();

    const { data, error } = await adminClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: fullName,
        name: fullName,
        role: "admin",
      },
    });

    if (error) {
      // Message plus clair si l'email existe déjà
      if (
        error.message.toLowerCase().includes("already") ||
        error.message.toLowerCase().includes("registered")
      ) {
        return {
          success: false,
          error: "Un compte avec cet email existe déjà.",
        };
      }
      return { success: false, error: error.message };
    }

    revalidatePath("/admin/parametres");
    return { success: true, userId: data.user.id };
  } catch (e) {
    console.error("createAdminUser error:", e);
    return { success: false, error: "Erreur serveur." };
  }
}

/**
 * Met à jour un utilisateur (nom et/ou mot de passe)
 */
export async function updateAdminUser(formData: FormData) {
  try {
    await assertAuth();

    const id = formData.get("id") as string;
    const fullName = (formData.get("name") as string)?.trim();
    const password = formData.get("password") as string;

    if (!id) {
      return { success: false, error: "Identifiant manquant." };
    }

    const updates: Record<string, any> = {};

    if (fullName) {
      updates.user_metadata = {
        full_name: fullName,
        name: fullName,
        role: "admin",
      };
    }

    if (password && password.length >= 8) {
      updates.password = password;
    } else if (password && password.length > 0) {
      return {
        success: false,
        error: "Le mot de passe doit contenir au moins 8 caractères.",
      };
    }

    if (Object.keys(updates).length === 0) {
      return { success: false, error: "Aucune modification." };
    }

    const adminClient = createAdminClient();
    const { error } = await adminClient.auth.admin.updateUserById(id, updates);

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/admin/parametres");
    return { success: true };
  } catch (e) {
    console.error("updateAdminUser error:", e);
    return { success: false, error: "Erreur serveur." };
  }
}

/**
 * Supprime un utilisateur admin
 */
export async function deleteAdminUser(id: string) {
  try {
    const supabase = await assertAuth();
    const {
      data: { user: currentUser },
    } = await supabase.auth.getUser();

    // Empêche l'utilisateur de se supprimer lui-même
    if (currentUser?.id === id) {
      return {
        success: false,
        error: "Vous ne pouvez pas supprimer votre propre compte.",
      };
    }

    const adminClient = createAdminClient();
    const { error } = await adminClient.auth.admin.deleteUser(id);

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/admin/parametres");
    return { success: true };
  } catch (e) {
    console.error("deleteAdminUser error:", e);
    return { success: false, error: "Erreur serveur." };
  }
}