'use client';

import { useState } from 'react';
import { formatTimeAgo } from '@/lib/date-fns';
import { Up, Down, Hamburger, Profile } from '@/constants/icons';
import StarRating from '@/components/StarRating/StarRating';
import Image from 'next/image';
import AromaList from './AromaList/AromaList';
import TasteList from './TasteList/TasteList';
import HeartToggle from './HeartToggle/HeartToggle';
import Dropdown from '@/components/DropDown/Dropdown';
import { ReviewCardProps } from './type';

const ReviewCard = ({ review }: ReviewCardProps) => {
  const [isTasteOpen, setIsTasteOpen] = useState(false);
  const dropdownOptions = [
    { label: '수정하기', onSelect: () => console.log('수정 클릭!') },
    { label: '삭제하기', onSelect: () => console.log('삭제 클릭!') },
  ];

  return (
    <div className="flex flex-col gap-12 max-w-[725px] w-full pt-10 pb-10 border-b border-gray-300">
      <div className="flex flex-col gap-5">
        <StarRating rating={review.rating} />
        <div className="flex justify-between items-center">
          <div className="flex gap-4 justify-center items-center">
            <Image
              src={review.user.image || Profile}
              alt="프로필"
              width={64}
              height={64}
              className="rounded-full"
            />
            <div className="flex flex-col">
              <span className="text-black font-semibold">
                {review.user.nickname}
              </span>
              <span className="text-gray-600">
                {formatTimeAgo(review.createdAt)}
              </span>
            </div>
          </div>
          <Dropdown variant="basic" options={dropdownOptions}>
            {({ toggle }) => (
              <button
                onClick={toggle}
                className="flex justify-center w-8 h-8 cursor-pointer"
              >
                <Image
                  src={Hamburger}
                  alt="햄버거 버튼"
                  width={4}
                  height={20}
                />
              </button>
            )}
          </Dropdown>
        </div>
        <AromaList aroma={review.aroma} />
        <p className="text-black">{review.content}</p>
      </div>
      {isTasteOpen && (
        <TasteList
          lightBold={review.lightBold}
          smoothTannic={review.lightBold}
          drySweet={review.drySweet}
          softAcidic={review.softAcidic}
        />
      )}

      <div className="flex relative justify-center items-center">
        <div className="absolute left-0">
          <HeartToggle isLiked={review.isLiked} />
        </div>
        <button
          onClick={() => setIsTasteOpen(!isTasteOpen)}
          className="relative w-[15px] h-[9px] cursor-pointer"
        >
          <Image
            src={isTasteOpen ? Up : Down}
            alt="아로마 토글"
            fill
            className="object-contain"
          />
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;
