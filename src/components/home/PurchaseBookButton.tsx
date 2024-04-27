"use client";

import {
  BookOpenTextIcon,
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
}>;

const PurchaseBookButton = ({ id, basketId }: Props) => {
  const supabase = createClient();

  const { data, isLoading } = useQuery({
    queryKey: ["basket", "basketItem"],
    queryFn: async () => {
      const auth = await supabase.auth.getSession();
      if (!auth) {
        return;
      }

      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/product/has-item/book/${id}`,
        {
          headers: {
            Authorization: auth.data.session?.access_token,
          },
        }
      );

      return data as {
        hasItem: boolean;
      };
    },
    enabled: !!id,
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

  if (!id) {
    <Link href={"#"} className={buttonVariants()}>
      <ShoppingBasketIcon className="mr-2" /> Purchase
    </Link>;
  }

  if (isLoading) {
    <Button>
      <Loader2Icon className="animate-spin" />
    </Button>;
  }

  if (!data) {
    return <>System Error</>;
  }

  if (data.hasItem) {
    return (
      <Link
        href={"/read?b=" + id}
        className={cn(
          buttonVariants(),
          "flex items-center"
        )}
      >
        <BookOpenTextIcon className="mr-2" /> Read
      </Link>
    );
  }

  return (
    <Button onClick={() => addToBasket()}>
      {isPending ? (
        <Loader2Icon className="animate-spin" />
      ) : (
        <>
          <ShoppingBasketIcon className="mr-2" /> Add to Basket
        </>
      )}
    </Button>
  );
};

export default PurchaseBookButton;
