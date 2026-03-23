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
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://rayanbarreddine.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Rayan Barreddine — Ingénieur IA & Data | Portfolio",
    template: "%s | Rayan Barreddine",
  },
  description:
    "Rayan Barreddine, étudiant ingénieur informatique à l'UTC (Université de Technologie de Compiègne), spécialisé en IA & Data. AI Researcher chez Histia (Station F, Paris). Expérience en agents IA, pipelines data, RAG, LangGraph, LangChain, PydanticAI, FalkorDB. Recherche stage ML/LLM Ingénieur février 2027.",
  keywords: [
    "Rayan Barreddine",
    "Rayan B.",
    "Rayan Barreddine UTC",
    "Rayan Barreddine portfolio",
    "Rayan Barreddine ingénieur",
    "Rayan Barreddine IA",
    "Rayan Barreddine Data",
    "Rayan Barreddine AI",
    "Rayan Barreddine Histia",
    "Rayan Barreddine Paris",
    "Ingénieur IA Data",
    "Ingénieur Data IA",
    "Data Engineer Paris",
    "AI Engineer Paris",
    "ML Engineer",
    "LLM Engineer",
    "UTC Compiègne informatique",
    "Université de Technologie de Compiègne",
    "AI Researcher",
    "RAG systems",
    "LangChain",
    "LangGraph",
    "PydanticAI",
    "knowledge graph",
    "FalkorDB",
    "Histia Station F",
    "stage ingénieur IA 2027",
    "machine learning engineer",
    "portfolio ingénieur",
    "agents IA",
    "pipelines data",
    "ingénieur informatique UTC",
  ],
  authors: [
    {
      name: "Rayan Barreddine",
      url: "https://www.linkedin.com/in/rayan-barreddine/",
    },
  ],
  creator: "Rayan Barreddine",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    alternateLocale: "en_US",
    url: SITE_URL,
    siteName: "Rayan Barreddine — Portfolio",
    title: "Rayan Barreddine — Ingénieur IA & Data | UTC",
    description:
      "Rayan Barreddine, ingénieur informatique UTC, AI Researcher chez Histia (Station F, Paris). Spécialisé en agents IA, LLM/RAG, pipelines data et graphes de connaissances.",
    images: [
      {
        url: "/images/1.png",
        width: 1200,
        height: 630,
        alt: "Rayan Barreddine — Ingénieur IA & Data",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rayan Barreddine — Ingénieur IA & Data | UTC",
    description:
      "Rayan Barreddine, ingénieur informatique UTC, AI Researcher chez Histia (Station F, Paris). Spécialisé en agents IA, LLM/RAG, pipelines data.",
    images: ["/images/1.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
    languages: {
      "fr-FR": "/",
      "en-US": "/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Rayan Barreddine",
  url: SITE_URL,
  image: `${SITE_URL}/images/1.png`,
  sameAs: [
    "https://www.linkedin.com/in/rayan-barreddine/",
    "https://github.com/RaaaayN",
  ],
  jobTitle: "Ingénieur IA & Data",
  worksFor: {
    "@type": "Organization",
    name: "Histia",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Paris",
      addressRegion: "Île-de-France",
      addressCountry: "FR",
    },
  },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Université de Technologie de Compiègne",
    alternateName: ["UTC", "UTC Compiègne"],
    url: "https://www.utc.fr",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Paris",
    addressCountry: "FR",
  },
  knowsAbout: [
    "Intelligence Artificielle",
    "Machine Learning",
    "LLM",
    "RAG",
    "LangChain",
    "LangGraph",
    "PydanticAI",
    "FalkorDB",
    "Knowledge Graphs",
    "Data Engineering",
    "Python",
    "Docker",
    "MLflow",
  ],
  email: profile.contact.email,
  description:
    "Étudiant ingénieur en informatique à l'UTC, spécialisé en IA & Data. AI Researcher chez Histia. Expérience en agents IA, pipelines data, RAG et graphes de connaissances.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} ${syne.variable} ${jetbrainsMono.variable} font-sans bg-surface-base text-white`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
