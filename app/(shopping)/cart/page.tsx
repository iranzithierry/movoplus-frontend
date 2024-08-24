'use client';
import { useEffect, useState } from 'react';
import CartItem from './components/cart-item';
import EmptyCart from '../components/empty-cart';
import CartSummary from './components/cart-summary';
import { useGlobal } from '@/contexts/global-context';
import { SkeletonCartItem, SkeletonCartSummary } from './components/skeleton-cart-item';

export default function Page() {
  const [loading, setLoading] = useState(true);
  const { cartProducts, localStorageCartProducts, refreshCartedProducts } = useGlobal();

  useEffect(() => {
    const initializeCart = async () => {
      try {
        if (localStorageCartProducts?.cartProducts?.length > 0) {
          await refreshCartedProducts(true);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    initializeCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const total = cartProducts.reduce((total, product) => {
    const price = typeof product.price === 'number' ? product.price : parseFloat(product.price);
    const quantity = localStorageCartProducts.cartProducts.find((lProduct) => lProduct.id === product.id)?.quantity ?? 0;
    return total + price * (quantity as number);
  }, 0);

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>
      <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
        {localStorageCartProducts.cartProducts.length === 0 && !loading && (
          <div className="col-span-full">
            <EmptyCart />
          </div>
        )}
        {localStorageCartProducts?.cartProducts?.length > 0 && (
          <>
            <section aria-labelledby="cart-heading" className="lg:col-span-7">
              <ul role="list" className={'divide-y divide-gray-200 border-b border-t border-gray-200'}>
                {loading ? <SkeletonCartItem /> : cartProducts.map((product, productIdx) => <CartItem product={product} productIdx={productIdx} localStorageCartProducts={localStorageCartProducts} key={product.id} />)}
              </ul>
            </section>
            {loading ? <SkeletonCartSummary /> : <CartSummary total={total} nOfProducts={cartProducts.length} />}
          </>
        )}
      </div>
    </div>
  );
}
