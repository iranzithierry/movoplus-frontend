import React from 'react';
import Image from 'next/image';
import { getApiClient } from '@/lib/api';
import { notFound } from 'next/navigation';
import ProductInfo from './components/product-info';
import ImageGallery from './components/image-gallery';
import ProductOptions from './components/product-options';

const products = [
  {
    id: 1,
    name: 'Air jordan 1',
    href: '#',
    imageSrc: '/images/placeholder.svg',
    imageAlt: 'Air jordan 1',
    price: 'FR 42,000',
    color: 'Black',
  },
];
export default async function Product({ params }: { params: { uuid: number } }) {
  const product = await getApiClient().then((client) =>
    client.products.productsRetrieve(params.uuid).catch((err) => {
      console.error(err);
      return null;
    })
  );
  if (!product) {
    notFound();
  }

  return (
    <>
      <div className="grid w-full grid-cols-1  gap-x-6 gap-y-8 lg:grid-cols-2 lg:gap-x-8">
        <ImageGallery images={product.images} coverImage={product.cover_image} />
        <div className="flex-col  items-stretch flex">
          <ProductInfo product={product} />
          <ProductOptions product={product} />
        </div>
      </div>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">You might also like</h2>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <Image width={400} height={600} alt={product.imageAlt} src={product.imageSrc} className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export const revalidate = 20;
