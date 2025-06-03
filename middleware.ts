import { jwtDecode } from 'jwt-decode';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { getRole } from './lib/helpers';
import { UserRole } from './constants/enums';
import { ACCESS_TOKEN_COOKIE_KEY } from './constants';
import type { ICustomJwtPayload } from './interfaces';

const PUBLIC_PATHS = ['/'];
const AUTH_PATHS = [
  '/login',
  '/sign-up',
  '/oauth',
  '/reset-password',
  '/send-otp',
  '/verify-otp'
];
const ADMIN_PATHS = ['/dashboard'];
const RECRUITER_PATHS = ['/recruiter'];
const USER_PATHS = ['/user'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get(ACCESS_TOKEN_COOKIE_KEY)?.value;
  const { pathname } = request.nextUrl;

  const isPublicPath = PUBLIC_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  const isAuthPath = AUTH_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  const isAdminPath = ADMIN_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  const isRecruiterPath = RECRUITER_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  const isUserPath = USER_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  if (isPublicPath || isAuthPath) {
    if (token) {
      try {
        const decoded = jwtDecode<ICustomJwtPayload>(token);
        const role = getRole(decoded.realm_access.roles || []);

        if (role === UserRole.ADMIN) {
          if (isAuthPath) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
          } else if (isPublicPath) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
          }
        } else if (role === UserRole.RECRUITER) {
          if (isAuthPath) {
            return NextResponse.redirect(new URL('/recruiter', request.url));
          }
        } else if (role === UserRole.JOB_SEEKER) {
          if (isAuthPath) {
            return NextResponse.redirect(new URL('/', request.url));
          }
        }
      } catch (error) {
        console.error('Token decoding error:', error);
      }
    }
    return NextResponse.next();
  }

  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const decoded = jwtDecode<ICustomJwtPayload>(token);
    const role = getRole(decoded.realm_access.roles || []);

    if (role === UserRole.ADMIN) {
      if (isAdminPath) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    }

    if (role === UserRole.RECRUITER) {
      if (isRecruiterPath) {
        return NextResponse.next();
      } else if (isAdminPath || isUserPath) {
        return NextResponse.redirect(new URL('/recruiter', request.url));
      }
      return NextResponse.next();
    }

    if (role === UserRole.JOB_SEEKER) {
      if (isUserPath) {
        return NextResponse.next();
      } else if (isAdminPath || isRecruiterPath) {
        return NextResponse.redirect(new URL('/', request.url));
      }
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL('/login', request.url));
  } catch (error) {
    console.error('Token decoding error:', error);
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/recruiter/:path*',
    '/user/:path*',
    '/login',
    '/sign-up/:path*',
    '/oauth/:path*',
    '/reset-password/:path*',
    '/send-otp/:path*',
    '/verify-otp/:path*'
  ]
};
