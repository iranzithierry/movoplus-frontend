/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ProductColor } from './ProductColor';
import type { ProductImage } from './ProductImage';
import type { ProductSize } from './ProductSize';
import type { StatusEnum } from './StatusEnum';

export type Product = {
  readonly id: string;
  name: string;
  brand: string;
  price: string;
  rating?: number;
  review_count?: number;
  description?: string;
  cover_image?: ProductImage;
  status: StatusEnum;
  readonly colors: Array<ProductColor>;
  readonly sizes: Array<ProductSize>;
  // readonly images: Array<ProductImage>;
  readonly images: Array<{ image: ProductImage }>;
};
