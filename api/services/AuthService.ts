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

  public authPasswordResetCreate(requestBody: Email): CancelablePromise<Email> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/auth/password_reset/',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  public authPasswordResetConfirmCreate(requestBody: PasswordToken): CancelablePromise<PasswordToken> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/auth/password_reset/confirm/',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  public authPasswordResetValidateTokenCreate(requestBody: ResetToken): CancelablePromise<ResetToken> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/auth/password_reset/validate_token/',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  public authTokenCreate(requestBody: CustomTokenObtainPair): CancelablePromise<CustomTokenObtainPair> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/auth/token/',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  public authTokenRefreshCreate(requestBody: CustomTokenRefresh): CancelablePromise<CustomTokenRefresh> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/auth/token/refresh/',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
}
