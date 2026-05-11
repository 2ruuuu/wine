'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

import { Wine } from './type';

const WineList = () => {
  const [wines, setWines] = useState<Wine[]>([]);
  useEffect(() => {
    const getWines = async () => {
      const res = await fetch(
        'https://winereview-api.vercel.app/23-3/wines?limit=10',
      );

      const data = await res.json();
      setWines(data.list);
    };

    getWines();
  }, []);
  return (
    <>
      <Swiper
        modules={[Navigation, Autoplay]}
        slidesPerView={5}
        navigation
        centeredSlides={true}
        autoplay={{ delay: 7000 }}
        loop
        className="my-swiper"
        breakpoints={{
          0: {
            slidesPerView: 2,
          },
          425: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 5,
          },
        }}
      >
        {wines.map((wine) => (
          <SwiperSlide
            key={wine.id}
            className="
            transition-all duration-300
            opacity-20 scale-80 rounded-none
            [&.swiper-slide-active]:opacity-100
            [&.swiper-slide-active]:rounded-[30px]
            [&.swiper-slide-active]:bg-[#2B2C33] 
            [&.swiper-slide-active]:border-gray-800
            [&.swiper-slide-active]:border-1
            [&.swiper-slide-active]:border-gray-100
            [&.swiper-slide-active]:scale-100
          "
          >
            <Link href={`/wines/${wine.id}`}>
              <div className="flex flex-col items-center justify-center text-white text-center py-[30px] px-[10px] gap-2.5 md:h-[372px] h-[250px]">
                <div className="md:max-h-[200px] md:max-w-[100px] max-h-[130px] max-w-[80px]">
                  <img
                    src={wine.image}
                    alt=""
                    className="w-full h-full object-fit"
                  />
                </div>
                <div className=" max-[756px]:text-[14px]">{wine.name}</div>
                <div className="text-[12px] max-[756px]:text-[10px] text-gray-600">
                  {wine.region}
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default WineList;
