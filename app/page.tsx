"use client";

import { readProfile } from "@/lib/readProfile";
import { Container } from "@/components/Container";
import { Badge } from "@/components/Badge";
import { CVDownload, CVBadge } from "@/components/CVDownload";
import { PhotoDisplay } from "@/components/PhotoDisplay";
import Link from "next/link";
import { ArrowRight, MessageCircle, Briefcase, GraduationCap, Sparkles, Bot } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function Home() {
  const { language } = useLanguage();
  const profile = readProfile(language);
  const texts = {
    fr: {
      heroBadge: "Portfolio Interactif",
      greet: "Salut, je suis",
      discover: "Découvrir mon parcours",
      aiChat: "Discuter avec mon IA",
      contact: "Me contacter",
      projectsDone: "Projets réalisés",
      expertise: "Domaines d'expertise",
      studyYears: "Années d'études",
      exploreTitle: "Explorez mon univers",
      exploreSubtitle: "Découvrez mes projets, mon parcours ou posez-moi des questions",
      projects: "Projets",
      viewProjects: "Voir mes réalisations",
      about: "À propos",
      learnMore: "En savoir plus sur moi",
      experience: "Expérience",
      myPath: "Mon parcours professionnel",
      contactCard: "Contact",
      sendMessage: "Envoyez-moi un message",
      chat: "Chat IA",
      askQuestions: "Posez-moi des questions",
      expertiseTitle: "Mes domaines d'expertise",
      expertiseSubtitle: "Technologies et compétences que je maîtrise",
      statsTitle: "En quelques chiffres",
      statsSubtitle: "Mon parcours en statistiques",
      expYears: "Années d'expérience",
      peopleLed: "Personnes dirigées",
      techMastered: "Technologies maîtrisées",
      readyTitle: "Prêt à collaborer ?",
      readySubtitle: "Découvrez mes projets, explorez mon parcours ou contactez-moi directement.",
    },
    en: {
      heroBadge: "Interactive Portfolio",
      greet: "Hi, I'm",
      discover: "Discover my journey",
      aiChat: "Chat with my AI",
      contact: "Contact me",
      projectsDone: "Projects completed",
      expertise: "Fields of expertise",
      studyYears: "Years of study",
      exploreTitle: "Explore my world",
      exploreSubtitle: "Check out my projects, background or ask me questions",
      projects: "Projects",
      viewProjects: "See my work",
      about: "About",
      learnMore: "Learn more about me",
      experience: "Experience",
      myPath: "Professional background",
      contactCard: "Contact",
      sendMessage: "Send me a message",
      chat: "AI Chat",
      askQuestions: "Ask me questions",
      expertiseTitle: "My areas of expertise",
      expertiseSubtitle: "Technologies and skills I master",
      statsTitle: "In numbers",
      statsSubtitle: "My journey in statistics",
      expYears: "Years of experience",
      peopleLed: "People led",
      techMastered: "Technologies mastered",
      readyTitle: "Ready to collaborate?",
      readySubtitle: "Check out my projects, explore my background or contact me directly.",
    },
  }[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        
        <Container>
          <div className="relative pt-20 pb-16 text-center">
            <div className="mx-auto max-w-4xl">
              <div className="mb-8">
                {/* Photo de profil */}
                {profile.photo_path && (
                  <div className="flex justify-center mb-8">
                    <PhotoDisplay
                      src={profile.photo_path}
                      alt={`Photo de ${profile.name}`}
                      size="3xl"
                      className="border-4 border-white/20"
                    />
                  </div>
                )}
                
                <div className="flex flex-wrap justify-center gap-4 mb-4">
                  <Badge variant="secondary">
                    <Sparkles className="w-4 h-4 mr-2" />
                    {texts.heroBadge}
                  </Badge>
                  <CVBadge />
                </div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
                  {texts.greet}{" "}
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {profile.name.split(' ')[0]}
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                  {profile.title}
                </p>
                <p className="text-lg text-gray-400 max-w-4xl mx-auto leading-relaxed whitespace-pre-line">
                  {profile.bio}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <Link
                  href="/about"
                  className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-200 hover:scale-105"
                >
                  {texts.discover}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/chat"
                  className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-lg hover:from-orange-400 hover:to-red-400 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-orange-500/25"
                >
                  <Bot className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                  {texts.aiChat}
                </Link>
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-all duration-200 hover:scale-105"
                >
                  <MessageCircle className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                  {texts.contact}
                </Link>
                <CVDownload
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-slate-900"
                />
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">{profile.projects.length}+</div>
                  <div className="text-gray-400">{texts.projectsDone}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">{profile.skills.length}</div>
                  <div className="text-gray-400">{texts.expertise}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">{profile.stats.study_years}</div>
                  <div className="text-gray-400">{texts.studyYears}</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Quick Navigation */}
      <section className="py-16 bg-white/5 backdrop-blur-sm">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">{texts.exploreTitle}</h2>
            <p className="text-gray-300">{texts.exploreSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/projects"
              className="group p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-500/30 transition-colors">
                  <Briefcase className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{texts.projects}</h3>
                <p className="text-gray-400 text-sm">{texts.viewProjects}</p>
              </div>
            </Link>

            <Link
              href="/about"
              className="group p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500/30 transition-colors">
                  <GraduationCap className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{texts.about}</h3>
                <p className="text-gray-400 text-sm">{texts.learnMore}</p>
              </div>
            </Link>

            <Link
              href="/contact"
              className="group p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500/30 transition-colors">
                  <MessageCircle className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{texts.contactCard}</h3>
                <p className="text-gray-400 text-sm">{texts.sendMessage}</p>
              </div>
            </Link>
            <Link
              href="/chat"
              className="group p-6 bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm rounded-xl border border-orange-400/30 hover:from-orange-500/30 hover:to-red-500/30 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-orange-500/25"
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:from-orange-400 group-hover:to-red-400 transition-all duration-300 shadow-md">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{texts.chat}</h3>
                <p className="text-orange-200 text-sm">{texts.askQuestions}</p>
              </div>
            </Link>
          </div>
        </Container>
      </section>

      {/* Featured Skills */}
      <section className="py-16">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">{texts.expertiseTitle}</h2>
            <p className="text-gray-300">{texts.expertiseSubtitle}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {profile.skills.map((skill, index) => (
              <div key={index} className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">{skill.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skill.technologies.slice(0, 4).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-white/10 text-white text-sm rounded-full border border-white/20"
                    >
                      {tech}
                    </span>
                  ))}
                  {skill.technologies.length > 4 && (
                    <span className="px-3 py-1 bg-white/10 text-white text-sm rounded-full border border-white/20">
                      +{skill.technologies.length - 4}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-white/5 backdrop-blur-sm">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">{texts.statsTitle}</h2>
            <p className="text-gray-300">{texts.statsSubtitle}</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">{profile.stats.experience_years}+</div>
              <div className="text-gray-300">{texts.expYears}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">{profile.stats.people_led}</div>
              <div className="text-gray-300">{texts.peopleLed}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">{profile.projects.length}</div>
              <div className="text-gray-300">{texts.projectsDone}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">{profile.skills.reduce((acc, skill) => acc + skill.technologies.length, 0)}+</div>
              <div className="text-gray-300">{texts.techMastered}</div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              {texts.readyTitle}
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              {texts.readySubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-all duration-200 hover:scale-105"
              >
                <MessageCircle className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                {texts.contact}
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-white/30 rounded-lg hover:bg-white/10 transition-all duration-200 hover:scale-105"
              >
                {texts.discover}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}