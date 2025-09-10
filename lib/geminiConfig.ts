// Configuration pour Gemini AI
export const geminiConfig = {
  // Clé API Gemini (à configurer dans .env.local)
  apiKey: process.env.GEMINI_API_KEY || 'your_gemini_api_key_here',
  
  // Modèle Gemini à utiliser
  model: 'gemini-2.0-flash',
  
  // Configuration de génération
  generationConfig: {
    temperature: 0.7,
    topK: 40,
    topP: 0.95,
    maxOutputTokens: 1024,
  },
  
  // Configuration de sécurité
  safetySettings: [
    {
      category: 'HARM_CATEGORY_HARASSMENT',
      threshold: 'BLOCK_MEDIUM_AND_ABOVE',
    },
    {
      category: 'HARM_CATEGORY_HATE_SPEECH',
      threshold: 'BLOCK_MEDIUM_AND_ABOVE',
    },
    {
      category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
      threshold: 'BLOCK_MEDIUM_AND_ABOVE',
    },
    {
      category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
      threshold: 'BLOCK_MEDIUM_AND_ABOVE',
    },
  ],
};

// Instructions pour obtenir une clé API Gemini :
// 1. Allez sur https://makersuite.google.com/app/apikey
// 2. Connectez-vous avec votre compte Google
// 3. Cliquez sur "Create API Key"
// 4. Copiez la clé et ajoutez-la dans .env.local comme GEMINI_API_KEY=votre_cle_ici
