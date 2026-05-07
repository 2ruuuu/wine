'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import MyProfilePage from './components/MyProfilePage/MyProfilePage';

import { useAuthStore } from '@/stores/useAuthStore';

const MyProfile = () => {
  const router = useRouter();

  const { user, accessToken } = useAuthStore();

  useEffect(() => {
    if (!user || !accessToken) {
      router.replace('/login');
    }
  }, [user, accessToken, router]);

  if (!user || !accessToken) {
    return null;
  }

  return <MyProfilePage />;
};

export default MyProfile;
