import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import React from "react"
import { SearchModal } from "./search-modal"

export function Search({ ...props }) {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="lg:max-w-2xl w-full">
      <Button variant="outline" className={cn("relative w-full justify-start text-muted-foreground" )} onClick={() => setOpen(true)} {...props}>
        <span className="inline-flex">Search...</span>
        <kbd className="pointer-events-none absolute right-[2rem] my-auto hidden select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono font-medium opacity-100 sm:flex">
          <span className="text-xs">CTRL</span>
        </kbd>
        <kbd className="pointer-events-none absolute right-[0.5rem] my-auto hidden select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono font-medium opacity-100 sm:flex">
          <span className="text-xs">S</span>
        </kbd>
      </Button>
      <SearchModal open={open} setOpen={setOpen} />
    </div>
  )
}
