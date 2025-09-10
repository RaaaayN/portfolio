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

export class RAGSystem {
  private genAI: GoogleGenerativeAI;
  private documents: Document[] = [];
  private isInitialized = false;

  constructor() {
    this.genAI = new GoogleGenerativeAI(geminiConfig.apiKey);
  }

  // Initialiser le système RAG avec les données du profil
  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      const profile = readProfile();
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
        content: `Projet: ${project.title}\nDescription: ${project.description}\nTechnologies: ${project.technologies.join(', ')}${project.location ? `\nLieu: ${project.location}` : ''}${project.period ? `\nPériode: ${project.period}` : ''}${project.github ? `\nGitHub: ${project.github}` : ''}${project.live ? `\nSite: ${project.live}` : ''}`,
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
        content: `${edu.title} chez ${edu.company || 'N/A'}\nPériode: ${edu.period}\nDescription: ${edu.description}${edu.technologies ? `\nTechnologies: ${edu.technologies.join(', ')}` : ''}`,
        metadata: { 
          type: 'education', 
          title: edu.title,
          section: 'Formation'
        }
      });
    });

    // Certifications
    if (profile.certifications && profile.certifications.length > 0) {
      documents.push({
        id: 'certifications',
        content: `Certifications: ${profile.certifications.join(', ')}`,
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
        const prompt = `Tu es l'assistant IA de Rayan Barreddine, développeur full-stack.
Tu dois répondre uniquement aux questions concernant Rayan Barreddine, en te basant sur les informations suivantes :

INFORMATIONS SUR RAYAN :
${context}

QUESTION DU VISITEUR : ${query}

INSTRUCTIONS :
- Réponds uniquement si la question concerne Rayan Barreddine ou son parcours, ses projets, ses compétences, etc.
- Si la question ne concerne pas Rayan, indique poliment que tu ne peux répondre qu'aux questions sur lui.
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
      
      // Réponses basées sur le type de document
      if (bestMatch.document.metadata.type === 'profile') {
        return `Basé sur le profil de Rayan :\n\n${content}\n\nPour plus d'informations, n'hésitez pas à me poser des questions plus spécifiques ou à consulter la page contact.`;
      }
      
      if (bestMatch.document.metadata.type === 'project') {
        return `Voici un projet de Rayan :\n\n${content}\n\nIl a d'autres projets intéressants. Que souhaitez-vous savoir de plus ?`;
      }
      
      if (bestMatch.document.metadata.type === 'experience') {
        return `Expérience de Rayan :\n\n${content}\n\nIl a une expérience variée. Avez-vous des questions spécifiques ?`;
      }
      
      if (bestMatch.document.metadata.type === 'skill') {
        return `Compétences de Rayan :\n\n${content}\n\nIl maîtrise de nombreuses technologies. Voulez-vous en savoir plus sur un domaine particulier ?`;
      }
    }

    // Réponses par mots-clés avec redirections
    if (lowerQuery.includes('parcours') || lowerQuery.includes('formation') || lowerQuery.includes('études')) {
      return "Rayan est étudiant en 4e année d'ingénieur informatique à l'UTC, spécialisé en Intelligence Artificielle et Data Science. Il a suivi des classes préparatoires au Lycée Louis-le-Grand avant d'intégrer l'UTC.\n\n[REDIRECT:about]";
    }
    
    if (lowerQuery.includes('compétences') || lowerQuery.includes('technologies') || lowerQuery.includes('langages')) {
      return "Rayan maîtrise Python, C++, JavaScript, TypeScript, R, l'Intelligence Artificielle (Machine Learning, Deep Learning, NLP, RAG), le développement web (React, Next.js, Node.js), et les outils de data science (Pandas, NumPy, Scikit-learn, TensorFlow, PyTorch).\n\n[REDIRECT:projects]";
    }
    
    if (lowerQuery.includes('projets') || lowerQuery.includes('réalisations')) {
      return "Parmi ses projets : un système de recommandation IA, une application web de data science avec des tableaux de bord interactifs, et un projet RAG (Retrieval-Augmented Generation). Il a également dirigé la Junior-Entreprise UTC.\n\n[REDIRECT:projects]";
    }
    
    if (lowerQuery.includes('expérience') || lowerQuery.includes('professionnel') || lowerQuery.includes('travail')) {
      return "Rayan a été Président de la Junior-Entreprise UTC (2023-2024), où il dirigeait 15 personnes. Il a également été Responsable Recrutement et a effectué des stages en développement.\n\n[REDIRECT:about]";
    }
    
    if (lowerQuery.includes('contact') || lowerQuery.includes('email') || lowerQuery.includes('téléphone')) {
      return "Vous pouvez contacter Rayan par email à rayan.barre@icloud.com ou par téléphone au +33 7 82 59 80 57. Il est également présent sur LinkedIn et GitHub.\n\n[REDIRECT:contact]";
    }
    
    if (lowerQuery.includes('ia') || lowerQuery.includes('intelligence artificielle') || lowerQuery.includes('machine learning')) {
      return "Rayan est spécialisé en Intelligence Artificielle et Data Science. Il travaille sur des projets de machine learning, deep learning, NLP, et RAG. Il maîtrise TensorFlow, PyTorch, et les outils de data science.";
    }

    // Réponse par défaut
    return "Je suis l'assistant de Rayan Barreddine, étudiant en 4e année d'ingénieur informatique spécialisé en IA et Data Science à l'UTC. Je peux vous renseigner sur son parcours, ses compétences, ses projets, ou ses coordonnées. Que souhaitez-vous savoir ?";
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
