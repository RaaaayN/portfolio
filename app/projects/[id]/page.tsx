"use client";

import { useState } from "react";
import { readProfile } from "@/lib/readProfile";
import { Container } from "@/components/Container";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { PhotoDisplay } from "@/components/PhotoDisplay";
import { PdfViewer } from "@/components/PdfViewer";
import { ImageModal } from "@/components/ImageModal";
import { ArrowLeft, ExternalLink, Github, Calendar, MapPin, Play, Image as ImageIcon, Video, FileText } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useLanguage } from "@/lib/LanguageContext";

export default function ProjectDetailPage() {
  const params = useParams<{ id: string }>();
  const { language } = useLanguage();
  const profile = readProfile(language);
  const project = profile.projects.find(p => p.id === params?.id);
  
  // État pour la modal d'images
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

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
    return <div className="p-8">{texts.notFound}</div>;
  }

  const extractVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const videoId = project.video ? extractVideoId(project.video) : null;

  // Fonctions pour gérer la modal d'images
  const openImageModal = (index: number) => {
    setSelectedImageIndex(index);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };

  // Collecter toutes les images du projet (photo principale + galerie)
  const getAllImages = () => {
    const images: string[] = [];
    
    // Ajouter la photo principale si elle existe
    if (project.photo_path || project.image) {
      images.push(project.photo_path || project.image || "");
    }
    
    // Ajouter les photos de la galerie
    if (project.photos && project.photos.length > 0) {
      project.photos.forEach(photo => {
        // Éviter les doublons
        if (!images.includes(photo)) {
          images.push(photo);
        }
      });
    }
    
    return images;
  };

  const allImages = getAllImages();

  return (
    <div className="min-h-screen bg-white">
      <Container className="py-16">
        {/* Navigation */}
        <div className="mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {texts.back}
          </Link>
        </div>

        {/* Header du projet */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Image principale */}
            <div className="lg:w-1/2">
              {(project.photo_path || project.image) && (
                <div 
                  className="cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => openImageModal(0)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openImageModal(0);
                    }
                  }}
                  aria-label="Cliquer pour agrandir l'image"
                >
                  <PhotoDisplay
                    src={project.photo_path || project.image || ""}
                    alt={project.title}
                    size="2xl"
                    rounded={false}
                    className="w-full h-80 object-cover"
                  />
                </div>
              )}
            </div>

            {/* Informations du projet */}
            <div className="lg:w-1/2 space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {project.title}
                </h1>
                <div className="text-xl text-gray-600 leading-relaxed">
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
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
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
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {texts.technologies}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <Badge key={index} variant="secondary">
                      {tech}
                    </Badge>
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
                    className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
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
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Voir le projet
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Détails du projet */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {texts.details}
          </h2>
          <Card>
            <div className="prose prose-lg max-w-none">
              {/* 
                Si details est un tableau (array of string), on l'affiche en bullets, ligne sautée
                Sinon, on affiche en paragraphe (comme avant)
              */}
              {Array.isArray(project.details) ? (
                <ul className="list-disc space-y-4 pl-6 text-gray-700">
                  {project.details.map((line: string, i: number) => (
                    <li key={i} className="leading-relaxed whitespace-pre-line">{line}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {project.details}
                </p>
              )}
            </div>
          </Card>
        </section>

        {/* Vidéo YouTube */}
        {videoId && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Video className="w-6 h-6 mr-3" />
              {texts.video}
            </h2>
            <Card>
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={`Démonstration de ${project.title}`}
                  className="w-full h-full rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </Card>
          </section>
        )}

        {/* Galerie de photos */}
        {project.photos && project.photos.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <ImageIcon className="w-6 h-6 mr-3" />
              Galerie de photos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.photos.map((photo, index) => {
                // Calculer l'index dans la collection complète d'images
                const imageIndex = allImages.indexOf(photo);
                return (
                  <Card key={index} hover className="overflow-hidden">
                    <div 
                      className="cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => openImageModal(imageIndex)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          openImageModal(imageIndex);
                        }
                      }}
                      aria-label="Cliquer pour agrandir l'image"
                    >
                      <PhotoDisplay
                        src={photo}
                        alt={`${project.title} - Image ${index + 1}`}
                        size="lg"
                        rounded={false}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>
        )}

        {project.report && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <FileText className="w-6 h-6 mr-3" />
              {texts.pdfSection}
            </h2>
            <Card>
              <div className="space-y-4">
                <p className="text-gray-600">{texts.pdfDescription}</p>
                <PdfViewer
                  src={project.report}
                  title={`${project.title} - ${texts.pdfSection}`}
                  downloadLabel={texts.download}
                />
              </div>
            </Card>
          </section>
        )}

        {/* CTA */}
        <section className="text-center">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <div className="py-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {texts.contactTitle}
              </h3>
              <p className="text-gray-600 mb-6">
                {texts.contactDescription}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-400 hover:to-red-400 transition-all duration-200 shadow-lg hover:shadow-orange-500/25"
                >
                  {texts.contactCta}
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
                >
                  {texts.allProjects}
                </Link>
              </div>
            </div>
          </Card>
        </section>
      </Container>

      {/* Modal d'images */}
      {allImages.length > 0 && (
        <ImageModal
          images={allImages}
          currentIndex={selectedImageIndex}
          isOpen={isImageModalOpen}
          onClose={closeImageModal}
          projectTitle={project.title}
        />
      )}
    </div>
  );
}
