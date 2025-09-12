import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LanguageProvider } from "@/lib/LanguageContext";
import { readProfile } from "@/lib/readProfile";

const inter = Inter({ subsets: ["latin"] });

const profile = readProfile();

export const metadata: Metadata = {
  title: `${profile.name} — Portfolio`,
  description: profile.bio,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <LanguageProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <div className="flex justify-center bg-gray-900">
              <Footer />
            </div>
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
