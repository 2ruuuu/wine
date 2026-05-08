import axios from 'axios';
import { SignupFormValues } from '@/app/signup/components/type';
import { LoginFormValues } from '@/app/login/components/type';
import { AuthResponse } from '@/stores/useAuthStore';
import { instance } from './axios';

export interface SocialLoginRequest {
  state: string;
  redirectUri: string;
  token: string;
}

// 회원가입
export const signUp = async (
  formData: SignupFormValues,
): Promise<AuthResponse> => {
  const { data } = await instance.post<AuthResponse>('/auth/signUp', formData);
  return data;
};

// 로그인
export const signIn = async (
  formData: LoginFormValues,
): Promise<AuthResponse> => {
  const { data } = await instance.post<AuthResponse>('/auth/signIn', formData);
  return data;
};

// 토큰 갱신
export const refreshTokenApi = async (
  refreshToken: string,
): Promise<{ accessToken: string }> => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh-token`,
    { refreshToken },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return data;
};

// 간편 로그인 - 카카오
export const socialSignIn = async (
  provider: 'KAKAO',
  body: SocialLoginRequest,
): Promise<AuthResponse> => {
  const { data } = await instance.post<AuthResponse>(
    `/auth/signIn/${provider}`,
    body,
  );
  return data;
};
