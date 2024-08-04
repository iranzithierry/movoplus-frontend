import React from 'react'
import { QuestionMarkCircleIcon } from '@heroicons/react/20/solid'
import { formatMoney, getFromLocalStorage } from '@/lib/utils';
import SubmitButton from '@/components/ui/submit-button';
import { LS_NAMES } from '@/lib/constants/config';
import { checkout } from '@/lib/actions/checkout';
import CheckoutForm from '@/components/forms/checkout-form';

export default function CartSummary({ total, nOfProducts }: { total: number, nOfProducts: number }) {
    return (
        <section aria-labelledby="summary-heading" className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
            <h2 className="text-lg font-medium text-gray-900">
                Order summary
            </h2>

            <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-600">Subtotal</dt>
                    <dd className="text-sm font-medium text-gray-900">{formatMoney(total)}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="flex items-center text-sm text-gray-600">
                        <span>Shipping estimate</span>
                        <a title='Learn more about how shipping is calculated' href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                            <span className="sr-only">Learn more about how shipping is calculated</span>
                            <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                        </a>
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">{formatMoney(2000)}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="flex text-sm text-gray-600">
                        <span>Tax estimate</span>
                        <a title='Learn more about how tax is calculated' href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                            <span className="sr-only">Learn more about how tax is calculated</span>
                            <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                        </a>
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">{formatMoney(500)}{nOfProducts > 1 && 'x' + nOfProducts}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="text-base font-medium text-gray-900">Order total</dt>
                    <dd className="text-base font-medium text-gray-900">{formatMoney((total + 2000) + (500 * nOfProducts))}</dd>
                </div>
            </dl>

            <div className="mt-6">
                <CheckoutForm/>
            </div>
            {/*  */}
        </section>
    )
}
