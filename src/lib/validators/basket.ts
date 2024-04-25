import { z } from "zod";

export const basketItemValidator = z.object({
  id: z.number(),
  basketId: z.number(),
  productId: z.number(),
  productType: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const basketValidator = z.object({
  id: z.number(),
  userId: z.string(),
  updated_at: z.string(),
  items: z.array(basketItemValidator),
});
