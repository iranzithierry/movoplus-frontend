import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { generateSessionId, isAccessTokenValid, refreshAccessToken } from './lib/helpers/auth';
import { COOKIE_NAMES, COOKIE_TIME } from './lib/constants/config';
import { getApiClient } from './lib/api';
import { logout } from './lib/actions/auth';

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const protectedRoutes = ['/dashboard/*', '/profile/*', '/settings/*']
    const protectedRouteRegex = new RegExp(`^(${protectedRoutes.join('|')})(?:/|$)`)
    const accessingProtectedRoute = protectedRouteRegex.test(path)

    const accessToken = request.cookies.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;
    const refreshToken = request.cookies.get(COOKIE_NAMES.REFRESH_TOKEN)?.value;

    let sessionId = request.cookies.get(COOKIE_NAMES.SESSION_ID)?.value
    

    const nextResponse = NextResponse.next();

    if(!sessionId){
        sessionId = await generateSessionId(nextResponse);
    }
    
    if (accessingProtectedRoute) {
        if (!accessToken) {
            if (refreshToken) {
                return await refreshAccessToken(request);
            } else {
                return logout('/login', nextResponse, request.nextUrl);
            }
        }
        const accessTokenIsValid = await isAccessTokenValid(request)
        if (accessTokenIsValid) {
            return nextResponse
        } else if (refreshToken) {
            return await refreshAccessToken(request)
        } else {
            return logout('/login', nextResponse, request.nextUrl);
        }
    } else {
        if (accessToken) {
            const accessTokenIsValid = await isAccessTokenValid(request)
            if (accessTokenIsValid) {
                return nextResponse
            } else{
                nextResponse.cookies.delete(COOKIE_NAMES.ACCESS_TOKEN)
                return nextResponse
            }
        } else if(refreshToken){
            return await refreshAccessToken(request);
        }
    }

    return nextResponse
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};