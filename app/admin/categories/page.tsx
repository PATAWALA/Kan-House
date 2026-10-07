import { createClient } from "@/lib/supabase/server";
import CategoryForm from "@/components/admin/CategoryForm";
import type { CategoryRow } from "@/lib/supabase/types";

async function getCategories(): Promise<CategoryRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("position", { ascending: true });

  if (error) return [];
  return (data ?? []) as CategoryRow[];
}

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  return (
    <div>
      <p className="text-[0.85rem] text-[var(--color-espresso)]/55 mb-6">
        {categories.length} catégorie{categories.length > 1 ? "s" : ""}
      </p>

      <CategoryForm mode="create" />

      {categories.length > 0 && (
        <div className="overflow-x-auto" style={{ border: "1px solid var(--color-border-line)" }}>
          <table className="w-full min-w-[600px]">
            <thead>
              <tr style={{ backgroundColor: "var(--color-cafe-dark)" }}>
                <th className="text-left text-[0.65rem] uppercase tracking-[0.2em] text-[var(--color-espresso)]/55 font-medium px-4 py-3">Nom</th>
                <th className="text-left text-[0.65rem] uppercase tracking-[0.2em] text-[var(--color-espresso)]/55 font-medium px-4 py-3">Slug</th>
                <th className="text-left text-[0.65rem] uppercase tracking-[0.2em] text-[var(--color-espresso)]/55 font-medium px-4 py-3">Position</th>
                <th className="text-right text-[0.65rem] uppercase tracking-[0.2em] text-[var(--color-espresso)]/55 font-medium px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id} style={{ borderTop: "1px solid var(--color-border-line)" }}>
                  <td className="px-4 py-3 text-[0.85rem] text-[var(--color-espresso)]">{cat.name}</td>
                  <td className="px-4 py-3 text-[0.82rem] text-[var(--color-espresso)]/60 font-mono">{cat.slug}</td>
                  <td className="px-4 py-3 text-[0.82rem] text-[var(--color-espresso)]/60 tabular-nums">{cat.position}</td>
                  <td className="px-4 py-3 text-right">
                    <CategoryForm mode="edit" initialData={cat} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
   }