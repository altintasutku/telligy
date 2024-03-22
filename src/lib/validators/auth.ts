import { z } from "zod";

export const registerValidator = z.object({
    fullName: z.string(),
    phone: z.string(),
  });

export type RegisterFormValues = z.infer<typeof registerValidator>;