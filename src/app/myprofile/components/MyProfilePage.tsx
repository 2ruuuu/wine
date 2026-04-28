'use client';

import { useState } from 'react';
import Header from '@/components/gnb/Header';
import ProfileSidebar from './ProfileSidebar';
import ProfileTabs from './ProfileTabs';
import ReviewList from './ReviewList';
import WineList from './WineList';
import NicknameModal from './NicknameModal';

const mockUser = {
  nickname: '주말에와인',
};

const mockReviews = [
  {
    id: 1,
    wineName: 'Sentinel Cabernet Sauvignon 2016',
    country: 'Western Cape, South Africa',
    rating: 5,
    time: '10시간 전',
    content: `첫 모금에서 느껴지는 진한 블랙베리와 블랙커런트의 깊은 풍미가 인상적이었어요.
입 안을 가득 채우는 묵직한 바디감과 함께, 오크 숙성에서 오는 바닐라, 스파이스, 은은한 토스트 향이 균형 있게 어우러집니다.
시간이 지날수록 다크 초콜릿과 가죽 같은 성숙한 노트가 올라오면서, 여운이 길고도 부드럽게 이어져요.
타닌은 뚜렷하지만 과하지 않고, 단단한 구조감 덕분에 고기 요리나 숙성 치즈와 특히 잘 어울리는 와인이었습니다.`,
    likeCount: 24,
  },
];

const mockWines = [
  {
    id: 1,
    wineName: 'Sentinel Cabernet Sauvignon 2016',
    country: 'Western Cape, South Africa',
  },
];

const MyProfilePage = () => {
  const [nickname, setNickname] = useState(mockUser.nickname);
  const [inputNickname, setInputNickname] = useState(mockUser.nickname);
  const [activeTab, setActiveTab] = useState<'review' | 'wine'>('review');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 변경 버튼 클릭
  const handleClickChange = () => {
    if (!inputNickname.trim()) {
      alert('닉네임을 입력해주세요.');
      return;
    }
    setIsModalOpen(true);
  };

  // 모달에서 "변경하기" 클릭
  const handleConfirmChange = () => {
    setNickname(inputNickname);
    setIsModalOpen(false);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      {/* 헤더 */}
      <Header isLogIn={true} HeaderBg={false} />

      {/* 헤더가 fixed라서 아래 공간 확보 */}
      <div style={{ height: '90px' }} />

      {/* 메인 */}
      <main
        style={{
          width: '960px',
          margin: '0 auto',
          display: 'flex',
        }}
      >
        {/* 좌측 프로필 */}
        <ProfileSidebar
          nickname={nickname}
          inputNickname={inputNickname}
          onChangeInputNickname={setInputNickname}
          onClickChange={handleClickChange}
        />

        {/* 우측 컨텐츠 */}
        <section style={{ flex: 1, padding: '32px 36px' }}>
          <ProfileTabs
            activeTab={activeTab}
            reviewCount={mockReviews.length}
            wineCount={mockWines.length}
            onChangeTab={setActiveTab}
          />

          {activeTab === 'review' && <ReviewList reviews={mockReviews} />}
          {activeTab === 'wine' && <WineList wines={mockWines} />}
        </section>
      </main>

      {/* 모달 */}
      {isModalOpen && (
        <NicknameModal
          changeNickname={inputNickname}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirmChange}
        />
      )}
    </div>
  );
};

export default MyProfilePage;
