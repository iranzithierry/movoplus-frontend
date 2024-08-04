'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import { Dialog, DialogBackdrop, DialogPanel, Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Checkbox } from '@/components/ui/checkbox'

const sortOptions = [
    { name: 'Most Popular', href: '#', current: true },
    { name: 'Best Rating', href: '#', current: false },
    { name: 'Newest', href: '#', current: false },
    { name: 'Price: Low to High', href: '#', current: false },
    { name: 'Price: High to Low', href: '#', current: false },
]
const filters = [
    {
        id: 'color',
        name: 'Color',
        options: [
            { value: 'white', label: 'White', checked: false },
            { value: 'beige', label: 'Beige', checked: false },
            { value: 'blue', label: 'Blue', checked: true },
        ],
    },
    {
        id: 'category',
        name: 'Category',
        options: [
            { value: 'shoes', label: 'Shoes', checked: true },
            { value: 't-shirts', label: 'T-Shirts', checked: false },
        ],
    },
    {
        id: 'size',
        name: 'Size',
        options: [
            { value: '41', label: '41', checked: false },
            { value: 'xl', label: 'XL', checked: false },
        ],
    },
]

export default function HeadingFilters() {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

    return (
        <div>
            {/* Mobile filter dialog */}
            <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40">
                <DialogBackdrop transition className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0" />
                <div className="fixed inset-0 z-40 flex">
                    <DialogPanel transition className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full">
                        <div className="flex items-center justify-between px-4">
                            <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                            <button type="button" onClick={() => setMobileFiltersOpen(false)} className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400">
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                            </button>
                        </div>

                        {/* Filters */}
                        <form className="mt-4 border-t border-gray-200">
                            {filters.map((section) => (
                                <Disclosure key={section.id} as="div" className="border-t border-gray-200 px-4 py-6">
                                    <h3 className="-mx-2 -my-3 flow-root">
                                        <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                            <span className="font-medium text-gray-900">{section.name}</span>
                                            <span className="ml-6 flex items-center">
                                                <PlusIcon aria-hidden="true" className="h-5 w-5 group-data-[open]:hidden" />
                                                <MinusIcon aria-hidden="true" className="h-5 w-5 [.group:not([data-open])_&]:hidden" />
                                            </span>
                                        </DisclosureButton>
                                    </h3>
                                    <DisclosurePanel className="pt-6">
                                        <div className="space-y-6">
                                            {section.options.map((option, _) => (
                                                <div className='flex items-center' key={option.value}>
                                                    <Checkbox onCheckedChange={(e) => {}} value={option.value} defaultChecked={option.checked} />
                                                    <label className="ml-3 min-w-0 flex-1 text-gray-500 text-base">
                                                        {option.label}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </DisclosurePanel>
                                </Disclosure>
                            ))}
                        </form>
                    </DialogPanel>
                </div>
            </Dialog>

            <div className="flex items-center justify-end">
                <Menu as="div" className="relative inline-block text-left">
                    <div>
                        <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                            Sort
                            <ChevronDownIcon aria-hidden="true" className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
                        </MenuButton>
                    </div>

                    <MenuItems transition className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                        <div className="py-1">
                            {sortOptions.map((option) => (
                                <MenuItem key={option.name}>
                                    <a href={option.href} className={cn(option.current ? 'font-medium text-gray-900' : 'text-gray-500', 'block px-4 py-2 text-sm data-[focus]:bg-gray-100',)} >
                                        {option.name}
                                    </a>
                                </MenuItem>
                            ))}
                        </div>
                    </MenuItems>
                </Menu>
                <button type="button" onClick={() => setMobileFiltersOpen(true)} className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6">
                    <span className="sr-only">Filters</span>
                    <FunnelIcon aria-hidden="true" className="h-5 w-5" />
                </button>
            </div>
        </div>
    )
}
