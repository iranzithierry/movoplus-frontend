import 'server-only';

import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20',
  appInfo: {
    name: 'movo+',
    url: process.env.FRONTEND_HOST_URL ?? 'http://localhost:3000',
  },
});
