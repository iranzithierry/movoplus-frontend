/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Inherit from `TokenRefreshSerializer` and touch the database
 * before re-issuing a new access token and ensure that the user
 * exists and is active.
 */
export type CustomTokenRefresh = {
    refresh: string;
    readonly access: string;
};

