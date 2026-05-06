'use client'; // 이 파일만 클라이언트 컴포넌트입니다.

import { useEffect } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';

export default function AuthInitializer() {
  useEffect(() => {
    useAuthStore.getState().setAuth({
      user: {
        id: 2969,
        nickname: 'qwerqwer',
        image: '',
        // 빠져있던 속성들을 임시로 채워주세요
        email: 'qwerqwer@email.com',
        teamId: '23-3',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mjk2OSwidGVhbUlkIjoiMjMiLCJzY29wZSI6ImFjY2VzcyIsImlhdCI6MTc3ODA1NzM0NiwiZXhwIjoxNzc4MDU5MTQ2LCJpc3MiOiJzcC1lcGlncmFtIn0._-LCi3jlz8PGZP_ZKUYGo6Z0RMYBDOJ706w12MWxVjE',
      refreshToken: '',
    });
    console.log('테스트용 토큰이 Zustand Store에 주입되었습니다.');
  }, []);

  return null; // 아무것도 렌더링하지 않습니다.
}
