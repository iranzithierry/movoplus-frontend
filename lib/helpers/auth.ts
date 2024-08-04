import 'server-only';

import { decrypt } from '../jwt';
import { getApiClient } from '../api';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { COOKIE_NAMES } from '@/lib/constants/config';
import { NextRequest, NextResponse } from 'next/server';
import { BACKEND_HOST, COOKIE_TIME } from '@/lib/constants/config';

interface Tokens {
  access: string
  refresh: string
}
/**
 * Authenticates a user by setting access and refresh tokens as cookies.
 *
 * @param tokens - An object containing the access and refresh tokens.
 * @throws {Error} If there is an error setting the cookies.
 */
async function authenticate(tokens: Tokens) {
  try {
    setCookie(COOKIE_NAMES.ACCESS_TOKEN, tokens.access, COOKIE_TIME.ACCESS_TOKEN,)
    setCookie(COOKIE_NAMES.REFRESH_TOKEN, tokens.refresh, COOKIE_TIME.REFRESH_TOKEN,)
  } catch (error: any) {
    throw new Error(`Authentication error: ${error.message}`);
  }
}



/**
 * Updates the access token by refreshing it using the refresh token stored in cookies.
 *
 * If the access token is invalid or not present, it will attempt to refresh the access token using the refresh token.
 * If the refresh token is not present, it will delete the access and refresh token cookies.
 * If the token refresh is successful, it will update the access token cookie with the new token.
 *
 * @param request - The NextRequest object containing the cookies.
 * @returns The NextResponse object with the updated access token cookie.
 * @throws {Error} If an error occurs during the token refresh, the error message will be logged.
 */
async function updateAccessToken(request: NextRequest) {
  const response = NextResponse.next();
  const accessToken = request.cookies.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;
  const refreshToken = request.cookies.get(COOKIE_NAMES.REFRESH_TOKEN)?.value;

  if (accessToken && !(await decrypt(accessToken).catch(() => true))) {
    return response;
  }
  if (!refreshToken) {
    deleteCookieTokens()
    return response;
  }
  try {
    const tokens = await fetch(`${BACKEND_HOST}/api/auth/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: refreshToken })
    });
    const newTokens = await tokens.json()
    if (!newTokens || !('access' in newTokens)) {
      return response;
    }

    if ('access' in newTokens) {
      setCookie(COOKIE_NAMES.ACCESS_TOKEN, newTokens.access as string, COOKIE_TIME.ACCESS_TOKEN, response)
    }
  } catch (error: any) {
    deleteCookieTokens()
    console.error(`Token update error: ${error.message}`);
  }
  function deleteCookieTokens() {
    response.cookies.delete(COOKIE_NAMES.ACCESS_TOKEN);
    response.cookies.delete(COOKIE_NAMES.REFRESH_TOKEN);

  }

  return response;
}

/**
 * Sets a cookie with the specified key, value, and max age.
 *
 * @param key - The name of the cookie to set.
 * @param val - The value of the cookie to set.
 * @param maxAge - The maximum age of the cookie in seconds.
 * @param response - An optional NextResponse object to set the cookie on.
 */
function setCookie(key: string, val: string, maxAge: number, response?: NextResponse<unknown>) {
  if (response) {
    response.cookies.set(
      key, val,
      { secure: true, maxAge: maxAge, path: '/', httpOnly: true }
    );
  } else {
    cookies().set({ name: key, value: val, maxAge: maxAge, path: "/", httpOnly: true });
  }
}


/**
 * Retrieves the current user's information from the API using the access token stored in cookies.
 * 
 * @returns An object containing the user data and the access token, or `{ user: null, accessToken: null }` if the access token is not available.
 * @throws {Error} If an error occurs during the API request, the user will be redirected to the logout page.
 */
const getUser = async () => {
  try {
    const accessToken = cookies().get(COOKIE_NAMES.ACCESS_TOKEN)?.value
    if (accessToken) {
      const user = await getApiClient(accessToken).then(client => client.users.usersMeRetrieve())
      return { user, accessToken };
    } else {
      return { user: null, accessToken: null };
    }
  } catch (error) {
    redirect('/logout')
  }
};

export { authenticate, updateAccessToken, getUser };
