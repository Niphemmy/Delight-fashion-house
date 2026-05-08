import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fontDisplay, fontBody } from "./fonts";
import { ModalProvider } from "@/components/ModalProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyWhatsApp } from "@/components/StickyWhatsApp";
import { TwoStepCtaModal } from "@/components/TwoStepCtaModal";
import { ArchetypeModal } from "@/components/ArchetypeModal";
import { PixelLoader } from "@/components/PixelLoader";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Dé-light Fashion House — The woman they remember wears Dé-light.",
    template: "%s — Dé-light Fashion House",
  },
  description:
    "Ten years dressing Lagos executives, brides, and the women who walk into rooms and change them. Six hundred thousand women save these looks every month.",
  openGraph: {
    title: "Dé-light Fashion House",
    description: "Executive image architecture. Lagos, Nigeria.",
    type: "website",
    locale: "en_NG",
    siteName: "Dé-light Fashion House",
  },
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23B91D1D'/%3E%3Ctext x='16' y='23' font-family='Cormorant Garamond,serif' font-weight='600' font-size='22' fill='%23F5ECD7' text-anchor='middle' font-style='italic'%3ED%3C/text%3E%3C/svg%3E",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#1A2D5F",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fontDisplay.variable} ${fontBody.variable}`}>
      <body className="antialiased">
        <ModalProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <StickyWhatsApp />
          <TwoStepCtaModal />
          <ArchetypeModal />
          <PixelLoader />
        </ModalProvider>
      </body>
    </html>
  );
}
