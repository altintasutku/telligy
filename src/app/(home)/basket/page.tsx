import { createClient } from "@/lib/supabase/supabase-server";
import { cn } from "@/lib/utils";
import { basketItemValidator, basketValidator } from "@/lib/validators/basket";
import { Session } from "@supabase/supabase-js";
import axios from "axios";
import React from "react";

const containerClassName = "bg-white rounded-md p-4 text-black";

const BasketPage = async () => {
  const auth = (await createClient().auth.getSession()) as {
    data: {
      session: Session;
    };
    error: null;
  };

  const basket = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/basket`, {
    headers: {
      Authorization: auth.data.session.access_token,
    },
  }).then((res) => {
    return basketValidator.parse(res.data);
  }).catch((err) => {
    console.error(err);
  });

  if (!basket) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="flex h-screen w-screen justify-center items-center gap-4">
      <div className={cn(containerClassName)}>
        <h1 className="text-2xl font-bold">Basket</h1>
        <p className="text-sm">This is your basket</p>
      </div>
      <div className={cn(containerClassName)}>sa</div>
    </div>
  );
};

export default BasketPage;
