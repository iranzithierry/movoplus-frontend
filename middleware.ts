import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { refreshAccessToken } from './lib/helpers/auth';
import { COOKIE_NAMES, COOKIE_TIME } from './lib/constants/config';
import { getApiClient } from './lib/api';

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const protectedRoutes = ['/dashboard/*', '/profile/*', '/settings/*']
    const protectedRouteRegex = new RegExp(`^(${protectedRoutes.join('|')})(?:/|$)`)
    const accessingProtectedRoute = protectedRouteRegex.test(path)

    const accessToken = request.cookies.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;
    const refreshToken = request.cookies.get(COOKIE_NAMES.REFRESH_TOKEN)?.value;
    let tokens = await (await getApiClient()).auth.authTokenRefreshCreate({ refresh: `${refreshToken}` })
    console.log(tokens);
    

    if (accessingProtectedRoute && !request.cookies.get(COOKIE_NAMES.ACCESS_TOKEN)) {
        const response = NextResponse.redirect(new URL(`/login?redirect_back=${path}`, request.nextUrl))
        response.cookies.set(COOKIE_NAMES.REDIRECT_BACK, path, { maxAge: COOKIE_TIME.REDIRECT_BACK })
        return response
    }
    // if(!accessToken && refreshToken){
    //     const response = await refreshAccessToken(request)
    //     return response
    // }
    // if (accessingProtectedRoute && request.cookies.get(COOKIE_NAMES.ACCESS_TOKEN)) {
    //     return await refreshAccessToken(request)
    // }
    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};