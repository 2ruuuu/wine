import Link from 'next/link';
import Dropdown from '@/components/DropDown/Dropdown';
import { WineListItem } from './type';
import { useModal } from '@/components/Modal/ModalProvider';

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
      <Link href={`/wines/${wine.id}`} className="block">
        <div className="mb-6 flex h-[260px] items-center justify-center overflow-hidden bg-gray-100">
          <img
            src={wine.image}
            alt={wine.name}
            className="h-full w-full object-contain"
          />
        </div>

        <div className="relative pr-8">
          <h3 className="text-[18px] font-bold leading-[1.35] text-black">
            {wine.name}
          </h3>

          <p className="mt-2 text-[13px] text-gray-400">{wine.region}</p>

          <strong className="mt-5 block text-[20px] font-bold text-black">
            {wine.price.toLocaleString()}원
          </strong>
        </div>
      </Link>

      <div className="absolute right-0 top-[284px] z-10">
        <Dropdown variant="basic" options={dropdownOptions}>
          {({ toggle }) => (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggle();
              }}
              className="flex h-7 w-7 items-start justify-center text-[22px] leading-none text-gray-400"
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
