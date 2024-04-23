import React, { useState } from "react";
import UploadBanner from "./UploadBanner";
import UploadCover from "./UploadCover";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { addTag, removeTag, setProperty } from "@/features/upload/uploadBookSlice";

type Props = Readonly<{}>;

const Info = ({}: Props) => {
  const infos = useAppSelector((state) => state.uploadBook.infos);
  const tags = useAppSelector((state) => state.uploadBook.tags);
  const dispatch = useAppDispatch();

  const handleTags = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " " || e.key === "Enter") {
      if (tags.length >= 5) {
        alert("You can only add 5 tags");
      } else if (
        e.currentTarget.value !== "" &&
        !tags.some((t) => t.name === e.currentTarget.value)
      ) {
        dispatch(addTag(e.currentTarget.value));
      }
      e.currentTarget.value = "";
    }
  };

  const handleTagClick = (tag: string) => {
    dispatch(removeTag(tag));
  };

  return (
    <div className="flex-1 flex flex-col gap-10">
      <UploadBanner />
      <div className="flex flex-1">
        <UploadCover />
        <div className="flex-1 px-4">
          <span>Book Title</span>
          <Input
            value={infos.title}
            onChange={(e) => dispatch(setProperty({ key: "title", value: e.target.value }))}
          />
          <br />
          <span>Description</span>
          <Textarea
            className="resize-none"
            value={infos.description}
            onChange={(e) =>
              dispatch(setProperty({ key: "description", value: e.target.value }))
            }
          />
          <br />
          <span>Tags (press space for add)</span>
          <ul className="flex gap-2 items-center flex-wrap">
            {tags.map((tag, i) => (
              <li
                key={i}
                className="bg-[#2F2F2F] flex items-center rounded-full px-10 cursor-pointer select-none hover:bg-red-500 transition-all text-sm"
                onClick={() => handleTagClick(tag.name)}
              >
                {tag.name}
              </li>
            ))}
            <Input className="w-40" onKeyDown={handleTags} />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Info;
