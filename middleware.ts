import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { updateAccessToken } from './lib/helpers/auth';
import { COOKIE_NAMES, COOKIE_TIME } from './lib/constants/config';

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const protectedParentRoutes = ['/dashboard', '/profile', '/settings']
    const protectedParentRouteRegex = new RegExp(`^(${protectedParentRoutes.join('|')})(?:/|$)`)

    if (process.env.MAINTENANCE != "true") {
        if (protectedParentRouteRegex.test(path) && !request.cookies.get(COOKIE_NAMES.ACCESS_TOKEN)) {
            const response = NextResponse.redirect(new URL(`/login?redirect_back=${path}`, request.nextUrl))
            response.cookies.set(COOKIE_NAMES.REDIRECT_BACK, path, { maxAge: COOKIE_TIME.REDIRECT_BACK })
            return response
        }
        if (protectedParentRouteRegex.test(path) || request.method == "GET") {
            return await updateAccessToken(request)
        }
        return NextResponse.next();
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};