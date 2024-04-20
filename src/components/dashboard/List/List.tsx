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
      image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: 450,
      currency: "TRY",
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
