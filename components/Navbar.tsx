"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "./Container";
import { CVDownload } from "./CVDownload";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: "Accueil", href: "/" },
    { name: "À propos", href: "/about" },
    { name: "Projets", href: "/projects" },
    { name: "Contact", href: "/contact" },
    { name: "Chat IA", href: "/chat" },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <Container>
        <div className="flex justify-between items-center py-4">
          <div className="text-xl font-bold text-gray-900">
            Rayan Barreddine
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`transition-colors ${
                  item.name === "Chat IA"
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg hover:from-orange-400 hover:to-red-400 shadow-lg hover:shadow-orange-500/25"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {item.name}
              </a>
            ))}
            <CVDownload variant="ghost" size="sm" showIcon={false} />
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
                    item.name === "Chat IA"
                      ? "bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg hover:from-orange-400 hover:to-red-400 shadow-lg hover:shadow-orange-500/25 text-center"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-2">
                <CVDownload variant="outline" size="sm" className="w-full" />
              </div>
            </div>
          </div>
        )}
      </Container>
    </nav>
  );
}
