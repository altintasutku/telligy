"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import UploadPdf from "./UploadPdf";
import { cn } from "@/lib/utils";
import Info from "./Info";
import { Kreon } from "next/font/google";
import Pricing from "./Pricing";

const kreon = Kreon({
  subsets: ["latin"],
});

const Publish = () => {
  const [infos, setInfos] = useState<{
    name: string;
    description: string;
    tags: string[];
    price: number;
    discount: number;
  }>({
    name: "",
    description: "",
    tags: [],
    price: 0,
    discount: 0,
  });
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const [step, setStep] = useState<"pdf" | "info" | "pricing" | "preview">(
    "pdf"
  );

  const handleContinue = () => {
    if (step === "info") {
      setStep("pricing");
    } else if (step === "pricing") {
      setStep("preview");
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
      setInfos({
        name: "",
        description: "",
        tags: [],
        price: 0,
        discount: 0,
      });
      setPdfFile(null);
    }
  };

  return (
    <Dialog onOpenChange={handleOpenChange}>
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
                <Info infos={infos} setInfos={setInfos} />
              ) : step === "pricing" ? (
                <Pricing infos={infos} setInfos={setInfos} />
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
              <div className="flex items-center gap-3">
                <Button
                  size="sm"
                  variant={"ghost"}
                  className={cn("px-10 text-sm", {
                    hidden: step === "info",
                  })}
                  onClick={handleBack}
                >
                  Back
                </Button>
                <Button
                  size="sm"
                  className="px-10 text-sm"
                  onClick={handleContinue}
                >
                  {step === "preview" ? "Publish" : "Continue"}
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
