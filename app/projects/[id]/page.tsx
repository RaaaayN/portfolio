"use client";

import { readProfile } from "@/lib/readProfile";
import { Container } from "@/components/Container";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { PhotoDisplay } from "@/components/PhotoDisplay";
import { PdfViewer } from "@/components/PdfViewer";
import { ArrowLeft, ExternalLink, Github, Calendar, MapPin, Play, Image as ImageIcon, Video, FileText } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useLanguage } from "@/lib/LanguageContext";
import { motion } from "framer-motion";

export default function ProjectDetailPage() {
  const params = useParams<{ id: string }>();
  const { language } = useLanguage();
  const profile = readProfile(language);
  const project = profile.projects.find(p => p.id === params?.id);

  const texts = {
    fr: {
      back: "Retour aux projets",
      technologies: "Technologies utilisées",
      video: "Démonstration vidéo",
      pdfSection: "Rapport PDF",
      pdfDescription: "Consultez le rapport associé à ce projet.",
      download: "Télécharger le PDF",
      details: "Détails du projet",
      contactTitle: "Intéressé par ce projet ?",
      contactDescription: "N'hésitez pas à me contacter pour en discuter ou voir d'autres projets.",
      contactCta: "Me contacter",
      allProjects: "Voir tous les projets",
      notFound: "Projet introuvable",
    },
    en: {
      back: "Back to projects",
      technologies: "Technologies used",
      video: "Video demo",
      pdfSection: "PDF report",
      pdfDescription: "Check out the report associated with this project.",
      download: "Download PDF",
      details: "Project details",
      contactTitle: "Interested in this project?",
      contactDescription: "Feel free to get in touch to discuss it or see more work.",
      contactCta: "Contact me",
      allProjects: "View all projects",
      notFound: "Project not found",
    },
  }[language];

  if (!project) {
    return <div className="min-h-screen bg-surface-base pt-24 p-8 text-slate-400">{texts.notFound}</div>;
  }

  const extractVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const videoId = project.video ? extractVideoId(project.video) : null;

  return (
    <div className="min-h-screen bg-surface-base pt-20">
      <Container className="py-16">
        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link
            href="/projects"
            className="inline-flex items-center text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {texts.back}
          </Link>
        </motion.div>

        {/* Header du projet */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Image principale */}
            <div className="lg:w-1/2">
              {(project.photo_path || project.image) && (
                <div className="relative rounded-2xl overflow-hidden">
                  <PhotoDisplay
                    src={project.photo_path || project.image || ""}
                    alt={project.title}
                    size="2xl"
                    rounded={false}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-base/60 to-transparent pointer-events-none" />
                </div>
              )}
            </div>

            {/* Informations du projet */}
            <div className="lg:w-1/2 space-y-6">
              <div>
                <h1 className="font-display text-4xl font-bold text-white mb-4">
                  {project.title}
                </h1>
                <div className="text-xl text-slate-400 leading-relaxed">
                  {Array.isArray(project.description) ? (
                    <ul className="list-disc space-y-2 pl-6 text-base">
                      {project.description.map((line, index) => (
                        <li key={index} className="leading-relaxed">
                          {line}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="whitespace-pre-line">{project.description}</p>
                  )}
                </div>
              </div>

              {/* Métadonnées */}
              <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                {project.period && (
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {project.period}
                  </div>
                )}
                {project.location && (
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {project.location}
                  </div>
                )}
              </div>

              {/* Technologies */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  {texts.technologies}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-white/[0.08] text-slate-300 font-mono text-sm rounded-full px-3 py-1 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Liens externes */}
              <div className="flex flex-wrap gap-4">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 glass border-white/20 text-white rounded-xl hover:bg-white/[0.08] transition-colors"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Code source
                    <ExternalLink className="w-3 h-3 ml-2" />
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-accent hover:bg-violet-500 text-white rounded-xl transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Voir le projet
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Détails du projet */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="font-display text-2xl font-bold text-white mb-6">
            {texts.details}
          </h2>
          <Card>
            <div className="prose prose-invert prose-lg max-w-none">
              {Array.isArray(project.details) ? (
                <ul className="list-disc space-y-4 pl-6 text-slate-400">
                  {project.details.map((line: string, i: number) => (
                    <li key={i} className="leading-relaxed whitespace-pre-line">{line}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-slate-400 leading-relaxed whitespace-pre-line">
                  {project.details}
                </p>
              )}
            </div>
          </Card>
        </motion.section>

        {/* Vidéo YouTube */}
        {videoId && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="font-display text-2xl font-bold text-white mb-6 flex items-center">
              <Video className="w-6 h-6 mr-3 text-accent-light" />
              {texts.video}
            </h2>
            <Card>
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={`Démonstration de ${project.title}`}
                  className="w-full h-full rounded-xl"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </Card>
          </motion.section>
        )}

        {/* Galerie de photos */}
        {project.photos && project.photos.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="font-display text-2xl font-bold text-white mb-6 flex items-center">
              <ImageIcon className="w-6 h-6 mr-3 text-accent-light" />
              Galerie de photos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.photos.map((photo, index) => (
                <Card key={index} hover className="overflow-hidden p-0">
                  <div className="relative">
                    <PhotoDisplay
                      src={photo}
                      alt={`${project.title} - Image ${index + 1}`}
                      size="lg"
                      rounded={false}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-base/60 to-transparent pointer-events-none" />
                  </div>
                </Card>
              ))}
            </div>
          </motion.section>
        )}

        {project.report && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="font-display text-2xl font-bold text-white mb-6 flex items-center">
              <FileText className="w-6 h-6 mr-3 text-accent-light" />
              {texts.pdfSection}
            </h2>
            <Card>
              <div className="space-y-4">
                <p className="text-slate-400">{texts.pdfDescription}</p>
                <PdfViewer
                  src={project.report}
                  title={`${project.title} - ${texts.pdfSection}`}
                  downloadLabel={texts.download}
                />
              </div>
            </Card>
          </motion.section>
        )}

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Card className="glass rounded-3xl border-accent/20 shadow-glow-violet">
            <div className="py-8">
              <h3 className="font-display text-2xl font-bold text-white mb-4">
                {texts.contactTitle}
              </h3>
              <p className="text-slate-400 mb-6">
                {texts.contactDescription}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 bg-accent hover:bg-violet-500 text-white rounded-xl transition-colors"
                >
                  {texts.contactCta}
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center px-6 py-3 border border-white/20 text-slate-300 rounded-xl hover:bg-white/[0.08] transition-all duration-200"
                >
                  {texts.allProjects}
                </Link>
              </div>
            </div>
          </Card>
        </motion.section>
      </Container>
    </div>
  );
}
