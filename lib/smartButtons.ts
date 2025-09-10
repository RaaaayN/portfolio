// Système simple de détection de redirections
export interface SmartButton {
  text: string;
  href: string;
  icon?: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

// Configuration des pages disponibles
const PAGE_CONFIGS = {
  contact: {
    text: 'Page Contact',
    href: '/contact',
    icon: 'Mail',
    variant: 'primary' as const
  },
  projects: {
    text: 'Mes Projets',
    href: '/projects',
    icon: 'FolderOpen',
    variant: 'secondary' as const
  },
  about: {
    text: 'Mon Parcours',
    href: '/about',
    icon: 'User',
    variant: 'outline' as const
  },
  home: {
    text: 'Accueil',
    href: '/',
    icon: 'Home',
    variant: 'outline' as const
  }
};

/**
 * Détecte les redirections dans le texte (format [REDIRECT:page])
 */
export function detectRedirects(text: string): SmartButton[] {
  const redirectRegex = /\[REDIRECT:(\w+)\]/g;
  const matches = [...text.matchAll(redirectRegex)];
  
  const buttons: SmartButton[] = [];
  
  matches.forEach(match => {
    const pageName = match[1].toLowerCase();
    const config = PAGE_CONFIGS[pageName as keyof typeof PAGE_CONFIGS];
    
    if (config) {
      buttons.push({
        text: config.text,
        href: config.href,
        icon: config.icon,
        variant: config.variant
      });
    }
  });
  
  return buttons;
}

/**
 * Extrait les URLs mentionnées dans le texte
 */
export function extractUrls(text: string): string[] {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.match(urlRegex) || [];
}

/**
 * Génère des boutons pour les URLs externes
 */
export function generateUrlButtons(text: string): SmartButton[] {
  const urls = extractUrls(text);
  return urls.map(url => ({
    text: 'Ouvrir le lien',
    href: url,
    icon: 'ExternalLink',
    variant: 'outline' as const
  }));
}

/**
 * Analyse le texte et génère les boutons de redirection
 */
export function generateSmartButtons(text: string): SmartButton[] {
  const redirectButtons = detectRedirects(text);
  const urlButtons = generateUrlButtons(text);
  
  return [...redirectButtons, ...urlButtons];
}

/**
 * Nettoie le texte en supprimant les marqueurs de redirection
 */
export function cleanText(text: string): string {
  return text.replace(/\[REDIRECT:\w+\]/g, '').trim();
}
