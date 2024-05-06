"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { createClient } from "@/lib/supabase/supabase-client";
import { Book } from "@/types/Book";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Item = ({ book }: { book: Book }) => {
  const supabase = createClient();

  const [cover, setCover] = useState<string | null>(null);
  useEffect(() => {
    if (cover) return;

    const fetchCover = async () => {
      const { data } = await supabase.storage
        .from("book_cover")
        .download(`public/${book.id}`);

      if (data) {
        const url = URL.createObjectURL(data);
        setCover(url);
      }
    };

    fetchCover();
  }, [cover]);

  return (
    <div className="border-b border-b-white py-1 flex gap-4 flex-col sm:flex-row">
      {cover ? (
        <Image
          src={cover}
          alt={book.title}
          height={200}
          width={150}
          objectFit="contain"
          className="w-full sm:w-24 h-32 rounded-md object-contain border border-white"
        />
      ) : (
        <Skeleton className="w-24 h-32 rounded-md" />
      )}
      <div className="flex-1">
        <h2 className="text-lg font-semibold">{book.title}</h2>
        <p>{book.description}</p>
        <div className="font-semibold">{book.price} {book.currency}</div>
        {book.discount > 0 && (
            <div className="text-red-500">{book.discount}% off</div>
        )}
      </div>
      <div className="flex items-center gap-2 justify-center">
        <Button>
          Analytics
        </Button>
        <Button>
          Edit
        </Button>
        <Button variant="destructive">
          Delete
        </Button>
      </div>
    </div>
  );
};

export default Item;
