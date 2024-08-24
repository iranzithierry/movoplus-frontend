import React from 'react';
import { PresentationChartBarIcon, SparklesIcon, ChatBubbleLeftRightIcon, LockClosedIcon } from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Easy Product Listing',
    description: 'Effortlessly add new products with detailed descriptions and high-quality images. Our platform supports bulk uploads, making it simple to manage large inventories.',
    icon: SparklesIcon,
  },
  {
    name: 'Secure Payments',
    description: 'Ensure secure transactions with our integrated payment gateway, offering multiple payment options to your customers. SSL certificates safeguard all sensitive data.',
    icon: LockClosedIcon,
  },
  {
    name: 'Simple Order Management',
    description: 'Track orders from placement to delivery with our intuitive order management system. Stay informed with real-time updates and manage customer communications seamlessly.',
    icon: PresentationChartBarIcon,
  },
  {
    name: 'Advanced Vendor Support',
    description: 'Benefit from our dedicated vendor support team ready to assist you with any issues. Access advanced analytics to understand your sales trends and improve your business strategies.',
    icon: ChatBubbleLeftRightIcon,
  },
];
export default function Features() {
  return (
    <section className="isolate overflow-hidden mx-auto max-w-7xl ">
      <div className="mx-auto max-w-2xl lg:text-center">
        <h2 className="text-base font-semibold leading-7 text-indigo-600">Sell Faster</h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Everything you need to grow your business</p>
        <p className="mt-6 text-base lg:text-xl font-medium leading-6 lg:leading-8 text-gray-600">Join our platform to quickly list your t-shirts and shoes, reaching a broad audience eager for quality products. Our user-friendly interface ensures you can manage your store with ease.</p>
      </div>
      <div className="mx-auto mt-16 sm:mt-20 lg:mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 xl:gap-12">
          {features.map((feature) => (
            <div key={feature.name} className="pt-6">
              <div className="flow-root rounded-lg bg-gray-50 px-6 pb-8">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center rounded-xl bg-indigo-500 p-3 shadow-lg">
                      <feature.icon className="h-8 w-8 text-white" aria-hidden="true" />
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-semibold leading-8 tracking-tight text-gray-900">{feature.name}</h3>
                  <p className="mt-5 text-base leading-7 text-gray-600">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
