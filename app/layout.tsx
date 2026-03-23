import type { Metadata } from "next";
import { Inter, Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LanguageProvider } from "@/lib/LanguageContext";
import { readProfile } from "@/lib/readProfile";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const syne = Syne({ subsets: ["latin"], weight: ["700", "800"], variable: "--font-display" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });

const profile = readProfile();

export const metadata: Metadata = {
  title: `${profile.name} — Portfolio`,
  description: profile.bio,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} ${syne.variable} ${jetbrainsMono.variable} font-sans bg-surface-base text-white`}>
        <LanguageProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
