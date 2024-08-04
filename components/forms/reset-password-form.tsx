"use client"

import * as React from "react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { Checkbox } from "../ui/checkbox"
import { login } from "@/lib/actions/auth"
import { useFormState, useFormStatus } from 'react-dom';
import { FormField } from "./form-field"
import SubmitButton from "../ui/submit-button"

interface FormProps extends React.HTMLAttributes<HTMLDivElement> { redirectTo?: string | null } { }

export function ResetPasswordForm({ className, redirectTo, ...props }: FormProps) {
    const { pending } = useFormStatus();
    const [state, action] = useFormState(login, undefined);

    React.useEffect(() => {
        if (state && 'message' in state) {
            toast.error(state.message)
        }
    }, [state])
    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form action={action} className="space-y-5">
                <FormField
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="name@example.com"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={pending}
                    errors={state?.errors?.email} />
                <div>
                    <SubmitButton label=" Reset your password" pendingLabel="Sending email..." />
                </div>
            </form>
        </div>
    )
}
