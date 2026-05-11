'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { useAuthStore } from '@/stores/useAuthStore';

import MyProfilePage from './components/MyProfilePage/MyProfilePage';

const MyProfile = () => {
  const router = useRouter();

  const { user, accessToken } = useAuthStore();

  const [isReady, setIsReady] = useState(false);
  const hadAuthRef = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (user && accessToken) {
      hadAuthRef.current = true;
    }
  }, [user, accessToken]);

  useEffect(() => {
    if (!isReady) return;

    if (!user || !accessToken) {
      if (hadAuthRef.current) {
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
