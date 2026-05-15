'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import axios from 'axios';

import { deleteReviewLike, postReviewLike } from '@/lib/api/review';

import { HeartEmpty, HeartFill } from '@/constants/icons';

import { HeartToggleProps } from './type';

const HeartToggle = ({ id, isLiked }: HeartToggleProps) => {
  const router = useRouter();
  const [isHeart, setIsHeart] = useState(isLiked);

  useEffect(() => {
    setIsHeart(isLiked);
  }, [isLiked]);

  const toggleHeart = async () => {
    const previousState = isHeart;
    setIsHeart(!previousState);

    try {
      if (previousState) {
        await deleteReviewLike(id);
        toast.success('좋아요를 취소했습니다.');
      } else {
        await postReviewLike(id);
        toast.success('좋아요를 눌렀습니다!');
      }
      router.refresh();
    } catch (error) {
      setIsHeart(previousState);

      if (axios.isAxiosError(error) && error.response) {
        const status = error.response.status;
        if (status === 403) {
          toast.error('본인의 리뷰에는 좋아요를 누를 수 없습니다.');
        } else if (status === 401) {
          toast.error('로그인이 필요한 기능입니다.');
        } else {
          toast.error('요청 처리에 실패했습니다.');
        }
      } else {
        toast.error('알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  return (
    <button
      type="button"
      className={`flex h-9 w-[50px] cursor-pointer items-center justify-center gap-2 rounded-md border-2 transition-colors ${
        isHeart ? 'border-[hsl(1,88%,40%)]' : 'border-gray-300'
      }`}
      onClick={toggleHeart}
    >
      <Image
        src={isHeart ? HeartFill : HeartEmpty}
        alt={isHeart ? '하트' : '빈 하트'}
        width={20}
        height={20}
        style={{ height: 'auto' }}
      />
    </button>
  );
};

export default HeartToggle;
