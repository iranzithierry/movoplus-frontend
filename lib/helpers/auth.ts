import 'server-only';

import { decrypt } from '../jwt';
import { getApiClient } from '../api';
import { cookies } from 'next/headers';
import { logout } from '../actions/auth';
import { redirect } from 'next/navigation';
import { COOKIE_NAMES } from '@/lib/constants/config';
import { NextRequest, NextResponse } from 'next/server';
import { COOKIE_TIME } from '@/lib/constants/config';
interface Tokens {
  access: string;
  refresh: string;
}

async function authenticate(tokens: Tokens) {
  try {
    setCookie(COOKIE_NAMES.ACCESS_TOKEN, tokens.access, COOKIE_TIME.ACCESS_TOKEN);
    setCookie(COOKIE_NAMES.REFRESH_TOKEN, tokens.refresh, COOKIE_TIME.REFRESH_TOKEN);
  } catch (error: any) {
    throw new Error(`Authentication error: ${error.message}`);
  }
}
async function generateSessionId(nextResponse: NextResponse<unknown>) {
  try {
    const key = crypto.randomUUID();
    setCookie(COOKIE_NAMES.SESSION_ID, key, COOKIE_TIME.SESSION_ID, nextResponse);
    return key;
  } catch (error: any) {
    console.error('Generate session ID error:', error.message);
  }
}

async function isAccessTokenValid(request?: NextRequest, directAccessToken?: string) {
  let accessToken;
  if (directAccessToken) {
    accessToken = directAccessToken;
  } else if (request) {
    accessToken = request.cookies.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;
  }
  let isValid = await decrypt(accessToken)
    .then(() => true)
    .catch(() => false);
  return isValid;
}

async function refreshAccessToken(request: NextRequest, onFail: 'login' | 'delete-refresh-token' = 'login') {
  const response = NextResponse.next();
  const refreshToken = request.cookies.get(COOKIE_NAMES.REFRESH_TOKEN)?.value;
  let isValid = await decrypt(refreshToken)
    .then(() => true)
    .catch(() => false);
  if (!isValid) {
    handleOnFail();
    return response;
  }
  try {
    let tokens = await (await getApiClient()).auth.authTokenRefreshCreate({ refresh: `${refreshToken}` });
    if ('access' in tokens) {
      setCookie(COOKIE_NAMES.ACCESS_TOKEN, tokens.access as string, COOKIE_TIME.ACCESS_TOKEN, response);
    } else {
      handleOnFail();
    }
  } catch (error: any) {
    handleOnFail();
  }
  function handleOnFail() {
    if (onFail == 'login') {
      response.cookies.set(COOKIE_NAMES.REDIRECT_BACK, request.nextUrl.pathname, { maxAge: COOKIE_TIME.REDIRECT_BACK });
      logout(`/login`, response, request.nextUrl);
    } else {
      response.cookies.delete(COOKIE_NAMES.REFRESH_TOKEN);
    }
  }
  return response;
}

function setCookie(key: string, val: string, maxAge: number, response?: NextResponse<unknown>) {
  if (response) {
    response.cookies.set(key, val, { secure: true, maxAge: maxAge, path: '/', httpOnly: true });
  } else {
    cookies().set({ name: key, value: val, maxAge: maxAge, path: '/', httpOnly: true });
  }
}

const getUser = async () => {
  try {
    // const accessToken = cookies().get(COOKIE_NAMES.ACCESS_TOKEN)?.value;
    // if (accessToken) {
    //   const user = await getApiClient(accessToken).then((client) => client.users.usersMeRetrieve());
    //   return { user, accessToken };
    // } else {
    // }
    return { user: null, accessToken: null };
  } catch (error) {
    redirect('/logout');
  }
};

export { authenticate, refreshAccessToken, isAccessTokenValid, getUser, generateSessionId };
