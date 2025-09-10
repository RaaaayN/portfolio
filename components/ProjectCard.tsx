import { ExternalLink, Github, MapPin, Calendar } from "lucide-react";
import { Card } from "./Card";
import { Badge } from "./Badge";
import { PhotoDisplay } from "./PhotoDisplay";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  photo_path?: string;
  github?: string;
  live?: string;
  featured?: boolean;
  location?: string;
  period?: string;
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card hover className="h-full">
      <div className="flex flex-col h-full">
        {(project.image || project.photo_path) && (
          <div className="mb-4 rounded-lg overflow-hidden">
            <PhotoDisplay
              src={project.photo_path || project.image || ""}
              alt={project.title}
              size="lg"
              rounded={false}
              className="w-full h-48"
            />
          </div>
        )}
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-semibold text-gray-900">
              {project.title}
            </h3>
            {project.featured && (
              <Badge variant="warning" size="sm">
                Featured
              </Badge>
            )}
          </div>
          
          {(project.location || project.period) && (
            <div className="flex items-center text-sm text-gray-500 mb-3">
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
          
          <p className="text-gray-600 mb-4 flex-1 whitespace-pre-line">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, index) => (
              <Badge key={index} variant="secondary" size="sm">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="flex gap-3 mt-auto">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Github size={16} />
              Code
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ExternalLink size={16} />
              Live
            </a>
          )}
        </div>
      </div>
    </Card>
  );
}