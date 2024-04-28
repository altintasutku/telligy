import List from "@/components/home/List/List";
import { createClient } from "@/lib/supabase/supabase-server";
import axios from "axios";
import { redirect } from "next/navigation";
import React from "react";

export const dynamic = "force-dynamic"

const PurchasedPage = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  const auth = await supabase.auth.getSession();

  const myBooks = await axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/book/my-books`, {
      headers: {
        Authorization: auth.data.session?.access_token,
      },
    })
    .then((res) => {
      return res.data as SelectBook[];
    })
    .catch((err) => {
      console.log(err);
      return [];
    });

  return (
    <section className="pt-32">
      <List title="My Books" list={myBooks} />
    </section>
  );
};

export default PurchasedPage;
