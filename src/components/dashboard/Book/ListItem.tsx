"use client";

import Image from "next/legacy/image";
import React from "react";
import img from "@/images/sample_image.png";
import {
  ArrowDownIcon,
  BookOpenTextIcon,
  PlusIcon,
  StarIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const BookRowItem = () => {
  const imageSource =
    Math.random() > 0.5
      ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZCiOHieDam_AeKP1Gm9UM4vPidpNU7g8jJvHqbIbGEg&s"
      : Math.random() > 0.5
      ? "https://img.kitapyurdu.com/v1/getImage/fn:11854637/wh:true/wi:220"
      : img;
      
  const router = useRouter();
  const pathname = usePathname();

  const handleBookItemClick = async (bookId: number) => {};

  const variants = {
    default: {
      opacity: 0,
      scale: "100%",
      zIndex: 10,
    },
    hover: {
      opacity: 1,
      scale: "125%",
    },
  };

  return (
    <div className="relative h-80 group">
      <Image
        src={imageSource}
        layout="fill"
        alt="book"
        className="object-cover absolute rounded-lg"
        onClick={() => handleBookItemClick(0)}
      />

      <motion.div
        variants={variants}
        initial={"default"}
        whileHover={"hover"}
        transition={{
          delay: 0.3,
        }}
        onClick={() => handleBookItemClick(0)}
        className="flex h-[22rem] flex-col relative w-full cursor-pointer bg-[#141414] shadow-lg rounded overflow-hidden"
      >
        <Image
          src={imageSource}
          height={500}
          width={300}
          alt="book"
          className="object-cover w-full h-[80%] -z-10"
        />
        <div className="flex px-2 pt-3 justify-between">
          <div className="flex gap-2">
            <div className="rounded-full flex items-center justify-center aspect-square bg-white p-2 cursor-pointer hover:bg-white/65 transition-colors">
              <BookOpenTextIcon size={14} color="#141414" />
            </div>
            <div className="rounded-full flex items-center justify-center aspect-square bg-[#181818] p-2 cursor-pointer hover:bg-[#202020] border border-white transition-colors">
              <PlusIcon size={14} color="white" />
            </div>
          </div>
          <div>
            <div className="rounded-full flex items-center justify-center aspect-square bg-[#181818] p-2 cursor-pointer hover:bg-[#202020] border border-white transition-colors">
              <ArrowDownIcon size={14} color="white" />
            </div>
          </div>
        </div>

        <div className=" flex-1 flex items-end justify-between p-1 text-gray-400">
          <small className="text-[0.75rem] ">TRY 450,00</small>
          <div className="flex items-center gap-1">
            <small>4/5</small>
            <StarIcon size={16} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BookRowItem;
