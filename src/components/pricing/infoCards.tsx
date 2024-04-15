import React from "react";
import Image from "next/image";
import img1 from "@/images/money-image.png";
import img2 from "@/images/community-image.png";
import img3 from "@/images/special-image.png";

const InfoCards = () => {
  return (
    <div className='flex flex-row justify-center gap-40'>
      <div className='flex flex-col items-center'>
        <Image src={img1} alt='pricing' width={177} height={185} />
        <div className='text-center w-72 font-semibold my-5 text-xl'>
          Onlarca Kitaba Yalnızca Tek Bir Ücret Ödeyerek Ulaş!
        </div>
      </div>
      <div className='flex flex-col items-center'>
        <Image src={img2} alt='pricing' width={177} height={185} />
        <div className='text-center w-56 font-semibold my-5 text-xl'>
          TELLİGY Topluluğuna Katılma Fırsatını Yakala
        </div>
      </div>
      <div className='flex flex-col items-center'>
        <Image src={img3} alt='pricing' width={177} height={185} />
        <div className='text-center w-56 font-semibold my-5 text-xl'>
          Editörlerimizin Özel Seçtiği İçerikleri Ücretsiz Oku!
        </div>
      </div>
    </div>
  );
};

export default InfoCards;
