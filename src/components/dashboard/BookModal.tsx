"use client";

import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const BookModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const params = useSearchParams();

  useEffect(() => {
    setIsOpen(params.get("book-id") !== null);
  }, []);

  if (!isOpen) return <></>;

  return (
    <dialog
      className="absolute inset-0 w-screen h-screen z-50 bg-black/70 flex justify-center items-center"
      open={isOpen}
    >
      <div className="bg-[#141414]">inner</div>
    </dialog>
  );
};

export default BookModal;
