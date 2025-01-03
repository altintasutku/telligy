import ItemList from "@/components/basket/ItemList";
import ProceedToCheckout from "@/components/basket/ProceedToCheckout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/supabase-server";
import { cn } from "@/lib/utils";
import { basketValidator } from "@/lib/validators/basket";
import { Session } from "@supabase/supabase-js";
import axios from "axios";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export const dynamic = "force-dynamic";

const containerClassName =
  "bg-white rounded-md text-black max-h-[70dvh] overflow-auto";

const BasketPage = async () => {
  const auth = (await createClient().auth.getSession()) as {
    data: {
      session: Session;
    };
    error: null;
  };

  if (!auth.data.session.access_token) {
    redirect("/");
  }

  const basket = await axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/basket`, {
      headers: {
        Authorization: auth.data.session.access_token,
      },
    })
    .then((res) => {
      return basketValidator.parse(res.data);
    })
    .catch((err) => {
      console.error(err);
    });

  if (!basket) {
    return <div>Something went wrong</div>;
  }

  const items = await Promise.all(
    basket.items.map((item) => {
      if (item.productType !== "book") {
        return item;
      }

      return axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/book/${item.productId}`, {
          headers: {
            Authorization: auth.data.session.access_token,
          },
        })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.error(err);
          return null;
        });
    })
  );

  return (
    <div className="flex flex-col sm:flex-row h-screen w-screen justify-center items-center sm:max-w-[90dvw] md:max-w-[80dvw] lg:max-w-[70dvw] mx-auto gap-4">
      <div className={cn(containerClassName, "w-full sm:w-auto sm:basis-2/3")}>
        <h1 className="text-2xl font-bold mt-4 mx-4">Basket</h1>
        <p className="text-sm mt-2 mx-4">This is your basket</p>
        {items.length > 0 ? (
          <ItemList items={items} />
        ) : (
          <div className="py-10 px-4">
            <p className="opacity-90">Your basket is empty...</p>
            <Link href="/home" className="underline">
              Let&apos;s add something
            </Link>
          </div>
        )}
      </div>
      <div
        className={cn(
          containerClassName,
          "w-full sm:w-auto sm:basis-1/3 p-4 flex flex-col gap-2"
        )}
      >
        <h2 className="font-semibold">ORDER SUMMARY</h2>
        <Separator />
        <div className="flex justify-between">
          <span>Total</span>
          <span className="font-bold">
            {items.length > 0 ? (
              <>
                {items.reduce((acc, item) => acc + item.price, 0)}{" "}
                {items[0].currency}
              </>
            ) : (
              "0.00"
            )}
          </span>
        </div>
        <br />
        <ProceedToCheckout disabled={items.length <= 0} />
      </div>
    </div>
  );
};

export default BasketPage;
