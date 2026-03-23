import { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://rayanbarreddine.vercel.app";

export const metadata: Metadata = {
  title: "Projets — Rayan Barreddine | IA, Data & Développement",
  description:
    "Projets de Rayan Barreddine : agents IA autonomes, systèmes RAG, pipelines data, prédiction financière avec ML/LSTM/ARIMA, moteur de recherche NLP, jeu Hive en C++. Stack : Python, LangChain, LangGraph, PydanticAI, FalkorDB, TensorFlow, Next.js.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projets de Rayan Barreddine — IA, Data & Développement",
    description:
      "Agents IA, systèmes RAG, pipelines data, prédiction financière ML. Projets réalisés par Rayan Barreddine, ingénieur UTC.",
    url: `${SITE_URL}/projects`,
    images: [
      {
        url: "/images/1.png",
        width: 1200,
        height: 630,
        alt: "Projets de Rayan Barreddine",
      },
    ],
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
