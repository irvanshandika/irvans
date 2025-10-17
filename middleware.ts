import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isAuthenticated = !!token;

  // Daftar rute yang memerlukan autentikasi
  const protectedRoutes = ['/dashboard', '/profile'];

  // Periksa apakah rute saat ini adalah rute yang dilindungi
  const isProtectedRoute = protectedRoutes.some(route =>
    request.nextUrl.pathname.startsWith(route)
  );

  // Jika rute dilindungi dan pengguna tidak terautentikasi, redirect ke login
  if (isProtectedRoute && !isAuthenticated) {
    const redirectUrl = new URL('/auth/login', request.url);
    redirectUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Jika pengguna sudah terautentikasi dan mencoba mengakses halaman login/register, redirect ke home
  if (
    isAuthenticated &&
    (request.nextUrl.pathname.startsWith('/auth/login') ||
      request.nextUrl.pathname.startsWith('/auth/register'))
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/auth/login',
    '/auth/register',
    // Pastikan middleware tidak menangani rute API auth
    '/((?!api/auth).*)',
  ],
};
