'use client';

import React from 'react';
import { Product } from '@/api_';
import { formatMoney } from '@/lib/utils';
import { LinkButton } from '@/components/ui/link-button';
import CheckoutForm from '@/components/forms/checkout-form';

export default function CartSheetFooter({ loading, setOpen, total, cartProducts }: { loading: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>>; total: number; cartProducts: Product[] }) {
  return (
    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
      <div className="flex justify-between text-base font-medium text-gray-900">
        <p>Subtotal</p>
        {loading ? <div className="h-6 bg-gray-200 rounded w-1/3 -mt-2" /> : <p>{formatMoney(total)}</p>}
      </div>
      <p className="mt-0.5 text-sm text-gray-500">Delivery cost calculated at checkout.</p>
      <div className="mt-6 space-y-2">
        <CheckoutForm btnSize="lg" />
        <LinkButton onClick={() => setOpen(false)} size={'lg'} variant={'outline'} linkTo="/cart" className="w-full">
          View Cart
        </LinkButton>
      </div>
      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
        <p>
          or{' '}
          <button type="button" onClick={() => setOpen(false)} className="font-medium text-indigo-600 hover:text-indigo-500">
            Continue Shopping
            <span aria-hidden="true"> →</span>
          </button>
        </p>
      </div>
    </div>
  );
}
