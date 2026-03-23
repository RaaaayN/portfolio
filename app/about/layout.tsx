import { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://rayanbarreddine.vercel.app";

export const metadata: Metadata = {
  title: "À propos — Rayan Barreddine | Ingénieur IA & Data UTC",
  description:
    "Découvrez le parcours de Rayan Barreddine : étudiant ingénieur informatique à l'UTC (Compiègne), AI Researcher chez Histia (Station F, Paris). Compétences en IA, Data, LLM/RAG, LangChain, LangGraph, PydanticAI, FalkorDB. Certifications Scrum, IBM AI, Google GCP.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "À propos de Rayan Barreddine — Ingénieur IA & Data | UTC",
    description:
      "Parcours, compétences et certifications de Rayan Barreddine, ingénieur informatique UTC et AI Researcher chez Histia.",
    url: `${SITE_URL}/about`,
    images: [
      {
        url: "/images/1.png",
        width: 1200,
        height: 630,
        alt: "Rayan Barreddine — À propos",
      },
    ],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
