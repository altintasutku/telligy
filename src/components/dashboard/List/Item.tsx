"use client";

import { CarouselItem } from "@/components/ui/carousel";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  ArrowDownIcon,
  BookOpenTextIcon,
  PlusIcon,
  ShoppingBasketIcon,
  StarIcon,
} from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import UserIcon from "@/components/UserIcon";
import Link from "next/link";

type Props = Readonly<{
  index: number;
  item: ListItem;
}>;

export type ListItem = {
  id: string;
  title: string;
  image: string;
  price: number;
  currency: string;
};

const Item = ({ index, item }: Props) => {
  return (
    <CarouselItem key={index} className="basis-1/5">
      <Dialog>
        <div className="relative h-80 cursor-pointer group">
          <DialogTrigger>
            <Image
              src={item.image}
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
              src={item.image}
              alt={item.title}
              height={600}
              width={400}
              className="w-full h-[75%] rounded-t-md object-cover"
            />
            <div className="flex justify-between p-2">
              <div className="flex gap-2">
                <Link href={"/read?b=35"}>
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
        <DialogContent className="flex flex-col min-w-[70dvw] h-[80dvh]">
          <Image
            src={
              "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt="Banner"
            height={500}
            width={800}
            className="w-full h-[35%] rounded-t-md object-cover"
          />
          <div className="h-full">
            <div className="flex h-[30%]">
              <div className="flex flex-col p-3 gap-4">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={200}
                  height={300}
                  className="rounded-md shadow-md h-52 object-cover"
                />
                <Link href={"/read?b=35"} className={buttonVariants()}>
                  <ShoppingBasketIcon className="mr-2" /> Purchase
                </Link>
                <Button variant={"secondary"}>
                  <PlusIcon className="mr-2" /> Add To List
                </Button>
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
                  <span className="flex items-center">
                    {item.price} {item.currency}
                  </span>
                </div>
                <br />
                <h3 className="text-slate-500">About</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Facilis commodi error voluptate hic quos suscipit aperiam
                  magni illum nobis fugit voluptas deleniti praesentium nam,
                  impedit quo, doloremque ex aliquid cum. Blanditiis cumque sed
                  quam temporibus perspiciatis? Quam nostrum possimus velit,
                  ratione nihil quibusdam. Reiciendis nulla quos, voluptatem
                  tempore ipsam quisquam!
                </p>
                <br />
                <small className="text-sm">
                  <span className="text-slate-500">Topics:</span> Science,
                  Fiction, Fantasy
                </small>
                <br />
                <small className="text-sm text-slate-500">Comments:</small>
                <div className="flex bg-[#252525] rounded-lg p-2 m-1 gap-2">
                  <UserIcon size={40} />
                  <div className="flex-1 flex flex-col">
                    <span className="font-semibold">John Doe</span>
                    <small className="text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Rerum, quisquam.
                    </small>
                  </div>
                  <span className="flex items-center">
                    4.0 / <StarIcon size={16} className="ml-1" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </CarouselItem>
  );
};

export default Item;
