import React from "react";
import { BackgroundBeams } from "../ui/background-beams";
import { AnimatedTooltip } from "../ui/animated-tooltip";
import { Button } from "../ui/button";
import Image from "next/legacy/image";
import ColorGradient from "../ui/color-gradient";

const people = [
  {
    id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  },
  {
    id: 2,
    name: "Robert Johnson",
    designation: "Product Manager",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    name: "Jane Smith",
    designation: "Data Scientist",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 4,
    name: "Emily Davis",
    designation: "UX Designer",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 5,
    name: "Tyler Durden",
    designation: "Soap Developer",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  },
  {
    id: 6,
    name: "Dora",
    designation: "The Explorer",
    image:
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
  },
];

const Banner = () => {
  return (
    <div className="flex flex-col items-center mb-20">
      <div className="flex flex-col md:flex-row pt-32 gap-10 w-11/12 lg:w-9/12 items-start md:items-center z-20">
        <div className="flex gap-3 lg:gap-5 col-span-2">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <Image
                key={i}
                src={
                  "https://img.kitapyurdu.com/v1/getImage/fn:11595663/wh:true/miw:200/mih:200"
                }
                height={200}
                width={105}
                alt="book"
                className="object-cover rounded-lg"
              />
            ))}
        </div>
        <div className="flex-1 gap-2 flex flex-col items-start">
          <h2 className="font-semibold text-2xl">
            10`&apos;larca eğitim ve kitaba tek bir fiyat ile ulaş
          </h2>
          <small>
            Bugün üye ol istediğin zaman iptal et, <br />
            üyeliğe dahil tüm kitaplara kolayca ulaş
          </small>
          <div className="flex flex-row items-center justify-center">
            <AnimatedTooltip items={people} />
          </div>
          <span className="text-green-700">20000+ kişi bunu kullanıyor</span>
        </div>
        <div className="flex flex-col gap-2">
          <span>Tek bir tıklama ile</span>
          <Button variant={"outline"}>Şimdi Katıl</Button>
        </div>
      </div>
      <BackgroundBeams className="z-0 h-[400px]" />
      <ColorGradient
        colors={[
          "rgba(0,102,255,0.1)",
          "rgba(0,102,255,0.3)",
          "rgba(153,255,204,0.3)",
          "rgba(153,255,204,0.1)",
        ]}
        className="z-10"
      />
    </div>
  );
};

export default Banner;
