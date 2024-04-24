"use client";

import React, { useCallback } from "react";
import {
  useDropzone,
} from "react-dropzone";
import { buttonVariants } from "../ui/button";
import { UploadIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setProperty } from "@/features/upload/uploadBookSlice";

type Props = Readonly<{
  setStep: (step: "pdf" | "info" | "pricing" | "preview") => void;
  setBookPdf: React.Dispatch<React.SetStateAction<File | null>>
}>;

const UploadPdf = ({setStep,setBookPdf}: Props) => {
  const dispatch = useAppDispatch();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0].type !== "application/pdf") {
      alert("Please upload a PDF file");
      return;
    }

    dispatch(setProperty({ key: "pdf", value: "pdfFileId" }));
    setBookPdf(acceptedFiles[0]);
    setStep("info");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "application/pdf": [".pdf"],
    },
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <div className="w-full h-full p-20">
          <div className="w-full h-full flex items-center justify-center flex-col gap-4 bg-[#A98FCB] bg-opacity-30 border border-dashed border-[#A98FCB]">
            <UploadIcon size={64} />
            <h2>Upload Your Book</h2>
            <div
              className={cn(
                "bg-[#A98FCB] hover:bg-[#55446b] text-white",
                buttonVariants()
              )}
            >
              Upload
            </div>
            <p>Drag and drop your PDF file here</p>
          </div>
        </div>
      ) : (
        <div className="w-full h-full p-20">
          <div className="w-full h-full flex items-center justify-center flex-col gap-4 bg-opacity-30 border border-dashed cursor-pointer hover:">
            <UploadIcon size={64} />
            <h2>Upload Your Book</h2>
            <div
              className={cn(
                "bg-[#A98FCB] hover:bg-[#55446b] text-white",
                buttonVariants()
              )}
            >
              Upload
            </div>
            <p>Drag and drop your PDF file here</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadPdf;
