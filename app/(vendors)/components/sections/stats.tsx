import React from 'react';

const stats = [
  { id: 1, name: 'Active Vendors', value: '5,000+' },
  { id: 2, name: 'Products Listed', value: '15,000+' },
  { id: 3, name: 'Monthly Visitors', value: '150,000+' },
  { id: 4, name: 'Total Sales', value: '$600,000+' },
];

export default function Stats() {
  return (
    <dl className="grid grid-cols-2 gap-x-8 gap-y-16 text-center lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
          <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
          <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">{stat.value}</dd>
        </div>
      ))}
    </dl>
  );
}
