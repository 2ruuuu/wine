'use client';
import Header from '@/components/Gnb/Header';
import Image from 'next/image';
import { WineRecommend, WineFilter, WineReview } from '@/constants/images';
import WineList from '@/components/Landing/WineList';
import Link from 'next/link';
import Button from '@/components/Button/Button';

const Home = () => {
  return (
    <div>
      <Header isLogin={false} HeaderBg={false} />
      <div className="relative">
        <section className="bg-[#171A21] md:mb-20 mb-[25px]">
          <div className="relative max-w-[1140px] md:pt-[180px] pt-[102px] mx-auto">
            <p className="md:text-[32px] text-[24px] text-white font-bold md:px-[60px] px-[22px]">
              한 곳에서 관리하는 <br /> 나만의 와인창고
            </p>
            <div className="pointer-none py-[30px]">
              <WineList />
            </div>
          </div>
        </section>
        <section>
          <div className="mx-auto flex md:flex-row max-w-[1140px] items-center justify-between flex-col max-[769px]:px-0 md:py-[43px] py-[21px]">
            <div className="md:w-[280px] w-full max-[769px]:px-[22px]">
              <p className="md:text-2xl font-bold leading-[1.35] text-[#111] text-[18px]">
                매달 새롭게 만나는
                <br />
                와인 추천 콘텐츠
              </p>
              <p className="md:mt-[18px] mt-[8px] md:text-4 leading-[1.5] text-[#A3A3A3] text-[12px] font-light">
                매달 다양한 인기 와인을 만나보세요.
              </p>
            </div>
            <div className=" relative max-[769px]:ml-auto max-[769px]:mt-[34px] max-[769px]:w-[calc(100%-22px)]">
              <Image src={WineRecommend} alt="" />
            </div>
          </div>
        </section>

        <section>
          <div className="mx-auto flex max-w-[1140px] md:flex-row-reverse items-center justify-end md:gap-[103px] gap-[0] flex-col max-[769px]:px-0 py-[43px] max-[769px]:py-[21px]">
            <div className="md:w-[280px] w-full max-[769px]:px-[22px]">
              <p className="md:text-2xl font-bold leading-[1.35] text-[#111] text-[18px]">
                다양한 필터로 찾는
                <br />내 맞춤 와인
              </p>
              <p className="md:mt-[18px] mt-[8px] text-4 leading-[1.5] text-[#A3A3A3] max-[769px]:text-[12px] font-light">
                와인 타입, 가격, 평점으로
                <br />
                나에게 맞는 와인을 쉽게 검색해요.
              </p>
            </div>
            <div className=" relative max-[769px]:mr-auto max-[769px]:mt-[34px] max-[756px]:w-[calc(100%-22px)]">
              <Image src={WineFilter} alt="" />
            </div>
          </div>
        </section>

        <section>
          <div className="mx-auto flex md:flex-row max-w-[1140px] items-center justify-between flex-col max-[756px]:px-0 md:py-[43px] py-[21px]">
            <div className="md:w-[280px] w-full max-[756px]:px-[22px]">
              <p className="md:text-2xl font-bold leading-[1.35] text-[#111] text-[18px]">
                직관적인
                <br />
                리뷰 시스템
              </p>
              <p className="mt-[18px] mt-[8px] md:text-4 leading-[1.5] text-[#A3A3A3] text-[12px] font-light">
                더 구체화된 리뷰 시스템으로 <br />
                쉽고 빠르게 와인 리뷰를 살펴보세요.
              </p>
            </div>
            <div className="relative max-[769px]:ml-auto max-[769px]:mt-[34px] max-[769px]:w-[calc(100%-22px)]">
              <Image src={WineReview} alt="" />
            </div>
          </div>
        </section>

        <div className="mt-[74px] mb-[151px] text-center">
          <Link href="/">
            <Button variant="primary" className="w-[283px]">
              가입하기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
