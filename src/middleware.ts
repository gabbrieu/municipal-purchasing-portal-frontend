import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authTokens = request.cookies.get('auth_tokens')?.value;

  if (!authTokens && !request.nextUrl.pathname.startsWith('/auth/login')) {
    return Response.redirect(new URL('/auth/login', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
