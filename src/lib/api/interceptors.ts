import { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/stores/useAuthStore';
import { refreshTokenApi } from './auth';

interface FailedRequest {
  resolve: (token: string) => void;
  reject: (error: any) => void;
}

export const setupInterceptors = (instance: AxiosInstance) => {
  let isRefreshing = false; // 현재 토큰 재발급 API가 진행 중인지 확인하는 플래그
  let failedQueue: FailedRequest[] = []; // 토큰 재발급 동안 401 에러로 대기 중인 요청들의 resolve/reject 함수를 저장하는 배열

  // 큐 처리 함수 - 토큰 재발급이 완료되면 대기 중이던 요청들을 한꺼번에 처리
  const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
      if (error) prom.reject(error);
      else if (token) prom.resolve(token);
    });
    failedQueue = [];
  };

  // 요청 인터셉터 - Zustand store의 최신 토큰을 자동으로 헤더에 주입
  instance.interceptors.request.use((config) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  // 응답 인터셉터 - 서버로부터의 응답을 가로채서 401 에러 시 수행
  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      // 에러 설정이 없거나 401이 아니면 바로 거절
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };

      if (originalRequest.url?.includes('/auth/refresh-token')) {
        useAuthStore.getState().clearAuth();
        return Promise.reject(error);
      }

      // 401 에러이고, 이전에 재시도한 적이 없는 요청인 경우
      if (error.response?.status === 401 && !originalRequest._retry) {
        // 이미 다른 요청 때문에 토큰 재발급이 진행 중일 때
        if (isRefreshing) {
          // 새로운 Promise를 생성하여 failedQueue에 넣고, 재발급이 완료될 때까지 대기
          return new Promise<string>((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              // 재발급 성공 시 새 토큰으로 헤더를 교체하고 원래 요청을 다시 보냄
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return instance(originalRequest);
            })
            .catch((err) => Promise.reject(err)); // 재발급 실패 시 에러 반환
        }

        originalRequest._retry = true; // 동일 요청 무한 루프 방지용 플래그
        isRefreshing = true;

        // 첫 번째로 401을 맞이한 요청일 때
        try {
          const {
            user,
            refreshToken: storedRefreshToken,
            setAuth,
          } = useAuthStore.getState();

          // 유저 정보나 리프레시 토큰 중 하나라도 없으면 재발급이 불가능하므로 에러를 던짐
          if (!user || !storedRefreshToken) {
            throw new Error('인증 정보가 유실되었습니다.');
          }

          // Refresh Token으로 새 Access Token 요청
          const { accessToken: newAccessToken } =
            await refreshTokenApi(storedRefreshToken);

          // Zustand store 업데이트
          setAuth({
            user, // 기존 유저 정보 유지
            accessToken: newAccessToken,
            refreshToken: storedRefreshToken, // refresh는 그대로 유지하거나 서버 응답에 따라 교체
          });

          // 대기 중이었던 다른 요청들(failedQueue)에게 새 토큰 전달하여 실행
          processQueue(null, newAccessToken);

          // 현재의 '첫 번째' 실패 요청도 새 토큰으로 교체 후 재요청
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          }
          return instance(originalRequest);
        } catch (refreshError) {
          // 재발급 실패 시 로그아웃 처리
          processQueue(refreshError, null);
          useAuthStore.getState().clearAuth();
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false; // 성공하든 실패하든 상태 초기화
        }
      }

      return Promise.reject(error);
    },
  );
};
