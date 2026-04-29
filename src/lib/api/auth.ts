import { SignupoFormValues } from '@/app/signup/components/type';
import { LoginFormValues } from '@/app/login/components/type';
import { AuthResponse } from '@/stores/useAuthStore';
import { instance } from './axios';

// 회원가입
export const signUp = async (
  formData: SignupoFormValues,
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
