export type ProfileTabType = 'review' | 'wine';

interface ProfileTabsProps {
  activeTab: ProfileTabType;
  reviewCount: number;
  wineCount: number;
  onChangeTab: (tab: ProfileTabType) => void;
}

export default ProfileTabsProps;
