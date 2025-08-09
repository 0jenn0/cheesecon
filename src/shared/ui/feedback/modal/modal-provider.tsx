'use client';

import { createContext, useCallback, useContext, useState } from 'react';
import Modal from './modal';
import { MODAL_CONFIG } from './modal-config';

export type ModalType = keyof typeof MODAL_CONFIG;

export interface ModalContextType {
  isOpen: boolean;
  modalType: ModalType | null;
  modalProps: Record<string, any> | null;
  openModal: (modalType: ModalType, props?: Record<string, any>) => void;
  closeModal: () => void;
}

const defaultContext: ModalContextType = {
  isOpen: false,
  modalType: null,
  modalProps: null,
  openModal: () => {},
  closeModal: () => {},
};

export const ModalContext = createContext<ModalContextType>(defaultContext);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType | null>(null);
  const [modalProps, setModalProps] = useState<Record<string, any> | null>(
    null,
  );

  const ModalComponent = modalType ? MODAL_CONFIG[modalType] : null;

  const openModal = useCallback(
    (type: ModalType, props?: Record<string, any>) => {
      setModalType(type);
      setModalProps(props || null);
      setIsOpen(true);
    },
    [],
  );

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setModalType(null);
    setModalProps(null);
  }, []);

  return (
    <ModalContext.Provider
      value={{ isOpen, modalType, modalProps, openModal, closeModal }}
    >
      {children}
      <Modal.Portal isOpen={isOpen} onClose={closeModal}>
        {isOpen && modalType && ModalComponent && modalProps && (
          <ModalComponent {...(modalProps as any)} />
        )}
      </Modal.Portal>
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModal는 ModalProvider 내에서 사용되어야 합니다.');
  }

  return context;
}
