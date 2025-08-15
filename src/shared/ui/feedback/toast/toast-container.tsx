'use client';

import Toast from './toast';
import { useToast } from './toast-provider';

export default function ToastContainer() {
  const { toasts } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className='z-index-popover fixed top-4 right-4 flex flex-col'>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  );
}
