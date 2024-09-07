/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ShopsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get list of all shops
     * @returns any
     * @throws ApiError
     */
    public shopsList(): CancelablePromise<Array<{
        id?: string;
        name?: string;
    }>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/shops/',
        });
    }

    /**
     * Create a product
     * @param shopId
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public productsCreate(
        shopId: string,
        requestBody?: {
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
        },
    ): CancelablePromise<{
        message?: string;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/shops/{shop_id}/products/create/',
            path: {
                'shop_id': shopId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Create a shop
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public createShop(
        requestBody?: {
            name: string;
        },
    ): CancelablePromise<{
        message?: string;
        data?: {
            id?: number;
            name?: string;
        };
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/shops/create/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
