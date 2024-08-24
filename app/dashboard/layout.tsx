'use client';
import React, { useState } from 'react';
import { Search } from './_components/search';
import { UserNav } from './_components/user-nav';
import ShopSwitcher from './_components/shop-switcher';
import SideNav from './_components/side-nav';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <main className="min-h-screen flex flex-col">
      <div className="border-b px-2 md:px-4 fixed right-0 left-0 bg-white">
        <div className="flex space-x-2 justify-stretch h-16 items-center">
          <div className="hidden lg:block">
            <ShopSwitcher />
          </div>
          <Button size={'icon'} className="h-10 w-10 p-1 lg:hidden shrink-0" variant={'outline'}>
            <Bars3Icon className="cursor-pointer" onClick={() => setSidebarOpen((open) => !open)} />
          </Button>
          <div className="w-full flex justify-center">
            <Search />
          </div>
          <UserNav />
        </div>
      </div>
      <SideNav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="px-6 pt-20 pb-32 lg:ml-72 flex flex-1 h-full">{children}</div>
    </main>
  );
}
