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
import { motion } from "framer-motion";

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

  const staggerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-base via-[#150d24] to-surface-base">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20">
        {/* Animated Orbs */}
        <motion.div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-accent/20 blur-[120px] pointer-events-none"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-accent/15 blur-[100px] pointer-events-none"
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        <Container>
          <div className="relative pt-12 pb-24">
            <div className="relative grid items-start gap-16 lg:grid-cols-[1.8fr,1fr]">
              <div className="text-left text-white">
                <motion.div
                  custom={0}
                  initial="hidden"
                  animate="visible"
                  variants={staggerVariants}
                  className="mb-8 flex flex-wrap items-center gap-4"
                >
                  <Badge
                    variant="secondary"
                    className="bg-white/10 text-white border border-white/20 backdrop-blur px-5 py-2"
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    {heroContent.tagline}
                  </Badge>
                  <CVBadge />
                </motion.div>

                <motion.h1
                  custom={1}
                  initial="hidden"
                  animate="visible"
                  variants={staggerVariants}
                  className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
                >
                  {texts.greet}{" "}
                  <span className="gradient-text-violet">
                    {firstName}
                  </span>
                  {lastName && (
                    <span className="text-white"> {lastName}</span>
                  )}
                </motion.h1>

                <motion.p
                  custom={2}
                  initial="hidden"
                  animate="visible"
                  variants={staggerVariants}
                  className="mt-6 text-xl text-slate-300 md:text-2xl"
                >
                  {heroContent.subtitle}
                </motion.p>

                <motion.p
                  custom={3}
                  initial="hidden"
                  animate="visible"
                  variants={staggerVariants}
                  className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-400 whitespace-pre-line"
                >
                  {profile.bio}
                </motion.p>

                {heroContent.highlights.length > 0 && (
                  <motion.div
                    custom={4}
                    initial="hidden"
                    animate="visible"
                    variants={staggerVariants}
                    className="mt-10"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent-light">
                      {texts.highlightTitle}
                    </p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {heroContent.highlights.map((highlight, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-4 shadow-lg backdrop-blur"
                        >
                          <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-400" />
                          <p className="text-sm text-slate-300">{highlight}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {heroContent.quote && (
                  <motion.div
                    custom={5}
                    initial="hidden"
                    animate="visible"
                    variants={staggerVariants}
                    className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-xl backdrop-blur"
                  >
                    <div className="flex items-center gap-2 text-accent-light">
                      <Quote className="h-5 w-5" />
                      <span className="text-xs font-semibold uppercase tracking-[0.3em]">
                        {texts.quoteTitle}
                      </span>
                    </div>
                    <p className="mt-4 text-lg leading-relaxed text-slate-300">{heroContent.quote}</p>
                    {heroContent.signature && (
                      <p className="mt-4 text-sm font-semibold text-accent-light">— {heroContent.signature}</p>
                    )}
                  </motion.div>
                )}

                <motion.div
                  custom={6}
                  initial="hidden"
                  animate="visible"
                  variants={staggerVariants}
                  className="mt-12 flex flex-col flex-wrap gap-4 sm:flex-row"
                >
                  <Link
                    href="/about"
                    className="group inline-flex items-center justify-center rounded-xl bg-accent px-8 py-4 text-lg font-semibold text-white shadow-glow-violet transition-all duration-200 hover:scale-105 hover:bg-violet-500"
                  >
                    {texts.discover}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/chat"
                    className="group inline-flex items-center justify-center rounded-xl border border-cyan-accent/40 text-cyan-accent hover:bg-cyan-accent/10 px-8 py-4 text-lg font-semibold transition-all duration-200 hover:scale-105"
                  >
                    <Bot className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                    {texts.aiChat}
                  </Link>
                  <Link
                    href="/contact"
                    className="group inline-flex items-center justify-center rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 px-8 py-4 text-lg font-semibold transition-all duration-200 hover:scale-105 hover:bg-emerald-500/30"
                  >
                    <MessageCircle className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                    {texts.contact}
                  </Link>
                  <CVDownload
                    variant="outline"
                    size="lg"
                  />
                </motion.div>

                <motion.div
                  custom={7}
                  initial="hidden"
                  animate="visible"
                  variants={staggerVariants}
                  className="mt-14 grid gap-4 text-left sm:grid-cols-3"
                >
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-lg backdrop-blur">
                    <p className="text-xs font-mono font-semibold uppercase tracking-[0.3em] text-accent-light">
                      {texts.projectsDone}
                    </p>
                    <p className="mt-3 text-3xl font-display font-bold text-white">{profile.projects.length}+</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-lg backdrop-blur">
                    <p className="text-xs font-mono font-semibold uppercase tracking-[0.3em] text-accent-light">
                      {texts.expertise}
                    </p>
                    <p className="mt-3 text-3xl font-display font-bold text-white">{profile.skills.length}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-lg backdrop-blur">
                    <p className="text-xs font-mono font-semibold uppercase tracking-[0.3em] text-accent-light">
                      {texts.studyYears}
                    </p>
                    <p className="mt-3 text-3xl font-display font-bold text-white">{profile.stats.study_years}</p>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                className="relative"
              >
                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-slate-300 shadow-2xl backdrop-blur">
                  {profile.photo_path && (
                    <div className="mx-auto mb-8 flex justify-center">
                      <PhotoDisplay
                        src={profile.photo_path}
                        alt={`Photo de ${profile.name}`}
                        size="3xl"
                        className="ring-4 ring-accent/30 ring-offset-4 ring-offset-surface-base shadow-xl"
                      />
                    </div>
                  )}

                  <div className="space-y-6">
                    <div>
                      <p className="text-xs font-mono font-semibold uppercase tracking-[0.35em] text-accent-light">
                        {texts.contactDirect}
                      </p>
                      <p className="mt-3 flex items-center gap-2 text-sm font-medium text-slate-300">
                        <MapPin className="h-4 w-4" />
                        <span>
                          {texts.locationLabel} {profile.location}
                        </span>
                      </p>
                    </div>

                    {heroContent.availability && (
                      <div className="rounded-2xl border border-accent/30 bg-accent/10 p-4">
                        <div className="flex items-center gap-2 text-accent-light">
                          <Sparkles className="h-4 w-4" />
                          <span className="text-sm font-semibold uppercase tracking-[0.25em]">
                            {texts.availabilityLabel}
                          </span>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-slate-300">
                          {heroContent.availability}
                        </p>
                      </div>
                    )}

                    <div className="space-y-3">
                      <a
                        href={`mailto:${profile.contact.email}`}
                        className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3 transition-colors hover:border-white/20 hover:bg-white/[0.08]"
                      >
                        <Mail className="h-5 w-5 text-accent-light" />
                        <div>
                          <p className="text-xs font-mono font-semibold uppercase tracking-[0.3em] text-accent-light">
                            {texts.emailLabel}
                          </p>
                          <p className="text-sm font-medium text-slate-300">{profile.contact.email}</p>
                        </div>
                      </a>
                      {profile.contact.phone && (
                        <a
                          href={`tel:${profile.contact.phone}`}
                          className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3 transition-colors hover:border-white/20 hover:bg-white/[0.08]"
                        >
                          <Phone className="h-5 w-5 text-accent-light" />
                          <div>
                            <p className="text-xs font-mono font-semibold uppercase tracking-[0.3em] text-accent-light">
                              {texts.phoneLabel}
                            </p>
                            <p className="text-sm font-medium text-slate-300">{profile.contact.phone}</p>
                          </div>
                        </a>
                      )}
                    </div>

                    {profile.contact.linkedin && (
                      <a
                        href={profile.contact.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-accent/40 hover:bg-accent/10 hover:text-accent-light"
                      >
                        <ArrowRight className="h-4 w-4" />
                        LinkedIn
                      </a>
                    )}

                    {hobbiesPreview.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 text-accent-light">
                          <Heart className="h-4 w-4" />
                          <span className="text-xs font-mono font-semibold uppercase tracking-[0.3em]">
                            {texts.hobbiesTitle}
                          </span>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {hobbiesPreview.map((hobby) => (
                            <span
                              key={hobby}
                              className="rounded-full border border-white/20 bg-white/[0.05] px-3 py-1 text-xs text-slate-300"
                            >
                              {hobby}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </Container>
      </section>

      {/* Quick Navigation */}
      <section className="py-16 bg-surface-raised/50">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl font-bold text-white mb-4">{texts.exploreTitle}</h2>
            <p className="text-slate-400">{texts.exploreSubtitle}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Link
                href="/projects"
                className="group block p-6 glass rounded-xl hover:border-accent/30 transition-all duration-300 hover:scale-105 hover:shadow-glow-violet"
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-violet-500/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-violet-500/30 transition-colors">
                    <Briefcase className="w-6 h-6 text-accent-light" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{texts.projects}</h3>
                  <p className="text-slate-400 text-sm">{texts.viewProjects}</p>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link
                href="/about"
                className="group block p-6 glass rounded-xl hover:border-emerald-500/30 transition-all duration-300 hover:scale-105"
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-500/30 transition-colors">
                    <GraduationCap className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{texts.about}</h3>
                  <p className="text-slate-400 text-sm">{texts.learnMore}</p>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link
                href="/contact"
                className="group block p-6 glass rounded-xl hover:border-cyan-accent/30 transition-all duration-300 hover:scale-105 hover:shadow-glow-cyan"
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-cyan-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-cyan-accent/30 transition-colors">
                    <MessageCircle className="w-6 h-6 text-cyan-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{texts.contactCard}</h3>
                  <p className="text-slate-400 text-sm">{texts.sendMessage}</p>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link
                href="/chat"
                className="group block p-6 glass rounded-xl border-cyan-accent/30 hover:bg-cyan-accent/5 transition-all duration-300 hover:scale-105 hover:shadow-glow-cyan"
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-cyan-accent rounded-lg flex items-center justify-center mx-auto mb-4 shadow-md">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{texts.chat}</h3>
                  <p className="text-cyan-light/70 text-sm">{texts.askQuestions}</p>
                </div>
              </Link>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Featured Skills */}
      <section className="py-16">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl font-bold text-white mb-4">{texts.expertiseTitle}</h2>
            <p className="text-slate-400">{texts.expertiseSubtitle}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {profile.skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 glass rounded-xl hover:border-white/[0.15] transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-white mb-4">{skill.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skill.technologies.slice(0, 4).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-white/[0.08] text-slate-300 text-xs rounded-full border border-white/10 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                  {skill.technologies.length > 4 && (
                    <span className="px-2 py-1 bg-accent/20 text-accent-light text-xs rounded-full border border-accent/30 font-mono">
                      +{skill.technologies.length - 4}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="glass rounded-3xl border-accent/20 shadow-glow-violet p-12 text-center"
          >
            <h2 className="font-display text-3xl font-bold text-white mb-4">
              {texts.readyTitle}
            </h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
              {texts.readySubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-accent rounded-xl hover:bg-violet-500 transition-all duration-200 hover:scale-105 shadow-glow-violet"
              >
                <MessageCircle className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                {texts.contact}
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border border-white/20 rounded-xl hover:bg-white/[0.08] transition-all duration-200 hover:scale-105"
              >
                {texts.discover}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
