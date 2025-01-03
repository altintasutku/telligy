"use client";

import { createClient } from "@/lib/supabase/supabase-client";
import { UserResponse } from "@supabase/supabase-js";
import { Loader2Icon } from "lucide-react";
import Image from "next/legacy/image";
import React, { useMemo, useState } from "react";

const UserIcon = ({ size }: { size?: number }) => {
  const [isLoading, setIsLoading] = useState(true);

  const data = useMemo<Promise<UserResponse>>(
    async () =>
      createClient()
        .auth.getUser()
        .then((res) => {
          if (isLoading) setIsLoading(false);
          return res;
        }),
    [isLoading]
  );

  if (!data) {
    return <Loader2Icon className="animate-spin" />;
  }

  return (
    <div>
      <Image
        className="aspect-square rounded-full object-cover"
        src={
          "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        height={size || 50}
        width={size || 50}
        alt="It"
      />
    </div>
  );
};

export default UserIcon;
