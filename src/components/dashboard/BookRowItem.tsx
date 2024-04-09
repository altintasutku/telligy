import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import img from "@/images/sample_image.png";
import {
  ArrowDownIcon,
  BookOpenTextIcon,
  PlayCircleIcon,
  PlayIcon,
  PlusIcon,
} from "lucide-react";

const BookRowItem = () => {
  const imageSource =
    Math.random() > 0.5
      ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZCiOHieDam_AeKP1Gm9UM4vPidpNU7g8jJvHqbIbGEg&s"
      : Math.random() > 0.5
      ? "https://img.kitapyurdu.com/v1/getImage/fn:11854637/wh:true/wi:220"
      : img;

  return (
    <div className="relative h-80">
      <Image
        src={imageSource}
        layout="fill"
        alt="book"
        className="object-cover absolute rounded-lg"
      />

      <div className="h-[22rem] flex flex-col relative z-10 w-full transform transition duration-500 delay-300 cursor-pointer hover:scale-125 opacity-0 hover:opacity-100 bg-[#141414] shadow-lg rounded overflow-hidden">
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

        <div className=" flex-1 flex items-end justify-between p-1">
          <small className="text-[0.75rem] text-gray-400">
            TRY 450,00
          </small>
          
        </div>
      </div>
    </div>
  );
};

export default BookRowItem;
