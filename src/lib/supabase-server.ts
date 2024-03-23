import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const createServerSupabase = () =>
  createServerComponentClient({ cookies: () => cookies() });

export const getAuthSession = async () =>
  (await createServerSupabase().auth.getSession()).data.session;
