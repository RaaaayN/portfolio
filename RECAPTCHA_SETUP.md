# Configuration Google reCAPTCHA v3

Ce document explique comment configurer Google reCAPTCHA v3 pour protéger le Chat IA et le formulaire de contact.

## Étapes de configuration

### 1. Créer un compte reCAPTCHA

1. Allez sur [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Cliquez sur "+" pour créer un nouveau site
3. Remplissez le formulaire :
   - **Label** : Donnez un nom à votre site (ex: "Portfolio")
   - **Type reCAPTCHA** : Sélectionnez "reCAPTCHA v3"
   - **Domaines** : Ajoutez vos domaines
     - En développement : `localhost`
     - En production : votre domaine (ex: `portfolio.example.com`)
   - Acceptez les conditions d'utilisation
4. Cliquez sur "Envoyer"

### 2. Récupérer vos clés

Après la création, vous obtiendrez deux clés :
- **Site Key** : Clé publique visible côté client
- **Secret Key** : Clé secrète pour la vérification côté serveur

### 3. Configurer les variables d'environnement

Créez un fichier `.env.local` à la racine du projet et ajoutez :

```env
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=votre_site_key
RECAPTCHA_SECRET_KEY=votre_secret_key
```

⚠️ **Important** : 
- Ne commitez JAMAIS le fichier `.env.local` dans Git
- Le fichier `.env.example` est déjà dans le dépôt pour référence

### 4. Test de la configuration

En développement, si les clés ne sont pas configurées, le système fonctionnera toujours mais sans protection captcha (un avertissement sera affiché dans la console).

## Fonctionnement

### Côté client

1. Le composant `ReCaptchaProvider` charge le script reCAPTCHA
2. Lors de l'envoi d'un message (chat ou contact), un token est généré
3. Le token est envoyé avec la requête API

### Côté serveur

1. Le token est vérifié auprès de Google
2. Google retourne un score (0.0 à 1.0)
3. Si le score est > 0.5, la requête est acceptée
4. Sinon, elle est rejetée avec une erreur 403

## Dépannage

### Erreur "Token captcha manquant"
- Vérifiez que le script reCAPTCHA est bien chargé
- Vérifiez que `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` est configuré

### Erreur "Échec de la vérification du captcha"
- Vérifiez que `RECAPTCHA_SECRET_KEY` est correct
- Vérifiez que le domaine est bien enregistré dans la console reCAPTCHA
- Consultez les logs serveur pour plus de détails

### Le captcha ne fonctionne pas en développement
- C'est normal si les clés ne sont pas configurées
- Configurez les clés pour tester la protection complète

## Plus d'informations

- [Documentation officielle reCAPTCHA v3](https://developers.google.com/recaptcha/docs/v3)
- [react-google-recaptcha-v3](https://github.com/t49tran/react-google-recaptcha-v3)

