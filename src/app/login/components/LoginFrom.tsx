'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import TextInput from '@/components/Input/TextInput';
import Button from '@/components/Button/Button';
import { Kakao } from '@/constants/icons';
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

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      console.log('로그인 데이터:', data); // 추후에 API 호출

      const isSuccess = true; // 로그인 성공 여부 > 추후에 전역 상태 관리

      // 로그인 성공하면 홈 화면(/)으로 이동
      if (isSuccess) {
        router.push('/');
      } else {
        throw new Error('fail');
      }
    } catch (error) {
      setError('email', {
        type: 'manual',
        message: '이메일 혹은 비밀번호를 확인해주세요.',
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
