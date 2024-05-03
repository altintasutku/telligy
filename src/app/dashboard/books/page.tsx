"use client";

import Item from "@/components/dashboard/MyBooks/Item";
import { createClient } from "@/lib/supabase/supabase-client";
import { Book } from "@/types/Book";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import React from "react";

const DashboardBooksPage = () => {
  const supabase = createClient();

  const { data, error, isLoading } = useQuery({
    queryKey: ["books", "mybooks"],
    queryFn: async () => {
      const auth = await supabase.auth.getSession();
      if (!auth) {
        return;
      }

      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/book/my-published`,
        {
          headers: {
            Authorization: auth.data.session?.access_token,
          },
        }
      );

      return data as Book[];
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-semibold mb-10">My Books</h1>
      <ul className="flex flex-col gap-4">
        {data?.map((book) => (
          <li key={book.id}>
            <Item book={book} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardBooksPage;
