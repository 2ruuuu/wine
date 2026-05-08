'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import TextInput from '@/components/Input/TextInput';
import Button from '@/components/Button/Button';
import { useAuthStore } from '@/stores/useAuthStore';
import { signUp } from '@/lib/api/auth';
import { useAsync } from '@/hooks/useAsync';
import { SignupFormValues } from './type';

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
  const { isLoading, runAction } = useAsync();

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
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: 'onTouched',
  });

  const onSubmit = async (data: SignupFormValues) => {
    await runAction(async () => {
      try {
        const response = await signUp(data);

        if (response) {
          setAuth(response);
          toast.success('회원가입 후 로그인에 성공하였습니다.');
          router.replace('/');
        }
      } catch (error: any) {
        const errorMessage = error.response?.data?.message;

        if (errorMessage?.includes('이메일')) {
          setError('email', { message: '이미 사용 중인 이메일입니다.' });
        } else if (errorMessage?.includes('닉네임')) {
          setError('nickname', { message: '이미 사용 중인 닉네임입니다.' });
        } else {
          toast.error('회원가입에 실패했습니다.');
        }
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-15">
      <div className="flex flex-col gap-8 md:gap-10">
        <TextInput
          label="이메일"
          type="email"
          name="email"
          placeholder="이메일을 입력해주세요"
          register={register('email')}
          error={errors.email?.message}
        />
        <TextInput
          label="닉네임"
          type="text"
          name="nickname"
          placeholder="닉네임을 입력해주세요"
          register={register('nickname')}
          error={errors.nickname?.message}
        />
        <TextInput
          label="비밀번호"
          type="password"
          name="password"
          placeholder="영문, 숫자, 특수문자(!@#$%^&*) 제한"
          register={register('password')}
          error={errors.password?.message}
        />
        <TextInput
          label="비밀번호 확인"
          type="password"
          name="passwordConfirmation"
          placeholder="비밀번호 확인"
          register={register('passwordConfirmation')}
          error={errors.passwordConfirmation?.message}
        />
      </div>
      <Button
        type="submit"
        variant="primary"
        fullWidth
        disabled={!isValid || isLoading}
      >
        가입하기
      </Button>
    </form>
  );
};

export default SignupForm;
