'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import TextInput from '@/components/Input/TextInput';
import Button from '@/components/Button/Button';
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

const LoginForm = () => {
  const router = useRouter();
  const isLogIn = false; // 로그인 상태 체크 > 추후에 전역 상태 관리

  // 로그인 상태에서 접근할 경우 홈 화면(/)으로 리다이렉트
  useEffect(() => {
    if (isLogIn) {
      router.push('/');
    }
  }, [isLogIn, router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupoFormValues>({
    resolver: zodResolver(signupSchema),
    mode: 'onBlur',
  });

  // 회원가입이 완료된 후 로그인 상태로 홈 화면(/)으로 이동
  const onSubmit = async (data: SignupoFormValues) => {
    console.log('회원가입 데이터:', data); // 추후에 API 호출

    router.push('/');
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

export default LoginForm;
