'use client';

import { createContext, useCallback, useContext, useState } from 'react';
import Modal from './modal';
import { MODAL_CONFIG } from './modal-config';

export const MODAL_Z_INDEX = 1051;

export type ModalType = keyof typeof MODAL_CONFIG;

export interface ModalItem {
  id: string;
  type: ModalType;
  props: Record<string, unknown> | null;
  zIndex: number;
  openedAt: number;
}

export interface ModalContextType {
  modals: ModalItem[];
  openModal: (
    modalType: ModalType,
    props?: Record<string, unknown>,
    options?: { showOverlay?: boolean; forceZIndex?: number },
  ) => string;
  closeModal: (id?: string) => void;
  closeAllModals: () => void;
}

const defaultContext: ModalContextType = {
  modals: [],
  openModal: () => '',
  closeModal: () => {},
  closeAllModals: () => {},
};

export const ModalContext = createContext<ModalContextType>(defaultContext);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modals, setModals] = useState<ModalItem[]>([]);

  const openModal = useCallback(
    (
      type: ModalType,
      props?: Record<string, unknown>,
      options?: { showOverlay?: boolean; forceZIndex?: number },
    ) => {
      const now = Date.now();
      const id = `modal-${now}-${Math.random().toString(36).substr(2, 9)}`;

      setModals((prev) => {
        const baseZIndex =
          options?.forceZIndex || MODAL_Z_INDEX + prev.length * 10;
        const zIndex =
          Math.max(baseZIndex, ...prev.map((m) => m.zIndex), MODAL_Z_INDEX) +
          10;

        const newModal: ModalItem = {
          id,
          type,
          props: props || null,
          zIndex,
          openedAt: now,
        };

        const newModals = [...prev, newModal];

        return newModals;
      });

      return id;
    },
    [],
  );

  const closeModal = useCallback((id?: string) => {
    if (id) {
      setModals((prev) => prev.filter((modal) => modal.id !== id));
    } else {
      setModals((prev) => prev.slice(0, -1));
    }
  }, []);

  const closeAllModals = useCallback(() => {
    setModals([]);
  }, []);

  return (
    <ModalContext.Provider
      value={{ modals, openModal, closeModal, closeAllModals }}
    >
      {children}
      {modals
        .sort((a, b) => a.zIndex - b.zIndex)
        .flatMap((modal) => {
          const ModalComponent = MODAL_CONFIG[modal.type];
          const overlayZIndex = modal.zIndex;
          const modalZIndex = modal.zIndex + 5;

          return [
            <div
              key={`${modal.id}-overlay`}
              className='fixed inset-0 bg-black/70'
              style={{ zIndex: overlayZIndex }}
              onClick={() => closeModal(modal.id)}
            />,

            <Modal.Portal
              key={modal.id}
              isOpen={true}
              onClose={() => closeModal(modal.id)}
              zIndex={modalZIndex}
              showOverlay={false}
            >
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <ModalComponent {...(modal.props as any)} />
            </Modal.Portal>,
          ];
        })}
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
