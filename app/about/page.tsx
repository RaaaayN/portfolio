import { readProfile } from "@/lib/readProfile";
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { Timeline } from "@/components/Timeline";
import { Code, Brain, Database, Globe, Award, Users } from "lucide-react";

export default function AboutPage() {
  const profile = readProfile();

  return (
    <div className="min-h-screen bg-white">
      <Container className="py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-32 h-32 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl font-bold text-white">
              {profile.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {profile.name}
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            {profile.title}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="default" size="lg">
              <Brain className="w-4 h-4 mr-2" />
              Intelligence Artificielle
            </Badge>
            <Badge variant="secondary" size="lg">
              <Database className="w-4 h-4 mr-2" />
              Data Science
            </Badge>
            <Badge variant="success" size="lg">
              <Code className="w-4 h-4 mr-2" />
              Développement Web
            </Badge>
          </div>
        </div>

        {/* About Section */}
        <section className="mb-16">
          <SectionTitle title="À propos de moi" />
          <Card>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed text-lg">
                {profile.about}
              </p>
            </div>
          </Card>
        </section>

        {/* Skills Section */}
        <section className="mb-16">
          <SectionTitle title="Mes compétences" />
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

        {/* Experience Section */}
        <section className="mb-16">
          <SectionTitle title="Mon expérience" />
          <Timeline items={profile.experience} />
        </section>

        {/* Education Section */}
        <section className="mb-16">
          <SectionTitle title="Ma formation" />
          <Timeline items={profile.education} />
        </section>

        {/* Achievements Section */}
        <section className="mb-16">
          <SectionTitle title="Mes réalisations" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Président Junior-Entreprise</h3>
              <p className="text-gray-600 text-sm">
                Direction d'une équipe de 15 personnes et gestion de projets clients
              </p>
            </Card>
            
            <Card className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Leadership & Management</h3>
              <p className="text-gray-600 text-sm">
                Expérience en recrutement, formation et encadrement d'équipe
              </p>
            </Card>
            
            <Card className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Projets IA Innovants</h3>
              <p className="text-gray-600 text-sm">
                Développement de systèmes RAG et de recommandation intelligents
              </p>
            </Card>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Intéressé par mon profil ?
          </h2>
          <p className="text-gray-600 mb-6">
            N'hésitez pas à me contacter ou à utiliser le chat IA pour en savoir plus !
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`mailto:${profile.contact.email}`}
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Envoyer un email
            </a>
            <a
              href="/chat"
              className="inline-flex items-center justify-center px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Chat IA
            </a>
          </div>
        </section>
      </Container>
    </div>
  );
}
