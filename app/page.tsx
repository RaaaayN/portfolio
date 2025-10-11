"use client";

import { readProfile } from "@/lib/readProfile";
import { Container } from "@/components/Container";
import { Badge } from "@/components/Badge";
import { CVDownload, CVBadge } from "@/components/CVDownload";
import { PhotoDisplay } from "@/components/PhotoDisplay";
import Link from "next/link";
import {
  ArrowRight,
  MessageCircle,
  Briefcase,
  GraduationCap,
  Sparkles,
  Bot,
  MapPin,
  Mail,
  Phone,
  CheckCircle2,
  Quote,
  Heart,
} from "lucide-react";
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
      highlightTitle: "Ce qui me définit",
      quoteTitle: "Ma vision",
      availabilityLabel: "Disponibilité",
      locationLabel: "Basé à",
      contactDirect: "Contact direct",
      hobbiesTitle: "Ce qui m'anime",
      emailLabel: "Email",
      phoneLabel: "Téléphone",
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
      highlightTitle: "What defines me",
      quoteTitle: "My vision",
      availabilityLabel: "Availability",
      locationLabel: "Based in",
      contactDirect: "Direct contact",
      hobbiesTitle: "What drives me",
      emailLabel: "Email",
      phoneLabel: "Phone",
    },
  }[language];

  const [firstName, ...restOfNameParts] = profile.name.split(" ");
  const lastName = restOfNameParts.join(" ");
  const heroContent = {
    tagline: profile.hero?.tagline ?? texts.heroBadge,
    subtitle: profile.hero?.subtitle ?? profile.title,
    highlights: profile.hero?.highlights ?? [],
    quote: profile.hero?.quote,
    signature: profile.hero?.signature,
    availability: profile.hero?.availability,
  };
  const hobbiesPreview = profile.hobbies?.slice(0, 3) ?? [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-60 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="pointer-events-none absolute -top-48 left-1/2 h-[540px] w-[540px] -translate-x-1/2 rounded-full bg-blue-500/40 blur-3xl"></div>

        <Container>
          <div className="relative pt-24 pb-24">
            <div className="relative grid items-start gap-16 lg:grid-cols-[1.8fr,1fr]">
              <div className="text-left text-white">
                <div className="mb-8 flex flex-wrap items-center gap-4">
                  <Badge
                    variant="secondary"
                    className="bg-white/10 text-white border border-white/20 backdrop-blur px-5 py-2"
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    {heroContent.tagline}
                  </Badge>
                  <CVBadge />
                </div>

                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  {texts.greet}{" "}
                  <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-pink-200 bg-clip-text text-transparent">
                    {firstName}
                  </span>
                  {lastName && (
                    <span className="text-white"> {lastName}</span>
                  )}
                </h1>
                <p className="mt-6 text-xl text-blue-100 md:text-2xl">{heroContent.subtitle}</p>
                <p className="mt-4 max-w-3xl text-lg leading-relaxed text-blue-100/80 whitespace-pre-line">
                  {profile.bio}
                </p>

                {heroContent.highlights.length > 0 && (
                  <div className="mt-10">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-200">
                      {texts.highlightTitle}
                    </p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {heroContent.highlights.map((highlight, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/10 p-4 shadow-lg backdrop-blur"
                        >
                          <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-300" />
                          <p className="text-sm text-blue-50/90">{highlight}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {heroContent.quote && (
                  <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur">
                    <div className="flex items-center gap-2 text-blue-200">
                      <Quote className="h-5 w-5" />
                      <span className="text-xs font-semibold uppercase tracking-[0.3em]">
                        {texts.quoteTitle}
                      </span>
                    </div>
                    <p className="mt-4 text-lg leading-relaxed text-blue-50/90">{heroContent.quote}</p>
                    {heroContent.signature && (
                      <p className="mt-4 text-sm font-semibold text-blue-200">— {heroContent.signature}</p>
                    )}
                  </div>
                )}

                <div className="mt-12 flex flex-col flex-wrap gap-4 sm:flex-row">
                  <Link
                    href="/about"
                    className="group inline-flex items-center justify-center rounded-xl bg-blue-500 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-blue-400"
                  >
                    {texts.discover}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/chat"
                    className="group inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-orange-400 hover:to-pink-400"
                  >
                    <Bot className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                    {texts.aiChat}
                  </Link>
                  <Link
                    href="/contact"
                    className="group inline-flex items-center justify-center rounded-xl bg-emerald-500 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-emerald-400"
                  >
                    <MessageCircle className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                    {texts.contact}
                  </Link>
                  <CVDownload
                    variant="outline"
                    size="lg"
                    className="border-white/60 text-white hover:border-white hover:bg-white hover:text-slate-900"
                  />
                </div>

                <div className="mt-14 grid gap-4 text-left sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg backdrop-blur">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-200">
                      {texts.projectsDone}
                    </p>
                    <p className="mt-3 text-3xl font-bold text-white">{profile.projects.length}+</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg backdrop-blur">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-200">
                      {texts.expertise}
                    </p>
                    <p className="mt-3 text-3xl font-bold text-white">{profile.skills.length}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg backdrop-blur">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-200">
                      {texts.studyYears}
                    </p>
                    <p className="mt-3 text-3xl font-bold text-white">{profile.stats.study_years}</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="rounded-3xl border border-white/10 bg-white/10 p-8 text-blue-100 shadow-2xl backdrop-blur">
                  {profile.photo_path && (
                    <div className="mx-auto mb-8 flex justify-center">
                      <PhotoDisplay
                        src={profile.photo_path}
                        alt={`Photo de ${profile.name}`}
                        size="3xl"
                        className="border-4 border-white/20 shadow-xl"
                      />
                    </div>
                  )}

                  <div className="space-y-6">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-200">
                        {texts.contactDirect}
                      </p>
                      <p className="mt-3 flex items-center gap-2 text-sm font-medium text-blue-100">
                        <MapPin className="h-4 w-4" />
                        <span>
                          {texts.locationLabel} {profile.location}
                        </span>
                      </p>
                    </div>

                    {heroContent.availability && (
                      <div className="rounded-2xl border border-blue-300/30 bg-blue-900/40 p-4">
                        <div className="flex items-center gap-2 text-blue-100">
                          <Sparkles className="h-4 w-4" />
                          <span className="text-sm font-semibold uppercase tracking-[0.25em]">
                            {texts.availabilityLabel}
                          </span>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-blue-100/90">
                          {heroContent.availability}
                        </p>
                      </div>
                    )}

                    <div className="space-y-3">
                      <a
                        href={`mailto:${profile.contact.email}`}
                        className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-3 transition-colors hover:border-white/30 hover:bg-white/20"
                      >
                        <Mail className="h-5 w-5" />
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-200">
                            {texts.emailLabel}
                          </p>
                          <p className="text-sm font-medium text-blue-100">{profile.contact.email}</p>
                        </div>
                      </a>
                      {profile.contact.phone && (
                        <a
                          href={`tel:${profile.contact.phone}`}
                          className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-3 transition-colors hover:border-white/30 hover:bg-white/20"
                        >
                          <Phone className="h-5 w-5" />
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-200">
                              {texts.phoneLabel}
                            </p>
                            <p className="text-sm font-medium text-blue-100">{profile.contact.phone}</p>
                          </div>
                        </a>
                      )}
                    </div>

                    {profile.contact.linkedin && (
                      <a
                        href={profile.contact.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-blue-100 transition-colors hover:border-white/40 hover:bg-white/20"
                      >
                        <ArrowRight className="h-4 w-4" />
                        LinkedIn
                      </a>
                    )}

                    {hobbiesPreview.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 text-blue-200">
                          <Heart className="h-4 w-4" />
                          <span className="text-xs font-semibold uppercase tracking-[0.3em]">
                            {texts.hobbiesTitle}
                          </span>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {hobbiesPreview.map((hobby) => (
                            <span
                              key={hobby}
                              className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-blue-100"
                            >
                              {hobby}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
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