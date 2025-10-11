"use client";

import { useState } from "react";
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { Card } from "@/components/Card";
import { CVDownload, CVBadge } from "@/components/CVDownload";
import { readProfile } from "@/lib/readProfile";
import { useLanguage } from "@/lib/LanguageContext";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Send,
  CheckCircle,
  AlertCircle,
  Clock,
  MessageSquare,
  Calendar,
  UserCheck
} from "lucide-react";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const { language } = useLanguage();
  const profile = readProfile(language);
  const texts = {
    fr: {
      heroTitle: "Contactez-moi",
      heroDescription:
        "Une question, un projet, une collaboration ? N'hésitez pas à me contacter !\nJe réponds généralement sous 24h.",
      responseTime: "Réponse sous 24h",
      contactSectionTitle: "Informations de contact",
      contactIntro:
        "Choisissez le canal qui vous convient le mieux et obtenez une réponse rapide et personnalisée.",
      heroHighlights: [
        {
          title: "Réponse rapide",
          description: "Je vous recontacte généralement sous 24h pour un premier échange."
        },
        {
          title: "Échange personnalisé",
          description: "Nous définissons ensemble les contours de votre besoin et les prochaines étapes."
        },
        {
          title: "Suivi complet",
          description: "Je vous accompagne de la réflexion à la mise en production."
        }
      ],
      cvTitle: "Téléchargez mon CV",
      cvDescription: "Consultez mon parcours complet et mes compétences",
      formTitle: "Envoyez-moi un message",
      form: {
        nameLabel: "Nom complet *",
        namePlaceholder: "Votre nom",
        emailLabel: "Email *",
        emailPlaceholder: "votre@email.com",
        subjectLabel: "Sujet *",
        subjectPlaceholder: "Objet de votre message",
        messageLabel: "Message *",
        messagePlaceholder: "Décrivez votre projet, question ou collaboration...",
        success: "Message envoyé avec succès ! Je vous répondrai bientôt.",
        error: "Erreur lors de l'envoi. Veuillez réessayer ou me contacter directement.",
        sending: "Envoi en cours...",
        submit: "Envoyer le message",
      },
      contactInfo: {
        emailDescription: "Réponse sous 24h",
        phoneDescription: "Disponible 9h-18h",
        locationDescription: "Proche de Paris",
        linkedinDescription: "Profil professionnel",
        githubDescription: "Code source",
      },
      contactInfoTitles: {
        email: "Email",
        phone: "Téléphone",
        location: "Localisation",
        linkedin: "LinkedIn",
        github: "GitHub",
      },
      availability: {
        title: "Disponibilités",
        description: "Je suis joignable en semaine et peux prévoir un créneau rapide pour échanger sur votre projet.",
        slots: [
          {
            label: "Lundi - Vendredi",
            value: "09h00 - 18h00 (CET)"
          },
          {
            label: "Visio découverte",
            value: "30 minutes pour cadrer votre besoin"
          }
        ]
      },
      nextSteps: {
        title: "Comment se passe la suite ?",
        description: "Une approche structurée pour avancer rapidement et sereinement.",
        steps: [
          "Compréhension de votre contexte et de vos objectifs",
          "Planification d'un échange pour définir la feuille de route",
          "Envoi d'une proposition et démarrage du projet"
        ]
      },
      chatCard: {
        title: "Préférez le chat IA ?",
        description: "Posez-moi des questions directement via l'assistant IA",
        button: "Accéder au chat IA",
      },
    },
    en: {
      heroTitle: "Get in touch",
      heroDescription:
        "Have a question, project or collaboration in mind? Feel free to reach out!\nI usually reply within 24 hours.",
      responseTime: "Response within 24h",
      contactSectionTitle: "Contact information",
      contactIntro:
        "Pick the channel that fits you best and get a fast, tailored response.",
      heroHighlights: [
        {
          title: "Quick reply",
          description: "I usually reach back within 24h for an initial discussion."
        },
        {
          title: "Tailored exchange",
          description: "We define together the scope of your needs and the next steps."
        },
        {
          title: "End-to-end support",
          description: "I support you from the first idea to production delivery."
        }
      ],
      cvTitle: "Download my resume",
      cvDescription: "See my complete background and skills",
      formTitle: "Send me a message",
      form: {
        nameLabel: "Full name *",
        namePlaceholder: "Your name",
        emailLabel: "Email *",
        emailPlaceholder: "your@email.com",
        subjectLabel: "Subject *",
        subjectPlaceholder: "Purpose of your message",
        messageLabel: "Message *",
        messagePlaceholder: "Describe your project, question or collaboration...",
        success: "Message sent successfully! I'll get back to you soon.",
        error: "An error occurred. Please try again or contact me directly.",
        sending: "Sending...",
        submit: "Send message",
      },
      contactInfo: {
        emailDescription: "Reply within 24h",
        phoneDescription: "Available 9am-6pm",
        locationDescription: "Near Paris",
        linkedinDescription: "Professional profile",
        githubDescription: "Source code",
      },
      contactInfoTitles: {
        email: "Email",
        phone: "Phone",
        location: "Location",
        linkedin: "LinkedIn",
        github: "GitHub",
      },
      availability: {
        title: "Availability",
        description: "I'm reachable on weekdays and can quickly schedule a call about your project.",
        slots: [
          {
            label: "Monday - Friday",
            value: "09:00 AM - 06:00 PM (CET)"
          },
          {
            label: "Discovery call",
            value: "30 minutes to align on your goals"
          }
        ]
      },
      nextSteps: {
        title: "What happens next?",
        description: "A structured approach to move forward quickly and confidently.",
        steps: [
          "Understand your context and objectives",
          "Schedule a call to outline the roadmap",
          "Send a proposal and kick-off the project"
        ]
      },
      chatCard: {
        title: "Prefer the AI chat?",
        description: "Ask me questions directly via the AI assistant",
        button: "Open the AI chat",
      },
    },
  }[language];
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: texts.contactInfoTitles.email,
      value: profile.contact.email,
      href: `mailto:${profile.contact.email}`,
      description: texts.contactInfo.emailDescription
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: texts.contactInfoTitles.phone,
      value: profile.contact.phone,
      href: `tel:${profile.contact.phone.replace(/\s+/g, '')}`,
      description: texts.contactInfo.phoneDescription
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: texts.contactInfoTitles.location,
      value: profile.location,
      href: "#",
      description: texts.contactInfo.locationDescription
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      title: texts.contactInfoTitles.linkedin,
      value: profile.name,
      href: profile.contact.linkedin,
      description: texts.contactInfo.linkedinDescription
    },
    {
      icon: <Github className="w-6 h-6" />,
      title: texts.contactInfoTitles.github,
      value: profile.contact.github.split('/').pop(),
      href: profile.contact.github,
      description: texts.contactInfo.githubDescription
    }
  ];

  const heroHighlights = [
    {
      icon: Clock,
      ...texts.heroHighlights[0]
    },
    {
      icon: MessageSquare,
      ...texts.heroHighlights[1]
    },
    {
      icon: CheckCircle,
      ...texts.heroHighlights[2]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Container className="py-16 space-y-16">
        {/* Hero Section */}
        <Card className="relative overflow-hidden border-none bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          <div className="relative z-10 grid gap-10 lg:grid-cols-[1.2fr_1fr] items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {texts.heroTitle}
              </h1>
              <p className="text-lg md:text-xl text-white/80 whitespace-pre-line">
                {texts.heroDescription}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <CVBadge />
                <div className="flex items-center text-sm font-medium text-white/80 bg-white/10 rounded-full px-4 py-2 backdrop-blur">
                  <Clock className="w-4 h-4 mr-2" />
                  {texts.responseTime}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {heroHighlights.map((highlight, index) => {
                const Icon = highlight.icon;
                return (
                  <div
                    key={index}
                    className="rounded-2xl bg-white/10 border border-white/10 p-4 text-left backdrop-blur"
                  >
                    <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-sm font-semibold text-white">
                      {highlight.title}
                    </p>
                    <p className="text-sm text-white/70 mt-1">
                      {highlight.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
          {/* Contact Information */}
          <div className="space-y-10">
            <div className="space-y-4">
              <SectionTitle title={texts.contactSectionTitle} />
              <p className="text-gray-600 max-w-2xl">
                {texts.contactIntro}
              </p>
            </div>

            {/* CV Download Section */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <div className="md:flex md:items-center md:justify-between md:space-x-8 space-y-6 md:space-y-0">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {texts.cvTitle}
                  </h3>
                  <p className="text-gray-600">
                    {texts.cvDescription}
                  </p>
                </div>
                <CVDownload variant="default" size="lg" />
              </div>
            </Card>

            {/* Contact Details */}
            <Card>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 flex-shrink-0">
                      {info.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-gray-900">
                        {info.title}
                      </h3>
                      <a
                        href={info.href}
                        className="text-blue-600 hover:text-blue-700 font-medium block"
                        target={info.href.startsWith('http') ? '_blank' : undefined}
                        rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {info.value}
                      </a>
                      <p className="text-gray-500 text-sm mt-1">
                        {info.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

          

            
          </div>

          {/* Contact Form */}
          <div className="space-y-6">
            <SectionTitle title={texts.formTitle} />
            <Card className="sticky top-24">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      {texts.form.nameLabel}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={texts.form.namePlaceholder}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      {texts.form.emailLabel}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={texts.form.emailPlaceholder}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    {texts.form.subjectLabel}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={texts.form.subjectPlaceholder}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    {texts.form.messageLabel}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder={texts.form.messagePlaceholder}
                  />
                </div>

                {/* Submit Status */}
                {submitStatus === 'success' && (
                  <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-4 rounded-lg">
                    <CheckCircle className="w-5 h-5" />
                    <span>{texts.form.success}</span>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-lg">
                    <AlertCircle className="w-5 h-5" />
                    <span>{texts.form.error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      {texts.form.sending}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      {texts.form.submit}
                    </>
                  )}
                </button>
              </form>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}
