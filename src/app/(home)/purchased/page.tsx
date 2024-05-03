"use client";

import Item from "@/components/home/List/Item";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { createClient } from "@/lib/supabase/supabase-client";
import { Book } from "@/types/Book";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const PurchasedPage = () => {
  const [query, setQuery] = React.useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["book", "mybooks", query],
    queryFn: async () => {
      const auth = await createClient().auth.getSession();

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/book/my-books`,
        {
          headers: {
            Authorization: auth.data.session?.access_token,
          },
        }
      );
      return response.data as Book[];
    },
  });

  return (
    <section className="pt-32 p-10">
      {/* <Input
        placeholder="search your books here"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      /> */}

      <h1 className="text-3xl font-bold">My Library</h1>

      <ul className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 py-10 gap-4">
        {isLoading
          ? Array.from({ length: 25 }).map((_, index) => (
              <Skeleton key={index} className="w-full h-full" />
            ))
          : null}

        {data &&
          data.map((book, index) => (
            <div key={book.id} className="h-full w-full">
              <Item item={book} index={index} />
            </div>
          ))}
      </ul>
    </section>
  );
};

export default PurchasedPage;
