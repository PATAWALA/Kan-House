import Link from "next/link";
import { Plus } from "lucide-react";
import { getProducts } from "@/lib/supabase/products";
import ProductsTable from "@/components/admin/ProductsTable";

export default async function AdminProduitsPage() {
  const products = await getProducts();

  return (
    <div className="max-w-[1400px]">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between
                      gap-4 mb-6">
        <div>
          <p className="text-[0.62rem] font-medium uppercase tracking-[0.24em]
                        text-[var(--color-espresso)]/45 mb-1">
            Catalogue
          </p>
          <h1 className="text-[1.35rem] lg:text-[1.5rem] font-normal
                         text-[var(--color-espresso)]">
            Produits
          </h1>
        </div>

        <Link
          href="/admin/produits/nouveau"
          className="inline-flex items-center gap-2 shrink-0
                     bg-[var(--color-espresso)] text-[var(--color-cafe-light)]
                     px-5 py-3 text-[0.72rem] font-medium uppercase tracking-[0.22em]
                     hover:bg-[var(--color-bordeaux)] transition-colors"
        >
          <Plus size={14} strokeWidth={2} />
          Nouveau produit
        </Link>
      </div>

      {/* Table */}
      <ProductsTable products={products} />
    </div>
  );
}