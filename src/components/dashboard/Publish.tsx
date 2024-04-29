"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import UploadPdf from "./UploadPdf";
import { cn } from "@/lib/utils";
import Info from "./Info";
import { Kreon } from "next/font/google";
import Pricing from "./Pricing";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { reset } from "@/features/upload/uploadBookSlice";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { createClient } from "@/lib/supabase/supabase-client";
import { Loader2Icon } from "lucide-react";
import ItemModalContent from "../home/List/ItemModalContent";

const kreon = Kreon({
  subsets: ["latin"],
});

const Publish = () => {
  const uploadBook = useAppSelector((state) => state.uploadBook);
  const dispatch = useAppDispatch();

  const [bookPdf, setBookPdf] = useState<File | null>(null);

  const supabase = createClient();

  const [step, setStep] = useState<"pdf" | "info" | "pricing" | "preview">(
    "pdf"
  );

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const auth = await supabase.auth.getSession();
      if (!auth.data.session) {
        throw new Error("No session");
      }

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/book`,
        uploadBook,
        {
          headers: {
            Authorization: auth.data.session.access_token,
          },
        }
      );
      const { data, error } = await supabase.storage
        .from("book_pdf")
        .upload(`public/${res.data.book.id}.pdf`, bookPdf!);

      return res.data;
    },
    onSuccess(data) {
      //TODO: Show success message
      console.log(data);
    },
    onError(error) {
      console.error(error);
    },
  });

  const handleContinue = () => {
    if (step === "info") {
      setStep("pricing");
    } else if (step === "pricing") {
      setStep("preview");
    } else if (step === "preview") {
      mutate();
    }
  };

  const handleBack = () => {
    if (step === "pricing") {
      setStep("info");
    } else if (step === "preview") {
      setStep("pricing");
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setStep("pdf");
      dispatch(reset());
    }
  };

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size={"sm"} className='px-10 rounded-2xl text-sm'>
          Publish
        </Button>
      </DialogTrigger>
      <DialogContent className='min-h-[100dvh] md:min-h-[80dvh] min-w-[100dvw] md:min-w-[60dvw]'>
        {step === "pdf" ? (
          <UploadPdf setStep={setStep} setBookPdf={setBookPdf} />
        ) : (
          <div className='w-full h-full flex flex-col p-6'>
            <div className='relative grid grid-cols-3 w-full py-10'>
              <div
                className='flex items-center justify-center p-4 text-sm cursor-pointer hover:bg-white/10 transition-all select-none'
                onClick={() => setStep("info")}
              >
                Info
              </div>
              <div
                className='flex items-center justify-center p-4 text-sm cursor-pointer hover:bg-white/10 transition-all select-none'
                onClick={() => setStep("pricing")}
              >
                Pricing
              </div>
              <div
                className='flex items-center justify-center p-4 text-sm cursor-pointer hover:bg-white/10 transition-all select-none'
                onClick={() => setStep("preview")}
              >
                Preview
              </div>
              <div
                className={cn(
                  "absolute h-2 transition-all bg-white bottom-8 rounded-r-md",
                  {
                    "w-[33.33%]": step === "info",
                    "w-[66.66%]": step === "pricing",
                    "w-full rounded-none": step === "preview",
                  }
                )}
              >
                <span className='sr-only'>Progress</span>
              </div>
            </div>
            <div className='flex-1'>
              {step === "info" ? (
                <Info />
              ) : step === "pricing" ? (
                <Pricing />
              ) : step === "preview" ? (
                <div className='relative'>
                  <div className='absolute inset-0 w-full h-full rounded-md'></div>
                  <ItemModalContent
                    item={{
                      ...uploadBook.infos,
                      categories: uploadBook.categories,
                    }}
                    className='border border-[#A98FCB] rounded-md'
                  />
                </div>
              ) : null}
            </div>
            <div className='flex justify-between mt-10'>
              <h3
                className={cn(
                  "uppercase font-bold opacity-50",
                  kreon.className
                )}
              >
                TELLIGY
              </h3>
              <div className='flex items-center gap-3'>
                <Button
                  size='sm'
                  variant={"ghost"}
                  className={cn("px-10 text-sm", {
                    hidden: step === "info",
                  })}
                  onClick={handleBack}
                >
                  Back
                </Button>
                <Button
                  size='sm'
                  className='px-10 text-sm'
                  onClick={handleContinue}
                >
                  {isPending ? (
                    <Loader2Icon className='animate-spin'></Loader2Icon>
                  ) : step === "preview" ? (
                    "Publish"
                  ) : (
                    "Continue"
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Publish;
