import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

export interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label: string;
  error?: string;
  register?: UseFormRegisterReturn;
  errorType?: 'default' | 'modal'; // default일 경우 인풋 하단, modal일 경우 라벨 우측에 에러 메시지 출력
  isSearch?: boolean;
  hideLabel?: boolean;
}

export interface PhotoInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label: string;
  error?: string;
  register?: UseFormRegisterReturn;
  variant?: 'circle' | 'square'; // 프로필일 경우 원형, 사진일 경우 사각형
  hideLabel?: boolean;
}
