import { z } from "zod";

export const categoryValidator = z.object({
  id: z.number().optional(),
  name: z.string().max(256, "Name must be less than 256 characters."),
});

export const bookValidator = z.object({
  id: z.number().optional(),
  title: z.string().max(256, "Title must be less than 256 characters."),
  description: z
    .string()
    .max(1024, "Description must be less than 1024 characters."),
  price: z.number(),
  banner: z.string(),
  discount: z.number().min(0).max(100),
  pdf: z.string(),
  cover: z.string(),
  currency: z.string().max(3, "Currency must be less than 3 characters."),
  pageCount: z.number(),
  categories: z
    .array(categoryValidator)
    .max(5, "You can add up to 5 categories."),
});
