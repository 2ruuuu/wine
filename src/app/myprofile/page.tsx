'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import MyProfilePage from './components/MyProfilePage/MyProfilePage';

import { useAuthStore } from '@/stores/useAuthStore';

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
      const isLogout = sessionStorage.getItem('isLogout');

      if (isLogout === 'true') {
        sessionStorage.removeItem('isLogout');
        router.replace('/');
        return;
      }

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
