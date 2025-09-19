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
  MessageSquare
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Container className="py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {texts.heroTitle}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto whitespace-pre-line">
            {texts.heroDescription}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <CVBadge />
            <div className="flex items-center text-gray-600">
              <Clock className="w-4 h-4 mr-2" />
              <span className="text-sm">{texts.responseTime}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <SectionTitle title={texts.contactSectionTitle} />

            {/* CV Download Section */}
            <Card className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {texts.cvTitle}
                </h3>
                <p className="text-gray-600 mb-6">
                  {texts.cvDescription}
                </p>
                <CVDownload variant="default" size="lg" />
              </div>
            </Card>

            {/* Contact Details */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <Card key={index} hover className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 flex-shrink-0">
                      {info.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {info.title}
                      </h3>
                      <a
                        href={info.href}
                        className="text-blue-600 hover:text-blue-700 font-medium block mb-1"
                        target={info.href.startsWith('http') ? '_blank' : undefined}
                        rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {info.value}
                      </a>
                      <p className="text-gray-500 text-sm">
                        {info.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <SectionTitle title={texts.formTitle} />
            <Card>
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
            {/* Additional Info */}
            <Card className="mt-6 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200">
              <div className="text-center">
                <MessageSquare className="w-8 h-8 text-orange-500 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {texts.chatCard.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {texts.chatCard.description}
                </p>
                <a
                  href="/chat"
                  className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-400 hover:to-red-400 transition-all duration-200 shadow-lg hover:shadow-orange-500/25"
                >
                  {texts.chatCard.button}
                </a>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}
