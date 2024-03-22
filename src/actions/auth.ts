"use server";

import { createUser } from "@/lib/db";
import { RegisterFormValues } from "@/lib/validators/auth";

export async function registerUser(data: RegisterFormValues) {
  await createUser(data);
}
