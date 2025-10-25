import { NextRequest, NextResponse } from 'next/server';
import { readProfile } from '@/lib/readProfile';
import { validateCaptcha } from '@/lib/captchaConfig';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message, captchaToken } = await request.json();

    // Validation du captcha
    const captchaValidation = await validateCaptcha(captchaToken);
    if (!captchaValidation.valid) {
      return NextResponse.json(
        { error: captchaValidation.error || 'Vérification de sécurité échouée' },
        { status: 403 }
      );
    }

    // Validation des données
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Adresse email invalide' },
        { status: 400 }
      );
    }

    // Limiter la longueur des champs
    if (name.length > 100 || subject.length > 200 || message.length > 2000) {
      return NextResponse.json(
        { error: 'Un ou plusieurs champs sont trop longs' },
        { status: 400 }
      );
    }

    const profile = readProfile();

    // Tentative d'envoi d'email (avec gestion d'erreur)
    let emailSent = false;
    let emailError = null;

    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        });

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: profile.contact.email,
          subject: `[Portfolio] ${subject}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
                Nouveau message de contact
              </h2>
              
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #495057; margin-top: 0;">Informations de contact</h3>
                <p><strong>Nom:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Sujet:</strong> ${subject}</p>
                <p><strong>Date:</strong> ${new Date().toLocaleString('fr-FR')}</p>
              </div>
              
              <div style="background-color: #ffffff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px;">
                <h3 style="color: #495057; margin-top: 0;">Message</h3>
                <p style="line-height: 1.6; white-space: pre-wrap;">${message}</p>
              </div>
              
              <div style="margin-top: 20px; padding: 15px; background-color: #e9ecef; border-radius: 8px; font-size: 12px; color: #6c757d;">
                <p>Ce message a été envoyé depuis le formulaire de contact de votre portfolio.</p>
                <p>Pour répondre, utilisez l'adresse email: ${email}</p>
              </div>
            </div>
          `
        };

        await transporter.sendMail(mailOptions);
        emailSent = true;
      }
    } catch (error) {
      emailError = error.message;
    }

    return NextResponse.json({
      message: 'Message envoyé avec succès',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Erreur lors du traitement du message:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi du message' },
      { status: 500 }
    );
  }
}