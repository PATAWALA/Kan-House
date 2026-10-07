import Sidebar from "@/components/admin/Sidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import MobileTabBar from "@/components/admin/MobileTabBar";
import MobileMenuDrawer from "@/components/admin/MobileMenuDrawer";

export const metadata = {
  title: "Admin — Kan House",
  description: "Espace d'administration Kan House",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--color-cafe-light)] flex">
      {/* Sidebar desktop */}
      <Sidebar />

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col lg:ml-64">
        <AdminHeader />
        <main className="flex-1 p-5 lg:p-10 pb-24 lg:pb-10">
          {children}
        </main>
      </div>

      {/* Tab bar mobile fixe en bas */}
      <MobileTabBar />

      {/* Menu complet mobile (ouvert depuis "Plus") */}
      <MobileMenuDrawer />
    </div>
  );
}