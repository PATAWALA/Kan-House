import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileTabBar from "@/components/layout/MobileTabBar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="pb-16 lg:pb-0">{children}</main>
      <Footer />
      <MobileTabBar />
    </>
  );
}