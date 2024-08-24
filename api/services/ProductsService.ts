/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Product } from '../models/Product';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ProductsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    
    public productsList(
        ordering?: string,
        search?: string,
        where_id?: string,
    ): CancelablePromise<Array<Product>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/products/',
            query: {
                'ordering': ordering,
                'search': search,
                'where_id': where_id,
            },
        });
    }

    
    public productsRetrieve(
        id: number,
    ): CancelablePromise<Product> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/products/{id}/',
            path: {
                'id': id,
            },
        });
    }

}
