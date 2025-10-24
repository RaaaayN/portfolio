/**
 * Configuration et utilitaires pour Google reCAPTCHA v3
 */

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

/**
 * Vérifie un token reCAPTCHA auprès de Google
 * @param token - Le token reCAPTCHA fourni par le client
 * @returns true si le token est valide, false sinon
 */
export async function verifyCaptcha(token: string): Promise<boolean> {
  if (!RECAPTCHA_SECRET_KEY) {
    console.error('⚠️ RECAPTCHA_SECRET_KEY is not configured');
    // En développement, on peut retourner true si la clé n'est pas configurée
    if (process.env.NODE_ENV === 'development') {
      console.warn('⚠️ Skipping captcha verification in development mode');
      return true;
    }
    return false;
  }

  if (!token) {
    return false;
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${RECAPTCHA_SECRET_KEY}&response=${token}`,
    });

    const data = await response.json();

    // Vérifier que la réponse est réussie et que le score est acceptable (> 0.5)
    return data.success === true && data.score > 0.5;
  } catch (error) {
    console.error('❌ Erreur lors de la vérification du captcha:', error);
    return false;
  }
}

/**
 * Valide et vérifie un token reCAPTCHA dans le contexte d'une requête API
 * @param token - Le token reCAPTCHA fourni par le client
 * @returns Un objet avec le statut de validation et un message d'erreur éventuel
 */
export async function validateCaptcha(token: string): Promise<{ valid: boolean; error?: string }> {
  if (!token) {
    return { valid: false, error: 'Token captcha manquant' };
  }

  const isValid = await verifyCaptcha(token);

  if (!isValid) {
    return { valid: false, error: 'Échec de la vérification du captcha' };
  }

  return { valid: true };
}

