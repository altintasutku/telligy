import LoginComponent from "@/components/auth/LoginComponent";
import { createClient } from "@/lib/supabase/supabase-server";
import { redirect } from "next/navigation";

export default async function Login() {
  const { error, data } = await createClient().auth.getUser();

  if (!error && data.user) {
    redirect("/dashboard");
  }

  return (
    <section className="grid grid-cols-2 h-screen">
      <LoginComponent />
    </section>
  );
}
