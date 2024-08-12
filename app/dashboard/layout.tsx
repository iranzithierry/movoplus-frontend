"use client";
import React, { useState } from 'react'
import { Search } from './_components/search'
import { MainNav } from './_components/main-nav'
import { UserNav } from './_components/user-nav'
import ShopSwitcher from './_components/shop-switcher'
import SideNav from './_components/side-nav'

export default function Layout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <main>
            <div className="border-b">
                <div className="flex h-16 items-center px-4">
                    <ShopSwitcher />
                    <MainNav className="mx-6" />
                    <div className="ml-auto flex items-center space-x-4">
                        <Search />
                        <UserNav />
                    </div>
                </div>
            </div>
            <div className='pt-16'>
                <SideNav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            </div>
            <div className="flex-1 space-y-4 p-8 pt-6">
                <button onClick={() => setSidebarOpen((open) => !open)}>OPen</button>
                {children}
            </div>
        </main>
    )
}
