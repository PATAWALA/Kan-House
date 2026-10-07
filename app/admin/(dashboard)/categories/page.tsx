import { createClient } from "@/lib/supabase/server";
import CategoriesManager from "@/components/admin/CategoriesManager";
import type { CategoryRow } from "@/lib/supabase/types";

export const metadata = {
  title: "Catégories — Admin Kan House",
};

async function getCategoriesWithCounts() {
  const supabase = await createClient();

  const [categoriesRes, productsRes] = await Promise.all([
    supabase.from("categories").select("*").order("position", { ascending: true }),
    supabase.from("products").select("category"),
  ]);

  const categories = (categoriesRes.data ?? []) as CategoryRow[];
  const products = productsRes.data ?? [];

  const counts: Record<string, number> = {};
  products.forEach((p: any) => {
    if (p.category) {
      counts[p.category] = (counts[p.category] ?? 0) + 1;
    }
  });

  return categories.map((c) => ({
    ...c,
    productsCount: counts[c.name] ?? 0,
  }));
}

export default async function AdminCategoriesPage() {
  const categories = await getCategoriesWithCounts();

  return (
    <div className="max-w-[1400px]">
      {/* En-tête */}
      <div className="mb-6">
        <p className="text-[0.62rem] font-medium uppercase tracking-[0.24em]
                      text-[var(--color-espresso)]/45 mb-1">
          Catalogue
        </p>
        <h1 className="text-[1.35rem] lg:text-[1.5rem] font-normal
                       text-[var(--color-espresso)]">
          Catégories
        </h1>
        <p className="text-[0.85rem] text-[var(--color-espresso)]/55 mt-1">
          Les catégories organisent le catalogue et les filtres de la page Collection.
        </p>
      </div>

      <CategoriesManager categories={categories} />
    </div>
  );
}