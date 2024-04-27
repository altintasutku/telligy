"use client";

import React from "react";
import BasketItem from "./BasketItem";
import { Button } from "../ui/button";
import { Trash2Icon } from "lucide-react";

const ItemList = ({ items }: { items: any[] }) => {
  const [list, setList] = React.useState(items);

  const removeItem = (index: number) => {
    const newList = [...list];
    newList.splice(index, 1);
    setList(newList);
  };

  const clearBasket = () => {
    setList([]);
  }

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
        <Button variant={"destructive"} onClick={clearBasket}>
          <Trash2Icon size={18} className="mr-2" />
          <span>clear basket</span>
        </Button>
      </div>
    </>
  );
};

export default ItemList;
