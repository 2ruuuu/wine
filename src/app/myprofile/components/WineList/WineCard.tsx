import Link from 'next/link';

import Dropdown from '@/components/DropDown/Dropdown';
import { useModal } from '@/components/Modal/ModalProvider';

import { WineListItem } from './type';

interface WineCardProps {
  wine: WineListItem;
  onDeleteWine: (wineId: number) => void;
  onUpdateWine: () => void;
}

const WineCard = ({ wine, onDeleteWine, onUpdateWine }: WineCardProps) => {
  const { openModal } = useModal();

  const dropdownOptions = [
    {
      label: '수정하기',
      onSelect: () => {
        openModal({
          type: 'register',
          mode: 'edit',
          wine,
          onUpdated: onUpdateWine,
        });
      },
    },
    {
      label: '삭제하기',
      onSelect: () => {
        onDeleteWine(wine.id);
      },
    },
  ];

  return (
    <article className="relative">
      {/* 사진만 클릭 시 상세 이동 */}
      <Link href={`/wines/${wine.id}`} className="block">
        <div className="mb-6 flex h-[260px] items-center justify-center overflow-hidden bg-gray-100">
          <img
            src={wine.image}
            alt={wine.name}
            className="h-full w-full object-contain"
          />
        </div>
      </Link>

      <div className="relative pr-12">
        {/* 와인 이름만 클릭 시 상세 이동 */}
        <Link href={`/wines/${wine.id}`} className="inline-block">
          <h3 className="text-[18px] font-bold leading-[1.35] text-black hover:underline">
            {wine.name}
          </h3>
        </Link>

        <p className="mt-2 text-[13px] text-gray-400">{wine.region}</p>

        <strong className="mt-5 block text-[20px] font-bold text-black">
          {wine.price.toLocaleString()}원
        </strong>
      </div>

      {/* 햄버거 클릭 영역 넓힘 */}
      <div className="absolute right-[-8px] top-[276px] z-10">
        <Dropdown variant="basic" options={dropdownOptions}>
          {({ toggle }) => (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggle();
              }}
              className="flex h-11 w-11 cursor-pointer items-center justify-center text-[24px] leading-none text-gray-400"
              aria-label="와인 메뉴 열기"
            >
              ⋮
            </button>
          )}
        </Dropdown>
      </div>
    </article>
  );
};

export default WineCard;
