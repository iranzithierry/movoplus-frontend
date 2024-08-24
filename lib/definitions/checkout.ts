import { z } from 'zod';

export const CheckoutFormSchema = z.object({
  lsCartState: z.object({
    cartOwnerId: z.string().nullable().optional(),
    cartProducts: z.array(
      z.object({
        id: z.string(),
        quantity: z.number().int().positive(),
        color: z.string().nullable(),
        size: z.union([z.string(), z.number()]),
      })
    ),
  }),
});
export type CheckoutFormState =
  | {
      errorMessage?: string;
      successMessage?: string;
      checkoutSessionUrl?: string | null;
    }
  | undefined;
