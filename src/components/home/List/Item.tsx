"use client";

import { CarouselItem } from "@/components/ui/carousel";
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/legacy/image";
import { ArrowDownIcon, PlusIcon, StarIcon } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ItemModalContent from "./ItemModalContent";
import { UploadBookState } from "@/features/upload/uploadBookSlice";
import PurchaseBookButton from "../PurchaseBookButton";
import { createClient } from "@/lib/supabase/supabase-client";
import { Skeleton } from "@/components/ui/skeleton";
import { useIntersectionObserver } from "usehooks-ts";
import { Book } from "@/types/Book";

type Props = Readonly<{
  index: number;
  item: Book;
}>;

// export type ListItem = UploadBookState["infos"] & {
//   categories: UploadBookState["categories"];
// };

const Item = ({ index, item }: Props) => {
  const supabase = createClient();

  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.5,
  });

  const [cover, setCover] = useState<string | null>(null);
  useEffect(() => {
    if (cover || !isIntersecting) return;

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
  }, [isIntersecting]);

  return (
    <Dialog>
      <div
        className="relative h-80 cursor-pointer group bg-[#141414] rounded-md"
        ref={ref}
      >
        <DialogTrigger>
          {cover ? (
            <Image
              src={cover}
              alt={item.title}
              layout="fill"
              objectFit="contain"
              className="absolute inset-0 w-full h-full rounded-md object-contain"
            />
          ) : (
            <Skeleton className="absolute inset-0 w-full h-full rounded-md" />
          )}
        </DialogTrigger>

        <motion.div
          initial={{
            scale: "100%",
          }}
          whileHover={{
            scale: "125%",
          }}
          className="relative opacity-0 group-hover:opacity-100 -z-10 group-hover:z-10 flex flex-col h-full w-full transition-opacity bg-[#141414] scale-125 rounded-md"
        >
          {cover ? (
            <Image
              src={cover}
              alt={item.title}
              height={600}
              width={400}
              objectFit="contain"
              className="w-full h-[75%] rounded-t-md object-contain"
            />
          ) : (
            <Skeleton className="w-full h-[75%] rounded-t-md" />
          )}
          <div className="flex justify-between p-2">
            <div className="flex gap-2">
              <PurchaseBookButton id={item.id} small />
              <div className="border border-slate-200 aspect-square rounded-full p-2 flex justify-center items-center">
                <PlusIcon size={14} color="white" />
                <span className="sr-only">Add to list</span>
              </div>
            </div>
            <div className="flex gap-2">
              <DialogTrigger>
                <div className="border border-slate-200 aspect-square rounded-full p-2 flex justify-center items-center">
                  <ArrowDownIcon size={14} color="white" />
                  <span className="sr-only">Details</span>
                </div>
              </DialogTrigger>
            </div>
          </div>
          <div className="flex justify-between items-center p-2 pt-0">
            <small className="text-white">
              {item.price} {item.currency}
            </small>
            <small className="flex items-center">
              4.0 / <StarIcon size={14} className="ml-1" />
            </small>
          </div>
        </motion.div>
      </div>
      <DialogContent className="flex flex-col min-w-[100dvw] md:min-w-[70dvw] h-screen md:h-[80dvh]">
        {/* TODO */}
        <ItemModalContent item={item} />
      </DialogContent>
    </Dialog>
  );
};

export default Item;
