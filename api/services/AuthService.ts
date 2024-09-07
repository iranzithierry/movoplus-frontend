/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomTokenObtainPair } from '../models/CustomTokenObtainPair';
import type { CustomTokenRefresh } from '../models/CustomTokenRefresh';
import type { Email } from '../models/Email';
import type { PasswordToken } from '../models/PasswordToken';
import type { ResetToken } from '../models/ResetToken';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class AuthService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * An Api View which provides a method to request a password reset token based on an e-mail address
     *
     * Sends a signal reset_password_token_created when a reset token was created
     * @param requestBody
     * @returns Email
     * @throws ApiError
     */
    public authPasswordResetCreate(
        requestBody: Email,
    ): CancelablePromise<Email> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/auth/password_reset/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * An Api View which provides a method to reset a password based on a unique token
     * @param requestBody
     * @returns PasswordToken
     * @throws ApiError
     */
    public authPasswordResetConfirmCreate(
        requestBody: PasswordToken,
    ): CancelablePromise<PasswordToken> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/auth/password_reset/confirm/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * An Api View which provides a method to verify that a token is valid
     * @param requestBody
     * @returns ResetToken
     * @throws ApiError
     */
    public authPasswordResetValidateTokenCreate(
        requestBody: ResetToken,
    ): CancelablePromise<ResetToken> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/auth/password_reset/validate_token/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Takes a set of user credentials and returns an access and refresh JSON web
     * token pair to prove the authentication of those credentials.
     * @param requestBody
     * @returns CustomTokenObtainPair
     * @throws ApiError
     */
    public authTokenCreate(
        requestBody: CustomTokenObtainPair,
    ): CancelablePromise<CustomTokenObtainPair> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/auth/token/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Takes a refresh type JSON web token and returns an access type JSON web
     * token if the refresh token is valid.
     * @param requestBody
     * @returns CustomTokenRefresh
     * @throws ApiError
     */
    public authTokenRefreshCreate(
        requestBody: CustomTokenRefresh,
    ): CancelablePromise<CustomTokenRefresh> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/auth/token/refresh/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
