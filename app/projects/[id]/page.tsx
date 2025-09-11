import { readProfile } from "@/lib/readProfile";
import { Container } from "@/components/Container";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { PhotoDisplay } from "@/components/PhotoDisplay";
import { ArrowLeft, ExternalLink, Github, Calendar, MapPin, Play, Image as ImageIcon, Video } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ProjectDetailPageProps {
  params: {
    id: string;
  };
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const profile = readProfile();
  const project = profile.projects.find(p => p.id === params.id);

  if (!project) {
    notFound();
  }

  const extractVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const videoId = project.video ? extractVideoId(project.video) : null;

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
            Retour aux projets
          </Link>
        </div>

        {/* Header du projet */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Image principale */}
            <div className="lg:w-1/2">
              {(project.photo_path || project.image) && (
                <PhotoDisplay
                  src={project.photo_path || project.image || ""}
                  alt={project.title}
                  size="2xl"
                  rounded={false}
                  className="w-full h-80 object-cover"
                />
              )}
            </div>

            {/* Informations du projet */}
            <div className="lg:w-1/2 space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {project.title}
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed whitespace-pre-line">
                  {project.description}
                </p>
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
                  Technologies utilisées
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
            Détails du projet
          </h2>
          <Card>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {project.details}
              </p>
            </div>
          </Card>
        </section>

        {/* Vidéo YouTube */}
        {videoId && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Video className="w-6 h-6 mr-3" />
              Démonstration vidéo
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
              {project.photos.map((photo, index) => (
                <Card key={index} hover className="overflow-hidden">
                  <PhotoDisplay
                    src={photo}
                    alt={`${project.title} - Image ${index + 1}`}
                    size="lg"
                    rounded={false}
                    className="w-full h-48 object-cover"
                  />
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="text-center">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <div className="py-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Intéressé par ce projet ?
              </h3>
              <p className="text-gray-600 mb-6">
                N'hésitez pas à me contacter pour en discuter ou voir d'autres projets.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-400 hover:to-red-400 transition-all duration-200 shadow-lg hover:shadow-orange-500/25"
                >
                  Me contacter
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
                >
                  Voir tous les projets
                </Link>
              </div>
            </div>
          </Card>
        </section>
      </Container>
    </div>
  );
}
