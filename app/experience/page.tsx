import { readProfile } from "@/lib/readProfile";
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { Timeline } from "@/components/Timeline";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { Briefcase, GraduationCap, Award, Users, Calendar, MapPin } from "lucide-react";

export default function ExperiencePage() {
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
    <div className="min-h-screen bg-gray-50">
      <Container className="py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Mon Parcours
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Découvrez mon expérience professionnelle, mes formations et les compétences 
            que j'ai développées au fil des années.
          </p>
        </div>

        {/* Stats Section */}
        <section className="mb-16">
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

        {/* Professional Experience */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <SectionTitle title="Expérience professionnelle" />
            <Badge variant="default" size="lg">
              <Briefcase className="w-4 h-4 mr-2" />
              Carrière
            </Badge>
          </div>
          <Timeline items={profile.experience} />
        </section>

        {/* Education */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <SectionTitle title="Formation académique" />
            <Badge variant="secondary" size="lg">
              <GraduationCap className="w-4 h-4 mr-2" />
              Éducation
            </Badge>
          </div>
          <Timeline items={profile.education} />
        </section>

        {/* Key Achievements */}
        <section className="mb-16">
          <SectionTitle title="Réalisations clés" />
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

        {/* Skills Timeline */}
        <section className="mb-16">
          <SectionTitle title="Évolution des compétences" />
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

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Intéressé par mon profil ?
          </h2>
          <p className="text-gray-600 mb-6">
            Découvrez mes projets, explorez mes compétences, ou discutons d'opportunités de collaboration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/projects"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Voir mes projets
            </a>
            <a
              href="/chat"
              className="inline-flex items-center justify-center px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Me poser des questions
            </a>
          </div>
        </section>
      </Container>
    </div>
  );
}
