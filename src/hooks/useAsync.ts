import { useLoadingStore } from '@/stores/useLoadingStore';

export const useAsync = () => {
  const isLoading = useLoadingStore((state) => state.isLoading);
  const setIsLoading = useLoadingStore((state) => state.setIsLoading);

  const runAction = async (action: () => Promise<void>) => {
    if (isLoading) {
      return; // 이미 로딩 중이면 무시 > 중복 클릭 방지
    }

    setIsLoading(true);

    try {
      await action(); // 전달받은 비동기 함수 실행
    } finally {
      setIsLoading(false); // 자동으로 로딩 해제
    }
  };

  return { isLoading, runAction };
};
