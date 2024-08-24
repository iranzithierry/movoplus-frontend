'use client';

import Logo from '@/components/base/logo';
import Image from 'next/image';
import React from 'react';
export default function CeoTestimonial() {
  return (
    <section className="relative isolate overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
      <div className="mx-auto max-w-2xl lg:max-w-4xl p-2">
        <Logo />
        <figure className="mt-10">
          <blockquote className="text-center text-sm lg:text-xl font-semibold leading-6 lg:leading-8 text-gray-900 sm:text-2xl sm:leading-9">
            <p>“Our platform is dedicated to empowering vendors with the tools they need to succeed. We&apos;re proud to offer an easy-to-use, secure marketplace that drives growth and delivers results. Join us and experience a new level of e-commerce success.”</p>
          </blockquote>
          <figcaption className="mt-10">
            <Image height={200} width={200} alt="" src="/images/users/thierry.png" className="mx-auto h-10 w-10 rounded-full" />
            <div className="mt-4 flex items-center justify-center space-x-3 text-base">
              <div className="font-semibold text-gray-900">Thierry</div>
              <svg width={3} height={3} viewBox="0 0 2 2" aria-hidden="true" className="fill-gray-900">
                <circle r={1} cx={1} cy={1} />
              </svg>
              <div className="text-gray-600">CEO of Movo+</div>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
