import { jwtDecode } from 'jwt-decode';
import { NextRequest } from 'next/server';
import { IJWTPayload } from './types/user';

export function middleware(request: NextRequest): Response | undefined {
  try {
    const authTokens: string | undefined =
      request.cookies.get('auth_tokens')?.value;

    if (!authTokens && !request.nextUrl.pathname.startsWith('/auth/login')) {
      throw new Error('Sem token de acesso');
    }

    if (authTokens) {
      const userDecoded = jwtDecode<IJWTPayload>(authTokens);
      const isValid: boolean = isJWTUserInCorrectForm(userDecoded);

      if (!isValid && !request.nextUrl.pathname.startsWith('/auth/login')) {
        throw new Error('JWT inválido!');
      }
    }
  } catch (error) {
    console.error(error);
    return Response.redirect(new URL('/auth/login', request.url));
  }
}

function isJWTUserInCorrectForm(userDecoded: IJWTPayload): boolean {
  const jwtKeys = [
    'sub',
    'username',
    'city',
    'cpf',
    'email',
    'role',
    'name',
    'iat',
    'exp',
  ];
  const userDecodedKeys: string[] = Object.keys(userDecoded);

  if (jwtKeys.length !== userDecodedKeys.length) {
    return false;
  }

  const sortedjwtKeys = [...jwtKeys].sort();
  const sortedAserDecodedKeys = [...userDecodedKeys].sort();

  return sortedjwtKeys.every(
    (value, index) => value === sortedAserDecodedKeys[index]
  );
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
