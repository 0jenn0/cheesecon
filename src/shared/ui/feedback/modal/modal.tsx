'use client';

import { ComponentPropsWithRef, ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/shared/lib';
import { IconButton } from '../../input';
import { MODAL_Z_INDEX, useModal } from './modal-provider';

export interface ModalProps extends ComponentPropsWithRef<'section'> {
  isOpen?: boolean;
  onClose?: () => void;
  overlayClassName?: string;
  modalClassName?: string;
  children: ReactNode;
  zIndex?: number;
  showOverlay?: boolean;
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
  isOpen = false,
  zIndex,
  showOverlay = true,
  ...props
}: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const { closeModal } = useModal();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        const handleClose = onClose || closeModal;
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose, closeModal]);

  if (!mounted || !isOpen) {
    return null;
  }

  const modalRoot = document.getElementById('modal');

  return createPortal(
    <ModalContent
      onClose={onClose || closeModal}
      overlayClassName={overlayClassName}
      modalClassName={modalClassName}
      zIndex={zIndex}
      showOverlay={showOverlay}
      {...props}
    >
      {children}
    </ModalContent>,
    modalRoot ?? document.body,
  );
}

function ModalContainer({
  children,
  onClose,
  overlayClassName,
  className,
  modalClassName,
  zIndex,
  showOverlay = true,
  ...props
}: Omit<ModalProps, 'isOpen'>) {
  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose?.();
    }
  };

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = 'auto';
    };
  }, []);

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          opacity: { duration: 0.15, ease: 'easeInOut' },
        }}
        className='tablet:items-center tablet:justify-center fixed inset-0 flex items-end justify-center'
        onClick={handleOverlayClick}
        style={{ zIndex: zIndex || MODAL_Z_INDEX }}
        data-z-index={zIndex || MODAL_Z_INDEX}
      >
        {showOverlay && (
          <div
            className={cn('absolute inset-0 bg-black/70', overlayClassName)}
          />
        )}

        <div
          className={cn(
            'relative max-h-[90vh] w-full overflow-auto',
            'tablet:w-auto tablet:max-w-[90vw]',
            modalClassName,
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <section
            className={cn(
              'bg-primary tablet:padding-24 padding-16 flex flex-col gap-16',
              'w-full rounded-t-2xl',
              'tablet:rounded-2xl tablet:min-w-[400px]',
              className,
            )}
            {...props}
          >
            {children}
          </section>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function ModalTitle({ children, className, ...props }: ModalSubComponentProps) {
  return (
    <h1 className={cn('text-heading-sm', className)} {...props}>
      {children}
    </h1>
  );
}

function ModalContent({
  children,
  modalClassName,
  overlayClassName,
  onClose,
  zIndex,
  showOverlay,
  ...props
}: Omit<ModalProps, 'isOpen'>) {
  return (
    <ModalContainer
      onClose={onClose}
      overlayClassName={overlayClassName}
      modalClassName={modalClassName}
      zIndex={zIndex}
      showOverlay={showOverlay}
      {...props}
    >
      {children}
    </ModalContainer>
  );
}

function ModalHeader({
  children,
  hasCloseButton = true,
  className,
  onClose,
  ...props
}: ModalSubComponentProps) {
  const { closeModal } = useModal();

  const handleClose = () => {
    if (onClose) {
      onClose();
      closeModal();
    } else {
      closeModal();
    }
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
          aria-label='모달 닫기'
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
    <div className={cn('flex items-center gap-2', className)} {...props}>
      {children}
    </div>
  );
}

const Modal = {
  Portal: ModalPortal,
  Title: ModalTitle,
  Container: ModalContainer,
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
};

export default Modal;
