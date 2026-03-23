"use client";

import { ExternalLink, Github, MapPin, Calendar, Eye, Video, Image as ImageIcon, FileText } from "lucide-react";
import { Card } from "./Card";
import { Badge } from "./Badge";
import { PhotoDisplay } from "./PhotoDisplay";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { clsx } from "clsx";

interface Project {
  id: string;
  title: string;
  description: string | string[];
  details: string;
  technologies: string[];
  photos: string[];
  video?: string;
  image?: string;
  photo_path?: string;
  github?: string;
  live?: string;
  featured?: boolean;
  location?: string;
  period?: string;
  report?: string;
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { language } = useLanguage();
  const texts = {
    fr: {
      featured: "À la une",
      details: "Voir les détails",
      video: "Vidéo",
      report: "Rapport",
      sourceTitle: "Code source",
      viewTitle: "Voir le projet",
    },
    en: {
      featured: "Featured",
      details: "View details",
      video: "Video",
      report: "Report",
      sourceTitle: "Source code",
      viewTitle: "View project",
    },
  }[language];

  const hasPhotos = project.photos && project.photos.length > 0;
  const hasVideo = Boolean(project.video && project.video.trim().length > 0);
  const hasReport = Boolean(project.report && project.report.trim().length > 0);

  return (
    <Card
      hover
      variant={project.featured ? "featured" : "default"}
      className="h-full"
    >
      <div className="flex flex-col h-full">
        {(project.image || project.photo_path) && (
          <div className="mb-4 rounded-xl overflow-hidden relative">
            <PhotoDisplay
              src={project.photo_path || project.image || ""}
              alt={project.title}
              size="lg"
              rounded={false}
              className="w-full h-48"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-base/60 to-transparent pointer-events-none" />
          </div>
        )}

        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-display font-semibold text-white">
              {project.title}
            </h3>
            {project.featured && (
              <Badge variant="warning" size="sm">
                {texts.featured}
              </Badge>
            )}
          </div>

          {(project.location || project.period) && (
            <div className="flex items-center text-sm text-slate-500 mb-3">
              {project.location && (
                <div className="flex items-center mr-4">
                  <MapPin className="w-4 h-4 mr-1" />
                  {project.location}
                </div>
              )}
              {project.period && (
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {project.period}
                </div>
              )}
            </div>
          )}

          <div className="text-slate-400 mb-4 flex-1">
            {Array.isArray(project.description) ? (
              <ul className="list-disc space-y-1 pl-5">
                {project.description.map((line, index) => (
                  <li key={index} className="leading-relaxed">
                    {line}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="whitespace-pre-line leading-relaxed">
                {project.description}
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="bg-white/[0.08] text-slate-300 font-mono text-xs rounded-full px-2 py-0.5 border border-white/10"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-auto">
          {/* Bouton Voir les détails */}
          <Link
            href={`/projects/${project.id}`}
            className="flex items-center gap-2 px-3 py-2 bg-accent hover:bg-violet-500 text-white rounded-xl transition-colors duration-200 text-sm font-medium"
          >
            <Eye size={16} />
            {texts.details}
          </Link>

          {/* Indicateurs de contenu */}
          <div className="flex items-center gap-2 text-sm text-slate-500">
            {hasPhotos && (
              <div className="flex items-center gap-1">
                <ImageIcon size={14} />
                {project.photos.length}
              </div>
            )}
            {hasVideo && (
              <div className="flex items-center gap-1">
                <Video size={14} />
                {texts.video}
              </div>
            )}
            {hasReport && (
              <div className="flex items-center gap-1">
                <FileText size={14} />
                {texts.report}
              </div>
            )}
          </div>

          {/* Liens externes */}
          <div className="flex gap-2 ml-auto">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-slate-500 hover:text-white transition-colors"
                title={texts.sourceTitle}
              >
                <Github size={16} />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-slate-500 hover:text-cyan-accent transition-colors"
                title={texts.viewTitle}
              >
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
