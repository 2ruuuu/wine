interface ProfileTabsProps {
  activeTab: 'review' | 'wine';
  reviewCount: number;
  wineCount: number;
  onChangeTab: (tab: 'review' | 'wine') => void;
}

const ProfileTabs = ({
  activeTab,
  reviewCount,
  wineCount,
  onChangeTab,
}: ProfileTabsProps) => {
  return (
    <div
      style={{
        display: 'flex',
        gap: '28px',
        borderBottom: '1px solid #ddd',
        paddingBottom: '18px',
        marginBottom: '28px',
        marginLeft: '-36px',
        paddingLeft: '36px',
      }}
    >
      <button
        onClick={() => onChangeTab('review')}
        style={{
          border: 'none',
          background: 'none',
          fontWeight: activeTab === 'review' ? 700 : 400,
          color: activeTab === 'review' ? '#111' : '#aaa',
          cursor: 'pointer',
        }}
      >
        내가 쓴 후기 {reviewCount}
      </button>

      <button
        onClick={() => onChangeTab('wine')}
        style={{
          border: 'none',
          background: 'none',
          fontWeight: activeTab === 'wine' ? 700 : 400,
          color: activeTab === 'wine' ? '#111' : '#aaa',
          cursor: 'pointer',
        }}
      >
        내가 등록한 와인 {wineCount}
      </button>
    </div>
  );
};

export default ProfileTabs;
