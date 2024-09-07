'use client';

import React from 'react';
import Image from 'next/image';
import { Product } from '@/api_';
import { formatMoney } from '@/lib/utils';
import { useGlobal } from '@/contexts/global-context';
import { FileDigit, SwatchBook, TagIcon } from 'lucide-react';

export default function CartSheetItem({ product }: { product: Product }) {
  const { removeFromCart, localStorageCartProducts } = useGlobal();
  const quantity = localStorageCartProducts.cartProducts.find((lProduct) => lProduct.id == product.id)?.quantity;
  const color = localStorageCartProducts.cartProducts.find((lProduct) => lProduct.id == product.id)?.color;
  const size = localStorageCartProducts.cartProducts.find((lProduct) => lProduct.id == product.id)?.size;
  return (
    <li key={product.id} className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <Image width={400} height={400} alt={product.name} src={product.cover_image?.medium ?? '/images/placeholder.svg'} className="h-full w-full object-cover object-center" />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <a href={`/marketplace/product/${product.id}`}>{product.name}</a>
            </h3>
            <p className="ml-4">
              {formatMoney(product.price)}
              {(quantity as number) > 1 && 'x' + quantity}
            </p>
          </div>
          <p className="mt-1 text-sm text-gray-500 space-x-1 flex">
            <SwatchBook className="h-4 w-4" />
            <span>: {color ?? 'None'}</span>
          </p>
          <p className="mt-1 text-sm text-gray-500 space-x-1 flex">
            <TagIcon className="h-4 w-4" />
            <span>: {size ?? 'None'}</span>
          </p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500 space-x-1 flex">
            <FileDigit className="h-4 w-4" />
            <span>: {quantity} Qty</span>
          </p>
          <div className="flex">
            <button onClick={() => removeFromCart(product.id)} type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
