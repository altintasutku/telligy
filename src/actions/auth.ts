"use server";

import { createClient } from "@/lib/supabase/supabase-server";
import { LoginFormValues, RegisterFormValues } from "@/lib/validators/auth";
import axios from "axios";
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
  const { error, data: user } = await supabase.auth.signUp(data);

  if (error || !user.user) {
    redirect("/error");
  }

  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
    displayName: data.displayName,
    userId: user.user.id,
  });

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
