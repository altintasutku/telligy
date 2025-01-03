"use client";

import { createClient } from "@/lib/supabase/supabase-client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Trash2Icon } from "lucide-react";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";

const BasketItem = ({
  item,
  index,
  removeItem,
}: {
  item: any;
  index: number;
  removeItem: (index: number) => void;
}) => {
  const supabase = createClient();

  const [cover, setCover] = useState<string | null>(null);
  useEffect(() => {
    if (cover) return;

    const fetchCover = async () => {
      const { data } = await supabase.storage
        .from("book_cover")
        .download(`public/${item.id}`);

      if (data) {
        const url = URL.createObjectURL(data);
        setCover(url);
      }
    };

    fetchCover();
  }, [cover]);

  const { mutate: remove } = useMutation({
    mutationFn: async () => {
      const supabase = createClient();
      const auth = await supabase.auth.getSession();
      if (!auth.data.session) {
        throw new Error("No session");
      }

      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/basket/remove-item/${item.id}`,
        {
          headers: {
            Authorization: auth.data.session.access_token,
          },
        }
      );

      return data;
    },
    onSuccess() {
      removeItem(index);
    },
  });

  return (
    <li
      key={item.id}
      className="flex gap-2 hover:bg-slate-200 px-4 py-2 transition even:bg-slate-100 border-b border-b-slate-400 group"
    >
      <span className="flex items-center font-bold text-xl w-6 justify-center hover:text-red-500">
        <span className="inline-block group-hover:hidden">{index + 1}</span>
        <button
          onClick={() => remove()}
          className="hidden group-hover:inline-block cursor-pointer"
        >
          <Trash2Icon />
        </button>
      </span>
      <div>
        {cover ? (
              <Image
                src={cover}
                alt={item.title}
                height={200}
                width={150}
                className="w-24 h-32 rounded-md"
              />
            ) : (
              <Skeleton
              className="w-24 h-32 rounded-md" />
            )}
      </div>
      <div className="flex-1">
        <h2 className="text-lg font-bold">{item.title}</h2>
        <p className="opacity-90">{item.author}</p>
        <p>{item.description}</p>
      </div>
      <div className="flex flex-col font-bold text-lg text-nowrap justify-end">
        {item.price} {item.currency}
      </div>
    </li>
  );
};

export default BasketItem;
