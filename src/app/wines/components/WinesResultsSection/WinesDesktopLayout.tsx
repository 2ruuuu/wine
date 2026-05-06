import TextInput from '@/components/Input/TextInput';
import WineFilter from '../WineFilter/WineFilter';
import WineList from '../WineList/WineList';
import WinesEmptyState from './WinesEmptyState';
import { WinesDesktopLayoutProps } from './type';
import Button from '@/components/Button/Button';
import { useModal } from '@/components/Modal/ModalProvider';

const WinesDesktopLayout = ({
  search,
  onSearchChange,
  filteredWines,
  ...wineFilterProps
}: WinesDesktopLayoutProps) => {
  const { openModal } = useModal();

  return (
    <div className="flex mx-auto w-full gap-15 max-w-[1145px]">
      <div className="flex flex-col gap-16 w-[284px]">
        <WineFilter {...wineFilterProps} />
        <Button
          type="button"
          variant="primary"
          fullWidth
          onClick={() => openModal({ type: 'register' })}
        >
          와인 등록하기
        </Button>
      </div>
      <div className="flex flex-col gap-16 w-[801px]">
        <TextInput
          id="wine-catalog-search"
          name="search"
          label="검색"
          type="search"
          placeholder="와인을 검색해 보세요"
          isSearch
          hideLabel
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {filteredWines.length > 0 ? (
          <WineList wines={filteredWines} />
        ) : (
          <WinesEmptyState />
        )}
      </div>
    </div>
  );
};

export default WinesDesktopLayout;
