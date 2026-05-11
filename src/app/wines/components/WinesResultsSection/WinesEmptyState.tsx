import Image from 'next/image';

import { Exclamation } from '@/constants/icons';

const WinesEmptyState = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-6 py-20 px-[10px]">
      <Image
        src={Exclamation}
        alt="정보없음 아이콘"
        width={136}
        height={136}
        className="w-25 h-25 md:w-34 md:h-34"
      />
      <div className="flex flex-col justify-center items-center text-center gap-2 md:gap-3 ">
        <p className="text-2xl font-bold text-[#31302F]">
          아직 아무도 모르는 와인이네요!
        </p>
        <p className="text-sm md:text-lg font-light text-[#BABABA]">
          지금 등록해서 다른 사람들에게 <br className="block md:hidden" />첫
          번째로 소개해보세요.
        </p>
      </div>
    </div>
  );
};

export default WinesEmptyState;
