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
import { useLanguage } from "@/lib/LanguageContext";
import { Code, Brain, Database, Globe, Award, Users, Briefcase, GraduationCap, Calendar, MapPin } from "lucide-react";

export default function AboutPage() {
  const { language } = useLanguage();
  const profile = readProfile(language);

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

        {/* About Section */}
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

        {/* Experience Stats */}
        <section className="mb-16">
          <SectionTitle title="Mon expérience en chiffres" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {experienceStats.map((stat, index) => (
              <Card key={index} className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-lg font-semibold text-gray-700 mb-1">{stat.title}</div>
                <div className="text-sm text-gray-500">{stat.description}</div>
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

        {/* Key Achievements */}
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
                    Présidence Junior-Entreprise UTC
                  </h3>
                  <p className="text-gray-600 mb-3">
                    Direction d'une équipe de 15 personnes, développement commercial, 
                    gestion de projets clients et formation des membres. Croissance de 
                    40% du chiffre d'affaires sous ma direction.
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
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Responsable Recrutement
                  </h3>
                  <p className="text-gray-600 mb-3">
                    Gestion complète du processus de recrutement, organisation d'entretiens, 
                    intégration de nouveaux membres et formation continue. 50+ candidats 
                    évalués avec un taux de rétention de 90%.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" size="sm">RH</Badge>
                    <Badge variant="secondary" size="sm">Recrutement</Badge>
                    <Badge variant="secondary" size="sm">Formation</Badge>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Stage Développement IA
                  </h3>
                  <p className="text-gray-600 mb-3">
                    Développement d'applications web et participation à des projets 
                    d'intelligence artificielle. Contribution à l'amélioration des 
                    performances de 30% sur les algorithmes de recommandation.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="default" size="sm">Python</Badge>
                    <Badge variant="default" size="sm">Machine Learning</Badge>
                    <Badge variant="default" size="sm">Docker</Badge>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Projet de Fin d'Études
                  </h3>
                  <p className="text-gray-600 mb-3">
                    Développement d'un système RAG (Retrieval-Augmented Generation) 
                    pour la génération de réponses contextuelles. Note de 18/20 
                    et présentation devant un jury d'experts.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="warning" size="sm">RAG</Badge>
                    <Badge variant="warning" size="sm">NLP</Badge>
                    <Badge variant="warning" size="sm">Innovation</Badge>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Skills Evolution Timeline */}
        <section className="mb-16">
          <SectionTitle title="Évolution de mes compétences" />
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">2021-2022 : Fondations</h4>
                <p className="text-gray-600">Classes préparatoires - Mathématiques, Physique, Informatique</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-4 h-4 bg-purple-600 rounded-full"></div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">2022-2023 : Spécialisation</h4>
                <p className="text-gray-600">Entrée à l'UTC - Développement web, Python, bases de données</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-4 h-4 bg-green-600 rounded-full"></div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">2023-2024 : Leadership</h4>
                <p className="text-gray-600">Présidence Junior-Entreprise - Management, IA, Data Science</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-4 h-4 bg-orange-600 rounded-full"></div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">2024-2025 : Expertise</h4>
                <p className="text-gray-600">Projets RAG, Machine Learning avancé, Innovation technologique</p>
              </div>
            </div>
          </div>
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
            N'hésitez pas à me contacter ou télécharger mon CV pour en savoir plus !
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CVDownload variant="default" size="md" />
            <a
              href={`mailto:${profile.contact.email}`}
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Envoyer un email
            </a>
          </div>
        </section>

        {/* Certifications Section */}
        {profile.certifications && profile.certifications.length > 0 && (
          <section className="mb-16">
            <SectionTitle title="Certifications" />
            <CertificationsList certifications={profile.certifications} />
          </section>
        )}

        {/* Languages Section */}
        {profile.languages && profile.languages.length > 0 && (
          <section className="mb-16">
            <SectionTitle title="Langues" />
            <LanguagesList languages={profile.languages} />
          </section>
        )}

        {/* Hobbies Section */}
        {profile.hobbies && profile.hobbies.length > 0 && (
          <section className="mb-16">
            <SectionTitle title="Centres d'intérêt" />
            <HobbiesList hobbies={profile.hobbies} />
          </section>
        )}
      </Container>
    </div>
  );
}
