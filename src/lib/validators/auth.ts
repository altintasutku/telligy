import { z } from "zod";

export const registerValidator = z.object({
  fullName: z.string(),
  phone: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

export type RegisterFormValues = z.infer<typeof registerValidator>;
