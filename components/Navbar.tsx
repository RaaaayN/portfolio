"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "./Container";
import { CVDownload } from "./CVDownload";
import { readProfile } from "@/lib/readProfile";
import { useLanguage } from "@/lib/LanguageContext";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const profile = readProfile(language);

  const navigation = {
    fr: [
      { name: "Accueil", href: "/" },
      { name: "À propos", href: "/about" },
      { name: "Projets", href: "/projects" },
      { name: "Contact", href: "/contact" },
      { name: "Chat IA", href: "/chat" },
    ],
    en: [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Projects", href: "/projects" },
      { name: "Contact", href: "/contact" },
      { name: "AI Chat", href: "/chat" },
    ],
  }[language];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <Container>
        <div className="flex justify-between items-center py-4">
          <div className="text-xl font-bold text-gray-900">
            {profile.name}
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`transition-colors ${
                  item.name === (language === "fr" ? "Chat IA" : "AI Chat")
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg hover:from-orange-400 hover:to-red-400 shadow-lg hover:shadow-orange-500/25"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {item.name}
              </a>
            ))}
            <CVDownload variant="ghost" size="sm" showIcon={false} />
            <button
              onClick={toggleLanguage}
              className="text-gray-600 hover:text-blue-600 border px-2 py-1 rounded"
            >
              {language === "fr" ? "EN" : "FR"}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-blue-600"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`transition-colors ${
                    item.name === (language === "fr" ? "Chat IA" : "AI Chat")
                      ? "bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg hover:from-orange-400 hover:to-red-400 shadow-lg hover:shadow-orange-500/25 text-center"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-2 flex flex-col space-y-2">
                <CVDownload variant="outline" size="sm" className="w-full" />
                <button
                  onClick={() => {
                    toggleLanguage();
                    setIsOpen(false);
                  }}
                  className="w-full border px-2 py-1 rounded text-gray-600 hover:text-blue-600"
                >
                  {language === "fr" ? "English" : "Français"}
                </button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </nav>
  );
}
