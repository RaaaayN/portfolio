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
import { Code, Brain, Database, Globe, Award, Users, Briefcase, GraduationCap, Calendar, MapPin, Star, Target, Zap, Bot } from "lucide-react";

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
      experienceTitle: "Mon expérience en chiffres",
      educationTitle: "Ma formation",
      careerTitle: "Mon parcours professionnel",
      skillsTitle: "Mes compétences techniques",
      achievementsTitle: "Mes réalisations clés",
      certificationsTitle: "Certifications",
      languagesTitle: "Langues",
      hobbiesTitle: "Centres d'intérêt",
      resultLabel: "Résultat :",
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
      stats: {
        experience: {
          title: "Années d'expérience",
          value: "3+",
          description: "En gestion d'équipe et projets",
        },
        team: {
          title: "Équipe dirigée",
          value: "15",
          description: "Personnes en Junior-Entreprise",
        },
        projects: {
          title: "Projets clients",
          value: "10+",
          description: "Réalisés avec succès",
        },
        trainings: {
          title: "Formations données",
          value: "20+",
          description: "Sessions d'encadrement",
        },
      },
    },
    en: {
      badges: {
        ai: "Artificial Intelligence",
        data: "Data Science",
        web: "Web development",
      },
      aboutTitle: "About me",
      experienceTitle: "Experience in numbers",
      educationTitle: "Education",
      careerTitle: "Professional journey",
      skillsTitle: "Technical skills",
      achievementsTitle: "Key achievements",
      certificationsTitle: "Certifications",
      languagesTitle: "Languages",
      hobbiesTitle: "Interests",
      resultLabel: "Result:",
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
      stats: {
        experience: {
          title: "Years of experience",
          value: "3+",
          description: "In team and project management",
        },
        team: {
          title: "Team led",
          value: "15",
          description: "People at the Junior-Enterprise",
        },
        projects: {
          title: "Client projects",
          value: "10+",
          description: "Successfully delivered",
        },
        trainings: {
          title: "Training sessions",
          value: "20+",
          description: "Coaching and mentoring",
        },
      },
    },
  }[language];

  const experienceStats = [
    {
      ...texts.stats.experience,
      icon: <Calendar className="w-6 h-6" />,
    },
    {
      ...texts.stats.team,
      icon: <Users className="w-6 h-6" />,
    },
    {
      ...texts.stats.projects,
      icon: <Briefcase className="w-6 h-6" />,
    },
    {
      ...texts.stats.trainings,
      icon: <Award className="w-6 h-6" />,
    },
  ];

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

  return (
    <div className="min-h-screen bg-white">
      <Container className="py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          {/* Photo de profil */}
          {profile.photo_path && (
            <div className="flex justify-center mb-6">
              <PhotoDisplay
                src={profile.photo_path}
                alt={`Photo de ${profile.name}`}
                size="2xl"
                className="border-4 border-white/20 shadow-lg"
              />
            </div>
          )}
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {profile.name}
          </h1>
          <p className="text-xl text-gray-600 mb-6">
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
        </div>

        {/* 1. À propos de moi */}
        <section className="mb-16">
          <SectionTitle title={texts.aboutTitle} />
          <Card>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">
                {profile.about}
              </p>
            </div>
          </Card>
        </section>

        {/* 2. Expérience en chiffres */}
        <section className="mb-16">
          <SectionTitle title={texts.experienceTitle} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {experienceStats.map((stat, index) => (
              <Card key={index} hover className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <div className="text-blue-600">
                      {stat.icon}
                    </div>
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-gray-700 mb-1">
                  {stat.title}
                </div>
                <div className="text-gray-500 text-sm">
                  {stat.description}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* 3. Formation */}
        <section className="mb-16">
          <SectionTitle title={texts.educationTitle} />
          <Timeline items={profile.education} resultLabel={texts.resultLabel} />
        </section>

        {/* 4. Parcours professionnel */}
        <section className="mb-16">
          <SectionTitle title={texts.careerTitle} />
          <Timeline items={profile.experience} resultLabel={texts.resultLabel} />
        </section>

        {/* 5. Compétences techniques */}
        <section className="mb-16">
          <SectionTitle title={texts.skillsTitle} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {profile.skills.map((skill, index) => (
              <Card key={index} hover>
                <div className="flex items-center mb-4">
                  {index === 0 && <Code className="w-6 h-6 text-blue-600 mr-3" />}
                  {index === 1 && <Brain className="w-6 h-6 text-purple-600 mr-3" />}
                  {index === 2 && <Globe className="w-6 h-6 text-green-600 mr-3" />}
                  {index === 3 && <Database className="w-6 h-6 text-orange-600 mr-3" />}
                  <h3 className="text-xl font-semibold text-gray-900">
                    {skill.category}
                  </h3>
                </div>
                {skill.description && (
                  <p className="text-gray-600 mb-4 text-sm">
                    {skill.description}
                  </p>
                )}
                <div className="flex flex-wrap gap-2">
                  {skill.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* 6. Réalisations clés */}
        <section className="mb-16">
          <SectionTitle title={texts.achievementsTitle} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {texts.achievements.leadershipTitle}
                  </h3>
                  <p className="text-gray-600 mb-3">
                    {texts.achievements.leadershipDescription}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="success" size="sm">Leadership</Badge>
                    <Badge variant="success" size="sm">Management</Badge>
                    <Badge variant="success" size="sm">Business Development</Badge>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Code className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {texts.achievements.technicalTitle}
                  </h3>
                  <p className="text-gray-600 mb-3">
                    {texts.achievements.technicalDescription}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="default" size="sm">IA/ML</Badge>
                    <Badge variant="default" size="sm">RAG</Badge>
                    <Badge variant="default" size="sm">Data Science</Badge>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* 7. Certifications */}
        {profile.certifications && profile.certifications.length > 0 && (
          <section className="mb-16">
            <SectionTitle title={texts.certificationsTitle} />
            <CertificationsList certifications={profile.certifications} />
          </section>
        )}

        {/* 8. Langues */}
        {profile.languages && profile.languages.length > 0 && (
          <section className="mb-16">
            <SectionTitle title={texts.languagesTitle} />
            <LanguagesList languages={profile.languages} title={texts.languagesTitle} />
          </section>
        )}

        {/* 9. Centres d'intérêt */}
        {profile.hobbies && profile.hobbies.length > 0 && (
          <section className="mb-16">
            <SectionTitle title={texts.hobbiesTitle} />
            <HobbiesList hobbies={profile.hobbies} title={texts.hobbiesTitle} />
          </section>
        )}

        {/* 10. CTA Section */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {texts.cta.title}
          </h2>
          <p className="text-gray-600 mb-6">
            {texts.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CVDownload variant="default" size="md" />
            <a
              href={`mailto:${profile.contact.email}`}
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {texts.cta.email}
            </a>
            <a
              href="/chat"
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-400 hover:to-red-400 transition-all duration-200 shadow-lg hover:shadow-orange-500/25"
            >
              <Bot className="w-5 h-5 mr-2" />
              {texts.cta.chat}
            </a>
          </div>
        </section>
      </Container>
    </div>
  );
}
