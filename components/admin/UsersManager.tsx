"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import UsersTable from "@/components/admin/UsersTable";
import UserModal from "@/components/admin/UserModal";
import type { AdminUser } from "@/app/admin/actions";

export default function UsersManager({
  users,
  currentUserId,
}: {
  users: AdminUser[];
  currentUserId: string;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<AdminUser | null>(null);

  const handleCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const handleEdit = (user: AdminUser) => {
    setEditing(user);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setEditing(null);
  };

  return (
    <section
      className="p-4 lg:p-6"
      style={{ border: "1px solid var(--color-border-line)" }}
    >
      {/* En-tête — empilé sur mobile, en ligne sur desktop */}
      <header className="flex flex-col gap-3 mb-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h2 className="text-[0.95rem] lg:text-[1rem] font-medium
                         text-[var(--color-espresso)]">
            Utilisateurs admin
          </h2>
          <p className="text-[0.78rem] lg:text-[0.82rem]
                        text-[var(--color-espresso)]/55 mt-0.5">
            {users.length} utilisateur{users.length > 1 ? "s" : ""} avec accès
            à l'administration
          </p>
        </div>

        <button
          onClick={handleCreate}
          className="inline-flex items-center justify-center gap-2 shrink-0
                     self-start sm:self-auto
                     bg-[var(--color-espresso)] text-[var(--color-cafe-light)]
                     px-4 py-2.5 text-[0.68rem] font-medium uppercase tracking-[0.2em]
                     hover:bg-[var(--color-bordeaux)] transition-colors"
        >
          <Plus size={13} strokeWidth={2} />
          Ajouter un utilisateur
        </button>
      </header>

      {/* Table */}
      <UsersTable
        users={users}
        currentUserId={currentUserId}
        onEdit={handleEdit}
      />

      {/* Modale */}
      <UserModal
        open={modalOpen}
        onClose={handleClose}
        initialData={editing}
      />
    </section>
  );
}