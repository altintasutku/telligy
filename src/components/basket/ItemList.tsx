"use client";

import React, { useState } from "react";
import BasketItem from "./BasketItem";
import { Button } from "../ui/button";
import { Trash2Icon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/supabase-client";
import axios from "axios";

const ItemList = ({ items }: { items: any[] }) => {
  const [list, setList] = useState(items);

  const removeItem = (index: number) => {
    const newList = [...list];
    newList.splice(index, 1);
    setList(newList);
  };

  const { mutate: clear, isPending: isClearing } = useMutation({
    mutationFn: async () => {
      const supabase = createClient();
      const auth = await supabase.auth.getSession();
      if (!auth.data.session) {
        throw new Error("No session");
      }

      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/basket/clear`,
        {
          headers: {
            Authorization: auth.data.session.access_token,
          },
        }
      );

      return data;
    },
    onSuccess() {
      setList([]);
    },
  });

  return (
    <>
      <ul className="mt-5 py-4">
        {list.map((item, index) => (
          <BasketItem
            item={item}
            index={index}
            key={item.id}
            removeItem={removeItem}
          />
        ))}
      </ul>

      <div className="p-4 flex justify-end">
        <Button
          variant={"destructive"}
          onClick={() => clear()}
          disabled={isClearing}
        >
          <Trash2Icon size={18} className="mr-2" />
          <span>clear basket</span>
        </Button>
      </div>
    </>
  );
};

export default ItemList;
