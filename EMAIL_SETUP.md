# Configuration Email - Portfolio

## 📧 Configuration de l'envoi d'emails

Pour que le formulaire de contact fonctionne, vous devez configurer les variables d'environnement.

### 1. Créer le fichier .env.local

Créez un fichier `.env.local` à la racine du projet avec le contenu suivant :

```env
EMAIL_USER=votre_email@gmail.com
EMAIL_PASS=votre_mot_de_passe_application
```

### 2. Configuration Gmail

#### Option A : Gmail (Recommandé)

1. **Activez la vérification en 2 étapes** sur votre compte Google
2. Allez dans **Sécurité** > **Mots de passe des applications**
3. Générez un **nouveau mot de passe d'application**
4. Utilisez ce mot de passe dans `EMAIL_PASS`

#### Option B : Autres services

Vous pouvez utiliser d'autres services email en modifiant `lib/emailConfig.ts` :

```typescript
export const emailConfig = {
  service: 'outlook', // ou 'yahoo', 'hotmail', etc.
  user: 'votre_email@outlook.com',
  pass: 'votre_mot_de_passe',
  to: 'votre_email@outlook.com',
};
```

### 3. Test de la configuration

1. Démarrez le serveur : `npm run dev`
2. Allez sur `/contact`
3. Remplissez le formulaire
4. Vérifiez que vous recevez l'email

### 4. Sécurité

- ⚠️ **Ne commitez jamais** le fichier `.env.local`
- 🔒 Utilisez des mots de passe d'application, pas vos mots de passe principaux
- 🛡️ Le fichier `.env.local` est déjà dans `.gitignore`

### 5. Dépannage

**Erreur "Invalid login"** :
- Vérifiez que la vérification en 2 étapes est activée
- Utilisez un mot de passe d'application, pas votre mot de passe normal

**Erreur "Less secure app access"** :
- Cette option est dépréciée, utilisez les mots de passe d'application

**Erreur de connexion** :
- Vérifiez que les variables d'environnement sont correctement définies
- Redémarrez le serveur après modification du `.env.local`

### 6. Personnalisation

Vous pouvez modifier le template email dans `app/api/contact/route.ts` pour personnaliser :
- Le design de l'email
- Les informations affichées
- Le format du message
