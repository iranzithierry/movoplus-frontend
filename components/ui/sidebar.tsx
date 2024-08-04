import React from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ScrollArea } from './scroll-area';
interface SidebarProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    title?: string;
    from?: 'left' | 'right';
    width?: 'full' | 'half';
    scrollChildren?: boolean;
    children: React.ReactNode;
    justify?: 'start' | 'center' | 'end'| 'between';
}
export default function Sidebar({ open, setOpen, title, from = 'right', width = 'half', scrollChildren = false, justify = 'between', children, }: SidebarProps) {
    return (
        <Dialog open={open} onClose={setOpen} className="relative z-50">
            <DialogBackdrop transition className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0" />
            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className={`pointer-events-none fixed inset-y-0 flex ${from == 'right' ? 'right-0' : ' left-0'} ${(width == 'half' && from == 'right') ? 'max-w-full pl-10' : (width == 'half' && from == 'left') ? 'max-w-full pr-10' : 'max-w-full '}`}>
                        <DialogPanel transition className={`pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out ${from === 'right' ? 'data-[closed]:translate-x-full' : 'data-[closed]:-translate-x-full'} sm:duration-700`}>
                            <div className={`flex flex-1 flex-col justify-${justify} h-full bg-white shadow-xl`}>
                                <div className="px-4 py-6 sm:px-6">
                                    <div className="flex items-start justify-between">
                                        {title && <DialogTitle className="text-lg font-medium text-gray-900">{title}</DialogTitle>}
                                        <div className="ml-3 flex h-7 items-center">
                                            <button type="button" onClick={() => setOpen(false)} className="relative -m-2 p-2 text-gray-400 hover:text-gray-500" >
                                                <span className="absolute -inset-0.5" />
                                                <span className="sr-only">Close panel</span>
                                                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                               {scrollChildren ? <ScrollArea>{children}</ScrollArea> : children}
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </div>
        </Dialog>
    )
}
