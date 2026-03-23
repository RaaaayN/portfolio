"use client";

import { SmartButton } from "@/lib/smartButtons";
import {
  Mail,
  FolderOpen,
  User,
  Home,
  Github,
  Linkedin,
  ExternalLink,
  ArrowRight
} from "lucide-react";

interface SmartButtonsProps {
  buttons: SmartButton[];
  className?: string;
}

const iconMap = {
  Mail,
  FolderOpen,
  User,
  Home,
  Github,
  Linkedin,
  ExternalLink,
};

export function SmartButtons({ buttons, className = "" }: SmartButtonsProps) {
  if (buttons.length === 0) return null;

  const getIcon = (iconName?: string) => {
    if (!iconName) return null;
    const IconComponent = iconMap[iconName as keyof typeof iconMap];
    return IconComponent ? <IconComponent className="w-4 h-4" /> : null;
  };

  const getButtonStyles = (variant: string = 'primary') => {
    const baseStyles = "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105";

    switch (variant) {
      case 'primary':
        return `${baseStyles} bg-accent hover:bg-violet-500 text-white shadow-sm`;
      case 'secondary':
        return `${baseStyles} border border-cyan-accent/40 text-cyan-accent hover:bg-cyan-accent/10`;
      case 'outline':
        return `${baseStyles} border border-white/20 text-slate-300 hover:border-white/30 hover:bg-white/[0.08]`;
      default:
        return `${baseStyles} bg-white/[0.08] text-slate-300 hover:bg-white/[0.12]`;
    }
  };

  return (
    <div className={`${className}`}>
      <div className="flex flex-wrap gap-2">
        {buttons.map((button, index) => (
          <a
            key={index}
            href={button.href}
            target={button.href.startsWith('http') ? '_blank' : '_self'}
            rel={button.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className={getButtonStyles(button.variant)}
          >
            {getIcon(button.icon)}
            {button.text}
            {button.href.startsWith('http') && (
              <ExternalLink className="w-3 h-3" />
            )}
          </a>
        ))}
      </div>
    </div>
  );
}
