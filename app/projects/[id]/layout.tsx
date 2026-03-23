import { Metadata } from "next";
import { readProfile } from "@/lib/readProfile";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://rayanbarreddine.vercel.app";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const profile = readProfile();
  const project = profile.projects.find((p) => p.id === params.id);

  if (!project) {
    return {
      title: "Projet introuvable",
    };
  }

  const description = Array.isArray(project.description)
    ? project.description.join(" ")
    : project.description;

  return {
    title: `${project.title} — Rayan Barreddine`,
    description: `${description} Technologies : ${project.technologies.join(", ")}.`,
    alternates: {
      canonical: `/projects/${project.id}`,
    },
    openGraph: {
      title: `${project.title} | Rayan Barreddine`,
      description,
      url: `${SITE_URL}/projects/${project.id}`,
      images: project.photo_path
        ? [{ url: project.photo_path, alt: project.title }]
        : [{ url: "/images/1.png", alt: "Rayan Barreddine" }],
    },
  };
}

export async function generateStaticParams() {
  const profile = readProfile();
  return profile.projects.map((p) => ({ id: p.id }));
}

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
