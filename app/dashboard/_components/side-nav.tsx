import React from 'react';
import { HomeIcon, XMarkIcon, UserGroupIcon, Cog6ToothIcon, ShoppingCartIcon, TagIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import ShopSwitcher from './shop-switcher';
import Sidebar from '@/components/ui/sidebar';

const games = [
  {
    id: '123',
    label: '1M Kokos',
    icon: '🥥',
  },
];

const menuPages = [
  {
    title: 'Dashboard',
    link: '/dashboard',
    icon: HomeIcon,
  },
  {
    title: 'Orders',
    link: '/dashboard/orders',
    icon: ShoppingCartIcon,
  },
  {
    title: 'Products',
    link: '/dashboard/products',
    icon: TagIcon,
  },
  {
    title: 'Customers',
    link: '/dashboard/customers',
    icon: UserGroupIcon,
  },
  {
    title: 'Analytics',
    link: '/dashboard/analytics',
    icon: ChartBarIcon,
  },
];

export default function SideNav({ sidebarOpen, setSidebarOpen }: { sidebarOpen: boolean; setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const pathname = usePathname();
  function isCurrentPage(pageLink: string) {
    return pathname === pageLink || (pageLink !== '/dashboard' && pathname.slice(10).startsWith(pageLink.slice(10)));
  }
  return (
    <div>
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} from="left" title="Movo+">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 py-4">
          <ShopSwitcher className="w-full" />
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-2">
              {menuPages.map((page) => (
                <li key={page.link}>
                  <Link href={page.link} className={cn(isCurrentPage(page.link) ? 'bg-gray-50 text-primary' : 'text-gray-700 hover:text-primary hover:bg-gray-50', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold')}>
                    <page.icon className={cn(isCurrentPage(page.link) ? 'text-primary' : 'text-gray-400 group-hover:text-primary', 'h-6 w-6 shrink-0')} aria-hidden="true" />
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Sidebar>

      {/* Sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col mt-16 ">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 px-6 py-4">
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-2">
              {menuPages.map((page) => (
                <li key={page.link}>
                  <Link href={page.link} className={cn(isCurrentPage(page.link) ? 'bg-gray-50 text-primary' : 'text-gray-700 hover:text-primary hover:bg-gray-50', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold')}>
                    <page.icon className={cn(isCurrentPage(page.link) ? 'text-primary' : 'text-gray-400 group-hover:text-primary', 'h-6 w-6 shrink-0')} aria-hidden="true" />
                    {page.title}
                  </Link>
                </li>
              ))}
              <li className="mt-auto">
                <a href="#" className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600">
                  <Cog6ToothIcon className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600" aria-hidden="true" />
                  Settings
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
