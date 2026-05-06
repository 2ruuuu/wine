'use client';

import { createContext, ReactNode, useContext, useState } from 'react';
import { ModalProviderProps, ModalContextProps } from './type';
import Modal from './ModalRoot';
import RegisterModal from './RegisterModal';
import Button from '@/components/Button/Button';
import ReviewModal from './ReviewModal';
import FilterModal from './FilterModal';
import NameChangeModal from './NameChangeModal';
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
          <FilterModal />
        </Modal>
      )}

      {modal?.type === 'register' && (
        <Modal
          title="와인등록"
          onClose={closeModal}
          className="md:w-[460px] w-[375px]"
          hasHead
        >
          <RegisterModal
            mode={modal.mode}
            wine={modal.wine}
            onUpdated={modal.onUpdated}
            onClose={closeModal}
          />
        </Modal>
      )}

      {modal?.type === 'review' && (
        <Modal
          title={modal.mode === 'edit' ? '리뷰수정' : '리뷰등록'}
          onClose={closeModal}
          className="md:w-[528px] w-[375px]"
          hasHead
        >

          <ReviewModal
            mode={modal.mode}
            review={modal.review}
            onUpdated={modal.onUpdated}
            onClose={closeModal}
             wineId={modal.wineId}
          />
        </Modal>
      )}

      {modal?.type === 'delete' && (
        <Modal
          title="삭제"
          onClose={closeModal}
          className="md:w-[353px] w-[312px]"
          hasHead={false}
        >
          <p className="text-center md:text-heading-md text-heading-sm">
            정말 삭제하시겠습니까?
          </p>

          <div className="flex gap-2 mt-8">
            <Button onClick={closeModal} variant="outline" className="w-1/2">
              취소
            </Button>
            <Button
              onClick={() => {
                if (modal?.type === 'delete') {
                  modal.onConfirm?.();
                }
                closeModal();
              }}
              variant="primary"
              className="w-1/2"
            >
              삭제하기
            </Button>
          </div>
        </Modal>
      )}

      {modal?.type === 'nickname' && (
        <Modal
          title="닉네임변경"
          onClose={closeModal}
          className="md:w-[353px] w-[312px]"
          hasHead={false}
        >
          <NameChangeModal
            name={modal.name}
            onClose={closeModal}
            onConfirm={modal.onConfirm}
          />
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
