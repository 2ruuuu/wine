'use client';

import { useForm } from 'react-hook-form';
import TextInput from '@/components/Input/TextInput';
import Button from '@/components/Button/Button';
import { SignupoFormValues } from './type';

const LoginForm = () => {
  const { register } = useForm<SignupoFormValues>();

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
          label="닉네임"
          type="text"
          placeholder="닉네임을 입력해주세요"
          register={register('nickname')}
          error="닉네임은 최대 20자까지 가능합니다"
        />
        <TextInput
          label="비밀번호"
          type="password"
          placeholder="영문, 숫자, 특수문자(!@#$%^&*) 제한"
          register={register('password')}
        />
        <TextInput
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호 확인"
          register={register('passwordConfirmation')}
        />
      </div>
      <Button type="submit" variant="primary" fullWidth>
        가입하기
      </Button>
    </form>
  );
};

export default LoginForm;
