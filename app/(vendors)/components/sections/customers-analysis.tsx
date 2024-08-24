import React from 'react';
import Image from 'next/image';

export default function CustomersAlaysis() {
  return (
    <section className="overflow-hidden">
      <div className="flex flex-col-reverse gap-x-12 justify-between md:flex-row md:items-center">
        <div className="flex-none max-w-xl mt-12 space-y-3 md:mt-0">
          <h2 className="text-gray-900 text-3xl font-bold sm:text-4xl">Simple, powerful ways to grow your business</h2>
          <p className="text-gray-600">Gain valuable insights into your customer base with our detailed analytics. Understand who your customers are, where they come from, and what they love, so you can tailor your offerings to meet their needs and drive sales. Our platform provides the data you need to make informed business decisions and grow your store effectively.</p>
        </div>
        <div className="flex-none w-full md:max-w-xl">
          <Image alt="chart" src="/images/sprites/users-chart.png" width={632} height={285} decoding="async" data-nimg="1" className="w-full shadow-lg rounded-lg border" loading="lazy" />
        </div>
      </div>
    </section>
  );
}
