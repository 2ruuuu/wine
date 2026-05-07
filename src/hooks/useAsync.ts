import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';

export const useAsync = () => {
  const [isLoading, setIsLoading] = useState(false);

  const runAction = useCallback(
    async <T>(action: () => Promise<T>): Promise<T | undefined> => {
      if (isLoading) {
        return; // 이미 로딩 중이면 무시 > 중복 클릭 방지
      }

      setIsLoading(true);

      try {
        return await action(); // 전달받은 비동기 함수 실행
      } catch (error) {
        toast.error(`${error}`);
      } finally {
        setIsLoading(false); // 자동으로 로딩 해제
      }
    },
    [isLoading],
  );

  return { isLoading, runAction };
};
