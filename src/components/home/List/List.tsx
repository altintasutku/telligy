import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";
import Item, { ListItem } from "./Item";

const List = () => {
  const items: ListItem[] = Array.from({ length: 25 }).map((_, index) => {
    return {
      id: index.toString(),
      title: `Item ${index + 1}`,
      price: 450,
      currency: "TRY",
      description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos, sequi.",
      banner: "",
      discount: 10,
      pdf: "",
      cover: "",
      pageCount: 28,
      categories: [],
    };
  });

  return (
    <div className="w-screen">
      <h2 className="m-5 font-bold text-2xl -mb-10">List Title</h2>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {items.map((item, index) => (
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
