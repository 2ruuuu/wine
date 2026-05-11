'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useAuthStore } from '@/stores/useAuthStore';

import MyProfilePage from './components/MyProfilePage/MyProfilePage';

const MyProfile = () => {
  const router = useRouter();

  const { user, accessToken } = useAuthStore();

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isReady) return;

    if (!user || !accessToken) {
      router.replace('/login');
    }
  }, [isReady, user, accessToken, router]);

  if (!isReady) {
    return null;
  }

  if (!user || !accessToken) {
    return null;
  }

  return <MyProfilePage />;
};

export default MyProfile;
