import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Bloquer les méthodes HTTP non autorisées sur les API routes
  if (pathname.startsWith('/api/')) {
    const allowedMethods: Record<string, string[]> = {
      '/api/chat':    ['GET', 'POST'],
      '/api/contact': ['POST'],
    };

    const allowed = allowedMethods[pathname];
    if (allowed && !allowed.includes(request.method)) {
      return new NextResponse(null, {
        status: 405,
        headers: { Allow: allowed.join(', ') },
      });
    }

    // Vérifier Content-Type sur les POST
    if (request.method === 'POST') {
      const contentType = request.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        return NextResponse.json(
          { error: 'Content-Type doit être application/json' },
          { status: 415 }
        );
      }
    }

    // Bloquer les User-Agents suspects (bots évidents)
    const ua = request.headers.get('user-agent') || '';
    const suspiciousUA = [
      /^curl\//i,
      /^python-requests/i,
      /^Go-http-client/i,
      /^axios/i,
      /^node-fetch/i,
      /^libwww/i,
      /scrapy/i,
    ];
    // On ne bloque pas le fetch du navigateur (il a un User-Agent complet)
    // On bloque uniquement les UA qui n'ont pas du tout de navigateur dans leur string
    const hasNoRealBrowser = suspiciousUA.some(p => p.test(ua)) &&
      !ua.includes('Mozilla') &&
      !ua.includes('Chrome') &&
      !ua.includes('Safari') &&
      !ua.includes('Firefox');

    if (hasNoRealBrowser) {
      return NextResponse.json(
        { error: 'Accès refusé' },
        { status: 403 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
