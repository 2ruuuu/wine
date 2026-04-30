import { SignupFormValues } from '@/app/signup/components/type';
import { LoginFormValues } from '@/app/login/components/type';
import { AuthResponse } from '@/stores/useAuthStore';
import { instance } from './axios';

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
  const { data } = await instance.post('/auth/refresh-token', { refreshToken });
  return data;
};
