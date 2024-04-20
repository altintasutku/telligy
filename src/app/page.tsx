import HomeComponent from "@/components/home/HomeComponent";
import { Spotlight } from "@/components/ui/Spotlight";
import { buttonVariants } from "@/components/ui/button";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { createClient } from "@/lib/supabase/supabase-server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const { error, data } = await createClient().auth.getUser();

  if (!error && data.user) {
    redirect("/dashboard");
  }

  return (
    <main className="p-10">
      <nav className="w-full flex justify-between">
        <h1 className="font-bold text-2xl uppercase">telligy</h1>
        <div>
          <Link href="/login" className={buttonVariants({ variant: "link" })}>
            Login
          </Link>
          <Link
            href="/register"
            className={buttonVariants({ variant: "link" })}
          >
            Register
          </Link>
        </div>
      </nav>

      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <TracingBeam className="px-6">
        <HomeComponent />
      </TracingBeam>
    </main>
  );
}
