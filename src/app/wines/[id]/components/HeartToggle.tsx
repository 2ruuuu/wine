'use client';

import { useState } from 'react';
import { HeartEmpty, HeartFill } from '@/constants/icons';
import { HeartToggleProps } from './type';
import Image from 'next/image';

const HeartToggle = ({ isLiked }: HeartToggleProps) => {
  const [isHeartButtonClick, setIsHeartButtonClick] = useState(isLiked);

  const toggleHeart = () => {
    setIsHeartButtonClick((prev) => !prev);
  };

  return (
    <button
      className={`border-2 rounded-md flex justify-center items-center gap-2 w-[50px] h-9 cursor-pointer transition-colors ${
        isHeartButtonClick
          ? 'border-[hsl(1,88%,40%)]'
          : 'border-[hsl(var(--gray-300))]'
      }`}
      onClick={toggleHeart}
    >
      <Image
        src={isHeartButtonClick ? HeartFill : HeartEmpty}
        alt={isHeartButtonClick ? '채워진 하트' : '빈 하트'}
        width={20}
        style={{ height: 'auto' }}
      />
    </button>
  );
};

export default HeartToggle;

//하트 토글이랑, 화살표 토글 만들어야함
