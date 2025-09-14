"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { readProfile } from "@/lib/readProfile";
import { useLanguage } from "@/lib/LanguageContext";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { language } = useLanguage();
  const profile = readProfile(language);
  const texts = {
    fr: {
      quickLinks: "Liens rapides",
      about: "À propos",
      projects: "Projets",
      experience: "Expérience",
      contact: "Contact",
      contactTitle: "Contact",
      rights: "Tous droits réservés.",
    },
    en: {
      quickLinks: "Quick Links",
      about: "About",
      projects: "Projects",
      experience: "Experience",
      contact: "Contact",
      contactTitle: "Contact",
      rights: "All rights reserved.",
    },
  }[language];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container py-12">
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
            <div>
              <h3 className="text-xl font-semibold mb-4">{profile.name}</h3>
              <p className="text-gray-300">{profile.bio}</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">{texts.quickLinks}</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#about" className="text-gray-300 hover:text-white transition-colors">
                    {texts.about}
                  </a>
                </li>
                <li>
                  <a href="#projects" className="text-gray-300 hover:text-white transition-colors">
                    {texts.projects}
                  </a>
                </li>
                <li>
                  <a href="#experience" className="text-gray-300 hover:text-white transition-colors">
                    {texts.experience}
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-300 hover:text-white transition-colors">
                    {texts.contact}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">{texts.contactTitle}</h4>
              <div className="space-y-3">
                <a
                  href={`mailto:${profile.contact.email}`}
                  className="flex items-center text-gray-300 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  {profile.contact.email}
                </a>
                <a
                  href={profile.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-300 hover:text-white transition-colors"
                >
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </a>
                <a
                  href={profile.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-300 hover:text-white transition-colors"
                >
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {currentYear} {profile.name}. {texts.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}