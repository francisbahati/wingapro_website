// proxy.ts — Next.js 15.5+ proxy (replaces middleware.ts)
//
// IMPORTANT: Next.js looks for a function exported as `proxy` (or as the
// default export) inside this file. Do NOT name it `middleware` — that was
// the old convention and will fail on Next 15.5+.

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes that must ALWAYS be reachable without login.
// Includes all Google Play compliance pages.
const PUBLIC_PATHS = new Set<string>([
  '/',
  '/about',
  '/contact',
  '/download',
  '/plans',
  '/legal',
  '/children-abuse',      // ← Google Play CSAE policy
  '/account-deletion',    // ← Google Play account-deletion URL
  '/account-deleted',     // ← post-deletion landing
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/recovery',
]);

// Auth pages a logged-in user should skip.
const AUTH_PAGES_WHEN_LOGGED_IN = new Set<string>(['/login', '/register']);

// ⚠️ FUNCTION NAME MUST BE `proxy`
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow any path that looks like a static asset (has a file extension).
  if (/\.[a-zA-Z0-9]+$/.test(pathname)) {
    return NextResponse.next();
  }

  // Allow Next.js internals and API routes.
  if (pathname.startsWith('/_next') || pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  const token = request.cookies.get('jwt_token')?.value;

  // Public pages — allowed with or without login
  if (PUBLIC_PATHS.has(pathname)) {
    if (token && AUTH_PAGES_WHEN_LOGGED_IN.has(pathname)) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  // Everything else requires authentication
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
