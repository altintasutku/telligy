"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import UploadPdf from "./UploadPdf";
import { cn } from "@/lib/utils";
import Info from "./Info";
import { Kreon } from "next/font/google";

const kreon = Kreon({
  subsets: ["latin"],
});

const Publish = () => {
  const [infos, setInfos] = useState({});
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const [step, setStep] = useState<"pdf" | "info" | "pricing" | "preview">(
    "pdf"
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"} className="px-10 rounded-2xl text-sm">
          Publish
        </Button>
      </DialogTrigger>
      <DialogContent className="min-h-[80dvh] min-w-[60dvw]">
        {step === "pdf" ? (
          <UploadPdf setPdfFile={setPdfFile} setStep={setStep} />
        ) : (
          <div className="w-full h-full flex flex-col p-6">
            <div className="relative grid grid-cols-3 w-full py-10">
              <div
                className="flex items-center justify-center p-4 text-sm cursor-pointer hover:bg-white/10 transition-all select-none"
                onClick={() => setStep("info")}
              >
                Info
              </div>
              <div
                className="flex items-center justify-center p-4 text-sm cursor-pointer hover:bg-white/10 transition-all select-none"
                onClick={() => setStep("pricing")}
              >
                Pricing
              </div>
              <div
                className="flex items-center justify-center p-4 text-sm cursor-pointer hover:bg-white/10 transition-all select-none"
                onClick={() => setStep("preview")}
              >
                Preview
              </div>
              <div
                className={cn(
                  "absolute h-2 transition-all bg-white bottom-8 rounded-r-md",
                  {
                    "w-[33%]": step === "info",
                    "w-[66%]": step === "pricing",
                    "w-full rounded-none": step === "preview",
                  }
                )}
              >
                <span className="sr-only">Progress</span>
              </div>
            </div>
            <div className="flex-1">
              {step === "info" ? (
                <Info />
              ) : step === "pricing" ? (
                <div></div>
              ) : step === "preview" ? (
                <div></div>
              ) : null}
            </div>
            <div className="flex justify-between mt-10">
              <h3
                className={cn(
                  "uppercase font-bold opacity-50",
                  kreon.className
                )}
              >
                TELLIGY
              </h3>
              <Button size="sm" className="px-10 text-sm">
                Continue
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Publish;
