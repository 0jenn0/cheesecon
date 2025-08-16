'use client';

import { cva } from 'class-variance-authority';
import Toast from './toast';
import { useToast } from './toast-provider';

const toastContainerVariants = cva(
  'z-index-popover fixed right-24 flex flex-col gap-8',
  {
    variants: {
      position: {
        top: 'top-24',
        bottom: 'bottom-24',
      },
    },
  },
);

export default function ToastContainer() {
  const { toasts } = useToast();
  if (toasts.length === 0) return null;

  const topToasts = toasts.filter((toast) => toast.position === 'top');
  const bottomToasts = toasts.filter((toast) => toast.position !== 'top');

  return (
    <>
      {topToasts.length > 0 && (
        <div className={toastContainerVariants({ position: 'top' })}>
          {topToasts.map((toast) => (
            <Toast key={toast.id} {...toast} />
          ))}
        </div>
      )}

      {bottomToasts.length > 0 && (
        <div className={toastContainerVariants({ position: 'bottom' })}>
          {bottomToasts.map((toast) => (
            <Toast key={toast.id} {...toast} />
          ))}
        </div>
      )}
    </>
  );
}
