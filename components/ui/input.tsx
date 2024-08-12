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
          `flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${invalid && 'ring-red-500 focus-visible:ring-red-500'}`,
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
