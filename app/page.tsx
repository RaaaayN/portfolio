import { readProfile } from "@/lib/readProfile";
import { Container } from "@/components/Container";
import { Badge } from "@/components/Badge";
import { CVDownload, CVBadge } from "@/components/CVDownload";
import { PhotoDisplay } from "@/components/PhotoDisplay";
import Link from "next/link";
import { ArrowRight, MessageCircle, Code, Briefcase, GraduationCap, Sparkles } from "lucide-react";

export default function Home() {
  const profile = readProfile();

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
                    Portfolio Interactif
                  </Badge>
                  <CVBadge />
                </div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
                  Salut, je suis{" "}
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
                  Découvrir mon parcours
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/chat"
                  className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-purple-400 rounded-lg hover:bg-purple-400 hover:text-slate-900 transition-all duration-200 hover:scale-105"
                >
                  <MessageCircle className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                  Me poser des questions
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
                  <div className="text-gray-400">Projets réalisés</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">{profile.skills.length}</div>
                  <div className="text-gray-400">Domaines d'expertise</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">4</div>
                  <div className="text-gray-400">Années d'études</div>
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
            <h2 className="text-3xl font-bold text-white mb-4">Explorez mon univers</h2>
            <p className="text-gray-300">Découvrez mes projets, mon parcours et posez-moi des questions</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/about"
              className="group p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500/30 transition-colors">
                  <Code className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">À propos</h3>
                <p className="text-gray-400 text-sm">Mon parcours et mes compétences</p>
              </div>
            </Link>

            <Link
              href="/projects"
              className="group p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-500/30 transition-colors">
                  <Briefcase className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Projets</h3>
                <p className="text-gray-400 text-sm">Mes réalisations techniques</p>
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
                <h3 className="text-lg font-semibold text-white mb-2">À propos</h3>
                <p className="text-gray-400 text-sm">Mon parcours complet</p>
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
                <h3 className="text-lg font-semibold text-white mb-2">Contact</h3>
                <p className="text-gray-400 text-sm">Envoyez-moi un message</p>
              </div>
            </Link>

            <Link
              href="/chat"
              className="group p-6 bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm rounded-xl border border-orange-400/30 hover:from-orange-500/30 hover:to-red-500/30 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-orange-500/25"
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:from-orange-400 group-hover:to-red-400 transition-all duration-300 shadow-md">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Chat IA</h3>
                <p className="text-orange-200 text-sm">Posez-moi des questions</p>
              </div>
            </Link>
          </div>
        </Container>
      </section>

      {/* Featured Skills */}
      <section className="py-16">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Mes domaines d'expertise</h2>
            <p className="text-gray-300">Technologies et compétences que je maîtrise</p>
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
            <h2 className="text-3xl font-bold text-white mb-4">En quelques chiffres</h2>
            <p className="text-gray-300">Mon parcours en statistiques</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">3+</div>
              <div className="text-gray-300">Années d'expérience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">15</div>
              <div className="text-gray-300">Personnes dirigées</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">{profile.projects.length}</div>
              <div className="text-gray-300">Projets réalisés</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">{profile.skills.reduce((acc, skill) => acc + skill.technologies.length, 0)}+</div>
              <div className="text-gray-300">Technologies maîtrisées</div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Prêt à collaborer ?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Découvrez mes projets, explorez mon parcours, ou posez-moi directement des questions via le chat IA.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/chat"
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-lg hover:from-orange-400 hover:to-red-400 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-orange-500/25"
              >
                <MessageCircle className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                Commencer une conversation
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-white/30 rounded-lg hover:bg-white/10 transition-all duration-200 hover:scale-105"
              >
                Découvrir mon parcours
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}