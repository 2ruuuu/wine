'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import Header from '@/components/gnb/Header';
import { useModal } from '@/components/modal/ModalProvider';

import ProfileSidebar from '../ProfileSidebar/ProfileSidebar';
import ProfileTabs from '../ProfileTabs/ProfileTabs';
import ReviewList from '../ReviewList/ReviewList';
import WineList from '../WineList/WineList';
import EmptyState from '../EmptyState/EmptyState';

import userMeReviewData from '@/mocks/usermeReview.json';
import { MyProfileForm, ProfileTabType } from './type';

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

  const { openModal, closeModal } = useModal();

  const inputNickname = watch('nickname');

  const reviews = userMeReviewData.list as any[];
  const wines: any[] = [];

  const handleClickChange = () => {
    if (!inputNickname.trim()) {
      alert('닉네임을 입력해주세요.');
      return;
    }

    openModal({
      type: 'nickname',
      nickname: inputNickname,
      onConfirm: () => {
        setNickname(inputNickname);
        setValue('nickname', '');
        closeModal();
      },
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header isLogIn={true} HeaderBg={false} />

      <div className="h-[90px]" />

      <main className="w-[960px] mx-auto flex">
        <ProfileSidebar
          nickname={nickname}
          profileRegister={register('profileImage')}
          nicknameRegister={register('nickname')}
          onClickChange={handleClickChange}
        />

        <section className="flex-1 px-9 py-8">
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
              <WineList wines={wines} />
            ) : (
              <EmptyState message="등록한 와인이 없습니다." />
            ))}
        </section>
      </main>
    </div>
  );
};

export default MyProfilePage;
