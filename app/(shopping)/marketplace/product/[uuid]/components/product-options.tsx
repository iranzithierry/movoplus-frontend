"use client";
import { toast } from 'sonner';
import { Product } from '@/api';
import { useState } from 'react';
import SizeSelector from './size-selector';
import ColorSelector from './color-selector';
import { Button } from '@/components/ui/button';
import { useGlobal } from '@/contexts/global-context';
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'

interface ProductOptionsProps {
    product: Product
}
export interface CartState {
    cartOwnerId?: string | null;
    cartProducts: {
        id: string,
        quantity: string | number,
        color: string,
        size: string | number
    }[];
}


const ProductOptions = ({ product }: ProductOptionsProps) => {
    const { addToCart } = useGlobal()
    const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.color ?? null);
    const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]?.size ?? null);

    return (
        <section aria-labelledby="options-heading" className="mt-10">
            <h3 id="options-heading" className="sr-only">Product options</h3>
            {product.colors.length > 0 && <ColorSelector colors={product.colors} selectedColor={selectedColor} setSelectedColor={setSelectedColor} />}
            {product.sizes.length > 0 && <SizeSelector sizes={product.sizes} selectedSize={selectedSize} setSelectedSize={setSelectedSize} />}
            <div className='fixed sm:static bottom-0 right-0 left-0 bg-white/80 backdrop-blur-md justify-center flex p-4 sm:p-0 z-10'>
                <Button size={'lg'} onClick={() => addToCart(product, selectedColor, selectedSize)} type="submit" className="mt-0 sm:mt-6 w-full flex group items-center gap-x-2">
                    Add to cart
                </Button>
            </div>
            <Disclosure as="div" className="py-6">
                <h3 className="-mx-2 -my-3 flow-root">
                    <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">Description</span>
                        <span className="ml-6 flex items-center">
                            <PlusIcon aria-hidden="true" className="h-5 w-5 group-data-[open]:hidden" />
                            <MinusIcon aria-hidden="true" className="h-5 w-5 [.group:not([data-open])_&]:hidden" />
                        </span>
                    </DisclosureButton>
                </h3>
                <DisclosurePanel className="pt-6">
                    <div className="space-y-6">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut pariatur nam ea. A quasi, facere, nisi, distinctio odit sapiente eos voluptatum architecto quidem quia facilis minus nemo iusto dolore. Nobis!</p>
                    </div>
                </DisclosurePanel>
            </Disclosure>
            <Disclosure as="div" className="py-6">
                <h3 className="-mx-2 -my-3 flow-root">
                    <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">Shipping</span>
                        <span className="ml-6 flex items-center">
                            <PlusIcon aria-hidden="true" className="h-5 w-5 group-data-[open]:hidden" />
                            <MinusIcon aria-hidden="true" className="h-5 w-5 [.group:not([data-open])_&]:hidden" />
                        </span>
                    </DisclosureButton>
                </h3>
                <DisclosurePanel className="pt-6">
                    <ul className='list-disc list-inside'>
                        <li className='p-2 text-gray-500'>Free shipping on orders over 40K FR</li>
                        <li className='p-2 text-gray-500'>International shipping available</li>
                    </ul>
                </DisclosurePanel>
            </Disclosure>
        </section>)
};

export default ProductOptions;
