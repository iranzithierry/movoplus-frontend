"use client";
import Header from '@/components/base/header';
import MobileMenu from '@/components/mobile-menu';
import { useState } from 'react';

export default function HomeLayout({ children, }: { children: React.ReactNode; }) {
    const [open, setOpen] = useState(false)
    return (
        <div className="bg-white">
            <div className='z-20 relative'>
                <MobileMenu setOpen={setOpen} open={open} />
                <Header setOpen={setOpen} />
            </div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
                {children}
            </div>
        </div>
    )
}