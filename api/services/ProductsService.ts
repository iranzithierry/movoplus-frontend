/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Product } from '../models/Product';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ProductsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * List and Retrieves -  Products
     * @param ordering Which field to use when ordering the results.
     * @param search A search term.
     * @returns Product
     * @throws ApiError
     */
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

    /**
     * List and Retrieves -  Products
     * @param id A unique integer value identifying this product.
     * @returns Product
     * @throws ApiError
     */
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
