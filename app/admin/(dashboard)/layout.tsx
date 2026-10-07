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
      <Sidebar />

      {/* Le padding gauche reste fixe à 72px (sidebar collapsed) sur lg */}
      <div className="flex-1 flex flex-col lg:pl-[72px]">
        <AdminHeader />
        <main className="flex-1 p-5 lg:p-8 pb-24 lg:pb-8">
          {children}
        </main>
      </div>

      <MobileTabBar />
      <MobileMenuDrawer />
    </div>
  );
}