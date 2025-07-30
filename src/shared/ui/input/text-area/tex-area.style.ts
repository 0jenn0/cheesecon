import { cva } from 'class-variance-authority';

export const textAreaVariants = cva(
  'bg-primary padding-16 border-radius-lg border outline-none',
  {
    variants: {
      variant: {
        default: 'border-interactive-secondary',
        filled: 'border-interactive-secondary',
        error: 'border-danger',
        disabled: 'border-interactive-secondary bg-disabled cursor-not-allowed',
      },
    },
  },
);
