import React from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import UserAvatar from './avatar'
import { User } from '@/api'
import Link from 'next/link'

export default function UserMenu({ user }: { user: User }) {
    return (
        <Menu as="div" className="relative ml-3">
            <div>
                <MenuButton className="relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2  focus:ring-offset-white">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <UserAvatar user={user} />
                </MenuButton>
            </div>
            <MenuItems transition className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-gray-900 ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                <MenuItem>
                    <Link href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                        Your Profile
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                        Settings
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link href="/logout" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                        Sign out
                    </Link>
                </MenuItem>
            </MenuItems>
        </Menu>
    )
}
