"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"
import { ShoppingCartIcon } from "lucide-react"

export function SearchModal({ open, setOpen, ...props }: { setOpen: React.Dispatch<React.SetStateAction<boolean>>, open: boolean}) {
    const router = useRouter()


    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if ((e.key === "s" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
                if (
                    (e.target instanceof HTMLElement && e.target.isContentEditable) ||
                    e.target instanceof HTMLInputElement ||
                    e.target instanceof HTMLTextAreaElement ||
                    e.target instanceof HTMLSelectElement
                ) {
                    return
                }

                e.preventDefault()
                setOpen((open) => !open)
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const runCommand = React.useCallback((command: () => unknown) => {
        setOpen(false)
        command()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <CommandDialog  open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Start typing to search..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Pages">
                    <CommandItem value={"Orders"} onSelect={() => { runCommand(() => router.push("/orders"))}}>
                        <ShoppingCartIcon className="mr-2 h-4 w-4" />
                        Orders
                    </CommandItem>
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    )
}
