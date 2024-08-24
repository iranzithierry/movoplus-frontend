'use client';

import * as React from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { IconSpinner } from '../icons';
import { signup } from '@/lib/actions/auth';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useFormState, useFormStatus } from 'react-dom';
import InputErrors from '../ui/input-errors';
import { FormField } from './form-field';

interface FormProps extends React.HTMLAttributes<HTMLDivElement> {
  redirectTo?: string | null;
}
{
}

export function RegisterForm({ className, redirectTo, ...props }: FormProps) {
  const { pending } = useFormStatus();
  const [state, action] = useFormState(signup, undefined);

  React.useEffect(() => {
    if (state && 'message' in state) {
      toast.error(state.message);
    }
  }, [state]);
  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form action={action} className="space-y-5">
        <FormField id="name" name="name" label="Name" placeholder="John Doe" autoCapitalize="on" autoComplete="name" autoCorrect="off" disabled={pending} errors={state?.errors?.name} />
        <FormField id="email" name="email" type="email" placeholder="name@example.com" label="Email" autoCapitalize="none" autoComplete="email" autoCorrect="off" disabled={pending} errors={state?.errors?.email} />
        <FormField id="password" name="password" type="password" label="Password" placeholder="••••••••" autoComplete="new-password" disabled={pending} errors={state?.errors?.password} />
        <div>
          <RegisterButton />
        </div>
      </form>
    </div>
  );
}

export function RegisterButton() {
  const { pending } = useFormStatus();
  return (
    <Button aria-disabled={pending} type="submit" className="mt-4 w-full">
      {pending && <IconSpinner className="mr-2 h-4 w-4 animate-spin" />}
      {pending ? 'Signing up,' : 'Sign up'}
    </Button>
  );
}
