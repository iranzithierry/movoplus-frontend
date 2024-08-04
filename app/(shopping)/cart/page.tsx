"use client";
import { useEffect, useState } from 'react';
import CartItem from './components/cart-item';
import EmptyCart from '../components/empty-cart';
import CartSummary from './components/cart-summary';
import { useGlobal } from '@/contexts/global-context';
import { SkeletonCartItem, SkeletonCartSummary } from './components/skeleton-cart-item';

export default function Page() {
  const [loading, setLoading] = useState(true);
  const { cartProducts, localStorageCartProducts, refreshCartedProducts } = useGlobal()


  useEffect(() => {
    try {
      if (localStorageCartProducts?.cartProducts?.length > 0) {
        refreshCartedProducts(true)
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorageCartProducts]);
  useEffect(() => {
    if (cartProducts.length > 0) {
      setLoading(false);
    }
  }, [cartProducts])


  const total = cartProducts.reduce((total, product) => {
    const price = typeof product.price === 'number' ? product.price : parseFloat(product.price);
    return total + price;
  }, 0);
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>
      <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
        <section aria-labelledby="cart-heading" className="lg:col-span-7">
          <ul role="list" className={`${!loading && localStorageCartProducts?.cartProducts?.length > 0 && 'divide-y divide-gray-200 border-b border-t'}  border-gray-200`}>
            {loading ?
              (<SkeletonCartItem />) :
              cartProducts.map((product, productIdx) => (
                <CartItem product={product} productIdx={productIdx} localStorageCartProducts={localStorageCartProducts} key={product.id} />
              ))}
          </ul>
        </section>
        {loading ?
            (<SkeletonCartSummary />) :
            (<CartSummary total={total} nOfProducts={cartProducts.length} />)
        }
        {localStorageCartProducts.cartProducts.length <= 0 && !loading && (
          <div className='col-span-full'>
            <EmptyCart />
          </div>
        )}
      </div>
    </div>
  )
}
