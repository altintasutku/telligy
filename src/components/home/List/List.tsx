import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";
import Item from "./Item";
import axios from "axios";
import { createClient } from "@/lib/supabase/supabase-server";

const List = async () => {
  const auth = await createClient().auth.getSession();

  const allBooks = await axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/book`, {
      headers: {
        Authorization: auth.data.session?.access_token,
      },
    })
    .then((res) => {
      return res.data as SelectBook[];
    });

  return (
    <div className='w-screen'>
      <h2 className='m-5 font-bold text-2xl -mb-10'>List Title</h2>
      <Carousel
        opts={{
          align: "start",
        }}
        className='w-full'
      >
        <CarouselContent>
          {allBooks.map((book, index) => (
            <Item key={index} index={index} item={book} />
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default List;
