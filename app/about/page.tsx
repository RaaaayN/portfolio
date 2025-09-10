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
import { Code, Brain, Database, Globe, Award, Users, Briefcase, GraduationCap, Calendar, MapPin, Star, Target, Zap } from "lucide-react";

export default function AboutPage() {
  const profile = readProfile();

  const experienceStats = [
    {
      title: "Années d'expérience",
      value: "3+",
      description: "En gestion d'équipe et projets",
      icon: <Calendar className="w-6 h-6" />
    },
    {
      title: "Équipe dirigée",
      value: "15",
      description: "Personnes en Junior-Entreprise",
      icon: <Users className="w-6 h-6" />
    },
    {
      title: "Projets clients",
      value: "10+",
      description: "Réalisés avec succès",
      icon: <Briefcase className="w-6 h-6" />
    },
    {
      title: "Formations données",
      value: "20+",
      description: "Sessions d'encadrement",
      icon: <Award className="w-6 h-6" />
    }
  ];

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

        {/* 1. À propos de moi */}
        <section className="mb-16">
          <SectionTitle title="À propos de moi" />
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
          <SectionTitle title="Mon expérience en chiffres" />
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
          <SectionTitle title="Ma formation" />
          <Timeline items={profile.education} />
        </section>

        {/* 4. Parcours professionnel */}
        <section className="mb-16">
          <SectionTitle title="Mon parcours professionnel" />
          <Timeline items={profile.experience} />
        </section>

        {/* 5. Compétences techniques */}
        <section className="mb-16">
          <SectionTitle title="Mes compétences techniques" />
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
          <SectionTitle title="Mes réalisations clés" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Leadership & Management
                  </h3>
                  <p className="text-gray-600 mb-3">
                    Présidence de la Junior-Entreprise UTC avec direction d'une équipe de 15 personnes, 
                    croissance de 40% du chiffre d'affaires et formation de 32 membres.
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
                    Projets Techniques
                  </h3>
                  <p className="text-gray-600 mb-3">
                    Développement de solutions IA avancées : LSTM multivarié, moteur de recherche, 
                    application RAG avec LangChain et applications web de data science.
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
            <SectionTitle title="Certifications" />
            <CertificationsList certifications={profile.certifications} />
          </section>
        )}

        {/* 8. Langues */}
        {profile.languages && profile.languages.length > 0 && (
          <section className="mb-16">
            <SectionTitle title="Langues" />
            <LanguagesList languages={profile.languages} />
          </section>
        )}

        {/* 9. Centres d'intérêt */}
        {profile.hobbies && profile.hobbies.length > 0 && (
          <section className="mb-16">
            <SectionTitle title="Centres d'intérêt" />
            <HobbiesList hobbies={profile.hobbies} />
          </section>
        )}

        {/* 10. CTA Section */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Intéressé par mon profil ?
          </h2>
          <p className="text-gray-600 mb-6">
            N'hésitez pas à me contacter, télécharger mon CV ou utiliser le chat IA pour en savoir plus !
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CVDownload variant="default" size="md" />
            <a
              href={`mailto:${profile.contact.email}`}
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Envoyer un email
            </a>
            <a
              href="/chat"
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-400 hover:to-red-400 transition-all duration-200 shadow-lg hover:shadow-orange-500/25"
            >
              Chat IA
            </a>
          </div>
        </section>
      </Container>
    </div>
  );
}
