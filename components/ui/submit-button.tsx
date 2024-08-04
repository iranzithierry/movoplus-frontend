import React from "react"
import { IconSpinner } from "../icons"
import { Button, ButtonProps } from "./button"
import { useFormStatus } from "react-dom"

export interface SubmitButtonProps
    extends ButtonProps {
    label: string
    pendingLabel: string
}

export default function SubmitButton({ className, label = "Sign in", pendingLabel = "Signing in...", ...props }: SubmitButtonProps) {
    const { pending } = useFormStatus();
    return (
        <Button aria-disabled={pending} type="submit" className="mt-4 w-full" {...props}>
            {pending && (<IconSpinner className="mr-2 h-4 w-4 animate-spin" />)}
            {pending ? pendingLabel : label}
        </Button>
    )
}