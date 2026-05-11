import Image from 'next/image';

import { useAuthStore } from '@/stores/useAuthStore';

import { Filter } from '@/constants/icons';

import Button from '@/components/Button/Button';
import TextInput from '@/components/Input/TextInput';
import FilterModal from '@/components/Modal/FilterModal';
import { useModal } from '@/components/Modal/ModalProvider';
import Modal from '@/components/Modal/ModalRoot';

import WineList from '../WineList/WineList';
import WinesEmptyState from './WinesEmptyState';
import { WinesMobileLayoutProps } from './type';

const WinesMobileLayout = ({
  search,
  onSearchChange,
  filteredWines,
  onWineUpdated,
  isFilterOpen,
  onOpenFilter,
  onCloseFilter,
  ...wineFilterProps
}: WinesMobileLayoutProps) => {
  const { openModal } = useModal();

  const user = useAuthStore((state) => state.user);
  const isLoggedIn = !!user;

  const modalWineFilterProps = {
    ...wineFilterProps,
    onResetFilters: () => {
      wineFilterProps.onResetFilters();
      onCloseFilter();
    },
    onApplyFilters: () => {
      wineFilterProps.onApplyFilters();
      onCloseFilter();
    },
  };

  return (
    <>
      <div className="flex flex-col gap-6 mx-auto md:gap-10 w-full md:max-w-[680px]">
        <TextInput
          id="wine-catalog-search-mobile"
          name="search"
          label="검색"
          type="search"
          placeholder="와인을 검색해 보세요"
          isSearch
          hideLabel
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <div className="flex flex-col gap-5">
          <div className="flex w-full justify-between items-center">
            <button
              type="button"
              onClick={onOpenFilter}
              className="p-[9px] md:p-3 rounded-[8px] border border-[hsl(var(--gray-300))] bg-white"
              aria-label="필터 열기"
            >
              <Image src={Filter} alt="filter-icon" className="h-6 w-6" />
            </button>
            {isLoggedIn && (
              <Button
                type="button"
                variant="primary"
                className="w-[228px]"
                onClick={() =>
                  openModal({ type: 'register', onUpdated: onWineUpdated })
                }
              >
                와인 등록하기
              </Button>
            )}
          </div>
          {filteredWines.length > 0 ? (
            <WineList wines={filteredWines} />
          ) : (
            <WinesEmptyState />
          )}
        </div>
      </div>

      {isFilterOpen ? (
        <Modal
          title="필터"
          hasHead
          onClose={onCloseFilter}
          className="w-full max-w-md overflow-y-auto"
        >
          <FilterModal {...modalWineFilterProps} />
        </Modal>
      ) : null}
    </>
  );
};

export default WinesMobileLayout;
