"use client";

import { readProfile } from "@/lib/readProfile";
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { ProjectCard } from "@/components/ProjectCard";
import { Badge } from "@/components/Badge";
import { Github, Star, Bot } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { motion } from "framer-motion";

export default function ProjectsPage() {
  const { language } = useLanguage();
  const profile = readProfile(language);
  const texts = {
    fr: {
      heroTitle: "Mes Projets",
      heroDescription:
        "Découvrez mes réalisations techniques, de l'Intelligence Artificielle au développement web, en passant par la data science et l'innovation technologique.",
      categories: [
        {
          name: "Intelligence Artificielle",
          icon: "🧠",
          keywords: ['Machine Learning', 'Deep Learning', 'NLP', 'RAG', 'Python'],
        },
        {
          name: "Développement Web",
          icon: "🌐",
          keywords: ['React', 'Next.js', 'Node.js', 'JavaScript', 'TypeScript'],
        },
        {
          name: "Data Science",
          icon: "📊",
          keywords: ['Pandas', 'NumPy', 'Streamlit', 'Data Science'],
        },
      ],
      featuredTitle: "Projets en vedette",
      featuredBadge: "Projets phares",
      allProjectsTitle: "Tous mes projets",
      timelineTitle: "Chronologie des projets",
      technologiesTitle: "Technologies maîtrisées",
      timeline: {
        featured: "À la une",
        details: "Détails",
        code: "Code",
        live: "Démo en ligne",
      },
      cta: {
        title: "Intéressé par mes projets ?",
        description: "Découvrez le code source, testez les démos, ou discutons de collaboration !",
        github: "Voir sur GitHub",
        chat: "Discuter des projets",
      },
    },
    en: {
      heroTitle: "My projects",
      heroDescription:
        "Explore my technical work, from Artificial Intelligence to web development, including data science and technology innovation.",
      categories: [
        {
          name: "Artificial Intelligence",
          icon: "🧠",
          keywords: ['Machine Learning', 'Deep Learning', 'NLP', 'RAG', 'Python'],
        },
        {
          name: "Web development",
          icon: "🌐",
          keywords: ['React', 'Next.js', 'Node.js', 'JavaScript', 'TypeScript'],
        },
        {
          name: "Data science",
          icon: "📊",
          keywords: ['Pandas', 'NumPy', 'Streamlit', 'Data Science'],
        },
      ],
      featuredTitle: "Featured projects",
      featuredBadge: "Highlights",
      allProjectsTitle: "All my projects",
      timelineTitle: "Project timeline",
      technologiesTitle: "Technologies mastered",
      timeline: {
        featured: "Featured",
        details: "Details",
        code: "Source",
        live: "Live demo",
      },
      cta: {
        title: "Interested in my projects?",
        description: "Check out the source code, try the demos, or let's talk about working together!",
        github: "View on GitHub",
        chat: "Discuss the projects",
      },
    },
  }[language];

  const projectCategories = texts.categories.map((category) => ({
    name: category.name,
    icon: category.icon,
    count: profile.projects.filter((p) =>
      p.technologies.some((t) => category.keywords.includes(t))
    ).length,
  }));

  const featuredProjects = profile.projects.filter((project) => project.featured);

  return (
    <div className="min-h-screen bg-surface-base pt-20">
      <Container className="py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            {texts.heroTitle}
          </h1>
          <p className="text-xl text-slate-400 mb-8 max-w-3xl mx-auto">
            {texts.heroDescription}
          </p>

          {/* Project Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
            {projectCategories.map((category, index) => (
              <div key={index} className="glass rounded-2xl p-6">
                <div className="text-3xl mb-2">{category.icon}</div>
                <div className="text-2xl font-display font-bold text-white font-mono">{category.count}</div>
                <div className="text-slate-400">{category.name}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <section className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between mb-8">
                <SectionTitle title={texts.featuredTitle} align="left" />
                <Badge variant="warning" size="lg">
                  <Star className="w-4 h-4 mr-2" />
                  {texts.featuredBadge}
                </Badge>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </motion.div>
          </section>
        )}

        {/* All Projects */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionTitle title={texts.allProjectsTitle} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {profile.projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Technologies Used */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionTitle title={texts.technologiesTitle} />
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Array.from(new Set(profile.projects.flatMap(p => p.technologies))).map((tech, index) => (
                <div key={index} className="glass rounded-lg p-4 text-center hover:border-white/[0.15] transition-all duration-200">
                  <div className="text-sm font-medium text-slate-300 font-mono">{tech}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="glass rounded-3xl border-accent/20 shadow-glow-violet p-8 text-center"
        >
          <h2 className="font-display text-2xl font-bold text-white mb-4">
            {texts.cta.title}
          </h2>
          <p className="text-slate-400 mb-6">
            {texts.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={profile.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 glass border-white/20 text-white rounded-xl hover:bg-white/[0.08] transition-all duration-200 hover:scale-105"
            >
              <Github className="w-5 h-5 mr-2" />
              {texts.cta.github}
            </a>
            <a
              href="/chat"
              className="inline-flex items-center justify-center px-6 py-3 border border-cyan-accent/40 text-cyan-accent hover:bg-cyan-accent/10 rounded-xl transition-all duration-200 hover:scale-105"
            >
              <Bot className="w-5 h-5 mr-2" />
              {texts.cta.chat}
            </a>
          </div>
        </motion.section>
      </Container>
    </div>
  );
}
