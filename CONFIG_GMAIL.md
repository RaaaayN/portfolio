# 📧 Configuration Gmail - Rayan Barreddine

## 🎯 Votre Configuration

**Email d'envoi :** `rayan.barreddine@gmail.com`  
**Email de réception :** `rayan.barre@icloud.com`

## ⚡ Configuration Rapide (3 étapes)

### 1. Activer la vérification en 2 étapes
- Allez sur https://myaccount.google.com/security
- Activez **"Vérification en 2 étapes"** sur votre compte `rayan.barreddine@gmail.com`

### 2. Générer un mot de passe d'application
- Allez sur https://myaccount.google.com/apppasswords
- Sélectionnez **"Autre (nom personnalisé)"**
- Tapez : **"Portfolio Rayan"**
- **Copiez le mot de passe** (16 caractères comme : `abcd efgh ijkl mnop`)

### 3. Créer le fichier .env.local
Créez le fichier `.env.local` à la racine du projet :

```env
EMAIL_USER=rayan.barreddine@gmail.com
EMAIL_PASS=votre_mot_de_passe_16_caracteres
```

## 🧪 Test de la configuration

```bash
# Test simple
node scripts/test-gmail.js

# Ou testez directement sur le site
npm run dev
# Allez sur http://localhost:3001/contact
```

## ✅ Vérification

Une fois configuré, vous devriez recevoir des emails sur `rayan.barre@icloud.com` avec :
- **Expéditeur :** rayan.barreddine@gmail.com
- **Sujet :** [Portfolio] Votre message
- **Contenu :** Informations du contact + message formaté

## 🔧 Dépannage

**"Invalid login"** :
- Vérifiez que la vérification en 2 étapes est activée
- Utilisez le mot de passe d'application, pas votre mot de passe normal

**"Cannot find module"** :
- Exécutez : `npm install nodemailer`
- Ou testez directement sur le site web

**Pas d'email reçu** :
- Vérifiez vos spams
- Vérifiez que l'email de destination est correct : `rayan.barre@icloud.com`

## 📱 Test final

1. Allez sur http://localhost:3001/contact
2. Remplissez le formulaire
3. Envoyez le message
4. Vérifiez `rayan.barre@icloud.com` !

---

**Configuration actuelle :**
- ✅ Email d'envoi : rayan.barreddine@gmail.com
- ✅ Email de réception : rayan.barre@icloud.com
- ⏳ Mot de passe d'application : À configurer
