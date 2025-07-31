import { cva } from 'class-variance-authority';

export const tabItemVariants = cva(
  'text-primary padding-x-16 padding-y-12 bg-interactive-secondary-subtle flex w-full max-w-[240px] items-center justify-center gap-8',
  {
    variants: {
      isActive: {
        true: 'text-body-sm border-interactive-primary bg-interactive-selected border-b-2 font-semibold',
        false: 'text-body-sm font-medium',
      },
    },
  },
);
