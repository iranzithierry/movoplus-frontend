import { z } from 'zod';

export const createOrderSchema = z.object({
  orderOwnerId: z.string(),
  shipping_price: z.string(),
  shipping_address: z.string(),
  products: z.array(
    z.object({
      id: z.string(),
      quantity: z.union([z.string(), z.number()]),
      color: z.string(),
      size: z.union([z.string(), z.number()]),
    })
  ),
});

export type CreateOrder = z.infer<typeof createOrderSchema>;
