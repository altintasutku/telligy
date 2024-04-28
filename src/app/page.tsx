import { Button, buttonVariants } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/supabase-server";
import { cn } from "@/lib/utils";
import { Kreon } from "next/font/google";
import Image from "next/legacy/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import homeScreenshot from "@/images/home_screenshot.png";

const kreon = Kreon({
  subsets: ["latin"],
});

export default async function Home() {
  const { error } = await createClient().auth.getUser();

  if(!error){
    redirect("/home")
  }

  return (
    <main className='p-10'>
      <nav className='w-full flex justify-between px-20'>
        <div className='flex items-center gap-10'>
          <h1
            className={cn("font-bold text-2xl uppercase mr-5", kreon.className)}
          >
            telligy
          </h1>

          <Link
            href={"/home"}
            className='text-xl font-semibold text-[#7a7a7a] hover:text-white transition'
          >
            Books
          </Link>
          <Link
            href={"/home"}
            className='text-xl font-semibold text-[#7A7A7A] hover:text-white transition'
          >
            Categories
          </Link>
        </div>
        <div className='space-x-4'>
          <Link href='/login' className={buttonVariants({ variant: "ghost" })}>
            Login
          </Link>
          <Link
            href='/register'
            className={cn(buttonVariants(), "bg-[#A98FCB] text-white")}
          >
            Register
          </Link>
        </div>
      </nav>

      <section className='mt-36 flex flex-col items-center'>
        <div className='flex items-center p-0.5 w-80 rounded-full bg-white text-accent font-semibold text-sm cursor-pointer hover:scale-95 transition-all'>
          <span className='text-center bg-[#3B3B3B] rounded-full text-white px-4 py-1'>
            New
          </span>
          <span className='flex-1 text-center'>Start Your Membership Now</span>
        </div>

        <h1 className='text-center text-[4.5rem] font-bold leading-[5.4rem] mt-7'>
          Start Your Journey <br />
          With telligy
        </h1>
        <p className='mt-5 text-[#BFBFBF] font-bold'>
          The Best E-Book Platfrom which users can reach thousands of e-books
        </p>

        <div className='grid grid-cols-4 items-center gap-4 mt-4'>
          <span className='text-end'>For readers</span>
          <Button className='bg-[#A98FCB] hover:bg-[#584177] text-white'>
            Start Reading
          </Button>
          <Button className='bg-white'>Start Publishing</Button>
          <span>For sellers</span>
        </div>

        <Image
          src={homeScreenshot}
          alt='home'
          height={1080}
          width={1920}
          className='mt-10 object-cover w-[65%] rounded-md'
        />
      </section>
    </main>
  );
}
