'use server';

import type { Stripe } from 'stripe';
import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';

export async function createCheckoutSession(checkingOutProducts: any[]): Promise<{ url: string | null }> {
  const origin: string = headers().get('origin') as string;

  const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create({
    mode: 'payment',
    submit_type: 'pay',
    line_items: checkingOutProducts,
    success_url: `${origin}/checkout?action=result&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/checkout?action=cancel`,
  });
  if (checkoutSession.status === 'complete') {
    // TODO:
    // > Set Order Completed
    // > Clear Carts
    // > Send Email
  }
  return {
    url: checkoutSession.url,
  };
}
