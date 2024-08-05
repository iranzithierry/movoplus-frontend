'use client';
import * as React from "react"
import { cn } from "@/lib/utils"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean
  showPasswordToggle?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, invalid = false, showPasswordToggle = false, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword)
    }

    const inputElement = (
      <input
        type={type === "password" && showPassword ? "text" : type}
        className={cn(
          `block w-full rounded-md bg-transparent border-0 py-1.5 px-2 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 dark:ring-zinc-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 ${invalid && 'ring-red-500 focus-visible:ring-red-500'}`,
          className
        )}
        ref={ref}
        {...props}
      />
    )

    if (type === "password" && showPasswordToggle) {
      return (
        <div className="relative">
          {inputElement}
          <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={togglePasswordVisibility}>
            {showPassword ? (
              <EyeSlashIcon className="h-5 w-5 text-gray-400" />
            ) : (
              <EyeIcon className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>
      )
    }

    return inputElement
  }
)
Input.displayName = "Input"

export { Input }
