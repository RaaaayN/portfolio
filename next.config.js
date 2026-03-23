/** @type {import('next').NextConfig} */

const securityHeaders = [
  // Empêche le clickjacking
  { key: 'X-Frame-Options', value: 'DENY' },
  // Empêche le sniffing de Content-Type
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Politique de référent stricte
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Désactive les fonctionnalités browser non utilisées
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
  // Active HSTS (HTTPS uniquement, 1 an)
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
  // Content Security Policy
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",   // Next.js requires these
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' https://fonts.gstatic.com",
      "connect-src 'self' https://generativelanguage.googleapis.com",
      "frame-src 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
    ].join('; '),
  },
];

const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  images: {
    remotePatterns: [],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
