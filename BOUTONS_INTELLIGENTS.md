# 🤖 Système de Boutons Intelligents

## 🎯 Fonctionnalité

### **Détection Automatique :**
Le système détecte automatiquement les mots-clés dans les réponses du chat et affiche des boutons de redirection appropriés.

### **Exemple :**
- **Question** : "Comment le contacter ?"
- **Réponse** : "Pour plus d'informations de contact, visitez la page contact..."
- **Bouton** : "Page Contact" (apparaît automatiquement)

## 🔧 Architecture

### **1. Détection de Mots-Clés (`lib/smartButtons.ts`)**
```typescript
const BUTTON_CONFIGS = [
  {
    keywords: ['contact', 'contacter', 'joindre', 'email', 'téléphone'],
    text: 'Page Contact',
    href: '/contact',
    icon: 'Mail',
    variant: 'primary'
  },
  // ... autres configurations
];
```

### **2. Composant SmartButtons (`components/SmartButtons.tsx`)**
- **Affichage** : Boutons avec icônes et styles
- **Redirection** : Liens internes et externes
- **Responsive** : Adaptation mobile/desktop

### **3. Intégration Chat (`app/chat/page.tsx`)**
- **Détection** : Analyse de chaque message du bot
- **Affichage** : Boutons sous les réponses pertinentes

## 🎨 Types de Boutons

### **Boutons Internes :**
- **Page Contact** : `/contact` (orange-rouge)
- **Mes Projets** : `/projects` (bleu)
- **Mon Parcours** : `/about` (outline)
- **Accueil** : `/` (outline)

### **Boutons Externes :**
- **GitHub** : `https://github.com/rayanbarreddine` (bleu)
- **LinkedIn** : `https://linkedin.com/in/rayanbarreddine` (bleu)
- **URLs** : Détection automatique des liens (outline)

## 🔍 Mots-Clés Détectés

### **Contact :**
- `contact`, `contacter`, `joindre`, `email`, `téléphone`, `coordonnées`

### **Projets :**
- `projets`, `projet`, `portfolio`, `réalisations`, `travaux`

### **Parcours :**
- `parcours`, `expérience`, `cv`, `curriculum`, `biographie`, `à propos`

### **Accueil :**
- `accueil`, `home`, `début`, `introduction`

### **GitHub :**
- `github`, `code`, `dépôt`, `repository`, `source`

### **LinkedIn :**
- `linkedin`, `réseau`, `professionnel`

## 🎯 Exemples d'Utilisation

### **Question : "Comment le contacter ?"**
```
Réponse : "Pour plus d'informations de contact, visitez la page contact..."
Boutons : [Page Contact] [LinkedIn]
```

### **Question : "Quels sont ses projets ?"**
```
Réponse : "Découvrez ses projets pour voir ces technologies en action !"
Boutons : [Mes Projets] [GitHub]
```

### **Question : "Parlez-moi de son parcours"**
```
Réponse : "Consultez son parcours complet pour plus de détails..."
Boutons : [Mon Parcours] [Accueil]
```

## 🚀 Améliorations du RAG

### **Prompt Optimisé :**
- **Mots-clés** : Instructions pour utiliser les mots-clés appropriés
- **Réponses** : Encouragement à mentionner les pages pertinentes
- **Fallback** : Réponses de secours avec mots-clés

### **Exemple de Prompt :**
```
MOTS-CLÉS À UTILISER POUR LES BOUTONS :
- Pour les questions de contact : mentionne "contact", "contacter", "joindre"
- Pour les projets : mentionne "projets", "portfolio", "réalisations"
- Pour le parcours : mentionne "parcours", "expérience", "à propos"
```

## 🎨 Styles des Boutons

### **Primary (Contact) :**
- **Couleur** : Gradient orange-rouge
- **Usage** : Actions principales

### **Secondary (Projets, GitHub, LinkedIn) :**
- **Couleur** : Bleu
- **Usage** : Actions secondaires

### **Outline (Parcours, Accueil) :**
- **Couleur** : Bordure grise
- **Usage** : Actions tertiaires

## 📱 Responsive Design

### **Desktop :**
- **Layout** : Boutons en ligne
- **Hover** : Effets de survol
- **Icônes** : Visibles à côté du texte

### **Mobile :**
- **Layout** : Boutons empilés
- **Taille** : Adaptée au tactile
- **Espacement** : Optimisé pour les doigts

## 🧪 Tests

### **Questions à Tester :**
1. "Comment le contacter ?" → Bouton "Page Contact"
2. "Quels sont ses projets ?" → Bouton "Mes Projets"
3. "Parlez-moi de son parcours" → Bouton "Mon Parcours"
4. "A-t-il un GitHub ?" → Bouton "GitHub"
5. "Comment le joindre sur LinkedIn ?" → Bouton "LinkedIn"

### **URLs à Tester :**
- "Voici mon site : https://example.com" → Bouton "Ouvrir le lien"

## ✨ Avantages

### **UX Améliorée :**
- **Navigation intuitive** : Boutons contextuels
- **Actions directes** : Redirection immédiate
- **Découverte** : Exploration des sections

### **Engagement :**
- **Interactivité** : Interface plus dynamique
- **Conversion** : Incitation à explorer
- **Rétention** : Navigation facilitée

### **Maintenance :**
- **Automatique** : Pas de configuration manuelle
- **Évolutif** : Ajout facile de nouveaux boutons
- **Robuste** : Fallback en cas d'erreur

## 🔧 Configuration

### **Ajouter un Nouveau Bouton :**
```typescript
{
  keywords: ['nouveau', 'mot-clé'],
  text: 'Nouveau Bouton',
  href: '/nouvelle-page',
  icon: 'NouvelleIcon',
  variant: 'primary'
}
```

### **Modifier les Styles :**
```typescript
const getButtonStyles = (variant: string) => {
  // Styles personnalisés
};
```

**Le système de boutons intelligents améliore considérablement l'expérience utilisateur en proposant des actions contextuelles !** 🎉
