import { z } from "zod";

export const registerValidator = z.object({
  displayName: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

export type RegisterFormValues = z.infer<typeof registerValidator>;

export const loginValidator = z.object({
  email: z.string(),
  password: z.string(),
});

export type LoginFormValues = z.infer<typeof loginValidator>;
