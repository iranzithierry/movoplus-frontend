/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ProductsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get list of all products
     * @param context Return data based on context
     * @param ordering Ordering term
     * @param search Search term
     * @param whereId Filter products by ids
     * @returns any
     * @throws ApiError
     */
    public productsList(
        context: 'dashboard' | 'marketplace' = 'marketplace',
        ordering?: string,
        search?: string,
        whereId?: string,
    ): CancelablePromise<Array<ProductList>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/products/',
            query: {
                'context': context,
                'ordering': ordering,
                'search': search,
                'whereId': whereId,
            },
        });
    }

    /**
     * Get details of a single product
     * @param productId
     * @returns any
     * @throws ApiError
     */
    public productDetails(
        productId: string,
    ): CancelablePromise<{
        productId?: string;
        productName?: string;
        description?: string;
        basePrice?: number;
        shop?: string;
        category?: string;
        brand?: string;
        coverImage?: {
            /**
             * Original image URL
             */
            original?: string;
            /**
             * Small image URL
             */
            small?: string;
            /**
             * Medium image URL
             */
            medium?: string;
        };
        tags?: Array<string>;
        variants?: Array<{
            id?: string;
            price?: number;
            status?: string;
            attribute?: string;
            value?: string;
            image?: {
                /**
                 * Original image URL
                 */
                original?: string;
                /**
                 * Small image URL
                 */
                small?: string;
                /**
                 * Medium image URL
                 */
                medium?: string;
            };
        }>;
        images?: {
            /**
             * Original image URL
             */
            original?: string;
            /**
             * Small image URL
             */
            small?: string;
            /**
             * Medium image URL
             */
            medium?: string;
        };
        averageRating?: number;
        discounts?: Array<{
            id?: string;
            name?: string;
            discountPercent?: number;
            discountPrice?: number;
            startDate?: string;
            endDate?: string;
        }>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/products/{product_id}/',
            path: {
                'product_id': productId,
            },
        });
    }

    /**
     * Get reviews of a product
     * @param productId
     * @param ordering Ordering term
     * @returns any
     * @throws ApiError
     */
    public productReviews(
        productId: string,
        ordering?: string,
    ): CancelablePromise<{
        averageRating?: number;
        totalReviews?: number;
        reviews?: Array<{
            id?: string;
            rating?: number;
            comment?: string;
            user?: {
                name?: string;
                profileImage?: {
                    /**
                     * Original image URL
                     */
                    original?: string;
                    /**
                     * Small image URL
                     */
                    small?: string;
                    /**
                     * Medium image URL
                     */
                    medium?: string;
                };
            };
            createdAt?: string;
        }>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/products/{product_id}/reviews/',
            path: {
                'product_id': productId,
            },
            query: {
                'ordering': ordering,
            },
        });
    }

    /**
     * Add a review for a product
     * @param productId
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public productReviewsCreate(
        productId: string,
        requestBody?: {
            rating?: number;
            comment?: string;
        },
    ): CancelablePromise<{
        message?: string;
        data?: Array<{
            id?: string;
            rating?: number;
            comment?: string;
            user?: {
                name?: string;
                profileImage?: {
                    /**
                     * Original image URL
                     */
                    original?: string;
                    /**
                     * Small image URL
                     */
                    small?: string;
                    /**
                     * Medium image URL
                     */
                    medium?: string;
                };
            };
            createdAt?: string;
        }>;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/products/{product_id}/reviews/create/',
            path: {
                'product_id': productId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
