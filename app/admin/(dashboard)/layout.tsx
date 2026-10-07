import AdminShell from "@/components/admin/AdminShell";

export const metadata = {
  title: "Admin — Kan House",
  description: "Espace d'administration Kan House",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}