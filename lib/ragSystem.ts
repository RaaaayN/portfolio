import { GoogleGenerativeAI } from '@google/generative-ai';
import { geminiConfig } from './geminiConfig';
import { readProfile, UserProfile } from './readProfile';

// Interface pour les documents vectorisés
export interface Document {
  id: string;
  content: string;
  metadata: {
    type: 'profile' | 'project' | 'experience' | 'education' | 'skill';
    title?: string;
    section?: string;
  };
  embedding?: number[];
}

// Interface pour les résultats de recherche
export interface SearchResult {
  document: Document;
  score: number;
}

const normalizeDescription = (description: string | string[]): string =>
  Array.isArray(description)
    ? description.map(line => `- ${line}`).join('\n')
    : description;

export class RAGSystem {
  private genAI: GoogleGenerativeAI;
  private documents: Document[] = [];
  private isInitialized = false;
  private profile: UserProfile | null = null;

  constructor() {
    this.genAI = new GoogleGenerativeAI(geminiConfig.apiKey);
  }

  // Initialiser le système RAG avec les données du profil
  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      const profile = readProfile();
      this.profile = profile;
      this.documents = this.createDocumentsFromProfile(profile);
      this.isInitialized = true;
      console.log(`✅ RAG System initialisé avec ${this.documents.length} documents`);
    } catch (error) {
      console.error('❌ Erreur lors de l\'initialisation du RAG:', error);
      throw error;
    }
  }

  // Créer des documents à partir du profil utilisateur
  private createDocumentsFromProfile(profile: UserProfile): Document[] {
    const documents: Document[] = [];

    // Document principal du profil
    documents.push({
      id: 'profile-main',
      content: `Nom: ${profile.name}\nTitre: ${profile.title}\nBio: ${profile.bio}\nÀ propos: ${profile.about}`,
      metadata: { type: 'profile', title: 'Profil principal' }
    });

    // Documents enrichis avec le contexte personnel détaillé
    this.addPersonalContextDocuments(documents);

    // Compétences
    profile.skills.forEach((skillGroup, index) => {
      documents.push({
        id: `skill-${index}`,
        content: `${skillGroup.category}: ${skillGroup.technologies.join(', ')}${skillGroup.description ? `\nDescription: ${skillGroup.description}` : ''}`,
        metadata: { 
          type: 'skill', 
          title: skillGroup.category,
          section: 'Compétences'
        }
      });
    });

    // Projets
    profile.projects.forEach((project, index) => {
      documents.push({
        id: `project-${index}`,
        content: `Projet: ${project.title}\nDescription: ${normalizeDescription(project.description)}\nTechnologies: ${project.technologies.join(', ')}${project.location ? `\nLieu: ${project.location}` : ''}${project.period ? `\nPériode: ${project.period}` : ''}${project.github ? `\nGitHub: ${project.github}` : ''}${project.live ? `\nSite: ${project.live}` : ''}`,
        metadata: { 
          type: 'project', 
          title: project.title,
          section: 'Projets'
        }
      });
    });

    // Expérience
    profile.experience.forEach((exp, index) => {
      documents.push({
        id: `exp-${index}`,
        content: `${exp.title} chez ${exp.company || 'N/A'}\nPériode: ${exp.period}\nDescription: ${exp.description}${exp.result ? `\nRésultat: ${exp.result}` : ''}${exp.technologies ? `\nTechnologies: ${exp.technologies.join(', ')}` : ''}`,
        metadata: { 
          type: 'experience', 
          title: exp.title,
          section: 'Expérience'
        }
      });
    });

    // Formation
    profile.education.forEach((edu, index) => {
      documents.push({
        id: `edu-${index}`,
        content: `${edu.title} chez ${edu.company || 'N/A'}\nPériode: ${edu.period}\nDescription: ${normalizeDescription(edu.description)}${edu.technologies ? `\nTechnologies: ${edu.technologies.join(', ')}` : ''}`,
        metadata: { 
          type: 'education', 
          title: edu.title,
          section: 'Formation'
        }
      });
    });

    // Certifications
    if (profile.certifications && profile.certifications.length > 0) {
      const certificationsList = profile.certifications
        .map(cert => cert.title)
        .join(', ');
      documents.push({
        id: 'certifications',
        content: `Certifications: ${certificationsList}`,
        metadata: {
          type: 'certification',
          title: 'Certifications',
          section: 'Certifications'
        }
      });
    }

    // Langues
    if (profile.languages && profile.languages.length > 0) {
      const languagesText = profile.languages.map(lang => `${lang.language} (${lang.level})`).join(', ');
      documents.push({
        id: 'languages',
        content: `Langues: ${languagesText}`,
        metadata: { 
          type: 'language', 
          title: 'Langues',
          section: 'Langues'
        }
      });
    }

    // Centres d'intérêt
    if (profile.hobbies && profile.hobbies.length > 0) {
      documents.push({
        id: 'hobbies',
        content: `Centres d'intérêt: ${profile.hobbies.join(', ')}`,
        metadata: { 
          type: 'hobby', 
          title: 'Centres d\'intérêt',
          section: 'Centres d\'intérêt'
        }
      });
    }

    return documents;
  }

  // Ajouter des documents enrichis avec le contexte personnel
  private addPersonalContextDocuments(documents: Document[]): void {
    // Document sur l'expérience académique et professionnelle
    documents.push({
      id: 'academic-professional',
      content: `Rayan Barreddine est étudiant en 4e année à l'UTC (Université de Technologie de Compiègne) en spécialisation Intelligence Artificielle et Data. Il fait actuellement son stage d'assistant ingénieur à Station F, au sein de la startup Histia, où il travaille sur le développement de systèmes d'IA et de graphes de connaissance pour détecter et analyser les startups à fort potentiel.`,
      metadata: { 
        type: 'profile', 
        title: 'Parcours académique et professionnel',
        section: 'Expérience'
      }
    });

    // Document sur les valeurs et ambitions
    documents.push({
      id: 'values-ambitions',
      content: `Valeurs: Curiosité et apprentissage continu, Esprit d'initiative et autonomie, Impact concret et innovation utile. Ambitions: Devenir ingénieur IA/data avec une approche entrepreneuriale, construire des produits technologiques intelligents capables d'avoir un impact réel sur la société, que ce soit dans la recherche, la stratégie ou l'entrepreneuriat.`,
      metadata: { 
        type: 'profile', 
        title: 'Valeurs et ambitions',
        section: 'Personnalité'
      }
    });

    // Document sur l'origine et la personnalité
    documents.push({
      id: 'origin-personality',
      content: `Franco-marocain, Rayan a grandi entre deux cultures, ce qui lui a donné une ouverture d'esprit, une capacité d'adaptation et un goût pour les échanges humains. Personnalité: Curieux, persévérant et réfléchi. Il aime apprendre en profondeur, comprendre les systèmes complexes et transformer les idées en projets concrets.`,
      metadata: { 
        type: 'profile', 
        title: 'Origine et personnalité',
        section: 'Personnalité'
      }
    });

    // Document sur les centres d'intérêt techniques
    documents.push({
      id: 'tech-interests',
      content: `Centres d'intérêt techniques: IA & graphes de connaissance, Automatisation, Serveurs personnels, Open source. Il est passionné par les startups, les business models innovants et les projets à impact. Il aime comprendre comment une idée devient un produit et comment une vision peut se concrétiser.`,
      metadata: { 
        type: 'skill', 
        title: 'Intérêts techniques',
        section: 'Compétences'
      }
    });

    // Document sur les activités sportives et créatives
    documents.push({
      id: 'sports-creative',
      content: `Sports: Course à pied, Tennis, Trail, Fitness léger à la maison. Activités créatives: Musique, Design de projets, Création de contenu tech. Il trouve souvent ses meilleures idées de projet en courant.`,
      metadata: { 
        type: 'profile', 
        title: 'Sports et créativité',
        section: 'Loisirs'
      }
    });

    // Document sur le mode de vie et les habitudes
    documents.push({
      id: 'lifestyle-habits',
      content: `Mode de vie: Il vit à Paris pour son stage, s'organise entre travail, sport et temps perso. Il s'intéresse à la productivité, à la santé mentale et à l'équilibre entre performance et bien-être. Habitudes: Il court le soir pour décompresser après le travail, aime passer du temps à lire ou regarder des documentaires sur la tech, la société ou l'économie, planifie ses semaines pour garder un bon équilibre entre efficacité et détente.`,
      metadata: { 
        type: 'profile', 
        title: 'Mode de vie et habitudes',
        section: 'Personnalité'
      }
    });

    // Document sur les voyages et l'ouverture culturelle
    documents.push({
      id: 'travel-culture',
      content: `Voyages: Il aime découvrir de nouvelles villes, rencontrer des gens différents et comprendre les cultures locales. Les voyages sont pour lui une source d'inspiration et de remise en perspective. Il adore organiser ses projets, ses routines et ses outils pour être plus efficace.`,
      metadata: { 
        type: 'profile', 
        title: 'Voyages et culture',
        section: 'Loisirs'
      }
    });

    // Document sur les objectifs personnels
    documents.push({
      id: 'personal-goals',
      content: `Objectifs: Devenir expert en IA appliquée et data engineering, Monter un projet à fort impact social ou technologique, Continuer à développer ses compétences en management et leadership. Il aime les discussions profondes sur la tech, la société et l'avenir de l'IA.`,
      metadata: { 
        type: 'profile', 
        title: 'Objectifs personnels',
        section: 'Ambitions'
      }
    });

    // Document sur les fun facts et particularités
    documents.push({
      id: 'fun-facts',
      content: `Fun facts: Il trouve souvent ses meilleures idées de projet en courant. Il est un vrai passionné de graphes et de systèmes complexes. Il aime les discussions profondes sur la tech, la société et l'avenir de l'IA. Il adore organiser ses projets, ses routines et ses outils pour être plus efficace.`,
      metadata: { 
        type: 'profile', 
        title: 'Fun facts et particularités',
        section: 'Personnalité'
      }
    });

   
    // Document sur les habitudes de travail et productivité
    documents.push({
      id: 'work-productivity',
      content: `Habitudes de travail: Il vit à Paris pour son stage et s'organise entre travail, sport et temps perso. Il s'intéresse à la productivité, à la santé mentale et à l'équilibre entre performance et bien-être. Il court le soir pour décompresser après le travail. Il aime passer du temps à lire ou regarder des documentaires sur la tech, la société ou l'économie. Il planifie ses semaines pour garder un bon équilibre entre efficacité et détente.`,
      metadata: { 
        type: 'profile', 
        title: 'Habitudes de travail et productivité',
        section: 'Lifestyle'
      }
    });

    // Document sur les intérêts créatifs et culturels
    documents.push({
      id: 'creative-cultural',
      content: `Intérêts créatifs et culturels: Musique, Design de projets, Création de contenu tech. Il aime découvrir de nouvelles villes, rencontrer des gens différents et comprendre les cultures locales. Les voyages sont pour lui une source d'inspiration et de remise en perspective.`,
      metadata: { 
        type: 'profile', 
        title: 'Intérêts créatifs et culturels',
        section: 'Loisirs'
      }
    });

    // Document sur la passion pour les systèmes complexes
    documents.push({
      id: 'complex-systems',
      content: `Passion pour les systèmes complexes: Il est un vrai passionné de graphes et de systèmes complexes. Il aime apprendre en profondeur, comprendre les systèmes complexes et transformer les idées en projets concrets. Il travaille sur le développement de systèmes d'IA et de graphes de connaissance pour détecter et analyser les startups à fort potentiel.`,
      metadata: { 
        type: 'skill', 
        title: 'Passion pour les systèmes complexes',
        section: 'Compétences'
      }
    });
  }

  // Recherche sémantique simple (basée sur la similarité de texte)
  private searchDocuments(query: string, limit: number = 3): SearchResult[] {
    const queryLower = query.toLowerCase();
    const results: SearchResult[] = [];

    this.documents.forEach(doc => {
      const contentLower = doc.content.toLowerCase();
      let score = 0;

      // Score basé sur les mots-clés
      const queryWords = queryLower.split(/\s+/);
      const contentWords = contentLower.split(/\s+/);

      queryWords.forEach(word => {
        if (contentWords.includes(word)) {
          score += 1;
        }
      });

      // Bonus pour les correspondances exactes
      if (contentLower.includes(queryLower)) {
        score += 2;
      }

      // Bonus pour le type de document
      if (doc.metadata.type === 'profile') {
        score += 0.5;
      }

      if (score > 0) {
        results.push({ document: doc, score });
      }
    });

    // Trier par score et limiter
    return results
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  // Générer une réponse avec Gemini (avec fallback)
  async generateResponse(query: string): Promise<string> {
    try {
      await this.initialize();

      // Rechercher des documents pertinents
      const searchResults = this.searchDocuments(query, 3);
      
      // Construire le contexte
      const context = searchResults
        .map(result => result.document.content)
        .join('\n\n');

      // Vérifier si la clé API Gemini est configurée
      if (!geminiConfig.apiKey || geminiConfig.apiKey === 'your_gemini_api_key_here') {
        console.log('⚠️ Clé API Gemini non configurée, utilisation du fallback');
        return this.generateFallbackResponse(query, searchResults);
      }

      // Essayer Gemini avec timeout
      try {
        const profile = this.profile || readProfile();
        const prompt = `Tu es l'assistant IA de ${profile.name}, ${profile.title}.
Tu dois répondre uniquement aux questions concernant ${profile.name}, en te basant sur les informations suivantes :

INFORMATIONS SUR ${profile.name.toUpperCase()} :
${context}

QUESTION DU VISITEUR : ${query}

INSTRUCTIONS :
- Réponds uniquement si la question concerne ${profile.name} ou son parcours, ses projets, ses compétences, etc.
- Si la question ne concerne pas ${profile.name.split(' ')[0]}, indique poliment que tu ne peux répondre qu'aux questions sur lui.
- Réponds de manière professionnelle et amicale
- Utilise les informations fournies pour donner des réponses précises
- Si tu ne trouves pas d'information pertinente, dis-le poliment
- Garde tes réponses concises (max 200 mots)
- Utilise un ton professionnel mais accessible

REDIRECTION :
À la fin de ta réponse, si tu penses qu'il serait utile de rediriger vers une page spécifique, ajoute une ligne avec :
[REDIRECT:nom_de_la_page]

Pages disponibles :
- contact (pour les questions de contact)
- projects (pour les projets)
- about (pour le parcours/expérience)
- home (pour l'accueil)

Exemple : [REDIRECT:contact]

RÉPONSE :`;

        const model = this.genAI.getGenerativeModel({ 
          model: geminiConfig.model,
          generationConfig: geminiConfig.generationConfig,
          safetySettings: geminiConfig.safetySettings,
        });

        // Timeout de 10 secondes
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), 10000)
        );

        const result = await Promise.race([
          model.generateContent(prompt),
          timeoutPromise
        ]) as any;

        const response = await result.response;
        return response.text();

      } catch (geminiError) {
        console.warn('⚠️ Erreur Gemini, utilisation du fallback:', geminiError);
        return this.generateFallbackResponse(query, searchResults);
      }

    } catch (error) {
      console.error('❌ Erreur lors de la génération de la réponse:', error);
      return 'Désolé, je rencontre un problème technique. Veuillez réessayer plus tard ou me contacter directement via la page contact.';
    }
  }

  // Réponse de fallback basée sur les données
  private generateFallbackResponse(query: string, searchResults: SearchResult[]): string {
    const lowerQuery = query.toLowerCase();
    
    // Si on a des résultats de recherche, les utiliser
    if (searchResults.length > 0) {
      const bestMatch = searchResults[0];
      const content = bestMatch.document.content;
      
      const profile = this.profile || readProfile();
      // Réponses basées sur le type de document
      if (bestMatch.document.metadata.type === 'profile') {
        return `Basé sur le profil de ${profile.name} :\n\n${content}\n\nPour plus d'informations, n'hésitez pas à me poser des questions plus spécifiques ou à consulter la page contact.`;
      }

      if (bestMatch.document.metadata.type === 'project') {
        return `Voici un projet de ${profile.name} :\n\n${content}\n\nIl a d'autres projets intéressants. Que souhaitez-vous savoir de plus ?`;
      }

      if (bestMatch.document.metadata.type === 'experience') {
        return `Expérience de ${profile.name} :\n\n${content}\n\nIl a une expérience variée. Avez-vous des questions spécifiques ?`;
      }

      if (bestMatch.document.metadata.type === 'skill') {
        return `Compétences de ${profile.name} :\n\n${content}\n\nIl maîtrise de nombreuses technologies. Voulez-vous en savoir plus sur un domaine particulier ?`;
      }
    }

    // Réponses par mots-clés avec redirections
    const profile = this.profile || readProfile();
    if (lowerQuery.includes('parcours') || lowerQuery.includes('formation') || lowerQuery.includes('études')) {
      return `${profile.about}\n\n[REDIRECT:about]`;
    }

    if (lowerQuery.includes('compétences') || lowerQuery.includes('technologies') || lowerQuery.includes('langages')) {
      const skills = profile.skills.map(s => s.category).join(', ');
      return `${profile.name} maîtrise notamment : ${skills}.\n\n[REDIRECT:projects]`;
    }

    if (lowerQuery.includes('projets') || lowerQuery.includes('réalisations')) {
      const projects = profile.projects.slice(0,3).map(p => p.title).join(', ');
      return `Parmi ses projets : ${projects}.\n\n[REDIRECT:projects]`;
    }

    if (lowerQuery.includes('expérience') || lowerQuery.includes('professionnel') || lowerQuery.includes('travail')) {
      const exp = profile.experience[0]?.title || 'une expérience notable';
      return `${profile.name} a notamment été ${exp}.\n\n[REDIRECT:about]`;
    }

    if (lowerQuery.includes('contact') || lowerQuery.includes('email') || lowerQuery.includes('téléphone')) {
      return `Vous pouvez contacter ${profile.name} par email à ${profile.contact.email} ou par téléphone au ${profile.contact.phone}. Il est également présent sur LinkedIn et GitHub.\n\n[REDIRECT:contact]`;
    }

    if (lowerQuery.includes('ia') || lowerQuery.includes('intelligence artificielle') || lowerQuery.includes('machine learning')) {
      return `${profile.name.split(' ')[0]} est spécialisé en ${profile.skills[1]?.category || 'Intelligence Artificielle'}.`;
    }

    // Réponse par défaut
    return `Je suis l'assistant de ${profile.name}, ${profile.title}. Je peux vous renseigner sur son parcours, ses compétences, ses projets, ou ses coordonnées. Que souhaitez-vous savoir ?`;
  }

  // Obtenir des suggestions de questions
  getSuggestedQuestions(): string[] {
    return [
      "Quelles sont tes compétences principales ?",
      "Peux-tu me parler de tes projets récents ?",
      "Quelle est ton expérience professionnelle ?",
      "Comment puis-je te contacter ?",
      "Quelles technologies utilises-tu ?",
      "As-tu des certifications ?"
    ];
  }
}

// Instance singleton
export const ragSystem = new RAGSystem();
