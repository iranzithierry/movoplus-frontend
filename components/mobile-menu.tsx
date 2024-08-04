import Link from 'next/link';
import { cn } from '@/lib/utils';
import React, { Fragment } from 'react'
import { RwandaFlagIcon } from './icons';
import navigation from "@/data/navigations.json"
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Dialog, DialogBackdrop, DialogPanel, Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { useAuth } from '@/contexts/auth-context';
import Sidebar from './ui/sidebar';
import Image from 'next/image';

export default function MobileMenu({ setOpen, open }: { setOpen: React.Dispatch<React.SetStateAction<boolean>>, open: boolean }) {
    const { user } = useAuth()
    return (
        <Sidebar scrollChildren={true} from='left' width='full' open={open} setOpen={setOpen} title="Movo+">
            <TabGroup className="mt-2">
                <div className="border-b border-gray-200">
                    <TabList className="-mb-px flex space-x-8 px-4">
                        {navigation.categories.map((category) => (
                            <Tab key={category.name} className={({ selected }) => cn(selected ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-900', 'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium')}>
                                {category.name}
                            </Tab>
                        ))}
                    </TabList>
                </div>
                <TabPanels as={Fragment}>
                    {navigation.categories.map((category) => (
                        <TabPanel key={category.name} className="space-y-10 px-4 pb-8 pt-10">
                            <div className="grid grid-cols-2 gap-x-4">
                                {category.featured.map((item) => (
                                    <div key={item.name} className="group relative text-sm">
                                        <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                            <Image width={400} height={400} src={item.imageSrc} alt={item.imageAlt} className="object-cover object-center" />
                                        </div>
                                        <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                            <span className="absolute inset-0 z-10" aria-hidden="true" />
                                            {item.name}
                                        </a>
                                        <p aria-hidden="true" className="mt-1">
                                            Shop now
                                        </p>
                                    </div>
                                ))}
                            </div>
                            {category.sections.map((section) => (
                                <div key={section.name}>
                                    <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900">
                                        {section.name}
                                    </p>
                                    <ul role="list" aria-labelledby={`${category.id}-${section.id}-heading-mobile`} className="mt-6 flex flex-col space-y-6">
                                        {section.items.map((item) => (
                                            <li key={item.name} className="flow-root">
                                                <a href={item.href} className="-m-2 block p-2 text-gray-500">
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </TabPanel>
                    ))}
                </TabPanels>
            </TabGroup>

            {/* <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                        <a href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                            {page.name}
                        </a>
                    </div>
                ))}
            </div> */}

            {!user?.id && <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                <div className="flow-root">
                    <Link href="/login" className="-m-2 block p-2 font-medium text-gray-900">
                        Sign in
                    </Link>
                </div>
                <div className="flow-root">
                    <Link href="/register" className="-m-2 block p-2 font-medium text-gray-900">
                        Create account
                    </Link>
                </div>
            </div>}

            <div className="border-t border-gray-200 px-4 py-6">
                <a href="#" className="-m-2 flex items-center p-2">
                    <RwandaFlagIcon className="block h-auto w-5 flex-shrink-0" />
                    <span className="ml-3 block text-base font-medium text-gray-900">RWA</span>
                </a>
            </div>
        </Sidebar>
    )
}
