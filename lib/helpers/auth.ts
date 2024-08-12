import 'server-only';

import { decrypt } from '../jwt';
import { getApiClient } from '../api';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { COOKIE_NAMES } from '@/lib/constants/config';
import { NextRequest, NextResponse } from 'next/server';
import { BACKEND_HOST, COOKIE_TIME } from '@/lib/constants/config';
import { logout } from '../actions/auth';

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
async function isAccessTokenValid(request: NextRequest) {
  let accessToken = request.cookies.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;
  let isValid = await decrypt(accessToken).then(() => true).catch(() => false)
  return isValid;
}

async function refreshAccessToken(request: NextRequest, onFail: 'login' | 'delete-refresh-token' = 'login') {
  const response = NextResponse.next();
  const refreshToken = request.cookies.get(COOKIE_NAMES.REFRESH_TOKEN)?.value;

  try {
    let tokens = await (await getApiClient()).auth.authTokenRefreshCreate({ refresh: `${refreshToken}` })
    if ('access' in tokens) {
      setCookie(COOKIE_NAMES.ACCESS_TOKEN, tokens.access as string, COOKIE_TIME.ACCESS_TOKEN, response);
    } else {
      handleOnFail()
    }

  } catch (error: any) {
    handleOnFail()
  }
  function handleOnFail() {
    if (onFail == "login") {
      response.cookies.set(COOKIE_NAMES.REDIRECT_BACK, request.url, { maxAge: COOKIE_TIME.REDIRECT_BACK })
      logout(`/login`, response, request.nextUrl)
    } else {
      response.cookies.delete(COOKIE_NAMES.REFRESH_TOKEN);
    }
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

export { authenticate, refreshAccessToken, isAccessTokenValid, getUser };
