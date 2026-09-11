// proxy.ts  (project root — same folder as next.config.ts)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_PATHS = [
  '/',
  '/about',
  '/contact',
  '/download',
  '/plans',
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/recovery',
];

const ADMIN_PATHS = ['/users'];

function matchesPath(pathname: string, list: string[]) {
  return list.some((p) => pathname === p || pathname.startsWith(p + '/'));
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('jwt_token')?.value;
  const role = request.cookies.get('user_role')?.value;

  const isPublic = matchesPath(pathname, PUBLIC_PATHS);
  const isAdminOnly = matchesPath(pathname, ADMIN_PATHS);

  // Not logged in → redirect to login
  if (!token && !isPublic) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }

  // Already logged in but trying to log in again
  if (token && (pathname === '/login' || pathname === '/register')) {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    url.search = '';
    return NextResponse.redirect(url);
  }

  // Admin-only routes
  if (isAdminOnly && role !== 'admin') {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images|apk|windows|firebase-messaging-sw.js).*)',
  ],
};