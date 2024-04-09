import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import BookRowItem from "./BookRowItem";

const BookRow = ({title}:{title:string}) => {
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-semibold ml-12">{title}</h2>
      <div className="px-16 lg:px-24 my-4">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {Array.from({ length: 22 }).map((_, index) => (
              <CarouselItem key={index} className="basis-1/3 md:basis-[26%] lg:basis-[13%]">
                <BookRowItem />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default BookRow;