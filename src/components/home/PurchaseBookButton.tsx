"use client";

import {
  BookOpenTextIcon,
  CircleAlertIcon,
  CircleCheckIcon,
  Loader2Icon,
  ShoppingBasketIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button, buttonVariants } from "../ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createClient } from "@/lib/supabase/supabase-client";
import { cn } from "@/lib/utils";

type Props = Readonly<{
  id?: number;
  basketId?: number;
  small?: boolean;
}>;

const PurchaseBookButton = ({ id, basketId, small = false }: Props) => {
  const supabase = createClient();

  const { data: hasBook, isLoading: hasBookLoading } = useQuery({
    queryKey: ["basket", "basketItem"],
    queryFn: async () => {
      const auth = await supabase.auth.getSession();
      if (!auth) {
        return;
      }

      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/book/has-book/${id}`,
        {
          headers: {
            Authorization: auth.data.session?.access_token,
          },
        }
      );

      return data.hasBook as boolean;
    },
    enabled: !!id,
  });

  const { data: hasBasketInclude, isLoading } = useQuery({
    queryKey: ["basket", "basketItem"],
    queryFn: async () => {
      const auth = await supabase.auth.getSession();
      if (!auth) {
        return;
      }

      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/basket/has-item/book/${id}`,
        {
          headers: {
            Authorization: auth.data.session?.access_token,
          },
        }
      );

      return data.hasItem as boolean;
    },
    enabled: !!id && !hasBookLoading,
  });

  const { mutate: addToBasket, isPending } = useMutation({
    mutationFn: async () => {
      const auth = await supabase.auth.getSession();

      if (!auth) {
        return;
      }

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/basket/add-item`,
        {
          productId: id,
          productType: "book",
        },
        {
          headers: {
            Authorization: auth.data.session?.access_token,
          },
        }
      );
      console.log("🚀 ~ mutationFn: ~ data:", data);
    },
  });

  const smallClassName = small ? "rounded-full h-8 w-8 p-0" : "";
  const mainClassName = cn(
    "flex justify-center items-center gap-2 bg-white text-black px-3 py-2 rounded-md text-nowrap text-sm hover:bg-white/70 transition-all cursor-pointer",
    smallClassName
  );

  if (!id) {
    <Link href={"#"} className={mainClassName}>
      <ShoppingBasketIcon size={small ? 14 : 20} />
      <span className={small ? "sr-only" : ""}>Purchase</span>
    </Link>;
  }

  if (isLoading) {
    <div className={mainClassName}>
      <Loader2Icon className="animate-spin" size={small ? 14 : 20} />
    </div>;
  }

  if (hasBook) {
    return (
      <Link href={"/read?b=" + id} className={mainClassName}>
        <BookOpenTextIcon size={small ? 14 : 20} />
        <span className={small ? "sr-only" : ""}>Read</span>
      </Link>
    );
  }

  if (hasBasketInclude) {
    return (
      <Link href={"/basket"} className={mainClassName}>
        <CircleCheckIcon size={small ? 14 : 20} />
        <span className={small ? "sr-only" : ""}>Added to basket</span>
      </Link>
    );
  }

  return (
    <div onClick={() => addToBasket()} className={mainClassName}>
      {isPending ? (
        <Loader2Icon className="animate-spin" />
      ) : (
        <>
          <ShoppingBasketIcon size={small ? 14 : 20} />
          <span className={small ? "sr-only" : ""}>Add to Basket</span>
        </>
      )}
    </div>
  );
};

export default PurchaseBookButton;
