'use client';

import { createContext, ReactNode, useContext, useState } from 'react';
import { ModalProviderProps, ModalContextProps } from './type';
import Modal from './ModalRoot';

const ModalContext = createContext<ModalContextProps | null>(null);

const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modal, setModal] = useState<ModalProviderProps>(null);

  const openModal = (modal: Exclude<ModalProviderProps, null>) =>
    setModal(modal);
  const closeModal = () => setModal(null);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      {modal?.type === 'filter' && (
        <Modal title="필터" onClose={closeModal} className="w-[375px]" hasHead>
          <div>필터</div>
        </Modal>
      )}

      {modal?.type === 'register' && (
        <Modal
          title="와인등록"
          onClose={closeModal}
          className="md:w-[460px] w-[375px]"
          hasHead
        >
          <div>와인등록</div>
        </Modal>
      )}

      {modal?.type === 'review' && (
        <Modal
          title="리뷰등록"
          onClose={closeModal}
          className="md:w-[528px] w-[375px]"
          hasHead
        >
          <div>리뷰등록</div>
        </Modal>
      )}

      {modal?.type === 'delete' && (
        <Modal
          title="삭제"
          onClose={closeModal}
          className="md:w-[353px] w-[312px]"
          hasHead={false}
        >
          <p>삭제하시겠습니까?</p>
          <button onClick={closeModal}>닫기</button>
        </Modal>
      )}

      {modal?.type === 'nickname' && (
        <Modal
          title="닉네임변경"
          onClose={closeModal}
          className="md:w-[353px] w-[312px]"
          hasHead={false}
        >
          <p>
            ‘와인고르는중’으로
            <br />
            닉네임을 변경할까요??
          </p>
          <button onClick={closeModal}>닫기</button>
        </Modal>
      )}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModal must be used inside ModalProvider');
  }

  return context;
};

export default ModalProvider;

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
