import { Suspense } from 'react';

import KakaoRedirect from './components/KakaoRedirect';

export default function KakaoPage() {
  return (
    <Suspense fallback={<div>카카오 로그인 처리 중...</div>}>
      <KakaoRedirect />
    </Suspense>
  );
}
