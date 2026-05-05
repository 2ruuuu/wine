'use client';

import { useForm } from 'react-hook-form';

import { useModal } from '@/components/Modal/ModalProvider';

import ProfileSidebar from '../ProfileSidebar/ProfileSidebar';
import ProfileTabs from '../ProfileTabs/ProfileTabs';
import ReviewList from '../ReviewList/ReviewList';
import WineList from '../WineList/WineList';
import EmptyState from '../EmptyState/EmptyState';

import { Review } from '@/types/review';
import { MyProfileForm, ProfileTabType } from './type';
import { WineListItem } from '../WineList/type';

import { useEffect, useState } from 'react';
import { instance } from '@/lib/api/axios';

const mockUser = {
  nickname: '주말에와인',
};

const MyProfilePage = () => {
  const [nickname, setNickname] = useState(mockUser.nickname);
  const [activeTab, setActiveTab] = useState<ProfileTabType>('review');

  const { register, watch, setValue } = useForm<MyProfileForm>({
    defaultValues: {
      nickname: '',
    },
  });

  const { openModal } = useModal();

  const inputNickname = watch('nickname');

  const [reviews, setReviews] = useState<Review[]>([]);
  const [wines, setWines] = useState<WineListItem[]>([]);

  useEffect(() => {
    const fetchMyProfileData = async () => {
      try {
        const reviewRes = await instance.get('/users/me/reviews');
        const wineRes = await instance.get('/users/me/wines');

        setReviews(reviewRes.data.list);
        setWines(wineRes.data.list);
      } catch (error) {
        console.error('마이페이지 데이터 조회 실패', error);
      }
    };

    fetchMyProfileData();
  }, []);

  const handleDeleteWine = async (wineId: number) => {
    try {
      await instance.delete(`/wines/${wineId}`);

      // 화면에서도 제거
      setWines((prev) => prev.filter((wine) => wine.id !== wineId));
    } catch (error) {
      console.error('와인 삭제 실패', error);
    }
  };

  const handleClickChange = () => {
    if (!inputNickname.trim()) {
      alert('닉네임을 입력해주세요.');
      return;
    }

    openModal({
      type: 'nickname',
      name: inputNickname,
      onConfirm: () => {
        setNickname(inputNickname);
        setValue('nickname', '');
      },
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="h-[90px]" />

      <main className="w-[960px] mx-auto flex">
        <ProfileSidebar
          nickname={nickname}
          profileRegister={register('profileImage')}
          nicknameRegister={register('nickname')}
          onClickChange={handleClickChange}
        />

        <section className="flex-1 px-9 py-8">
          <div className="w-[725px]">
            <ProfileTabs
              activeTab={activeTab}
              reviewCount={reviews.length}
              wineCount={wines.length}
              onChangeTab={setActiveTab}
            />

            {activeTab === 'review' &&
              (reviews.length > 0 ? (
                <ReviewList reviews={reviews} />
              ) : (
                <EmptyState message="작성한 후기가 없습니다." />
              ))}

            {activeTab === 'wine' &&
              (wines.length > 0 ? (
                <WineList wines={wines} onDeleteWine={handleDeleteWine} />
              ) : (
                <EmptyState message="등록한 와인이 없습니다." />
              ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default MyProfilePage;
