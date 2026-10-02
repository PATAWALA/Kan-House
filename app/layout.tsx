import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Sora } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Kan House — FF&E & Hospitality Sourcing",
  description:
    "Sourcing d'exception entre la Chine, la France et l'international.",
  // Empêche le zoom automatique et améliore le rendu sur mobile
  applicationName: "Kan House",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Kan House",
  },
};

// ⬇️ Viewport — contrôle la barre d'adresse mobile
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    // Sur mobile : la barre d'adresse est bordeaux
    { media: "(prefers-color-scheme: light)", color: "#4A1D1E" },
    { media: "(prefers-color-scheme: dark)", color: "#3B1415" },
  ],
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${sora.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}