'use client';
import React, { useCallback } from 'react';
import Image from 'next/image';
import { Product, StatusEnum } from '@/api_';
import { CheckIcon, ClockIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { CartState } from '../../marketplace/product/[uuid]/components/product-options';
import { useGlobal } from '@/contexts/global-context';
import { formatMoney, setToLocalStorage } from '@/lib/utils';
import Link from 'next/link';
import { LS_NAMES } from '@/lib/constants/config';
import IncrementButton from '@/components/ui/increment-button';

interface CartItemProps {
  product: Product;
  localStorageCartProducts: CartState;
  productIdx: number;
}
export default function CartItem({ product, localStorageCartProducts, productIdx }: CartItemProps) {
  const { removeFromCart, refreshCartedProducts } = useGlobal();
  const refreshCart = useCallback(() => {
    refreshCartedProducts();
  }, [refreshCartedProducts]);

  const updateQuantity = useCallback(
    (newQuantity: number) => {
      if (newQuantity == 0) return;
      const updatedCartProducts = localStorageCartProducts.cartProducts.map((item) => {
        if (item.id === product.id) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });

      const updatedLocalStorageCartProducts = {
        ...localStorageCartProducts,
        cartProducts: updatedCartProducts,
      };
      setToLocalStorage(LS_NAMES.CART_STATE, updatedLocalStorageCartProducts);
      refreshCart();
    },
    [localStorageCartProducts, product.id, refreshCart]
  );

  return (
    <li key={product.id} className="flex py-6 sm:py-10">
      <div className="flex-shrink-0">
        <Image width={400} height={400} src={product.cover_image?.original ?? '/images/placeholder.svg'} alt={product.name} className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48" />
      </div>
      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div>
            <div className="flex justify-between">
              <h3 className="text-sm">
                <Link href={`/marketplace/product/${product.id}`} className="font-medium text-gray-700 hover:text-gray-800">
                  {product.name}
                </Link>
              </h3>
            </div>
            <div className="mt-1 flex text-sm">
              <p className="text-gray-500">Color: {localStorageCartProducts.cartProducts.find((lProduct) => lProduct.id == product.id)?.color ?? 'None'}</p>
              <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">Size: {localStorageCartProducts.cartProducts.find((lProduct) => lProduct.id == product.id)?.size ?? 'None'}</p>
            </div>
            <div className="mt-1 flex text-sm">
              <p className="ml-4border-gray-200 text-gray-500">Quantity: {localStorageCartProducts.cartProducts.find((lProduct) => lProduct.id == product.id)?.quantity ?? 1}</p>
            </div>
            <p className="mt-1 text-sm font-medium text-gray-900">{formatMoney(product.price)}</p>
          </div>

          <div className="mt-4 sm:mt-0 sm:pr-9">
            <IncrementButton updateQuantity={updateQuantity} />

            <div className="absolute right-0 top-0">
              <button onClick={() => removeFromCart(product.id)} type="button" className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500">
                <span className="sr-only">Remove</span>
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <p className="mt-4 flex space-x-2 text-sm text-gray-700">
          {product.status === StatusEnum.available ? <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" /> : <ClockIcon className="h-5 w-5 flex-shrink-0 text-gray-300" aria-hidden="true" />}

          <span>{product.status === StatusEnum.available ? 'In stock' : `Ships in 1-2 weeks`}</span>
        </p>
      </div>
    </li>
  );
}
