"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2Icon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { RegisterFormValues, registerValidator } from "@/lib/validators/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormStatus } from "react-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { signUp } from "@/actions/auth";
import { TypewriterEffect } from "../ui/typewriter-effect";
import { cn } from "@/lib/utils";
import { Pixelify_Sans } from "next/font/google";

const pixelify = Pixelify_Sans({
  subsets: ["latin"],
  weight: "700",
});

const RegisterForm = () => {
  // Get the form status (React hook)
  const { pending } = useFormStatus();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerValidator),
  });

  async function onSubmit(values: RegisterFormValues) {
    signUp(values);
    //@ts-ignore
    // toast("You have successfully registered.", { type: "success" });
  }

  return (
    <>
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
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-1/2"
          >
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Barrack Obama" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="my_fancy_email@mail.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="super_strong_password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="bg-gradient-to-r from-fuchsia-600 to-purple-400 inline-block p-[1px] rounded-md">
              <motion.div whileHover={{ scale: 1.05, y: -5, x: -5 }}>
                <Button type="submit" disabled={pending}>
                  {pending ? (
                    <Loader2Icon className="animate-spin" />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </motion.div>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default RegisterForm;
