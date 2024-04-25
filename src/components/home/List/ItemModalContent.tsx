import { Button, buttonVariants } from "@/components/ui/button";
import UserIcon from "@/components/UserIcon";
import { PlusIcon, ShoppingBasketIcon, StarIcon } from "lucide-react";
import Image from "next/legacy/image";
import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";
import { ListItem } from "./Item";

type Props = Readonly<{
  item: ListItem;
  className?: string;
}>;

const ItemModalContent = ({ item, className }: Props) => {
  return (
    <div className={cn("w-full h-full flex flex-col", className)}>
      <Image
        src={
          "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        alt="Banner"
        height={500}
        width={800}
        className="w-full max-h-72 rounded-t-md object-cover"
      />
      <div className="flex-1 flex">
        <div className="flex flex-col h-full gap-4 p-3">
          <div className="relative flex-1 flex flex-col">
            <Image
              src={
                "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              alt={item.title}
              width={200}
              height={300}
              className="rounded-md shadow-md h-full object-cover absolute -top-1/2 border border-white"
            />
            <div className="flex-1"></div>
          </div>
          <div className="flex-1 flex flex-col gap-3 pt-10">
            <Link href={"/read?b=35"} className={buttonVariants()}>
              <ShoppingBasketIcon className="mr-2" /> Purchase
            </Link>
            <Button variant={"secondary"}>
              <PlusIcon className="mr-2" /> Add To List
            </Button>
          </div>
        </div>
        <div className="w-full p-3">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{item.title}</h2>
            <span className="flex items-center">
              4.0 / <StarIcon size={16} className="ml-1" />
            </span>
          </div>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Author</h2>
            <div className="flex gap-2">
              <span className={cn("font-bold hidden text-green-400",{
                "inline-block": item.discount > 0,
              })}>
                {item.price * (100 - item.discount) / 100} {item.currency}
              </span>
              <span className={cn("flex items-center",{
                "line-through opacity-65": item.discount > 0,
              })}>
                {item.price} {item.currency}
              </span>
            </div>
          </div>
          <br />
          <h3 className="text-slate-500">About</h3>
          <p>{item.description}</p>
          <br />
          <small className="text-sm">
            <span className="text-slate-500">Topics:</span> Science, Fiction,
            Fantasy
          </small>
          <br />
          <small className="text-sm text-slate-500">Comments:</small>
          <div className="flex bg-[#252525] rounded-lg p-2 m-1 gap-2">
            <UserIcon size={40} />
            <div className="flex-1 flex flex-col">
              <span className="font-semibold">John Doe</span>
              <small className="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum,
                quisquam.
              </small>
            </div>
            <span className="flex items-center">
              4.0 / <StarIcon size={16} className="ml-1" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemModalContent;
