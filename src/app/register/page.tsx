"use client";

import RegisterForm from "@/components/auth/RegisterForm";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { cn } from "@/lib/utils";
import { Pixelify_Sans } from "next/font/google";
import { motion } from "framer-motion";

const pixelify = Pixelify_Sans({
  subsets: ["latin"],
  weight: "700",
});

export default function Login() {
  return (
    <section className="grid grid-cols-2 h-screen">
      <div className="flex flex-col justify-center mx-auto">
        <motion.h3
          initial={{
            opacity: 0,
            x: 20,
          }}
          animate={{
            opacity: 0.6,
            x: 0,
          }}
          transition={{
            duration: 0.6,
          }}
        >
          Welcome to
        </motion.h3>
        <TypewriterEffect
          words={[
            {
              text: "telligy",
              className: cn("text-9xl", pixelify.className),
            },
          ]}
        />
        <div className={cn("text-9xl hidden", pixelify.className)}>telligy</div>
        <motion.small
          initial={{
            opacity: 0,
            x: 20,
          }}
          animate={{
            opacity: 0.6,
            x: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="text-sm opacity-60 mt-4"
        >
          A platform for reading and selling your e-books and courses.
        </motion.small>
      </div>
      <div className="flex flex-col gap-10 items-center justify-center">
        <h1 className="text-2xl font-semibold bg-gradient-to-r from-fuchsia-600 to-purple-400 inline-block text-transparent bg-clip-text">
          Register
        </h1>
        <RegisterForm />
      </div>
    </section>
  );
}
