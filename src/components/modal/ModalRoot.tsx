'use client';

import { ModalRootProps } from './type';
import Image from 'next/image';
import { Close } from '@/constants/icons';

const Modal = ({
  title,
  children,
  onClose,
  hasHead,
  className,
}: ModalRootProps) => {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#101318]/30 px-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`rounded-[16px] bg-white shadow-xl py-8 px-6 ${className}`}
      >
        {hasHead && (
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[24px]">{title}</h2>
            <button onClick={onClose}>
              <Image
                src={Close}
                alt="닫기"
                className="w-8 h-8 invert-80 cursor-pointer"
              />
            </button>
          </div>
        )}

        {children}
      </div>
    </div>
  );
};

export default Modal;
