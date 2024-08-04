'use client'

import EmptyCart from './empty-cart'
import { useEffect, useState } from 'react'
import CartSheetItem from './cart-sheet-item'
import Sidebar from '@/components/ui/sidebar'
import CartSheetFooter from './cart-sheet-footer'
import { useGlobal } from '@/contexts/global-context'
import { ScrollArea } from '@/components/ui/scroll-area'
import SkeletonCartSheetItem from './skeleton-cart-sheet-item'



export default function ShoppingCartSheet({ open, setOpen }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const {
        cartProducts,
        refreshCartedProducts,
        localStorageCartProducts,
    } = useGlobal()
    const [loading, setLoading] = useState(true);

    const fetchCartedProducts = async () => {
        try {
            await refreshCartedProducts(true)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (open) {
            fetchCartedProducts()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const sortedCartProducts = [...cartProducts].sort((a, b) => {
        const localStorageOrder = 
            localStorageCartProducts?.cartProducts.findIndex(p => p.id === a.id) -
            localStorageCartProducts?.cartProducts.findIndex(p => p.id === b.id);

        return localStorageOrder;
    });

  const total = cartProducts.reduce((total, product) => {
    const price = typeof product.price === 'number' ? product.price : parseFloat(product.price);
    const quantity = localStorageCartProducts.cartProducts.find(lProduct => lProduct.id === product.id)?.quantity ?? 0;
    return total + (price * (quantity as number));
  }, 0);
    return (
        <Sidebar setOpen={setOpen} open={open} title='Shopping cart'>
            <ScrollArea className="flex-1 px-4 py-2 sm:px-6">
                {sortedCartProducts.length == 0 && !loading && <EmptyCart />}
                <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                        {loading ? (
                            <div className='space-y-2'>
                                {Array.from({ length: localStorageCartProducts?.cartProducts.length }).map((_, idx) => (
                                    <SkeletonCartSheetItem key={idx} />
                                ))}
                            </div>
                        ) : (
                            sortedCartProducts && sortedCartProducts.map((product, idx) => (
                                <CartSheetItem key={idx} product={product} />
                            )))}
                    </ul>
                </div>
            </ScrollArea>
            <CartSheetFooter loading={loading} setOpen={setOpen} total={total} cartProducts={sortedCartProducts} />
        </Sidebar >
    )
}
