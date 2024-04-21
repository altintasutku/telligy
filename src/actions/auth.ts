"use server";

import { createClient } from "@/lib/supabase/supabase-server";
import { LoginFormValues, RegisterFormValues } from "@/lib/validators/auth";
import { redirect } from "next/navigation";

export async function login(data: LoginFormValues) {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/login?error=error");
  }

  redirect("/home");
}

export async function signUp(data: RegisterFormValues) {
  const supabase = createClient();
  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/error");
  }

  redirect("/login");
}

export async function signOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect("/error");
  }

  redirect("/login");
}
