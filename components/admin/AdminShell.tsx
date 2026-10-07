"use client";

import { useAdminUIStore } from "@/lib/store/admin-ui";
import { cn } from "@/lib/cn";
import Sidebar from "@/components/admin/Sidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import MobileTabBar from "@/components/admin/MobileTabBar";
import MobileMenuDrawer from "@/components/admin/MobileMenuDrawer";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const collapsed = useAdminUIStore((s) => s.sidebarCollapsed);

  return (
    <div className="min-h-screen bg-[var(--color-cafe-light)] flex">
      <Sidebar />

      <div
        className={cn(
          "flex-1 flex flex-col transition-all duration-300",
          collapsed ? "lg:pl-[72px]" : "lg:pl-64"
        )}
      >
        <AdminHeader />
        <main className="flex-1 p-5 lg:p-8 pb-24 lg:pb-8">{children}</main>
      </div>

      <MobileTabBar />
      <MobileMenuDrawer />
    </div>
  );
}