'use client';

import { useCallback, useEffect, useState } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { cn } from '@/shared/lib';
import Icon, { IconProps } from '../../icon/icon';
import { useToast } from './toast-provider';

const toastVariants = cva(
  'padding-16 border-radius-lg relative flex w-full max-w-sm items-center gap-8 border',
  {
    variants: {
      type: {
        success: 'border-success bg-success-subtle text-success-bold',
        error: 'border-danger bg-danger-subtle text-danger-bold',
        warning: 'border-warning bg-warning-subtle text-warning-bold',
        info: 'border-info bg-info-subtle text-info-bold',
      },
    },
  },
);

export interface ToastProps extends VariantProps<typeof toastVariants> {
  id: string;
  message: string;
  duration?: number;
  onClose?: (id: string) => void;
}

const toastIcons = {
  success: 'check-circle',
  error: 'alert-circle',
  warning: 'alert-circle',
  info: 'alert-circle',
} satisfies Record<NonNullable<ToastProps['type']>, IconProps['name']>;

export default function Toast({
  id,
  type,
  message,
  duration = 3000,
  onClose,
}: ToastProps) {
  const { removeToast } = useToast();
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  const currentType = type || 'info';
  const iconName = toastIcons[currentType];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = useCallback(() => {
    setIsLeaving(true);
    setTimeout(() => {
      onClose?.(id);
    }, 300);
  }, [id, onClose]);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
        removeToast(id);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, handleClose, id, removeToast]);

  return (
    <AnimatePresence>
      {isVisible && !isLeaving && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 25,
            duration: 0.2,
          }}
          className={cn(
            toastVariants({
              type: currentType,
            }),
          )}
        >
          <Icon name={iconName} className={cn('h-5 w-5 flex-shrink-0')} />

          <div className='min-w-0 flex-1'>
            <p className='text-body-md'>{message}</p>
          </div>

          <button
            className='flex-shrink-0 rounded bg-transparent p-1 transition-colors'
            onClick={handleClose}
          >
            <Icon name='x' className='h-16 w-16' />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
