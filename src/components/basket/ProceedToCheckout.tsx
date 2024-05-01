"use client";

import React from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/supabase-client";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

const ProceedToCheckout = ({ disabled }: { disabled: boolean }) => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const auth = await createClient().auth.getSession();
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/payment/pay`,
        null,
        {
          headers: {
            Authorization: auth.data.session?.access_token,
          },
        }
      );

      return data;
    },
    onSuccess(data) {
      router.push(data.paymentPageUrl);
      queryClient.invalidateQueries({ queryKey: ["basket"] });
    },
  });

  return (
    <>
      <Button
        variant={"secondary"}
        disabled={disabled || isPending}
        onClick={() => mutate()}
      >
        {isPending ? (
          <Loader2Icon className="animate-spin" />
        ) : (
          "Proceed to checkout"
        )}
      </Button>
      <small className="text-end">
        You&apos;ll be redirected to{" "}
        <a
          href="https://www.iyzico.com"
          className="underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Iyzico
        </a>
      </small>
    </>
  );
};

export default ProceedToCheckout;
