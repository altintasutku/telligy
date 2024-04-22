import React, { useState } from "react";
import UploadBanner from "./UploadBanner";
import UploadCover from "./UploadCover";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

type Props = Readonly<{
  infos: {
    name: string;
    description: string;
    tags: string[];
    price: number;
    discount: number;
  };
  setInfos: React.Dispatch<
    React.SetStateAction<{
      name: string;
      description: string;
      tags: string[];
      price: number;
      discount: number;
    }>
  >;
}>;

const Info = ({ infos, setInfos }: Props) => {
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const handleTags = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " " || e.key === "Enter") {
      if (infos.tags.length >= 5) {
        alert("You can only add 5 tags");
      } else if (
        e.currentTarget.value !== "" &&
        !infos.tags.includes(e.currentTarget.value)
      ) {
        setInfos({ ...infos, tags: [...infos.tags, e.currentTarget.value] });
      }
      e.currentTarget.value = "";
    }
  };

  const handleTagClick = (tag: string) => {
    setInfos({ ...infos, tags: infos.tags.filter((t) => t !== tag) });
  };

  return (
    <div className="flex-1 flex flex-col gap-10">
      <UploadBanner setBannerFile={setBannerFile} />
      <div className="flex flex-1">
        <UploadCover setCoverFile={setCoverFile} />
        <div className="flex-1 px-4">
          <span>Book Name</span>
          <Input
            value={infos.name}
            onChange={(e) => setInfos({ ...infos, name: e.target.value })}
          />
          <br />
          <span>Description</span>
          <Textarea
            className="resize-none"
            value={infos.description}
            onChange={(e) =>
              setInfos({ ...infos, description: e.target.value })
            }
          />
          <br />
          <span>Tags (press space for add)</span>
          <ul className="flex gap-2 items-center flex-wrap">
            {infos.tags.map((tag, i) => (
              <li
                key={i}
                className="bg-[#2F2F2F] flex items-center rounded-full px-10 cursor-pointer select-none hover:bg-red-500 transition-all text-sm"
                onClick={() => handleTagClick(tag)}
              >
                {tag}
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
