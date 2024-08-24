import Image from 'next/image';
import React from 'react';
interface NavigationMenuProps {
  category: {
    id: string;
    name: string;
    featured: {
      name: string;
      href: string;
      imageSrc: string;
      imageAlt: string;
    }[];
    sections: {
      id: string;
      name: string;
      items: {
        name: string;
        href: string;
      }[];
    }[];
  };
}
export default function NavigationMenu({ category }: NavigationMenuProps) {
  return (
    <div className="relative bg-white">
      <div className="mx-auto max-w-7xl px-8">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
          <div className="col-start-2 grid grid-cols-2 gap-x-8">
            {category.featured.map((item) => (
              <div key={item.name} className="group relative text-base sm:text-sm">
                <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                  <Image width={400} height={400} src={item.imageSrc} alt={item.imageAlt} className="object-cover object-center" />
                </div>
                <a href={item.href} className="mt-6 block font-medium text-gray-900">
                  <span className="absolute inset-0 z-10" aria-hidden="true" />
                  {item.name}
                </a>
                <p aria-hidden="true" className="mt-1">
                  Shop now
                </p>
              </div>
            ))}
          </div>
          <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
            {category.sections.map((section) => (
              <div key={section.name}>
                <p id={`${section.name}-heading`} className="font-medium text-gray-900">
                  {section.name}
                </p>
                <ul role="list" aria-labelledby={`${section.name}-heading`} className="mt-6 space-y-6 sm:mt-4 sm:space-y-4">
                  {section.items.map((item) => (
                    <li key={item.name} className="flex">
                      <a href={item.href} className="hover:text-gray-800">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
