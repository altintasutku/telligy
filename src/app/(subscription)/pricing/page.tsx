import Banner from "@/components/dashboard/Banner";
import Navbar from "@/components/Navbar";
import InfoCards from "@/components/pricing/infoCards";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { Button } from "@/components/ui/button";
import React from "react";

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

const PricingPage = () => {
  return (
    <div>
      <Navbar />
      <Banner />
      <InfoCards />
      <div className='flex w-full justify-center'>
        <div className='flex flex-col items-center justify-center w-1/2 bg-white h-64 rounded-2xl my-20'>
          <div className='flex flex-col gap-3 items-center'>
            <div className='flex flex-row items-center justify-center'>
              <AnimatedTooltip items={people} />
            </div>
            <div className='text-black text-3xl font-extrabold'>
              Binlerce Kişi Aboneliği Kullanıyor!
            </div>
            <div className='text-black text-sm'>
              Binlerce kişi tek bir ücrete onlarca kitaba erişiyor! Şimdi sıra
              sende!
            </div>

            <Button
              className='text-black bg-yellow-500 hover:bg-yellow-700 w-24'
              variant={"destructive"}
            >
              Abone Ol
            </Button>

            <div className='text-black text-xs font-thin'>
              Aylık Yalnızca 99TL Sınırsız Kitap Oku!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
