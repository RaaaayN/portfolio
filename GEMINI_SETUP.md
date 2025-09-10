# Configuration Gemini AI pour le RAG

## 🔑 Obtenir une clé API Gemini

1. **Allez sur** : https://makersuite.google.com/app/apikey
2. **Connectez-vous** avec votre compte Google
3. **Cliquez sur** "Create API Key"
4. **Copiez la clé** générée

## ⚙️ Configuration

Ajoutez cette ligne dans votre fichier `.env.local` :

```bash
GEMINI_API_KEY=votre_cle_api_gemini_ici
```

## 🧪 Test de la configuration

Une fois configuré, vous pouvez tester le système RAG :

1. **Démarrez le serveur** : `npm run dev`
2. **Allez sur** : http://localhost:3002/chat
3. **Posez des questions** sur Rayan
4. **L'IA répondra** en utilisant les informations de son profil

## 📝 Exemples de questions

- "Quel est le parcours de Rayan ?"
- "Quelles sont ses compétences en IA ?"
- "Peux-tu me parler de ses projets ?"
- "Comment le contacter ?"
- "Quelle est son expérience professionnelle ?"

## 🔧 Fonctionnalités du RAG

- **Recherche sémantique** dans le profil de Rayan
- **Réponses contextuelles** basées sur ses données
- **Génération intelligente** avec Gemini AI
- **Interface de chat** moderne et responsive

## ⚠️ Notes importantes

- La clé API est nécessaire pour le fonctionnement
- Les réponses sont générées en temps réel
- Le système utilise les données du fichier `user_profile.json`
- Les réponses sont limitées à 200 mots maximum
