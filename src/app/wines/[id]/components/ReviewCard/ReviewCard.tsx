'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import React from 'react';
import toast from 'react-hot-toast';

import { Review } from '@/types/review';

import { useAuthStore } from '@/stores/useAuthStore';

import { deleteReview, patchReview } from '@/lib/api/review';
import { formatTimeAgo } from '@/lib/date-fns';

import { Down, Hamburger, Profile, Up } from '@/constants/icons';

import Dropdown from '@/components/DropDown/Dropdown';
import { useModal } from '@/components/Modal/ModalProvider';
import StarRating from '@/components/StarRating/StarRating';

import AromaList from './AromaList/AromaList';
import HeartToggle from './HeartToggle/HeartToggle';
import TasteList from './TasteList/TasteList';
import { ReviewCardProps } from './type';

const ReviewCard = ({ review, wine }: ReviewCardProps) => {
  const router = useRouter();
  const [isTasteOpen, setIsTasteOpen] = useState(false);
  const { openModal } = useModal();

  const user = useAuthStore((state) => state.user);
  const isLoggedIn = !!user;

  const isMyReview = user?.id === review.user.id;

  const handleDelete = () => {
    openModal({
      type: 'delete',
      onConfirm: async () => {
        try {
          await deleteReview(review.id);
          toast.success('리뷰가 삭제되었습니다.');
          router.refresh();
        } catch (error) {
          toast.error('삭제에 실패했습니다.');
        }
      },
    });
  };

  const handleEdit = () => {
    openModal({
      type: 'review',
      mode: 'edit',
      review: {
        ...review,
        wine: wine,
      } as Review,
      onUpdated: (updatedReview) => {
        router.refresh();
      },
    });
  };

  const dropdownOptions = [
    { label: '수정하기', onSelect: handleEdit },
    { label: '삭제하기', onSelect: handleDelete },
  ];

  return (
    <div className="flex w-full max-w-[720px] flex-col gap-12 border-b border-gray-300 pt-10 pb-10">
      <div className="flex flex-col gap-5">
        <StarRating rating={review.rating} className="" />
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center gap-4">
            <Image
              src={review.user.image || Profile}
              alt="프로필"
              width={64}
              height={64}
              style={{ width: '64px', height: '64px' }}
              className="rounded-full object-cover"
            />
            <div className="flex flex-col">
              <span className="font-semibold text-black">
                {review.user.nickname}
              </span>
              <span className="text-gray-600">
                {formatTimeAgo(review.createdAt)}
              </span>
            </div>
          </div>
          {isMyReview && (
            <Dropdown variant="basic" options={dropdownOptions}>
              {({ toggle }) => (
                <button
                  onClick={toggle}
                  className="flex cursor-pointer justify-center p-2"
                >
                  <Image
                    src={Hamburger}
                    alt="햄버거 버튼"
                    width={4}
                    height={20}
                    style={{ width: 'auto', height: 'auto' }}
                    className="h-5 w-1"
                  />
                </button>
              )}
            </Dropdown>
          )}
        </div>
        <AromaList aroma={review.aroma} />
        <p className="text-black">{review.content}</p>
      </div>
      {isTasteOpen && (
        <TasteList
          lightBold={review.lightBold}
          smoothTannic={review.smoothTannic}
          drySweet={review.drySweet}
          softAcidic={review.softAcidic}
        />
      )}

      <div className="relative flex items-center justify-end">
        <div className="absolute left-0">
          {isLoggedIn && (
            <HeartToggle id={review.id} isLiked={review.isLiked} />
          )}
        </div>
        <button
          onClick={() => setIsTasteOpen(!isTasteOpen)}
          className="relative h-[9px] w-[15px] cursor-pointer"
        >
          <Image
            src={isTasteOpen ? Up : Down}
            alt="아로마 토글"
            fill
            sizes="15px"
            className="object-contain"
          />
        </button>
      </div>
    </div>
  );
};

export default React.memo(ReviewCard);
