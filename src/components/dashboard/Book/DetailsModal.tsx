"use client";

import Image from "next/legacy/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import img from "@/images/sample_image.png";

const DetailsModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsOpen(searchParams.get("book-id") !== null);
  }, [searchParams]);

  if (!isOpen) return <></>;

  const closeModal = () => {
  }

  return (
    <dialog
      className="absolute inset-0 w-screen h-screen z-50 bg-black/70 flex justify-center items-center"
      open={isOpen}
      onClick={closeModal}
    >
      <div
        className="bg-[#141414]"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        inner
      </div>
    </dialog>
  );
};

export default DetailsModal;
