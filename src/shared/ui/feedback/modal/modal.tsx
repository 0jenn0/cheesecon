'use client';

import { ComponentPropsWithRef, ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/shared/lib';
import { IconButton } from '../../input';
import useModal from './modal-provider';

export interface ModalProps extends ComponentPropsWithRef<'section'> {
  isOpen?: boolean;
  onClose?: () => void;
  overlayClassName?: string;
  modalClassName?: string;
  children: ReactNode;
}

export interface ModalSubComponentProps extends ComponentPropsWithRef<'div'> {
  hasCloseButton?: boolean;
  onClose?: () => void;
}

function ModalPortal({
  children,
  onClose,
  overlayClassName = '',
  modalClassName = '',
  ...props
}: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const modalRoot = document.getElementById('modal');

  return createPortal(
    <ModalContent
      onClose={onClose}
      overlayClassName={overlayClassName}
      modalClassName={modalClassName}
      {...props}
    >
      {children}
    </ModalContent>,
    modalRoot ?? document.body,
  );
}

function ModalContent({
  children,
  onClose,
  overlayClassName,
  modalClassName,
  ...props
}: Omit<ModalProps, 'isOpen'>) {
  const { closeModal, isOpen } = useModal();

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
      closeModal();
    }
  };

  return (
    <>
      {isOpen && (
        <>
          <section
            className={cn(
              'z-index-modal bg-primary tablet:border-radius-b-2xl border-radius-t-2xl tablet:w-fit padding-x-24 padding-y-32 tablet:top-1/2 tablet:left-1/2 tablet:-translate-x-1/2 tablet:-translate-y-1/2 fixed bottom-0 flex h-fit w-full min-w-[400px] flex-col gap-24',
              modalClassName,
            )}
            {...props}
          >
            {children}
          </section>
          <div
            className={cn(
              'z-index-modal-backdrop fixed inset-0 bg-black/70',
              overlayClassName,
            )}
            onClick={handleOverlayClick}
          />
        </>
      )}
    </>
  );
}

function ModalHeader({
  children,
  hasCloseButton = true,
  className,
  onClose = () => {},
  ...props
}: ModalSubComponentProps) {
  const { closeModal } = useModal();
  const handleClose = () => {
    onClose();
    closeModal();
  };

  return (
    <div
      className={cn('flex items-center justify-between', className)}
      {...props}
    >
      {children}
      {hasCloseButton && (
        <IconButton
          variant='secondary'
          styleVariant='transparent'
          icon='x'
          onClick={handleClose}
        />
      )}
    </div>
  );
}

function ModalBody({ children, className, ...props }: ModalSubComponentProps) {
  return (
    <div className={cn('flex-1', className)} {...props}>
      {children}
    </div>
  );
}

function ModalFooter({
  children,
  className,
  ...props
}: ModalSubComponentProps) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

const Modal = {
  Root: ModalPortal,
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
};

export default Modal;
