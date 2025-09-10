// Configuration pour l'envoi d'emails avec Gmail
// Créez un fichier .env.local avec vos informations Gmail

export const emailConfig = {
  // Votre adresse Gmail
  user: process.env.EMAIL_USER || 'rayan.barreddine@gmail.com',
  
  // Mot de passe d'application Gmail (16 caractères)
  pass: process.env.EMAIL_PASS || 'your_gmail_app_password',
  
  // Service Gmail
  service: 'gmail',
  
  // Email de destination (votre Gmail)
  to: process.env.EMAIL_USER || 'rayan.barre@icloud.com',
};

// Instructions pour configurer Gmail :
// 1. Activez la vérification en 2 étapes sur votre compte Google
// 2. Allez dans "Sécurité" > "Mots de passe des applications"
// 3. Générez un nouveau mot de passe d'application
// 4. Utilisez ce mot de passe dans votre fichier .env.local
