"use client";
import Link from 'next/link';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';
import { RwandaFlagIcon } from '../icons';
import navigation from "@/data/navigations.json"
import React, { Suspense, useEffect, useState } from 'react'
import { useAuth } from '@/contexts/auth-context';
import { Popover, PopoverButton, PopoverGroup, PopoverPanel } from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import Logo from './logo';
import { useGlobal } from '@/contexts/global-context';
import NavigationMenu from '../navigation-menu';
import UserMenu from '../user-menu';

const ShoppingCartSheet = dynamic(() => import('@/app/(shopping)/components/cart-sheet'), { ssr: false });

export default function Header({ setOpen }: { setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const { user } = useAuth()
    const { totalCartItems } = useGlobal()
    const [openCartSheet, setOpenCartSheet] = useState(false);

    return (
        <header className="relative">
            <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
                Get free delivery on orders over 40K RWF
            </p>

            <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="border-b border-gray-200">
                    <div className="flex h-16 items-center">
                        <button type="button" className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden" onClick={() => setOpen(true)}>
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>

                        {/* Logo */}
                        <div className="ml-4 flex lg:ml-0">
                            <Logo />
                        </div>

                        {/* Flyout menus */}
                        <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
                            <div className="flex h-full space-x-8">
                                {navigation.categories.map((category) => (
                                    <Popover key={category.name} className="flex">
                                        {({ open }) => (
                                            <>
                                                <div className="relative flex">
                                                    <PopoverButton className={cn(open ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-700 hover:text-gray-800', 'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out',)}>
                                                        {category.name}
                                                    </PopoverButton>
                                                </div>

                                                <PopoverPanel transition className="absolute inset-x-0 top-full text-sm text-gray-500 transition data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in">
                                                    {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                                    <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />
                                                    <NavigationMenu category={category} />
                                                </PopoverPanel>
                                            </>
                                        )}
                                    </Popover>
                                ))}

                                {/* {navigation.pages.map((page) => (
                                    <a key={page.name} href={page.href} className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">
                                        {page.name}
                                    </a>
                                ))} */}
                            </div>
                        </PopoverGroup>

                        <div className="ml-auto flex items-center">
                            <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                {!user?.id && (
                                    <>
                                        <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                            Sign in
                                        </Link>
                                        <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                                        <Link href="/register" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                            Create account
                                        </Link>
                                    </>
                                )}
                            </div>

                            <div className="hidden lg:ml-8 lg:flex">
                                <a href="#" className="flex items-center text-gray-700 hover:text-gray-800">
                                    <RwandaFlagIcon className="block h-auto w-5 flex-shrink-0" />
                                    <span className="ml-3 block text-sm font-medium">RWA</span>
                                </a>
                            </div>

                            {/* Search */}
                            <div className="flex lg:ml-6">
                                <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                                    <span className="sr-only">Search</span>
                                    <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                                </a>
                            </div>

                            {/* Cart */}
                            <div className="ml-4 flow-root lg:ml-6">
                                <button onClick={() => setOpenCartSheet(true)} className="group -m-2 flex items-center p-2">
                                    <ShoppingBagIcon className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{totalCartItems}</span>
                                </button>
                            </div>
                            {user?.id && (
                                <div className="ml-4 flow-root lg:ml-6">
                                <UserMenu user={user}/>
                                 </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            <Suspense fallback={<div>Loading...</div>}>
                <ShoppingCartSheet open={openCartSheet} setOpen={setOpenCartSheet} />
            </Suspense>
        </header>
    )
}