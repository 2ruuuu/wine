'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import TextInput from '@/components/Input/TextInput';
import Button from '@/components/Button/Button';
import { Kakao } from '@/constants/icons';
import { useAuthStore } from '@/stores/useAuthStore';
import { LoginFormValues } from './type';

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: '이메일은 필수 입력입니다.' })
    .email({ message: '이메일 형식으로 작성해 주세요.' }),
  password: z.string().min(1, { message: '비밀번호는 필수 입력입니다.' }),
});

const LoginForm = () => {
  const router = useRouter();
  const { user, setAuth } = useAuthStore();
  const isLogIn = !!user;

  // 로그인 상태에서 접근할 경우 홈 화면(/)으로 리다이렉트
  useEffect(() => {
    if (isLogIn) {
      router.replace('/');
    }
  }, [isLogIn, router]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });

  // 로그인 성공하면 홈 화면(/)으로 이동
  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await axios.post(
        'https://winereview-api.vercel.app/23-3/auth/signIn',
        {
          email: data.email,
          password: data.password,
        },
      );

      const { user, accessToken, refreshToken } = response.data;

      if (user && accessToken && refreshToken) {
        setAuth(user, accessToken, refreshToken);
        router.replace('/');
      }
    } catch (error: any) {
      const errorMessage = '이메일 혹은 비밀번호를 확인해주세요.';

      setError('email', {
        type: 'manual',
        message: errorMessage,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-15">
      <div className="flex flex-col gap-8 md:gap-10">
        <TextInput
          label="이메일"
          type="text"
          placeholder="이메일을 입력해주세요"
          register={register('email')}
          error={errors.email?.message}
        />
        <TextInput
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          register={register('password')}
          error={errors.password?.message}
        />
      </div>
      <div className="flex flex-col gap-4">
        <Button type="submit" variant="primary" fullWidth disabled={!isValid}>
          로그인
        </Button>
        <Button
          type="button"
          variant="social"
          fullWidth
          icon={
            <Image src={Kakao} alt="kakao" className="w-5 h-5 md:w-6 md:h-6" />
          }
        >
          kakao로 시작하기
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
