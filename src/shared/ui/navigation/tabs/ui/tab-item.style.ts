import { cva } from 'class-variance-authority';

export const tabItemVariants = cva(
  'text-primary padding-x-16 padding-y-12 bg-interactive-secondary-subtle flex w-full max-w-[180px] items-center justify-center gap-8',
  {
    variants: {
      isActive: {
        true: 'text-body-sm bg-interactive-selected font-semibold',
        false: 'text-body-sm text-secondary font-medium',
      },
    },
  },
);
