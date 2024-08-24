'use client';
import { toast } from 'sonner';
import { useFormState } from 'react-dom';
import React, { HTMLAttributes } from 'react';
import SubmitButton from '../ui/submit-button';
import { checkout } from '@/lib/actions/checkout';
import { getFromLocalStorage } from '@/lib/utils';
import { LS_NAMES } from '@/lib/constants/config';

export default function CheckoutForm({ btnSize = 'lg', btnAttrs, formAttrs }: { btnSize?: 'default' | 'lg'; btnAttrs?: HTMLAttributes<HTMLButtonElement>; formAttrs?: HTMLAttributes<HTMLFormElement> }) {
  const [state, action] = useFormState(checkout, undefined);
  React.useEffect(() => {
    if (state && 'errorMessage' in state) {
      let [title, description] = state.errorMessage?.split('<BRK>') ?? [];
      toast.error(title, { description: description });
    }
    if (state && 'successMessage' in state) {
      toast.success(state.successMessage);
    }
    if (state && 'checkoutSessionUrl' in state) {
      window.location.assign(state.checkoutSessionUrl as string);
    }
  }, [state]);
  return (
    <form action={action} {...formAttrs}>
      <input type="hidden" name="ls-cart-state" value={JSON.stringify(getFromLocalStorage(LS_NAMES.CART_STATE))} />
      <SubmitButton {...btnAttrs} className="w-full" size={btnSize} pendingLabel="Processing payment" label="Checkout" />
    </form>
  );
}
