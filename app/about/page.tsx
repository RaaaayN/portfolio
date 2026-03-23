"use client";

import { readProfile } from "@/lib/readProfile";
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { Timeline } from "@/components/Timeline";
import { CVDownload } from "@/components/CVDownload";
import { CertificationsList } from "@/components/CertificationsList";
import { LanguagesList } from "@/components/LanguagesList";
import { HobbiesList } from "@/components/HobbiesList";
import { PhotoDisplay } from "@/components/PhotoDisplay";
import { useLanguage } from "@/lib/LanguageContext";
import { motion } from "framer-motion";
import {
  Code,
  Brain,
  Database,
  Globe,
  Bot,
  Kanban,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

export default function AboutPage() {
  const { language } = useLanguage();
  const profile = readProfile(language);
  const texts = {
    fr: {
      badges: {
        ai: "Intelligence Artificielle",
        data: "Data Science",
        web: "Développement Web",
      },
      aboutTitle: "À propos de moi",
      educationTitle: "Ma formation",
      careerTitle: "Mon parcours professionnel",
      skillsTitle: "Mes compétences techniques",
      achievementsTitle: "Mes réalisations clés",
      certificationsTitle: "Certifications",
      languagesTitle: "Langues",
      hobbiesTitle: "Centres d'intérêt",
      resultLabel: "Résultat :",
      viewImage: "Voir la photo",
      closeImage: "Fermer la photo",
      featured: "À la une",
      remote: "À distance",
      achievements: {
        leadershipTitle: "Leadership & Management",
        leadershipDescription:
          "Présidence de la Junior-Entreprise UTC avec direction d'une équipe de 15 personnes, croissance de 40% du chiffre d'affaires et formation de 32 membres.",
        technicalTitle: "Projets Techniques",
        technicalDescription:
          "Développement de solutions IA avancées : LSTM multivarié, moteur de recherche, application RAG avec LangChain et applications web de data science.",
      },
      cta: {
        title: "Intéressé par mon profil ?",
        description:
          "N'hésitez pas à me contacter, télécharger mon CV ou utiliser le chat IA pour en savoir plus !",
        email: "Envoyer un email",
        chat: "Chat IA",
      },
    },
    en: {
      badges: {
        ai: "Artificial Intelligence",
        data: "Data Science",
        web: "Web development",
      },
      aboutTitle: "About me",
      educationTitle: "Education",
      careerTitle: "Professional journey",
      skillsTitle: "Technical skills",
      achievementsTitle: "Key achievements",
      certificationsTitle: "Certifications",
      languagesTitle: "Languages",
      hobbiesTitle: "Interests",
      resultLabel: "Result:",
      viewImage: "View photo",
      closeImage: "Close photo",
      featured: "Featured",
      remote: "Remote",
      achievements: {
        leadershipTitle: "Leadership & Management",
        leadershipDescription:
          "President of the UTC Junior-Enterprise leading a 15-person team, achieving 40% revenue growth and training 32 members.",
        technicalTitle: "Technical projects",
        technicalDescription:
          "Development of advanced AI solutions: multivariate LSTM, search engine, RAG application with LangChain and data science web apps.",
      },
      cta: {
        title: "Interested in my profile?",
        description:
          "Feel free to contact me, download my resume or use the AI chat to learn more!",
        email: "Send an email",
        chat: "AI Chat",
      },
    },
  }[language];

  const heroBadges = [
    {
      label: texts.badges.ai,
      icon: <Brain className="w-4 h-4 mr-2" />,
      variant: "default" as const,
    },
    {
      label: texts.badges.data,
      icon: <Database className="w-4 h-4 mr-2" />,
      variant: "secondary" as const,
    },
    {
      label: texts.badges.web,
      icon: <Code className="w-4 h-4 mr-2" />,
      variant: "success" as const,
    },
  ];

  const skillBorderColors = [
    "border-l-violet-500",
    "border-l-cyan-accent",
    "border-l-emerald-500",
    "border-l-amber-500",
  ];

  return (
    <div className="min-h-screen bg-surface-base pt-20">
      <Container className="py-16">
        {/* Hero Section */}
        <motion.div {...fadeUp} className="text-center mb-16">
          {profile.photo_path && (
            <div className="flex justify-center mb-6">
              <PhotoDisplay
                src={profile.photo_path}
                alt={`Photo de ${profile.name}`}
                size="2xl"
                className="ring-4 ring-accent/30 ring-offset-4 ring-offset-surface-base shadow-lg"
              />
            </div>
          )}

          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            {profile.name}
          </h1>
          <p className="text-xl text-slate-400 mb-6">
            {profile.title}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {heroBadges.map((badge, index) => (
              <Badge key={index} variant={badge.variant} size="lg">
                {badge.icon}
                {badge.label}
              </Badge>
            ))}
          </div>
        </motion.div>

        {/* 1. À propos de moi */}
        <section className="mb-16">
          <motion.div {...fadeUp}>
            <SectionTitle title={texts.aboutTitle} />
            <Card>
              <div className="prose prose-invert prose-lg max-w-none">
                <p className="text-slate-400 leading-relaxed text-lg whitespace-pre-line">
                  {profile.about}
                </p>
              </div>
            </Card>
          </motion.div>
        </section>

        {/* 2. Formation */}
        <section className="mb-16">
          <motion.div {...fadeUp}>
            <SectionTitle title={texts.educationTitle} />
            <Timeline
              items={profile.education}
              resultLabel={texts.resultLabel}
              viewImageLabel={texts.viewImage}
              closeImageLabel={texts.closeImage}
              featuredLabel={texts.featured}
              remoteLabel={texts.remote}
            />
          </motion.div>
        </section>

        {/* 4. Parcours professionnel */}
        <section className="mb-16">
          <motion.div {...fadeUp}>
            <SectionTitle title={texts.careerTitle} />
            <Timeline
              items={profile.experience}
              resultLabel={texts.resultLabel}
              viewImageLabel={texts.viewImage}
              closeImageLabel={texts.closeImage}
              featuredLabel={texts.featured}
              remoteLabel={texts.remote}
            />
          </motion.div>
        </section>

        {/* 5. Compétences techniques */}
        <section className="mb-16">
          <motion.div {...fadeUp}>
            <SectionTitle title={texts.skillsTitle} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {profile.skills.map((skill, index) => (
                <Card key={index} hover className={`border-l-4 ${skillBorderColors[index % skillBorderColors.length]}`}>
                  <div className="flex items-center mb-4">
                    {index === 0 && <Code className="w-6 h-6 text-violet-400 mr-3" />}
                    {index === 1 && <Brain className="w-6 h-6 text-cyan-accent mr-3" />}
                    {index === 2 && <Globe className="w-6 h-6 text-emerald-400 mr-3" />}
                    {index === 3 && <Kanban className="w-6 h-6 text-amber-400 mr-3" />}
                    <h3 className="text-xl font-semibold text-white">
                      {skill.category}
                    </h3>
                  </div>
                  {skill.description && (
                    <p className="text-slate-400 mb-4 text-sm">
                      {skill.description}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {skill.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-white/[0.08] text-slate-300 text-sm rounded-full hover:bg-white/[0.12] transition-colors font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        </section>

        {/* 7. Certifications */}
        {profile.certifications && profile.certifications.length > 0 && (
          <section className="mb-16">
            <motion.div {...fadeUp}>
              <SectionTitle title={texts.certificationsTitle} />
              <CertificationsList certifications={profile.certifications} />
            </motion.div>
          </section>
        )}

        {/* 8. Langues */}
        {profile.languages && profile.languages.length > 0 && (
          <section className="mb-16">
            <motion.div {...fadeUp}>
              <SectionTitle title={texts.languagesTitle} />
              <LanguagesList languages={profile.languages} title={texts.languagesTitle} />
            </motion.div>
          </section>
        )}

        {/* 9. Centres d'intérêt */}
        {profile.hobbies && profile.hobbies.length > 0 && (
          <section className="mb-16">
            <motion.div {...fadeUp}>
              <SectionTitle title={texts.hobbiesTitle} />
              <HobbiesList hobbies={profile.hobbies} title={texts.hobbiesTitle} />
            </motion.div>
          </section>
        )}

        {/* 10. CTA Section */}
        <motion.section {...fadeUp} className="text-center">
          <div className="glass rounded-3xl border-accent/20 shadow-glow-violet p-12">
            <h2 className="font-display text-3xl font-bold text-white mb-4">
              {texts.cta.title}
            </h2>
            <p className="text-slate-400 mb-6">
              {texts.cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CVDownload variant="default" size="md" />
              <a
                href={`mailto:${profile.contact.email}`}
                className="inline-flex items-center justify-center px-6 py-3 bg-accent hover:bg-violet-500 text-white rounded-xl transition-colors"
              >
                {texts.cta.email}
              </a>
              <a
                href="/chat"
                className="inline-flex items-center justify-center px-6 py-3 border border-cyan-accent/40 text-cyan-accent hover:bg-cyan-accent/10 rounded-xl transition-all duration-200"
              >
                <Bot className="w-5 h-5 mr-2" />
                {texts.cta.chat}
              </a>
            </div>
          </div>
        </motion.section>
      </Container>
    </div>
  );
}
