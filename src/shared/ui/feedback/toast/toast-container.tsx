'use client';

import Toast from './toast';
import { useToast } from './toast-provider';

export default function ToastContainer() {
  const { toasts } = useToast();
  if (toasts.length === 0) return null;

  return (
    <div className='z-index-popover fixed right-24 bottom-24 flex flex-col gap-8'>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  );
}
