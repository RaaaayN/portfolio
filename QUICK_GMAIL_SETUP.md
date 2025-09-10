# 🚀 Configuration Gmail Rapide

## ⚡ Étapes Express (5 minutes)

### 1. Activer la vérification en 2 étapes
- Allez sur https://myaccount.google.com/security
- Activez **"Vérification en 2 étapes"**

### 2. Générer un mot de passe d'application
- Allez sur https://myaccount.google.com/apppasswords
- Sélectionnez **"Autre (nom personnalisé)"**
- Tapez : **"Portfolio"**
- **Copiez le mot de passe** (16 caractères)

### 3. Créer le fichier .env.local
Créez le fichier `.env.local` à la racine du projet :

```env
EMAIL_USER=votre_adresse@gmail.com
EMAIL_PASS=votre_mot_de_passe_16_caracteres
```

### 4. Tester
```bash
npm run dev
```
Allez sur `/contact` et testez le formulaire !

## 🔧 Test de configuration

Exécutez le script de test :
```bash
node scripts/test-email.js
```

## ✅ Vérification

Vous devriez recevoir un email de test dans votre Gmail !

---

**Besoin d'aide ?** Consultez `GMAIL_SETUP.md` pour plus de détails.
