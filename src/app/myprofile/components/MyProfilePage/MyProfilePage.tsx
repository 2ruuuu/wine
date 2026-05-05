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

import { ChangeEvent, useEffect, useState } from 'react';
import { instance } from '@/lib/api/axios';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/stores/useAuthStore';

const MyProfilePage = () => {
  const { user, setAuth, accessToken, refreshToken } = useAuthStore();

  const [nickname, setNickname] = useState(user?.nickname ?? '');
  const [profileImage, setProfileImage] = useState(user?.image ?? null);
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
    if (user?.nickname) {
      setNickname(user.nickname);
    }

    if (user?.image) {
      setProfileImage(user.image);
    }
  }, [user?.nickname, user?.image]);

  useEffect(() => {
    if (!accessToken) return;

    const fetchMyProfileData = async () => {
      try {
        const meRes = await instance.get('/users/me');

        console.log('내 정보 응답:', meRes.data);

        const myInfo = meRes.data;

        setNickname(myInfo.nickname ?? '');
        setProfileImage(myInfo.image ?? null);

        if (refreshToken) {
          setAuth({
            user: myInfo,
            accessToken,
            refreshToken,
          });
        }

        const reviewRes = await instance.get('/users/me/reviews', {
          params: {
            limit: 10,
          },
        });

        const wineRes = await instance.get('/users/me/wines', {
          params: {
            limit: 10,
          },
        });

        setReviews(reviewRes.data.list);
        setWines(wineRes.data.list);
      } catch (error) {
        console.error('마이페이지 데이터 조회 실패', error);
        toast.error('마이페이지 데이터를 불러오지 못했습니다.');
      }
    };

    fetchMyProfileData();
  }, [accessToken, refreshToken, setAuth]);

  const handleDeleteWine = async (wineId: number) => {
    try {
      await instance.delete(`/wines/${wineId}`);

      // 화면에서도 제거
      setWines((prev) => prev.filter((wine) => wine.id !== wineId));
    } catch (error) {
      console.error('와인 삭제 실패', error);
      toast.error('와인 삭제에 실패했습니다.');
    }
  };

  const handleDeleteReview = async (reviewId: number) => {
    try {
      await instance.delete(`/reviews/${reviewId}`);

      setReviews((prev) => prev.filter((review) => review.id !== reviewId));
    } catch (error) {
      console.error('리뷰 삭제 실패', error);
      toast.error('리뷰 삭제에 실패했습니다.');
    }
  };

  const handleChangeProfileImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const token = useAuthStore.getState().accessToken;

    if (!token) {
      toast.error('로그인이 필요합니다.');
      return;
    }

    try {
      const imageFormData = new FormData();
      imageFormData.append('image', file);

      const imageRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/images/upload`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: imageFormData,
        },
      );

      const imageData = await imageRes.json();

      if (!imageRes.ok) {
        toast.error('이미지 업로드에 실패했습니다.');
        return;
      }

      const imageUrl = imageData.url;

      const res = await instance.patch('/users/me', {
        nickname,
        image: imageUrl,
      });

      const updatedUser = res.data;
      const updatedImage = updatedUser.image ?? imageUrl;

      setProfileImage(updatedImage);

      if (user && accessToken && refreshToken) {
        setAuth({
          user: {
            ...user,
            image: updatedImage,
          },
          accessToken,
          refreshToken,
        });
      }

      toast.success('프로필 이미지가 변경되었습니다.');
    } catch (error) {
      console.error('프로필 이미지 변경 실패', error);
      toast.error('프로필 이미지 변경에 실패했습니다.');
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
      onConfirm: async () => {
        try {
          const res = await instance.patch('/users/me', {
            nickname: inputNickname,
          });

          const updatedUser = res.data;

          setNickname(updatedUser.nickname ?? inputNickname);

          if (user && accessToken && refreshToken) {
            setAuth({
              user: {
                ...user,
                nickname: updatedUser.nickname ?? inputNickname,
              },
              accessToken,
              refreshToken,
            });
          }

          setValue('nickname', '');
          toast.success('닉네임이 변경되었습니다.');
        } catch (error: any) {
          console.error('닉네임 변경 실패', error);
          console.log('서버 에러 응답:', error.response?.data);
          toast.error('닉네임 변경에 실패했습니다.');
        }
      },
    });
  };

  console.log('프로필 이미지 URL:', profileImage);
  console.log('user.image:', user?.image);

  return (
    <div className="min-h-screen bg-white">
      <div className="h-[90px]" />

      <main className="w-[960px] mx-auto flex">
        <ProfileSidebar
          nickname={nickname}
          imageUrl={profileImage}
          profileRegister={register('profileImage')}
          nicknameRegister={register('nickname')}
          onClickChange={handleClickChange}
          onChangeProfileImage={handleChangeProfileImage}
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
                <ReviewList
                  reviews={reviews}
                  onDeleteReview={handleDeleteReview}
                />
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
