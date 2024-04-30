import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";
import Item from "./Item";

const List = async ({ list, title }: { list: SelectBook[]; title: string }) => {
  return (
    <div className="w-[95dvw] flex flex-col">
      <h2 className="m-5 font-bold text-2xl -mb-10 text-start">{title}</h2>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {list.map((item, index) => (
            <CarouselItem
              key={index}
              className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
            >
              <Item key={index} index={index} item={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default List;
