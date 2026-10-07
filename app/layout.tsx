import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Sora } from "next/font/google";
import "./globals.css";

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
  applicationName: "Kan House",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Kan House",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#4A1D1E" },
    { media: "(prefers-color-scheme: dark)", color: "#3B1415" },
  ],
  colorScheme: "light",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${sora.variable}`}>
      <body>{children}</body>
    </html>
  );
}