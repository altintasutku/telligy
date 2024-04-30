"use client";

import { Button } from "@/components/ui/button";
import UserIcon from "@/components/UserIcon";
import { PlusIcon, StarIcon } from "lucide-react";
import Image from "next/legacy/image";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ListItem } from "./Item";
import PurchaseBookButton from "../PurchaseBookButton";
import Link from "next/link";
import { createClient } from "@/lib/supabase/supabase-client";
import { Skeleton } from "@/components/ui/skeleton";

type Props = Readonly<{
  item: ListItem;
  className?: string;
}>;

const ItemModalContent = ({ item, className }: Props) => {
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

  const [banner, setBanner] = useState<string | null>(null);
  useEffect(() => {
    if (banner) return;

    const fetchBanner = async () => {
      const { data } = await supabase.storage
        .from("book_banner")
        .download(`public/${item.id}`);

      if (data) {
        const url = URL.createObjectURL(data);
        setBanner(url);
      }
    };

    fetchBanner();
  }, [banner]);

  return (
    <div className={cn("w-full h-full grid grid-rows-2", className)}>
      {banner ? (
        <Image
          src={banner}
          alt="Banner"
          height={256}
          width={1000}
          className="w-full h-full rounded-t-md object-cover"
        />
      ) : (
        <Skeleton className="w-full h-full rounded-t-md" />
      )}
      <div className="flex-1 grid grid-cols-4 grid-rows-2 gap-3 p-3">
        <div className="relative flex row-span-1 col-span-1 flex-col">
          <div className="w-full h-[150%] absolute -top-1/2">
            {cover ? (
              <Image
                src={cover}
                alt={item.title}
                layout="fill"
                className="rounded-md object-contain border border-white w-full h-full"
              />
            ) : (
              <Skeleton className="rounded-md shadow-md h-full w-full" />
            )}
          </div>
        </div>
        <div className="w-full p-3 col-span-3 row-span-2">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{item.title}</h2>
            <span className="flex items-center">
              4.0 / <StarIcon size={16} className="ml-1" />
            </span>
          </div>
          <div className="flex justify-between items-center">
            <Link href={"http://localhost:3000/profile/2"}>
              <h2 className="text-lg font-semibold">Author</h2>
            </Link>
            <div className="flex gap-2">
              <span
                className={cn("font-bold hidden text-green-400", {
                  "inline-block": item.discount > 0,
                })}
              >
                {(item.price * (100 - item.discount)) / 100} {item.currency}
              </span>
              <span
                className={cn("flex items-center", {
                  "line-through opacity-65": item.discount > 0,
                })}
              >
                {item.price} {item.currency}
              </span>
            </div>
          </div>
          <br />
          <h3 className="text-slate-500">About</h3>
          <p>{item.description}</p>
          <br />
          <small className="text-sm">
            <span className="text-slate-500">Categories:</span> Fantasy, Fiction
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
        <div className="flex flex-col gap-3 pt-10 col-span-1 row-span-1">
          <PurchaseBookButton id={item.id} />
          <Button variant={"secondary"}>
            <PlusIcon className="sm:mr-2" /> <span className="hidden sm:block">Add To List</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ItemModalContent;
