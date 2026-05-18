import ProfileTabsProps from './type';

const ProfileTabs = ({
  activeTab,
  reviewCount,
  wineCount,
  onChangeTab,
}: ProfileTabsProps) => {
  return (
    <div className="relative mb-7 flex max-w-[725px] gap-7 overflow-visible pb-4 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-gray-300 after:content-[''] min-[744px]:after:w-[calc(100%+40px)] min-[1280px]:after:w-[calc(100%+80px)]">
      <button
        onClick={() => onChangeTab('review')}
        className={`cursor-pointer border-none bg-transparent ${
          activeTab === 'review' ? 'font-bold text-black' : 'text-gray-400'
        }`}
      >
        내가 쓴 후기 {reviewCount}
      </button>

      <button
        onClick={() => onChangeTab('wine')}
        className={`cursor-pointer border-none bg-transparent ${
          activeTab === 'wine' ? 'font-bold text-black' : 'text-gray-400'
        }`}
      >
        내가 등록한 와인 {wineCount}
      </button>
    </div>
  );
};

export default ProfileTabs;
