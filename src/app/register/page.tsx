"use client";

import RegisterForm from "@/components/auth/RegisterForm";

export default function Login() {
 

  return (
    <section className="flex flex-col w-full items-center">
      <h1 className="font-semibold text-xl">Welcome to Register Page</h1>
      <RegisterForm />
    </section>
  );
}
