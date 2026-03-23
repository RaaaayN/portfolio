import { NextRequest, NextResponse } from 'next/server';
import { ragSystem } from '@/lib/ragSystem';
import {
  chatRateLimiter,
  getClientIp,
  sanitizeInput,
  detectPromptInjection,
} from '@/lib/security';

export async function POST(request: NextRequest) {
  try {
    // 1. Rate limiting — 10 messages/min par IP
    const ip = getClientIp(request);
    const rl = chatRateLimiter.check(ip);
    if (rl.limited) {
      return NextResponse.json(
        { error: 'Trop de messages. Veuillez patienter quelques secondes.' },
        {
          status: 429,
          headers: { 'Retry-After': String(Math.ceil(rl.resetInMs / 1000)) },
        }
      );
    }

    // 2. Validation basique
    const body = await request.json().catch(() => null);
    if (!body || typeof body.message !== 'string' || body.message.trim().length === 0) {
      return NextResponse.json({ error: 'Le message est requis' }, { status: 400 });
    }

    // 3. Sanitisation de l'input
    const rawMessage = sanitizeInput(body.message);

    // 4. Limite de longueur (500 caractères)
    if (rawMessage.length > 500) {
      return NextResponse.json(
        { error: 'Le message est trop long (max 500 caractères)' },
        { status: 400 }
      );
    }

    // 5. Détection de prompt injection
    if (detectPromptInjection(rawMessage)) {
      return NextResponse.json(
        { message: "Je suis ici uniquement pour répondre aux questions sur le profil de Rayan. Je ne peux pas traiter cette demande.", timestamp: new Date().toISOString() },
        { status: 200 }
      );
    }

    // 6. Génération de la réponse
    const response = await ragSystem.generateResponse(rawMessage);

    return NextResponse.json({
      message: response,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('❌ Erreur dans l\'API chat:', error);
    return NextResponse.json(
      { error: 'Erreur lors du traitement de votre message' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const suggestions = ragSystem.getSuggestedQuestions();
    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des suggestions:', error);
    return NextResponse.json(
      { error: 'Erreur lors du chargement des suggestions' },
      { status: 500 }
    );
  }
}
