import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';
export default function DshboardView() {
  return (
    <div className="isolate gap-y-16 items-center grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 lg:gap-x-20">
      <div className="mx-auto max-w-md lg:text-left lg:mx-0 lg:flex-auto lg:py-32 ">
        <h2 className="text-lg sm:text-xl lg:text-3xl font-bold tracking-tight text-gray-900">
          Boost your productivity.
          <br />
          Start using our platform today.
        </h2>
        <p className="mt-6 text-sm lg:text-lg leading-6 lg:leading-8 text-gray-700">Manage your store with ease, Track sales performance in Real-ime, and Access detailed analytics to Optimize your business. Our dashboard provides everything you need to boost your productivity.</p>
        <div className="mt-10 flex items-center gap-x-6 lg:justify-start">
          <Button>Get started</Button>
          <a href="#" className="text-sm font-semibold leading-6 text-gray-700">
            Learn more <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
      <div className="xl:col-span-2 h-full max-h-80">
        <Image alt="App screenshot" src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png" width={1824} height={1080} className="w-full max-w-[57rem] rounded-md bg-white/5 ring-1 ring-white/10" />
      </div>
    </div>
  );
}
