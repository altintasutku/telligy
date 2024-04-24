"use client";

import { CarouselItem } from "@/components/ui/carousel";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  ArrowDownIcon,
  BookOpenTextIcon,
  PlusIcon,
  StarIcon,
} from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Link from "next/link";
import ItemModalContent from "./ItemModalContent";
import { UploadBookState } from "@/features/upload/uploadBookSlice";

type Props = Readonly<{
  index: number;
  item: SelectBook;
}>;

export type ListItem = UploadBookState["infos"] & {
  categories: UploadBookState["categories"];
};

const Item = ({ index, item }: Props) => {
  return (
    <CarouselItem key={index} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6">
      <Dialog>
        <div className="relative h-80 cursor-pointer group">
          <DialogTrigger>
            <Image
              src={"https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
              alt={item.title}
              layout="fill"
              objectFit="cover"
              className="absolute inset-0 w-full h-full rounded-md"
            />
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
            <Image
              src={"https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
              alt={item.title}
              height={600}
              width={400}
              className="w-full h-[75%] rounded-t-md object-cover"
            />
            <div className="flex justify-between p-2">
              <div className="flex gap-2">
                <Link href={"/read?b="+item.id}>
                  <div className="bg-white aspect-square rounded-full p-2 flex justify-center items-center">
                    <BookOpenTextIcon size={14} color="#141414" />
                    <span className="sr-only">Read</span>
                  </div>
                </Link>
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
          <ItemModalContent item={{...item,categories:[]}} /> 
        </DialogContent>
      </Dialog>
    </CarouselItem>
  );
};

export default Item;
