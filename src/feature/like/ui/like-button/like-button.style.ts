import { cva } from 'class-variance-authority';

export const likeButtonVariants = cva(
  'border-radius-2xl border-ghost padding-x-12 padding-y-8 flex cursor-pointer items-center gap-4 transition-all duration-200 ease-in-out hover:scale-105 active:scale-95',
  {
    variants: {
      variant: {
        default: 'text-tertiary bg-gray-100 hover:bg-gray-200',
        filled: 'text-interactive-inverse bg-rose-400 hover:bg-rose-500',
      },
    },
  },
);
