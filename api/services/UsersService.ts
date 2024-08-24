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

  public usersList(ordering?: string, search?: string): CancelablePromise<Array<User>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/users/',
      query: {
        ordering: ordering,
        search: search,
      },
    });
  }

  public usersCreate(requestBody: CreateUser): CancelablePromise<CreateUser> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/users/',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  public usersRetrieve(id: string): CancelablePromise<User> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/users/{id}/',
      path: {
        id: id,
      },
    });
  }

  public usersUpdate(id: string, requestBody?: User): CancelablePromise<User> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/api/users/{id}/',
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  public usersPartialUpdate(id: string, requestBody?: PatchedUser): CancelablePromise<User> {
    return this.httpRequest.request({
      method: 'PATCH',
      url: '/api/users/{id}/',
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  public usersMeRetrieve(): CancelablePromise<User> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/users/me/',
    });
  }
}
