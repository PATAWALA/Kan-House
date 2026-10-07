"use client";

import { useState } from "react";
import {
  Search,
  Pencil,
  Trash2,
  X,
  User as UserIcon,
  Shield,
  Clock,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { useToast } from "@/lib/store/toast";
import { deleteAdminUser, type AdminUser } from "@/app/admin/actions";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

export default function UsersTable({
  users,
  currentUserId,
  onEdit,
}: {
  users: AdminUser[];
  currentUserId: string;
  onEdit: (user: AdminUser) => void;
}) {
  const toast = useToast();
  const [search, setSearch] = useState("");
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    user?: AdminUser;
  }>({ open: false });
  const [deleting, setDeleting] = useState(false);
  const [localUsers, setLocalUsers] = useState(users);

  const filtered = localUsers.filter((u) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      u.email?.toLowerCase().includes(q) ||
      u.name?.toLowerCase().includes(q)
    );
  });

  const handleDeleteClick = (user: AdminUser) => {
    setDeleteDialog({ open: true, user });
  };

  const confirmDelete = async () => {
    if (!deleteDialog.user) return;
    setDeleting(true);

    try {
      const result = await deleteAdminUser(deleteDialog.user.id);
      if (!result.success) throw new Error(result.error);

      setLocalUsers((prev) =>
        prev.filter((u) => u.id !== deleteDialog.user!.id)
      );
      toast.success("Utilisateur supprimé", deleteDialog.user.email ?? "");
      setDeleteDialog({ open: false });
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Erreur lors de la suppression"
      );
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (date: string | null) => {
    if (!date) return "Jamais";
    return new Date(date).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <>
      {/* Recherche */}
      <div className="relative mb-4 w-full sm:max-w-md">
        <Search
          size={15}
          strokeWidth={1.5}
          className="absolute left-3 top-1/2 -translate-y-1/2
                     text-[var(--color-espresso)]/40 pointer-events-none"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher un utilisateur…"
          className="w-full pl-9 pr-9 py-2.5 bg-transparent text-[0.85rem]
                     outline-none focus:border-[var(--color-espresso)]/50
                     transition-colors"
          style={{ border: "1px solid var(--color-border-line)" }}
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            aria-label="Effacer"
            className="absolute right-3 top-1/2 -translate-y-1/2
                       text-[var(--color-espresso)]/40
                       hover:text-[var(--color-espresso)] transition-colors"
          >
            <X size={13} />
          </button>
        )}
      </div>

      {/* Liste vide */}
      {filtered.length === 0 ? (
        <div
          className="py-12 text-center"
          style={{ border: "1px solid var(--color-border-line)" }}
        >
          <UserIcon
            size={28}
            strokeWidth={1.2}
            className="mx-auto mb-3 text-[var(--color-espresso)]/25"
          />
          <p className="text-[0.85rem] text-[var(--color-espresso)]/45 italic">
            {search ? "Aucun résultat." : "Aucun utilisateur."}
          </p>
        </div>
      ) : (
        <>
          {/* ============================================
              DESKTOP : Table classique
              ============================================ */}
          <div
            className="hidden md:block overflow-x-auto"
            style={{ border: "1px solid var(--color-border-line)" }}
          >
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: "var(--color-cafe-dark)" }}>
                  <th className="text-left text-[0.65rem] uppercase tracking-[0.2em]
                                 text-[var(--color-espresso)]/55 font-medium px-4 py-3">
                    Utilisateur
                  </th>
                  <th className="text-left text-[0.65rem] uppercase tracking-[0.2em]
                                 text-[var(--color-espresso)]/55 font-medium px-4 py-3">
                    Email
                  </th>
                  <th className="text-left text-[0.65rem] uppercase tracking-[0.2em]
                                 text-[var(--color-espresso)]/55 font-medium px-4 py-3">
                    Dernière connexion
                  </th>
                  <th className="text-right text-[0.65rem] uppercase tracking-[0.2em]
                                 text-[var(--color-espresso)]/55 font-medium px-4 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((user) => {
                  const isCurrent = user.id === currentUserId;
                  const initial = (
                    user.name?.[0] ??
                    user.email?.[0] ??
                    "?"
                  ).toUpperCase();

                  return (
                    <tr
                      key={user.id}
                      className="hover:bg-[var(--color-cafe-dark)]/30 transition-colors"
                      style={{
                        borderTop: "1px solid var(--color-border-line)",
                      }}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <span
                            className={cn(
                              "w-9 h-9 grid place-items-center rounded-full shrink-0",
                              "text-[0.78rem] font-medium uppercase",
                              isCurrent
                                ? "bg-[var(--color-bordeaux)] text-[var(--color-cafe-light)]"
                                : "bg-[var(--color-espresso)] text-[var(--color-cafe-light)]"
                            )}
                          >
                            {initial}
                          </span>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="text-[0.88rem] font-medium
                                            text-[var(--color-espresso)] truncate">
                                {user.name || "Sans nom"}
                              </p>
                              {isCurrent && (
                                <span className="inline-flex items-center gap-1
                                                 px-1.5 py-0.5 text-[0.55rem]
                                                 font-medium uppercase tracking-[0.14em]
                                                 bg-[var(--color-bordeaux)]/12
                                                 text-[var(--color-bordeaux)] shrink-0">
                                  <Shield size={9} strokeWidth={2.2} />
                                  Vous
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3 text-[0.82rem]
                                     text-[var(--color-espresso)]/70 truncate">
                        {user.email}
                      </td>

                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1.5
                                         text-[0.78rem] text-[var(--color-espresso)]/55">
                          <Clock size={11} strokeWidth={1.5} />
                          {formatDate(user.last_sign_in_at)}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => onEdit(user)}
                            aria-label="Éditer"
                            className="p-2 text-[var(--color-espresso)]/45
                                       hover:text-[var(--color-espresso)]
                                       hover:bg-[var(--color-cafe-dark)]
                                       transition-colors"
                          >
                            <Pencil size={14} strokeWidth={1.5} />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(user)}
                            disabled={isCurrent}
                            aria-label="Supprimer"
                            title={
                              isCurrent
                                ? "Vous ne pouvez pas supprimer votre propre compte"
                                : "Supprimer"
                            }
                            className={cn(
                              "p-2 transition-colors",
                              isCurrent
                                ? "text-[var(--color-espresso)]/20 cursor-not-allowed"
                                : "text-[var(--color-espresso)]/45 hover:text-red-600 hover:bg-red-500/10"
                            )}
                          >
                            <Trash2 size={14} strokeWidth={1.5} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* ============================================
              MOBILE : Cartes empilées
              ============================================ */}
          <ul
            className="md:hidden divide-y"
            style={{
              border: "1px solid var(--color-border-line)",
              borderColor: "var(--color-border-line)",
            }}
          >
            {filtered.map((user) => {
              const isCurrent = user.id === currentUserId;
              const initial = (
                user.name?.[0] ??
                user.email?.[0] ??
                "?"
              ).toUpperCase();

              return (
                <li
                  key={user.id}
                  className="p-4 space-y-3"
                  style={{ borderColor: "var(--color-border-line)" }}
                >
                  {/* Ligne 1 : Avatar + Nom + Badge */}
                  <div className="flex items-start gap-3">
                    <span
                      className={cn(
                        "w-10 h-10 grid place-items-center rounded-full shrink-0",
                        "text-[0.85rem] font-medium uppercase",
                        isCurrent
                          ? "bg-[var(--color-bordeaux)] text-[var(--color-cafe-light)]"
                          : "bg-[var(--color-espresso)] text-[var(--color-cafe-light)]"
                      )}
                    >
                      {initial}
                    </span>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-[0.9rem] font-medium
                                      text-[var(--color-espresso)] truncate">
                          {user.name || "Sans nom"}
                        </p>
                        {isCurrent && (
                          <span className="inline-flex items-center gap-1
                                           px-1.5 py-0.5 text-[0.55rem]
                                           font-medium uppercase tracking-[0.14em]
                                           bg-[var(--color-bordeaux)]/12
                                           text-[var(--color-bordeaux)]">
                            <Shield size={9} strokeWidth={2.2} />
                            Vous
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 mt-1
                                      text-[0.78rem] text-[var(--color-espresso)]/60 truncate">
                        <Mail size={11} strokeWidth={1.5} className="shrink-0" />
                        <span className="truncate">{user.email}</span>
                      </div>
                    </div>
                  </div>

                  {/* Ligne 2 : Dernière connexion */}
                  <div className="flex items-center gap-1.5 text-[0.75rem]
                                  text-[var(--color-espresso)]/55 pl-13">
                    <Clock size={11} strokeWidth={1.5} />
                    Dernière connexion : {formatDate(user.last_sign_in_at)}
                  </div>

                  {/* Ligne 3 : Actions */}
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => onEdit(user)}
                      className="flex-1 inline-flex items-center justify-center gap-2
                                 px-3 py-2.5 text-[0.72rem] font-medium uppercase
                                 tracking-[0.16em] text-[var(--color-espresso)]
                                 hover:bg-[var(--color-cafe-dark)]
                                 transition-colors"
                      style={{ border: "1px solid var(--color-border-line)" }}
                    >
                      <Pencil size={12} strokeWidth={1.8} />
                      Éditer
                    </button>

                    <button
                      onClick={() => handleDeleteClick(user)}
                      disabled={isCurrent}
                      className={cn(
                        "inline-flex items-center justify-centerw-10 h-10 transition-colors",
                        isCurrent
                          ? "text-[var(--color-espresso)]/20 cursor-not-allowed"
                          : "text-red-700 hover:bg-red-500/10"
                      )}
                      style={{ border: "1px solid var(--color-border-line)" }}
                      aria-label="Supprimer"
                    >
                      <Trash2 size={13} strokeWidth={1.8} />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      )}

      <ConfirmDialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false })}
        onConfirm={confirmDelete}
        loading={deleting}
        title={`Supprimer ${deleteDialog.user?.name ?? deleteDialog.user?.email} ?`}
        description="Cet utilisateur ne pourra plus accéder à l'espace d'administration. Cette action est irréversible."
        confirmLabel="Supprimer"
        variant="danger"
      />
    </>
  );
}