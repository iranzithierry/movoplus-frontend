'use client';

import * as React from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Checkbox } from '../ui/checkbox';
import { login } from '@/lib/actions/auth';
import { useFormState, useFormStatus } from 'react-dom';
import { FormField } from './form-field';
import SubmitButton from '../ui/submit-button';
import Link from 'next/link';

interface FormProps extends React.HTMLAttributes<HTMLDivElement> {}
{
}

export function LoginForm({ className, ...props }: FormProps) {
  const { pending } = useFormStatus();
  const [state, action] = useFormState(login, undefined);

  React.useEffect(() => {
    if (state && 'message' in state) {
      toast.error(state.message);
    }
  }, [state]);
  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form action={action} className="space-y-5">
        <FormField id="email" name="email" type="email" label="Email" placeholder="name@example.com" autoCapitalize="none" autoComplete="email" autoCorrect="off" disabled={pending} errors={state?.errors?.email} />
        <FormField id="password" name="password" type="password" label="Password" showPasswordToggle={true} placeholder="••••••••" autoComplete="new-password" disabled={pending} errors={state?.errors?.password} />

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-x-3">
            <Checkbox />
            <span>Remember me</span>
          </div>
          <Link href="/reset-password" className="text-center font-semibold text-primary hover:text-primary/85">
            Forgot password?
          </Link>
        </div>
        <div>
          <SubmitButton label="Sign in" pendingLabel="Signing in..." />
        </div>
      </form>
    </div>
  );
}
