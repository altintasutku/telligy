"use client";

import { setProperty } from "@/features/upload/uploadBookSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { UploadIcon } from "lucide-react";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

type Props = Readonly<{
  setBanner: React.Dispatch<React.SetStateAction<File | null>>;
  banner: File | null;
}>;

const UploadBanner = ({banner,setBanner}: Props) => {
  const dispatch = useAppDispatch();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0].type !== "image/jpeg" && acceptedFiles[0].type !== "image/png" && acceptedFiles[0].type !== "image/jpg") {
      alert("Please upload a image file");
      return;
    }

    // TODO: upload the file to the server and add progress bar
    dispatch(setProperty({ key: "banner", value: acceptedFiles[0].type.split("/")[1] }));
    setBanner(acceptedFiles[0]);
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
      {banner ?
        <div className="w-full h-48">
          <img
            src={URL.createObjectURL(banner)}
            alt="banner"
            className="w-full h-full object-cover"
          />
        </div>
      : isDragActive ? (
        <div className="w-full h-48">
          <div className="w-full h-full flex items-center justify-center flex-col gap-4 bg-[#A98FCB] bg-opacity-30 border border-dashed border-[#A98FCB]">
            <UploadIcon size={20} />
            <p>Drop your file</p>
          </div>
        </div>
      ) : (
        <div className="w-full h-48">
          <div className="w-full h-full flex items-center justify-center flex-col gap-4 bg-[#A98FCB] bg-opacity-30 border border-dashed border-[#A98FCB] cursor-pointer">
            <p>Drag and drop your <b>BANNER</b> image or click here</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadBanner;
