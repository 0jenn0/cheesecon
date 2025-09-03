'use client';

import { Button } from '@/shared/ui/input';
import Modal from '../modal';
import { useModal } from '../modal-provider';

interface DangerModalProps {
  title: string;
  description: string;
  onCancel: () => void;
  onConfirm: () => void;
  secondaryButtonText?: string;
  confirmButtonText?: string;
  isLoading?: boolean;
}

export default function DangerModal({
  title,
  description,
  onCancel,
  onConfirm,
  secondaryButtonText = '취소',
  confirmButtonText = '확인',
  isLoading,
}: DangerModalProps) {
  const { closeModal } = useModal();

  const handleCancel = () => {
    onCancel();
    closeModal();
  };

  const handleConfirm = () => {
    onConfirm();
    closeModal();
  };

  return (
    <>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{description}</p>
      </Modal.Body>
      <Modal.Footer className='flex gap-8'>
        <Button variant='secondary' className='w-full' onClick={handleCancel}>
          {secondaryButtonText}
        </Button>
        <Button
          variant='danger'
          styleVariant='outlined'
          className='w-full'
          onClick={handleConfirm}
          isLoading={isLoading}
        >
          {confirmButtonText}
        </Button>
      </Modal.Footer>
    </>
  );
}
