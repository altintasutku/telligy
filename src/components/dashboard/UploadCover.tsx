"use client";

import { UploadIcon } from "lucide-react";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

type Props = Readonly<{
  setCoverFile: React.Dispatch<React.SetStateAction<File | null>>;
}>;

const UploadCover = ({setCoverFile}:Props) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0].type !== "image/jpeg" && acceptedFiles[0].type !== "image/png" && acceptedFiles[0].type !== "image/jpg") {
      alert("Please upload a image file");
      return;
    }

    setCoverFile(acceptedFiles[0] as File); // TODO: upload the file to the server and add progress bar
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/*": [".jpg", ".jpeg", ".png"],
    },
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <div className="w-36 h-full">
          <div className="w-full h-full flex items-center justify-center flex-col gap-4 bg-[#A98FCB] bg-opacity-30 border border-dashed border-[#A98FCB]">
            <UploadIcon size={20} />
            <p>Drop your image</p>
          </div>
        </div>
      ) : (
        <div className="w-36 h-full">
          <div className="w-full h-full flex items-center justify-center flex-col gap-4 bg-[#A98FCB] bg-opacity-30 border border-dashed border-[#A98FCB] cursor-pointer">
            <p className="text-center">
              Drag and drop your <b>COVER</b> image or click here
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadCover;