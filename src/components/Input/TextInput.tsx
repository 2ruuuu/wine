import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import Image from 'next/image';
import { SVG_ICONS } from '@/constants/svgIcons';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  error?: string;
  register: UseFormRegisterReturn;
  errorType?: 'default' | 'modal'; // default일 경우 인풋 하단, modal일 경우 라벨 우측에 에러 메시지 출력
}

const TextInput = ({
  id,
  label,
  error,
  register,
  errorType = 'default',
  className,
  ...props
}: TextInputProps) => {
  const inputId = id || register.name;
  const isError = !!error;

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        {label && (
          <label
            htmlFor={inputId}
            className="text-body-sm font-medium text-black"
          >
            {label}
          </label>
        )}

        {/* 라벨 우측에 에러 메시지가 나오는 경우 */}
        {isError && errorType === 'modal' && (
          <p className="text-component-notes-md text-error">{error}</p>
        )}
      </div>

      <div className="relative">
        <input
          id={inputId}
          {...register}
          {...props}
          className={`
            w-full py-2 md:py-3 pl-4 pr-9 rounded-[4px] outline-none transition-all bg-white
            placeholder:text-body-sm md:placeholder:text-body-md placeholder:text-[hsl(0,0%,73%)]
            ${
              isError
                ? 'border-2 border-error focus:border-error'
                : 'border border-gray-300 focus:border-gray-400'
            }
            ${className}
          `}
        />

        {isError && (
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
            <div className="w-4 h-4 md:w-5 md:h-5">
              <Image src={SVG_ICONS.ERROR} alt="에러" />
            </div>
          </div>
        )}
      </div>

      {/* 인풋 하단에 에러 메시지가 나오는 경우 */}
      {isError && errorType === 'default' && (
        <p className="text-component-notes-md text-error mt-1">{error}</p>
      )}
    </div>
  );
};

export default TextInput;
