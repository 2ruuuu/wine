import { forwardRef } from 'react';
import Image from 'next/image';
import { Alert, Search } from '@/constants/icons';
import { TextInputProps } from './type';

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      id,
      label,
      error,
      register,
      errorType = 'default',
      isSearch = false,
      hideLabel = false,
      className,
      ...props
    },
    ref,
  ) => {
    const inputId = id || register?.name || props.name;
    const isError = !!error;

    return (
      <div>
        <div
          className={`flex items-center gap-2 ${hideLabel ? 'mb-0' : 'mb-2'}`}
        >
          <label
            htmlFor={inputId}
            className={`text-body-sm font-medium text-black ${
              hideLabel ? 'sr-only' : ''
            }`}
          >
            {label}
          </label>

          {/* 라벨 우측에 에러 메시지가 나오는 경우 */}
          {isError && errorType === 'modal' && (
            <p className="text-component-notes-md text-error">{error}</p>
          )}
        </div>

        <div className="relative">
          {/* 검색으로 사용할 경우 돋보기 아이콘 추가 */}
          {isSearch && (
            <div className="absolute inset-y-0 left-3 md:left-5 flex items-center pointer-events-none">
              <div className="w-5 h-5">
                <Image src={Search} alt="검색" />
              </div>
            </div>
          )}

          <input
            id={inputId}
            ref={ref}
            {...register}
            {...props}
            className={`
            w-full py-2 md:py-3 rounded-[4px] outline-none transition-all bg-white
            text-body-sm md:text-body-md text-[hsl(30, 2%, 19%)] 
            placeholder:text-body-sm md:placeholder:text-body-md placeholder:text-[hsl(0,0%,73%)]
            
            ${isSearch ? 'pr-4 pl-10 md:pl-13' : 'pr-9 pl-4'} 

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
              <div className="w-5 h-5 md:w-6 md:h-6">
                <Image src={Alert} alt="에러" />
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
  },
);

export default TextInput;
