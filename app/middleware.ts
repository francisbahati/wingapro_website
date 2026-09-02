// app/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('jwt_token')?.value;
  const role = request.cookies.get('user_role')?.value;

  // Public routes – allow access without token
  const publicRoutes = ['/login', '/register'];
  const isPublic = publicRoutes.some((route) => request.nextUrl.pathname.startsWith(route));

  // If not logged in, redirect to login
  if (!token && !isPublic) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Role-based protection
  if (token) {
    // Admin-only routes
    const adminRoutes = ['/users', '/products/new', '/products/edit', '/reports'];
    const isAdminRoute = adminRoutes.some((route) => request.nextUrl.pathname.startsWith(route));
    if (isAdminRoute && role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  // If logged in and trying to access login/register, redirect to dashboard
  if (token && isPublic) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images|apk|firebase-messaging-sw.js).*)',
  ],
};