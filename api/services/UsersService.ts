/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUser } from '../models/CreateUser';
import type { PatchedUser } from '../models/PatchedUser';
import type { User } from '../models/User';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class UsersService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Creates, Updates and Retrieves - User Accounts
     * @param ordering Which field to use when ordering the results.
     * @param search A search term.
     * @returns User
     * @throws ApiError
     */
    public usersList(
        ordering?: string,
        search?: string,
    ): CancelablePromise<Array<User>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/users/',
            query: {
                'ordering': ordering,
                'search': search,
            },
        });
    }

    /**
     * Creates, Updates and Retrieves - User Accounts
     * @param requestBody
     * @returns CreateUser
     * @throws ApiError
     */
    public usersCreate(
        requestBody: CreateUser,
    ): CancelablePromise<CreateUser> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/users/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Creates, Updates and Retrieves - User Accounts
     * @param id A UUID string identifying this user.
     * @returns User
     * @throws ApiError
     */
    public usersRetrieve(
        id: string,
    ): CancelablePromise<User> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/users/{id}/',
            path: {
                'id': id,
            },
        });
    }

    /**
     * Creates, Updates and Retrieves - User Accounts
     * @param id A UUID string identifying this user.
     * @param requestBody
     * @returns User
     * @throws ApiError
     */
    public usersUpdate(
        id: string,
        requestBody?: User,
    ): CancelablePromise<User> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/users/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Creates, Updates and Retrieves - User Accounts
     * @param id A UUID string identifying this user.
     * @param requestBody
     * @returns User
     * @throws ApiError
     */
    public usersPartialUpdate(
        id: string,
        requestBody?: PatchedUser,
    ): CancelablePromise<User> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/users/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Creates, Updates and Retrieves - User Accounts
     * @returns User
     * @throws ApiError
     */
    public usersMeRetrieve(): CancelablePromise<User> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/users/me/',
        });
    }

}
