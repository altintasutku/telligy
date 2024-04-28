import React from "react";
import { BookOpenText, Star } from "lucide-react";
import Image from "next/image";
import List from "@/components/home/List/List";

const MarketInfo = () => {
  return (
    <div>
      <div className='flex justify-center items-center gap-4'>
        <div className='flex flex-row h-24 w-24 mx-2 items-center'>
          <Image
            className=' rounded-full'
            src='https://cdn.shopier.app/logo_234/girisimciborsacimagaza740_LogocandlesticktradingchartanalyzinginforexKopyasi_1_.png'
            alt='hero'
            width={1920}
            height={1080}
          />
        </div>
        <div className='flex flex-col'>
          <h1 className=' font-bold text-2xl'>Girişimci Borsacı</h1>
          <div className='flex flex-row justify-between mt-4 gap-2'>
            <div className='flex'>
              <Star className='w-6 h-6 mr-2' />
              4.5
            </div>
            <div className='flex'>
              <BookOpenText className='w-6 h-6 mr-2' />
              10 books
            </div>
          </div>
        </div>
      </div>
      <div className='my-20'>
        <List />
      </div>
    </div>
  );
};

export default MarketInfo;
