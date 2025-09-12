"use client";

import { readProfile } from "@/lib/readProfile";
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { ProjectCard } from "@/components/ProjectCard";
import { Badge } from "@/components/Badge";
import { ExternalLink, Github, Star, Calendar, Code2, Bot, Eye, Video, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

export default function ProjectsPage() {
  const { language } = useLanguage();
  const profile = readProfile(language);

  const projectCategories = [
    {
      name: "Intelligence Artificielle",
      count: profile.projects.filter(p => p.technologies.some(t => 
        ['Machine Learning', 'Deep Learning', 'NLP', 'RAG', 'Python'].includes(t)
      )).length,
      icon: "🧠"
    },
    {
      name: "Développement Web",
      count: profile.projects.filter(p => p.technologies.some(t => 
        ['React', 'Next.js', 'Node.js', 'JavaScript', 'TypeScript'].includes(t)
      )).length,
      icon: "🌐"
    },
    {
      name: "Data Science",
      count: profile.projects.filter(p => p.technologies.some(t => 
        ['Pandas', 'NumPy', 'Streamlit', 'Data Science'].includes(t)
      )).length,
      icon: "📊"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Container className="py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Mes Projets
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Découvrez mes réalisations techniques, de l'Intelligence Artificielle au développement web, 
            en passant par la data science et l'innovation technologique.
          </p>
          
          {/* Project Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
            {projectCategories.map((category, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="text-3xl mb-2">{category.icon}</div>
                <div className="text-2xl font-bold text-gray-900">{category.count}</div>
                <div className="text-gray-600">{category.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Projects */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <SectionTitle title="Projets en vedette" />
            <Badge variant="warning" size="lg">
              <Star className="w-4 h-4 mr-2" />
              Projets phares
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {profile.projects.filter(p => p.featured).map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </section>

        {/* All Projects */}
        <section className="mb-16">
          <SectionTitle title="Tous mes projets" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {profile.projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </section>

        {/* Project Timeline */}
        <section className="mb-16">
          <SectionTitle title="Chronologie des projets" />
          <div className="space-y-8">
            {profile.projects.map((project, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <Code2 className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {project.title}
                    </h3>
                    {project.featured && (
                      <Badge variant="warning" size="sm">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                  </div>
                  
                  {(project.location || project.period) && (
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      {project.location && (
                        <div className="flex items-center mr-4">
                          <Calendar className="w-4 h-4 mr-1" />
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
                  
                  <p className="text-gray-600 mb-3 whitespace-pre-line">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-4">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                        >
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </a>
                      )}
                    </div>
                    
                    {/* Bouton Voir les détails */}
                    <Link
                      href={`/projects/${project.id}`}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-400 hover:to-red-400 transition-all duration-200 text-sm"
                    >
                      <Eye className="w-4 h-4" />
                      Détails
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technologies Used */}
        <section className="mb-16">
          <SectionTitle title="Technologies maîtrisées" />
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from(new Set(profile.projects.flatMap(p => p.technologies))).map((tech, index) => (
              <div key={index} className="bg-white rounded-lg p-4 text-center shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="text-sm font-medium text-gray-900">{tech}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">
            Intéressé par mes projets ?
          </h2>
          <p className="text-blue-100 mb-6">
            Découvrez le code source, testez les démos, ou discutons de collaboration !
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={profile.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Github className="w-5 h-5 mr-2" />
              Voir sur GitHub
            </a>
            <a
              href="/chat"
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-400 hover:to-red-400 transition-all duration-200 shadow-lg hover:shadow-orange-500/25"
            >
              <Bot className="w-5 h-5 mr-2" />
              Discuter des projets
            </a>
          </div>
        </section>
      </Container>
    </div>
  );
}
