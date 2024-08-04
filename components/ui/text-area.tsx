import * as React from "react"

import { cn } from "@/lib/utils"
import { Textarea as HeadlessTextarea } from "@headlessui/react"

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
        invalid?: boolean
     }

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, invalid = false, ...props }, ref) => {
        return (
            <HeadlessTextarea
                className={cn(
                    `flex border-0  w-full rounded-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary ${invalid && 'ring-red-500 focus-visible:ring-red-500'}`,
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Textarea.displayName = "Textarea"

export { Textarea }
