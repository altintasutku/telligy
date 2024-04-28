import { createClient } from "@/lib/supabase/supabase-server";
import axios from "axios";
import React from "react";

const CategoryPage = async ({ params }: { params: { categoryId: string } }) => {
  const auth = await createClient().auth.getSession();

  const allBooks = await axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/category/${params.categoryId}`, {
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
    <div>
      <h1>
        {allBooks.map((book) => (
          <div key={book.id}>
            <pre>{JSON.stringify(allBooks, null, 2)}</pre>
          </div>
        ))}
      </h1>
    </div>
  );
};

export default CategoryPage;
