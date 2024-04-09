import Image from "next/image";
import React from "react";

const BookRowItem = () => {
  return (
    <div className="md:p-2">
      <Image
        src={
          Math.random() > 0.5
            ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZCiOHieDam_AeKP1Gm9UM4vPidpNU7g8jJvHqbIbGEg&s"
            : Math.random() > 0.5
            ? "https://img.kitapyurdu.com/v1/getImage/fn:11854637/wh:true/wi:220"
            : "https://img.kitapyurdu.com/v1/getImage/fn:11848216/wh:true/wi:220"
        }
        height={100}
        width={105}
        alt="book"
        className="object-cover rounded-lg w-full aspect-[9/16]"
      />
    </div>
  );
};

export default BookRowItem;
