import List from "@/components/home/List/List";
import { createClient } from "@/lib/supabase/supabase-server";
import { Book } from "@/types/Book";
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
      return res.data as Book[];
    })
    .catch((err) => {
      console.log(err);
      return [];
    });

  return (
    <div className='pt-32'>
      <List title='Category' list={allBooks} />
    </div>
  );
};

export default CategoryPage;
