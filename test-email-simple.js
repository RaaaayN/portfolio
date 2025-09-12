// Test simple de la configuration Gmail
const nodemailer = require('nodemailer');
const { readProfile } = require('./lib/readProfile');

async function testEmail() {
  try {
    const profile = readProfile();
    console.log('📧 Test de configuration Gmail...');

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: profile.contact.email,
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log('🔧 Vérification de la connexion...');
    await transporter.verify();
    console.log('✅ Connexion Gmail réussie !');

    console.log("📧 Envoi d'un email de test...");

    const mailOptions = {
      from: profile.contact.email,
      to: profile.contact.email,
      subject: 'Test Portfolio - Configuration Gmail',
      html: `
        <h2>✅ Test de configuration Gmail réussi !</h2>
        <p>Si vous recevez cet email, votre configuration Gmail fonctionne parfaitement.</p>
        <p>Date: ${new Date().toLocaleString('fr-FR')}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Email de test envoyé avec succès !');
    console.log(`📬 Vérifiez votre boîte email : ${profile.contact.email}`);

  } catch (error) {
    console.error('❌ Erreur :', error.message);

    if (error.message.includes('Invalid login')) {
      console.log('💡 Vérifiez que la vérification en 2 étapes est activée');
      console.log("💡 Utilisez un mot de passe d'application");
    }
  }
}

testEmail();
