import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="p-10">
      <Link
        href="/login"
        className={buttonVariants({variant: "link"})}
      >Login Page</Link>
      <Link
        href="/register"
        className={buttonVariants({variant: "link"})}
      >Register</Link>
    </main>
  );
}
