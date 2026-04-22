'use client';

import { ReactNode } from 'react';
import Image from 'next/image';
import Close from '@/assets/icons/close.svg';

type Props = {
  title: string;
  children: ReactNode;
  onClose: () => void;
  hasHead?: boolean;
  className?: string;
};

const Modal = ({ title, children, onClose, hasHead, className }: Props) => {
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

// 사용예시
// <button
//   onClick={() => openModal({ type: 'filter' })}
// >
//   필터
// </button>

// <button
//   onClick={() => openModal({ type: 'register' })}
// >
//   와인등록
// </button>
// <button
//   onClick={() => openModal({ type: 'review' })}
// >
//   리뷰등록
// </button>
// <button
//   onClick={() => openModal({ type: 'delete' })}
// >
//   삭제
// </button>
// <button
//   onClick={() => openModal({ type: 'nickname' })}
// >
//   닉네임변경
// </button>
