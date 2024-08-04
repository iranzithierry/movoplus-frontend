'use client'

import { useEffect, useState } from 'react'
import Logo from '@/components/base/logo'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Sidebar from '@/components/ui/sidebar'

const navigation = [
    { name: 'Marketplace', href: '/marketplace' },
    { name: 'Vendors', href: '/dashboard' },
    { name: 'Pricing', href: '/vendors/pricing' },
    { name: 'About', href: '#about' },
    { name: 'Features', href: '#features' },
]

export default function Header() {
    const pathName = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [textColor, setTextColor] = useState('text-gray-900')
    useEffect(() => {
        pathName == "/vendors/pricing" ? setTextColor('text-white') : setTextColor('text-gray-900')
    }, [pathName])
    return (
        <header className="absolute inset-x-0 top-0 z-50">
            <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
                <div className="flex lg:flex-1">
                    <Logo fillColor={textColor === 'text-white' ? 'white' : 'black'} />
                </div>
                <div className="flex lg:hidden">
                    <button type="button" onClick={() => setMobileMenuOpen(true)} className={`-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 ${textColor}`}>
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                        <Link key={item.name} href={item.href} className={`text-sm font-medium leading-6 ${textColor}`}>
                            {item.name}
                        </Link>
                    ))}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <Link href="/login" className={`text-sm font-semibold leading-6 ${textColor}`}>
                        Log in <span aria-hidden="true">&rarr;</span>
                    </Link>
                </div>
            </nav>
            <Sidebar open={mobileMenuOpen} justify='start' setOpen={setMobileMenuOpen}>
                <div className="mt-6 flow-root px-4 py-6 sm:px-6">
                    <div className="-my-6 divide-y divide-gray-500/10">
                        <div className="space-y-2 py-6">
                            {navigation.map((item) => (
                                <Link key={item.name} href={item.href} className={`-mx-3 block rounded-lg px-3 py-2.5 text-base font-medium leading-7 text-gray-900 hover:bg-gray-50`} >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                        <div className="py-6">
                            <Link href="/login" className={`-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50`} >
                                Log in
                            </Link>
                        </div>
                    </div>
                </div>
            </Sidebar>
        </header>
    )
}
