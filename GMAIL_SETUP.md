# Configuration Gmail pour le Portfolio

## 📧 Configuration de votre adresse Gmail

### Étape 1 : Activer la vérification en 2 étapes

1. **Connectez-vous à votre compte Google**
2. Allez dans **Gérer votre compte Google** (icône de profil)
3. Sélectionnez **Sécurité** dans le menu de gauche
4. Trouvez **"Vérification en 2 étapes"** et cliquez dessus
5. **Activez la vérification en 2 étapes** si ce n'est pas déjà fait
   - Suivez les instructions pour configurer votre téléphone
   - Confirmez avec un code SMS

### Étape 2 : Générer un mot de passe d'application

1. **Toujours dans la section Sécurité**
2. Cherchez **"Mots de passe des applications"** (ou "App passwords")
3. Cliquez sur **"Mots de passe des applications"**
4. Sélectionnez **"Autre (nom personnalisé)"**
5. Tapez : **"Portfolio Contact Form"**
6. Cliquez sur **"Générer"**
7. **Copiez le mot de passe généré** (16 caractères) - vous ne pourrez plus le voir !

### Étape 3 : Créer le fichier .env.local

Créez un fichier `.env.local` à la racine de votre projet avec :

```env
EMAIL_USER=votre_adresse@gmail.com
EMAIL_PASS=votre_mot_de_passe_application_16_caracteres
```

**Exemple :**
```env
EMAIL_USER=rayan.barre@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop
```

### Étape 4 : Redémarrer le serveur

```bash
npm run dev
```

### Étape 5 : Tester

1. Allez sur `http://localhost:3001/contact`
2. Remplissez le formulaire
3. Envoyez le message
4. Vérifiez votre boîte Gmail !

## 🔒 Sécurité

- ✅ Le fichier `.env.local` est dans `.gitignore` (sécurisé)
- ✅ Utilisez toujours un mot de passe d'application, jamais votre mot de passe principal
- ✅ Le mot de passe d'application ne fonctionne que pour cette application

## 🚨 Dépannage

**"Invalid login"** :
- Vérifiez que la vérification en 2 étapes est activée
- Utilisez le mot de passe d'application, pas votre mot de passe normal

**"Less secure app access"** :
- Cette option est dépréciée, utilisez les mots de passe d'application

**"Authentication failed"** :
- Vérifiez que vous avez copié correctement le mot de passe d'application
- Assurez-vous qu'il n'y a pas d'espaces supplémentaires

## 📱 Alternative : Gmail App Password

Si vous ne trouvez pas "Mots de passe des applications" :

1. Allez sur https://myaccount.google.com/security
2. Activez la vérification en 2 étapes
3. Cherchez "Mots de passe des applications"
4. Ou utilisez ce lien direct : https://myaccount.google.com/apppasswords

## ✅ Vérification

Une fois configuré, vous devriez recevoir des emails comme celui-ci :

```
De: rayan.barre@gmail.com
À: rayan.barre@gmail.com
Sujet: [Portfolio] Test du formulaire

Nouveau message depuis votre portfolio
Nom: Test User
Email: test@example.com
Sujet: Test du formulaire
Message: Ceci est un test
```
