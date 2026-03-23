"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "./Container";
import { CVDownload } from "./CVDownload";
import { readProfile } from "@/lib/readProfile";
import { useLanguage } from "@/lib/LanguageContext";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const profile = readProfile(language);
  const pathname = usePathname();

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

  const chatLinkName = language === "fr" ? "Chat IA" : "AI Chat";

  const languageToggleDetails =
    language === "fr"
      ? {
          label: "FR",
          flagSrc: "/flags/fr.svg",
          flagAlt: "Drapeau français",
        }
      : {
          label: "EN",
          flagSrc: "/flags/gb.svg",
          flagAlt: "Flag of the United Kingdom",
        };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.08] bg-surface-base/80 backdrop-blur-xl">
      <Container>
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="font-display font-bold text-white text-xl tracking-tight">
            {profile.name}<span className="text-accent">.</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              item.name === chatLinkName ? (
                <Link
                  key={item.name}
                  href={item.href as any}
                  className="border border-cyan-accent/40 text-cyan-accent hover:bg-cyan-accent/10 rounded-full px-4 py-1.5 text-sm font-medium transition-all"
                >
                  {item.name}
                </Link>
              ) : (
                <Link
                  key={item.name}
                  href={item.href as any}
                  className={`text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-accent-light"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              )
            ))}
            <CVDownload variant="ghost" size="sm" showIcon={false} />
            <button
              onClick={toggleLanguage}
              className="glass rounded-lg px-2 py-1 text-slate-400 hover:text-white text-sm transition-all"
            >
              <span className="flex items-center gap-2">
                <span className="font-semibold tracking-wide">
                  {languageToggleDetails.label}
                </span>
                <Image
                  src={languageToggleDetails.flagSrc}
                  alt={languageToggleDetails.flagAlt}
                  width={20}
                  height={14}
                  className="h-3.5 w-5 rounded-sm shadow-sm"
                />
              </span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden border-t border-white/[0.08] md:hidden"
            >
              <div className="py-4 flex flex-col space-y-3">
                {navigation.map((item) => (
                  item.name === chatLinkName ? (
                    <Link
                      key={item.name}
                      href={item.href as any}
                      className="border border-cyan-accent/40 text-cyan-accent hover:bg-cyan-accent/10 rounded-full px-4 py-2 text-sm font-medium transition-all text-center"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <Link
                      key={item.name}
                      href={item.href as any}
                      className={`text-sm font-medium transition-colors px-2 py-1.5 rounded-lg ${
                        isActive(item.href)
                          ? "text-accent-light bg-accent/10"
                          : "text-slate-400 hover:text-white hover:bg-white/5"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )
                ))}
                <div className="pt-2 flex flex-col space-y-2">
                  <CVDownload variant="outline" size="sm" className="w-full" />
                  <button
                    onClick={() => {
                      toggleLanguage();
                      setIsOpen(false);
                    }}
                    className="w-full glass rounded-lg px-2 py-2 text-slate-400 hover:text-white text-sm transition-all"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <span className="font-semibold tracking-wide">
                        {languageToggleDetails.label}
                      </span>
                      <Image
                        src={languageToggleDetails.flagSrc}
                        alt={languageToggleDetails.flagAlt}
                        width={20}
                        height={14}
                        className="h-3.5 w-5 rounded-sm shadow-sm"
                      />
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </nav>
  );
}
