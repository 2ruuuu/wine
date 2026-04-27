'use client';

import { useForm } from 'react-hook-form';
import Image from 'next/image';
import TextInput from '@/components/Input/TextInput';
import Button from '@/components/Button/Button';
import { Kakao } from '@/constants/icons';
import { LoginFormValues } from './type';

const LoginForm = () => {
  const { register } = useForm<LoginFormValues>();

  return (
    <form className="flex flex-col gap-15">
      <div className="flex flex-col gap-8 md:gap-10">
        <TextInput
          label="이메일"
          type="text"
          placeholder="이메일을 입력해주세요"
          register={register('email')}
        />
        <TextInput
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          register={register('password')}
        />
      </div>
      <div className="flex flex-col gap-4">
        <Button type="submit" variant="primary" fullWidth>
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
