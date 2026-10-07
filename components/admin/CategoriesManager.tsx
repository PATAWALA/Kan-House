"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import CategoriesTable from "@/components/admin/CategoriesTable";
import CategoryModal from "@/components/admin/CategoryModal";
import type { CategoryRow } from "@/lib/supabase/types";

interface CategoryWithCount extends CategoryRow {
  productsCount: number;
}

export default function CategoriesManager({
  categories,
}: {
  categories: CategoryWithCount[];
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<CategoryRow | null>(null);

  // Écoute les événements d'édition depuis la table
  useEffect(() => {
    function handleEdit(e: Event) {
      const detail = (e as CustomEvent).detail as CategoryRow;
      setEditing(detail);
      setModalOpen(true);
    }
    window.addEventListener("open-category-edit", handleEdit);
    return () =>
      window.removeEventListener("open-category-edit", handleEdit);
  }, []);

  const handleCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setEditing(null);
  };

  return (
    <>
      <div className="flex items-center justify-end mb-4">
        <button
          onClick={handleCreate}
          className="inline-flex items-center gap-2
                     bg-[var(--color-espresso)] text-[var(--color-cafe-light)]
                     px-5 py-3 text-[0.72rem] font-medium uppercase tracking-[0.22em]
                     hover:bg-[var(--color-bordeaux)] transition-colors"
        >
          <Plus size={14} strokeWidth={2} />
          Nouvelle catégorie
        </button>
      </div>

      <CategoriesTable categories={categories} />

      <CategoryModal
        open={modalOpen}
        onClose={handleClose}
        initialData={editing}
      />
    </>
  );
}