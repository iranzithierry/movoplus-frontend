'use server';

import { ApiError, } from '@/api';
import { getApiClient } from '../api';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { extractErrorValues } from '../utils';
import { authenticate } from '../helpers/auth';
import { COOKIE_NAMES } from '../constants/config';
import { AuthFormState, LoginFormSchema, SignupFormSchema, } from '../definitions/auth';
import { NextResponse } from 'next/server';
import { NextURL } from 'next/dist/server/web/next-url';

/**
 * Registers a new user account with the provided form data.
 *
 * @param state - The current form state.
 * @param formData - The form data containing the user's name, email, and password.
 * @returns A promise that resolves to the updated form state, which may contain error messages if the registration failed.
 */
export async function signup(
    state: AuthFormState,
    formData: FormData,
): Promise<AuthFormState> {
    const validatedFields = SignupFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    });
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }
    let wait = false;
    try {
        const user = await getApiClient().then(client =>
            client.users.usersCreate(validatedFields.data)
        )
        if (!('tokens' in user)) {
            return { message: 'An error occurred while creating your account.' }
        }
        await authenticate(user.tokens as unknown as { access: string, refresh: string })
    } catch (err: any) {
        wait = true;
        const error: ApiError = err
        if (error?.body && 'detail' in error?.body) {
            return { message: error.body?.detail }
        } else {
            return { message: extractErrorValues(error.body) ?? 'An error occurred while creating your account.' }
        }
    } finally {
        if (!wait) {
            redirect('/')
        }
    }
}

/**
 * Logs in a user with the provided email and password.
 *
 * @param state - The current form state.
 * @param formData - The form data containing the email and password.
 * @returns A promise that resolves to the updated form state, which may contain error messages if the login fails.
 */
export async function login(
    state: AuthFormState,
    formData: FormData,
): Promise<AuthFormState> {
    const validatedFields = LoginFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }
    let wait = false;
    let redirectBackCookie = cookies().get(COOKIE_NAMES.REDIRECT_BACK)?.value;
    try {
        const user = await getApiClient().then(client =>
            client.auth.authTokenCreate(validatedFields.data)
        )
        if (!('tokens' in user)) {
            return { message: 'Invalid login credentials.' }
        }
        await authenticate(user.tokens as { access: string, refresh: string })
    } catch (err: any) {
        wait = true;
        const error: ApiError = err;
        console.log(err);

        return { message: error.body?.detail ?? 'An error occurred while logging in.' }
    } finally {
        if (!wait) {
            if (redirectBackCookie) {
                cookies().delete(COOKIE_NAMES.REDIRECT_BACK);
                redirect(redirectBackCookie)
            } else {
                redirect('/')
            }
        }
    }
}

/**
 * Logs out the current user by deleting the access and refresh tokens from the cookies and redirects the user to the home page.
 */
export async function logout(returnTo = "/marketplace", nextResponse?: NextResponse, nextUrl?: NextURL) {
    const cookiesManager = nextResponse ? nextResponse.cookies : cookies();
    const redirector: () => void = nextResponse 
        ? () => { NextResponse.redirect(new URL(returnTo, nextUrl)) }
        : () => { redirect(returnTo) };
    try {
        cookiesManager.delete(COOKIE_NAMES.ACCESS_TOKEN);
        cookiesManager.delete(COOKIE_NAMES.REFRESH_TOKEN);
    } catch (error: any) {
    } finally {
        redirector();
    }
}