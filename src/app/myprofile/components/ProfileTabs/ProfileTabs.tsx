import ProfileTabsProps from './type';

const ProfileTabs = ({
  activeTab,
  reviewCount,
  wineCount,
  onChangeTab,
}: ProfileTabsProps) => {
  return (
    <div className="flex max-w-[725px] gap-7 border-b border-gray-300 pb-4 mb-7">
      <button
        onClick={() => onChangeTab('review')}
        className={`bg-transparent border-none cursor-pointer ${
          activeTab === 'review' ? 'font-bold text-black' : 'text-gray-400'
        }`}
      >
        내가 쓴 후기 {reviewCount}
      </button>

      <button
        onClick={() => onChangeTab('wine')}
        className={`bg-transparent border-none cursor-pointer ${
          activeTab === 'wine' ? 'font-bold text-black' : 'text-gray-400'
        }`}
      >
        내가 등록한 와인 {wineCount}
      </button>
    </div>
  );
};

export default ProfileTabs;
