'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import TextInput from '@/components/Input/TextInput';
import Button from '@/components/Button/Button';
import { useAuthStore } from '@/stores/useAuthStore';
import { SignupoFormValues } from './type';

const signupSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: '이메일은 필수 입력입니다.' })
      .email({ message: '이메일 형식으로 작성해 주세요.' }),
    nickname: z
      .string()
      .min(1, { message: '닉네임은 필수 입력입니다.' })
      .max(20, { message: '닉네임은 최대 20자까지 가능합니다.' }),
    password: z
      .string()
      .min(1, { message: '비밀번호는 필수 입력입니다.' })
      .min(8, { message: '비밀번호는 최소 8자 이상입니다.' })
      .regex(/^[a-zA-Z0-9!@#$%^&*]*$/, {
        message: '비밀번호는 숫자, 영문, 특수문자로만 가능합니다.',
      }),
    passwordConfirmation: z
      .string()
      .min(1, { message: '비밀번호 확인을 입력해주세요.' }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirmation'],
  });

const SignupForm = () => {
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
  } = useForm<SignupoFormValues>({
    resolver: zodResolver(signupSchema),
    mode: 'onBlur',
  });

  // 회원가입이 완료된 후 로그인 상태로 홈 화면(/)으로 이동
  const onSubmit = async (data: SignupoFormValues) => {
    try {
      const response = await axios.post(
        'https://winereview-api.vercel.app/23-3/auth/signUp',
        {
          email: data.email,
          nickname: data.nickname,
          password: data.password,
          passwordConfirmation: data.passwordConfirmation,
        },
      );

      const { user, accessToken, refreshToken } = response.data;

      if (user && accessToken && refreshToken) {
        setAuth(user, accessToken, refreshToken);
        router.replace('/');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message;

      if (errorMessage?.includes('이메일')) {
        setError('email', { message: '이미 사용 중인 이메일입니다.' });
      } else if (errorMessage?.includes('닉네임')) {
        setError('nickname', { message: '이미 사용 중인 닉네임입니다.' });
      } else {
        alert('회원가입에 실패했습니다.');
      }
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
          label="닉네임"
          type="text"
          placeholder="닉네임을 입력해주세요"
          register={register('nickname')}
          error={errors.nickname?.message}
        />
        <TextInput
          label="비밀번호"
          type="password"
          placeholder="영문, 숫자, 특수문자(!@#$%^&*) 제한"
          register={register('password')}
          error={errors.password?.message}
        />
        <TextInput
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호 확인"
          register={register('passwordConfirmation')}
          error={errors.passwordConfirmation?.message}
        />
      </div>
      <Button type="submit" variant="primary" fullWidth disabled={!isValid}>
        가입하기
      </Button>
    </form>
  );
};

export default SignupForm;
