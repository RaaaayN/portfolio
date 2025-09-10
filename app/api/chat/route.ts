import { NextRequest, NextResponse } from 'next/server';
import { ragSystem } from '@/lib/ragSystem';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    // Validation
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Le message est requis' },
        { status: 400 }
      );
    }

    // Limiter la longueur du message
    if (message.length > 500) {
      return NextResponse.json(
        { error: 'Le message est trop long (max 500 caractères)' },
        { status: 400 }
      );
    }

    // Générer la réponse avec le RAG
    const response = await ragSystem.generateResponse(message.trim());

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

// Endpoint pour obtenir les questions suggérées
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
