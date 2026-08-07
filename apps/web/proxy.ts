import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export default clerkMiddleware(async (auth, request) => {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith('/ping')) return new Response('pong', { status: 200 });
  if (process.env.APP_E2E === '1') return NextResponse.next();
  if (pathname.startsWith('/api/auth') || pathname.startsWith('/sso-callback')) return NextResponse.next();

  const { userId } = await auth();
  const guestCookie = request.cookies.get('guest_session');
  if (!userId && !guestCookie && !['/login', '/register'].includes(pathname)) {
    return NextResponse.redirect(new URL(`/api/auth/guest?redirectUrl=${encodeURIComponent(request.url)}`, request.url));
  }
  if (userId && ['/login', '/register'].includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
});

export const config = {
  matcher: ['/', '/chat/:id', '/api/:path*', '/login', '/register', '/sso-callback', '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
};
