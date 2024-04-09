"use client";

import { createClient } from "@/lib/supabase-client";
import { User } from "@supabase/supabase-js";
import { Loader2Icon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const UserIcon = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [data, setData] = useState<User | null>(null);

  createClient()
    .auth.getUser()
    .then((res) => {
      setIsLoading(false);
      setData(res.data.user);
    });

  if (isLoading) {
    return <Loader2Icon className="animate-spin" />;
  }

  return (
    <div>
      <Image
        className="aspect-square rounded-full"
        src={"https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
        height={50}
        width={50}
        alt="It"
      />
    </div>
  );
};

export default UserIcon;
