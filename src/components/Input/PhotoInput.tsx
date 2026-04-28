import { ChangeEvent, useState, forwardRef } from 'react';
import Image from 'next/image';
import { CameraBlack, CameraGray } from '@/constants/icons';
import { profileImage } from '@/constants/images';
import { PhotoInputProps } from './type';

const PhotoInput = forwardRef<HTMLInputElement, PhotoInputProps>(
  (
    {
      id,
      label,
      error,
      register,
      variant = 'square',
      hideLabel = false,
      className,
      ...props
    },
    ref,
  ) => {
    const inputId = id || register?.name || props.name;
    const isError = !!error;
    const isCircle = variant === 'circle';
    const [preview, setPreview] = useState<string | null>(null);

    // 이미지 첨부 시 미리보기
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (!file) return;

      setPreview(URL.createObjectURL(file));

      if (register?.onChange) {
        register.onChange(e);
      } else if (props.onChange) {
        props.onChange(e);
      }
    };

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
        </div>

        <div>
          <input
            type="file"
            id={inputId}
            accept="image/*"
            className="hidden"
            ref={ref}
            {...props}
            {...register}
            onChange={handleImageChange}
          />

          <div className="flex items-end gap-2">
            <label
              htmlFor={inputId}
              className={`
              group relative flex items-center justify-center overflow-hidden bg-white cursor-pointer

              ${
                isCircle
                  ? 'rounded-full w-20 h-20 md:w-25 md:h-25 lg:w-41 lg:h-41 hover:bg-gray-300 hover:border hover:border-[hsl(0,0%,82%)]'
                  : 'rounded-[4px] w-35 h-35 border hover:bg-gray-100 active:bg-[hsl(0,0%,95%)]'
              }

              ${isError ? 'border-2 border-error' : 'border-gray-300'}
            `}
            >
              {preview ? (
                <Image
                  src={preview}
                  alt="미리보기"
                  fill
                  className="object-cover"
                />
              ) : isCircle ? (
                <div className="w-full h-full">
                  <Image
                    src={profileImage}
                    alt="기본 프로필"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-8 h-8">
                  <Image src={CameraGray} alt="사진 추가" />
                </div>
              )}

              {/* 기본 프로필 또는 이미지 첨부 후 hover 효과 */}
              {(isCircle || preview) && (
                <div
                  className={`absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100
                  ${preview ? 'bg-black/40' : 'bg-gray-300/30'}
                `}
                >
                  <div
                    className={
                      isCircle
                        ? 'w-6 h-6 md:w-7 md:h-7 lg:w-12 lg:h-12'
                        : 'w-8 h-8'
                    }
                  >
                    <Image
                      src={isCircle ? CameraBlack : CameraGray}
                      alt="변경하기"
                      className={preview ? 'brightness-0 invert' : ''}
                    />
                  </div>
                </div>
              )}
            </label>

            {isError && (
              <p className="text-component-notes-md text-error">{error}</p>
            )}
          </div>
        </div>
      </div>
    );
  },
);

export default PhotoInput;
