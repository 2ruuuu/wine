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

  const handleUpdateWine = async () => {
    try {
      const wineRes = await instance.get('/users/me/wines', {
        params: {
          limit: 10,
        },
      });

      setWines(wineRes.data.list);
    } catch (error) {
      console.error('와인 목록 갱신 실패', error);
      toast.error('와인 목록을 다시 불러오지 못했습니다.');
    }
  };

  const handleDeleteWine = (wineId: number) => {
    openModal({
      type: 'delete',
      onConfirm: async () => {
        try {
          await instance.delete(`/wines/${wineId}`);

          setWines((prev) => prev.filter((wine) => wine.id !== wineId));

          toast.success('삭제되었습니다.');
        } catch (error) {
          console.error('와인 삭제 실패', error);
          toast.error('와인 삭제에 실패했습니다.');
        }
      },
    });
  };

  const handleDeleteReview = (reviewId: number) => {
    openModal({
      type: 'delete',
      onConfirm: async () => {
        try {
          await instance.delete(`/reviews/${reviewId}`);

          setReviews((prev) => prev.filter((review) => review.id !== reviewId));

          toast.success('삭제되었습니다.');
        } catch (error) {
          console.error('리뷰 삭제 실패', error);
          toast.error('리뷰 삭제에 실패했습니다.');
        }
      },
    });
  };

  const handleUpdateReview = (updatedReview: Review) => {
    setReviews((prev) =>
      prev.map((review) =>
        review.id === updatedReview.id ? updatedReview : review,
      ),
    );
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
      toast.error('닉네임을 입력해주세요.');
      return;
    }

    openModal({
      type: 'nickname',
      name: inputNickname,
      onConfirm: async () => {
        try {
          const nextNickname = inputNickname.trim();

          const payload =
            profileImage === null
              ? { nickname: nextNickname }
              : { nickname: nextNickname, image: profileImage };

          const res = await instance.patch('/users/me', payload);

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
          toast.error(
            error.response?.data?.message ?? '닉네임 변경에 실패했습니다.',
          );
        }
      },
    });
  };

  console.log('프로필 이미지 URL:', profileImage);
  console.log('user.image:', user?.image);

  return (
    <div className="min-h-screen bg-white">
      <div className="h-[90px]" />

      <main
        className="
          mx-auto
          flex
          w-full
          max-w-[343px]
          flex-col

          min-[744px]:max-w-[704px]

          min-[1280px]:w-[960px]
          min-[1280px]:max-w-none
          min-[1280px]:flex-row
        "
      >
        <ProfileSidebar
          nickname={nickname}
          imageUrl={profileImage}
          profileRegister={register('profileImage')}
          nicknameRegister={register('nickname')}
          onClickChange={handleClickChange}
          onChangeProfileImage={handleChangeProfileImage}
        />

        <section
          className="
            w-full
            py-8

            min-[1280px]:flex-1
            min-[1280px]:px-9
            min-[1280px]:py-8
          "
        >
          <div className="w-full">
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
                  onUpdateReview={(review) =>
                    openModal({
                      type: 'review',
                      mode: 'edit',
                      review,
                      onUpdated: handleUpdateReview,
                    })
                  }
                />
              ) : (
                <EmptyState message="작성한 후기가 없습니다." />
              ))}

            {activeTab === 'wine' &&
              (wines.length > 0 ? (
                <WineList
                  wines={wines}
                  onDeleteWine={handleDeleteWine}
                  onUpdateWine={handleUpdateWine}
                />
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
