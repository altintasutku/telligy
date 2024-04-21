import RegisterForm from "@/components/auth/RegisterForm";
import { createClient } from "@/lib/supabase/supabase-server";
import { redirect } from "next/navigation";

export default async function Register() {
  const { error, data } = await createClient().auth.getUser();

  if (!error && data.user) {
    redirect("/home");
  }

  return (
    <section className="grid grid-cols-2 h-screen">
      <RegisterForm />
    </section>
  );
}
