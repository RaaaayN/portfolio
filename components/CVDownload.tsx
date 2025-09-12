"use client";

import { Download, FileText } from "lucide-react";
import { Badge } from "./Badge";
import { readProfile } from "@/lib/readProfile";
import { useLanguage } from "@/lib/LanguageContext";

interface CVDownloadProps {
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
  className?: string;
}

export function CVDownload({
  variant = "default", 
  size = "md", 
  showIcon = true,
  className = ""
  }: CVDownloadProps) {
    const { language } = useLanguage();
    const profile = readProfile(language);
    const texts = {
      fr: { download: "Télécharger mon CV" },
      en: { download: "Download my resume" },
    }[language];
  const handleDownload = () => {
    // Créer un lien de téléchargement
    const link = document.createElement('a');
    link.href = profile.cv_path;
    link.download = profile.cv_path.split('/').pop() || 'CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";
  
  const variantClasses = {
    default: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
    ghost: "text-blue-600 hover:bg-blue-50"
  };
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <button
      onClick={handleDownload}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
        {showIcon && <Download className="w-4 h-4 mr-2" />}
        <FileText className="w-4 h-4 mr-2" />
        {texts.download}
      </button>
  );
}

// Composant Badge pour indiquer la disponibilité du CV
export function CVBadge() {
  const { language } = useLanguage();
  const text = { fr: "CV disponible", en: "Resume available" }[language];
  return (
    <Badge variant="success" size="sm" className="animate-pulse">
      <FileText className="w-3 h-3 mr-1" />
      {text}
    </Badge>
  );
}
