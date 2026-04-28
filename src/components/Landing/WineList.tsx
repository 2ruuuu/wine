'use client';
import Image from 'next/image';
import WineRecommend from '@/assets/images/wine-product-img.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

const wines = [
  {
    id: 1,
    name: 'Sentinel Carbernet Sauvignon 2016',
    tag: 'Western Cape, South Africa',
    imgUrl: WineRecommend,
  },
  {
    id: 2,
    name: 'Sentinel Carbernet Sauvignon 2016',
    tag: 'Western Cape, South Africa',
    imgUrl: WineRecommend,
  },
  {
    id: 3,
    name: 'Sentinel Carbernet',
    tag: 'Western Cape, South Africa',
    imgUrl: WineRecommend,
  },
  {
    id: 4,
    name: 'Sentinel',
    tag: 'Western Cape, South Africa',
    imgUrl: WineRecommend,
  },
  {
    id: 5,
    name: 'Sentinel 2016',
    tag: 'Western Cape, South Africa',
    imgUrl: WineRecommend,
  },
  {
    id: 6,
    name: 'Sentinel Carbernet Sauvignon 2016',
    tag: 'Western Cape, South Africa',
    imgUrl: WineRecommend,
  },
  {
    id: 7,
    name: 'Sentinel Carbernet Sauvignon 2016',
    tag: 'Western Cape, South Africa',
    imgUrl: WineRecommend,
  },
  {
    id: 8,
    name: 'Sentinel Carbernet Sauvignon 2016',
    tag: 'Western Cape, South Africa',
    imgUrl: WineRecommend,
  },
];

const WineList = () => {
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
            <div className="flex flex-col items-center justify-center text-white text-center py-[30px] px-[10px] gap-2.5 md:h-[372px] h-[250px]">
              <Image
                src={wine.imgUrl}
                alt=""
                className="max-[756px]:h-[100px] max-[756px]:w-auto"
              />
              <div className=" max-[756px]:text-[14px]">{wine.name}</div>
              <div className="text-[12px] max-[756px]:text-[10px] text-gray-600">
                {wine.tag}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default WineList;
