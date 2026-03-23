/**
 * Module de sécurité centralisé
 * Utilisé par les API routes pour la protection anti-spam, anti-injection et anti-bot.
 */

// ─────────────────────────────────────────────
// RATE LIMITER
// ─────────────────────────────────────────────
interface RateLimitEntry {
  count: number;
  resetAt: number;
}

export class RateLimiter {
  private readonly map = new Map<string, RateLimitEntry>();

  constructor(
    private readonly max: number,
    private readonly windowMs: number,
  ) {}

  check(key: string): { limited: boolean; remaining: number; resetInMs: number } {
    const now = Date.now();
    const entry = this.map.get(key);

    if (!entry || now > entry.resetAt) {
      this.map.set(key, { count: 1, resetAt: now + this.windowMs });
      return { limited: false, remaining: this.max - 1, resetInMs: this.windowMs };
    }

    if (entry.count >= this.max) {
      return { limited: true, remaining: 0, resetInMs: entry.resetAt - now };
    }

    entry.count++;
    return { limited: false, remaining: this.max - entry.count, resetInMs: entry.resetAt - now };
  }
}

// Rate limiters pré-configurés par endpoint
export const chatRateLimiter    = new RateLimiter(10, 60 * 1000);       // 10 msgs/min/IP
export const contactRateLimiter = new RateLimiter(3,  10 * 60 * 1000);  // 3 envois/10min/IP

// ─────────────────────────────────────────────
// IP DETECTION
// ─────────────────────────────────────────────
export function getClientIp(req: Request): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  );
}

// ─────────────────────────────────────────────
// INPUT SANITIZATION
// ─────────────────────────────────────────────

/** Supprime les caractères de contrôle et null bytes. */
export function sanitizeInput(input: string): string {
  return input
    .replace(/\0/g, '')                            // Null bytes
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '') // Caractères de contrôle
    .trim();
}

// ─────────────────────────────────────────────
// PROMPT INJECTION DETECTION
// ─────────────────────────────────────────────
const PROMPT_INJECTION_PATTERNS: RegExp[] = [
  /ignore\s+(all\s+)?previous\s+instructions/i,
  /disregard\s+(all\s+)?(previous\s+)?instructions/i,
  /forget\s+(all\s+)?(your\s+)?(previous\s+)?instructions/i,
  /you\s+are\s+now\s+(?!an?\s+assistant)/i,
  /pretend\s+(you\s+are|to\s+be)/i,
  /act\s+as\s+(?!an?\s+assistant)/i,
  /jailbreak/i,
  /\bDAN\b/,
  /do\s+anything\s+now/i,
  /reveal\s+(your\s+)?(system\s+)?(prompt|instructions|context)/i,
  /show\s+(me\s+)?(your\s+)?(system\s+)?(prompt|instructions)/i,
  /what\s+are\s+your\s+(system\s+)?instructions/i,
  /override\s+(your\s+)?(system\s+)?(prompt|instructions)/i,
  /new\s+instructions\s*:/i,
  /system\s*:\s/i,
  /\[INST\]/i,
  /<\|im_start\|>/i,
  /###\s+instruction/i,
  /##\s+system/i,
  /<<SYS>>/i,
  /you\s+must\s+(now\s+)?ignore/i,
  /bypass\s+(your\s+)?(restrictions|rules|instructions)/i,
];

export function detectPromptInjection(input: string): boolean {
  return PROMPT_INJECTION_PATTERNS.some(p => p.test(input));
}

// ─────────────────────────────────────────────
// HTML ESCAPING (pour les emails)
// ─────────────────────────────────────────────
const HTML_ESCAPE_MAP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;',
};

export function escapeHtml(str: string): string {
  return str.replace(/[&<>"'/]/g, char => HTML_ESCAPE_MAP[char] ?? char);
}

// ─────────────────────────────────────────────
// OUTPUT VALIDATION (réponses LLM)
// ─────────────────────────────────────────────
const SENSITIVE_OUTPUT_PATTERNS: RegExp[] = [
  /AIzaSy[A-Za-z0-9_-]{33}/,             // Format clé API Google
  /[a-z]{4}\s[a-z]{4}\s[a-z]{4}\s[a-z]{4}/, // Format App Password Gmail (xxxx xxxx xxxx xxxx)
  /GEMINI_API_KEY\s*[:=]\s*\S+/i,
  /EMAIL_PASS\s*[:=]\s*\S+/i,
  /sk-[A-Za-z0-9]{40,}/,                 // Format clé OpenAI
];

export function sanitizeLLMOutput(output: string): string {
  let sanitized = output;
  for (const pattern of SENSITIVE_OUTPUT_PATTERNS) {
    sanitized = sanitized.replace(pattern, '[REDACTED]');
  }
  return sanitized;
}
