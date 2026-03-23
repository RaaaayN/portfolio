import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { emailConfig } from '@/lib/emailConfig';
import { readProfile } from '@/lib/readProfile';
import {
  contactRateLimiter,
  getClientIp,
  sanitizeInput,
  escapeHtml,
} from '@/lib/security';

export async function POST(request: NextRequest) {
  try {
    // 1. Rate limiting — 3 envois/10min par IP
    const ip = getClientIp(request);
    const rl = contactRateLimiter.check(ip);
    if (rl.limited) {
      return NextResponse.json(
        { error: 'Trop de tentatives. Réessayez dans 10 minutes.' },
        {
          status: 429,
          headers: { 'Retry-After': String(Math.ceil(rl.resetInMs / 1000)) },
        }
      );
    }

    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: 'Corps de requête invalide' }, { status: 400 });
    }

    const { name, email, subject, message, website } = body;

    // 2. Honeypot — rempli par les bots, vide chez les humains
    if (website) {
      return NextResponse.json({ message: 'OK' }, { status: 200 });
    }

    // 3. Validation des champs obligatoires
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Tous les champs sont requis' }, { status: 400 });
    }

    // 4. Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Adresse email invalide' }, { status: 400 });
    }

    // 5. Limites de longueur
    if (name.length > 100 || subject.length > 200 || message.length > 5000) {
      return NextResponse.json({ error: 'Contenu trop long' }, { status: 400 });
    }

    // 6. Sanitisation + échappement HTML (contre l'injection dans le corps d'email)
    const safeName    = escapeHtml(sanitizeInput(String(name)));
    const safeEmail   = escapeHtml(sanitizeInput(String(email)));
    const safeSubject = escapeHtml(sanitizeInput(String(subject)));
    const safeMessage = escapeHtml(sanitizeInput(String(message)));

    // 7. Envoi de l'email
    const transporter = nodemailer.createTransport({
      service: emailConfig.service,
      auth: { user: emailConfig.user, pass: emailConfig.pass },
    });

    const profile = readProfile();
    const mailOptions = {
      from: emailConfig.user,
      to: emailConfig.to,
      replyTo: safeEmail,
      subject: `[Portfolio] ${safeSubject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
            Nouveau message depuis votre portfolio
          </h2>
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Informations du contact</h3>
            <p><strong>Nom :</strong> ${safeName}</p>
            <p><strong>Email :</strong> ${safeEmail}</p>
            <p><strong>Sujet :</strong> ${safeSubject}</p>
          </div>
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h3 style="color: #374151; margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${safeMessage}</p>
          </div>
          <div style="margin-top: 20px; padding: 15px; background-color: #eff6ff; border-radius: 8px;">
            <p style="margin: 0; color: #1e40af; font-size: 14px;">
              <strong>💡 Conseil :</strong> Répondez directement à cet email pour contacter ${safeName}.
            </p>
          </div>
          <div style="margin-top: 20px; text-align: center; color: #6b7280; font-size: 12px;">
            <p>Message envoyé depuis le portfolio de ${profile.name}</p>
            <p>Date : ${new Date().toLocaleString('fr-FR')}</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Message envoyé avec succès' }, { status: 200 });

  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi du message' },
      { status: 500 }
    );
  }
}
