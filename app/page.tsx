import { readProfile } from "@/lib/readProfile";
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { Card } from "@/components/Card";
import { ProjectCard } from "@/components/ProjectCard";
import { Timeline } from "@/components/Timeline";

export default function Home() {
  const profile = readProfile();

  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* Hero Section */}
        <section id="home" className="section bg-gradient-to-br from-blue-50 to-purple-50">
          <Container>
            <div className="text-center">
              <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
                Bonjour, je suis{" "}
                <span className="gradient-text">{profile.name}</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                {profile.title}
              </p>
              <p className="text-lg text-gray-500 max-w-3xl mx-auto">
                {profile.bio}
              </p>
            </div>
          </Container>
        </section>

        {/* About Section */}
        <section id="about" className="section">
          <Container>
            <SectionTitle title="À propos" />
            <Card>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 leading-relaxed">
                  {profile.about}
                </p>
              </div>
            </Card>
          </Container>
        </section>

        {/* Skills Section */}
        <section id="skills" className="section bg-gray-50">
          <Container>
            <SectionTitle title="Compétences" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profile.skills.map((skill, index) => (
                <Card key={index}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {skill.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skill.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* Projects Section */}
        <section id="projects" className="section">
          <Container>
            <SectionTitle title="Projets" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {profile.projects.map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
            </div>
          </Container>
        </section>

        {/* Experience Section */}
        <section id="experience" className="section bg-gray-50">
          <Container>
            <SectionTitle title="Expérience" />
            <Timeline items={profile.experience} />
          </Container>
        </section>

        {/* Education Section */}
        <section id="education" className="section">
          <Container>
            <SectionTitle title="Formation" />
            <Timeline items={profile.education} />
          </Container>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section bg-gradient-to-br from-blue-50 to-purple-50">
          <Container>
            <SectionTitle title="Contact" />
            <Card>
              <div className="text-center">
                <p className="text-lg text-gray-600 mb-6">
                  Intéressé par mon profil ? N'hésitez pas à me contacter !
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href={`mailto:${profile.contact.email}`}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Envoyer un email
                  </a>
                  <a
                    href={profile.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </Card>
          </Container>
        </section>
      </main>
    </div>
  );
}
