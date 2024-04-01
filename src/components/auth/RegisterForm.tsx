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
import { createClientSupabase } from "@/lib/supabase-client";
import { motion } from "framer-motion";

const RegisterForm = () => {
  const supabase = createClientSupabase();

  // Get the form status (React hook)
  const { pending } = useFormStatus();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerValidator),
  });

  async function onSubmit(values: RegisterFormValues) {
    await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    //@ts-ignore
    toast("You have successfully registered.", { type: "success" });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-1/2">
        <FormField
          control={form.control}
          name="fullName"
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
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="+1 123 456 8989" type="phone" {...field} />
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
              {pending ? <Loader2Icon className="animate-spin" /> : "Submit"}
            </Button>
          </motion.div>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
