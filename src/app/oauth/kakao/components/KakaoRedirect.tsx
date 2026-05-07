'use client';

import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import { socialSignIn } from '@/lib/api/auth';
import { useAuthStore } from '@/stores/useAuthStore';

const KakaoRedirect = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setAuth } = useAuthStore();
  const hasRequested = useRef(false); // useEffect가 두 번 실행되어 인가 코드가 만료되는 것을 방지

  useEffect(() => {
    const code = searchParams.get('code');

    if (code && !hasRequested.current) {
      hasRequested.current = true;
      handleLogin(code);
    }
  }, [searchParams]);

  const handleLogin = async (code: string) => {
    try {
      const response = await socialSignIn('KAKAO', {
        state: 'kakao',
        redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI || '',
        token: code,
      });

      if (response) {
        setAuth(response);
        toast.success('카카오 로그인에 성공하였습니다.');
        router.replace('/');
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || '카카오 로그인에 실패했습니다.',
      );
      router.replace('/login');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p>카카오 로그인 처리 중...</p>
    </div>
  );
};

export default KakaoRedirect;
