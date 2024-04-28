import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";
import Item from "./Item";

const List = async ({ list,title }: { list: SelectBook[], title: string }) => {

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
            <Item key={index} index={index} item={item} />
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default List;
