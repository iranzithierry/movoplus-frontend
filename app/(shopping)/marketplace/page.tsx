import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from "next";
import { getApiClient } from '@/lib/api';
import { formatMoney } from '@/lib/utils';
import HeadingFilters from '../components/heading-filters';

export const metadata: Metadata = {
  title: "Products",
}
export const revalidate = 60;

export const dynamic = 'force-dynamic'

export default async function Home() {
  // const products = await new Promise(resolve => setTimeout(() => resolve(getApiClient().then(client => client.products.productsList())), 10000))  
  const products = await getApiClient().then(client => client.products.productsList())
  return (
    <section>
      <HeadingFilters />
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {products && products.map((product) => (
          <Link key={product.id} href={`/marketplace/product/${product.id}`} className="group relative cursor-pointer">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
              <Image width={800} height={800} src={product.cover_image?.original ?? '/images/placeholder.svg'} alt={product.name} className="h-full w-full object-cover object-center transition duration-300 ease-in-out group-hover:scale-105" />
            </div>
            <div className='absolute bottom-0 left-0 flex w-full px-4 pb-4 justify-center'>
              <div className="flex items-center rounded-full border bg-white/70 p-1 text-xs font-semibold text-black backdrop-blur-md">
                <h3 className="mr-4 line-clamp-2 flex-grow pl-2  tracking-tight">{product.name}</h3>
                <p suppressHydrationWarning={true} className="flex-none rounded-full bg-blue-600 p-2 text-white">
                  {formatMoney(product.price)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}